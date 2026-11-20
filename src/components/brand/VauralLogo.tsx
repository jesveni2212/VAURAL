type VauralLogoProps = {
  className?: string;
};

/** Wordmark drawn with currentColor so it follows the light/dark theme. */
export function VauralLogo({ className }: VauralLogoProps) {
  return (
    <svg className={className} viewBox="0 0 300 64" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 28V6h22M56 36v22H34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
      <text x="30" y="40" fill="currentColor" fontFamily="var(--font-geist-mono), monospace" fontSize="17" textAnchor="middle">
        V/L
      </text>
      <text x="76" y="44" fill="currentColor" fontFamily="var(--font-geist), sans-serif" fontSize="34" fontWeight="500" letterSpacing="6">
        VAURAL
      </text>
    </svg>
  );
}
