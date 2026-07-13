// Social wall architecture for the Instagram-style review gallery and the
// TikTok-inspired UGC section. No posts are fabricated: until an access
// token is configured, `getInstagramPosts` / `getTikTokPosts` resolve to an
// empty array and the sections render an on-brand placeholder inviting
// customers to tag @charmora instead of fake content.

export interface SocialPost {
  id: string;
  platform: "instagram" | "tiktok";
  mediaUrl: string;
  mediaType: "image" | "video";
  permalink: string;
  caption?: string;
  username?: string;
}

// Docs: https://developers.facebook.com/docs/instagram-basic-display-api
export async function getInstagramPosts(limit = 8): Promise<SocialPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  const res = await fetch(
    `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption,username&access_token=${token}&limit=${limit}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const json = await res.json();

  return (json.data ?? [])
    .filter((post: { media_type: string }) => post.media_type !== "CAROUSEL_ALBUM")
    .map(
      (post: {
        id: string;
        media_type: string;
        media_url: string;
        permalink: string;
        caption?: string;
        username?: string;
      }) => ({
        id: post.id,
        platform: "instagram" as const,
        mediaUrl: post.media_url,
        mediaType: post.media_type === "VIDEO" ? ("video" as const) : ("image" as const),
        permalink: post.permalink,
        caption: post.caption,
        username: post.username,
      })
    );
}

// Docs: https://developers.tiktok.com/doc/content-posting-api-get-started
export async function getTikTokPosts(limit = 8): Promise<SocialPost[]> {
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  if (!token) return [];

  const res = await fetch(
    `https://open.tiktokapis.com/v2/video/list/?fields=id,cover_image_url,share_url,video_description,embed_link`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ max_count: limit }),
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return [];
  const json = await res.json();

  return (json.data?.videos ?? []).map(
    (video: { id: string; cover_image_url: string; share_url: string; video_description?: string }) => ({
      id: video.id,
      platform: "tiktok" as const,
      mediaUrl: video.cover_image_url,
      mediaType: "video" as const,
      permalink: video.share_url,
      caption: video.video_description,
    })
  );
}
