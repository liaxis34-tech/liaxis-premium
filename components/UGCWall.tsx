import { Play } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import { CHARM_ICONS, CharmKind } from "./icons/CharmIcons";
import { getTikTokPosts } from "@/lib/social";

const PLACEHOLDER_KINDS: CharmKind[] = ["flower", "star", "moon", "gem", "flower", "star"];

export default async function UGCWall() {
  const posts = await getTikTokPosts(8);

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>#WearYourStory</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-light text-ink-deep md:text-5xl">
            As worn by our community
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-ink-soft md:text-base">
            Tag @charmora in your reels to be featured here.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 flex gap-4 overflow-x-auto px-6 pb-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {posts.length > 0
          ? posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[9/16] w-52 shrink-0 overflow-hidden rounded-[2px] bg-blush-100 md:w-64"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.mediaUrl}
                  alt={post.caption ?? "Charmora creator content"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-deep">
                  <Play size={13} strokeWidth={1.5} fill="currentColor" />
                </span>
              </a>
            ))
          : PLACEHOLDER_KINDS.map((kind, i) => {
              const Icon = CHARM_ICONS[kind];
              return (
                <div
                  key={i}
                  className="relative flex aspect-[9/16] w-52 shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-[2px] bg-blush-radial md:w-64"
                >
                  <Icon className="h-14 w-14 opacity-80" />
                  <span className="text-[10px] uppercase tracking-widest2 text-blush-600">Coming Soon</span>
                </div>
              );
            })}
      </div>
    </section>
  );
}
