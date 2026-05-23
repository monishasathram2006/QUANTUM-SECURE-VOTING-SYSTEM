export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-white/60">{subtitle}</p> : null}
    </div>
  );
}
