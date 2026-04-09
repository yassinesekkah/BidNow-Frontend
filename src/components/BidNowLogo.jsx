/**
 * BidNowLogo Component
 * Modern, professional gavel icon for the BidNow auction platform
 * Supports multiple sizes and color variants
 */

export default function BidNowLogo({
  size = "md",
  variant = "gradient",
  className = "",
}) {
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 64,
    xl: 100,
  };

  const dimension = sizeMap[size] || sizeMap.md;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={dimension}
      height={dimension}
      className={className}
      aria-label="BidNow"
    >
      <defs>
        <linearGradient id="gavelsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      {/* Gavel Head - Rounded hammer shape */}
      <rect
        x="28"
        y="18"
        width="44"
        height="28"
        rx="6"
        ry="6"
        fill={variant === "gradient" ? "url(#gavelsGradient)" : "#4F46E5"}
      />

      {/* Gavel Head - Detail line/shadow */}
      <rect
        x="28"
        y="18"
        width="44"
        height="4"
        rx="6"
        ry="6"
        fill={variant === "gradient" ? "#06B6D4" : "#6366F1"}
        opacity="0.4"
      />

      {/* Gavel Handle - Thick center line */}
      <rect
        x="47"
        y="45"
        width="6"
        height="35"
        rx="3"
        ry="3"
        fill={variant === "gradient" ? "url(#gavelsGradient)" : "#4F46E5"}
      />

      {/* Gavel Handle - Accent/grip lines */}
      <rect
        x="44"
        y="60"
        width="12"
        height="2"
        fill={variant === "gradient" ? "#06B6D4" : "#6366F1"}
        opacity="0.3"
      />
      <rect
        x="44"
        y="67"
        width="12"
        height="2"
        fill={variant === "gradient" ? "#06B6D4" : "#6366F1"}
        opacity="0.3"
      />

      {/* Gavel Sound block - Bottom accent */}
      <circle
        cx="50"
        cy="84"
        r="4"
        fill={variant === "gradient" ? "#06B6D4" : "#06B6D4"}
      />

      {/* Subtle shine/highlight on gavel head */}
      <ellipse cx="42" cy="24" rx="8" ry="4" fill="white" opacity="0.15" />
    </svg>
  );
}
