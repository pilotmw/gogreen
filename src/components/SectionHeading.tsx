interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  subtitleClass?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  subtitleClass = "text-gray-600",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-lg max-w-3xl mx-auto ${subtitleClass}`}>{subtitle}</p>
      )}
    </div>
  );
}
