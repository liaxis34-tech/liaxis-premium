export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 justify-center md:justify-start">
      <span className="h-px w-8 bg-gold" />
      <span className="text-[11px] md:text-xs tracking-widest2 uppercase text-gold-dark font-medium">
        {children}
      </span>
    </div>
  );
}
