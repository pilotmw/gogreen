interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  subtitleClass?: string;
  /** Render the title as the page's <h1> instead of an <h2>.
      Defaults to "h2" so existing pages are unchanged. */
  titleLevel?: "h1" | "h2";
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  subtitleClass = "text-gray-600",
  titleLevel = "h2",
}: SectionHeadingProps) {
  const Title = titleLevel;
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <Title className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</Title>
      {subtitle && (
        <p className={`text-lg max-w-3xl mx-auto ${subtitleClass}`}>{subtitle}</p>
      )}
    </div>
  );
}
