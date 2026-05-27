type Props = { variant: number };

export default function PostIllustration({ variant }: Props) {
  const v = ((variant - 1) % 9) + 1;
  switch (v) {
    case 1:
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r="68"
            fill="none"
            stroke="#0E4D4B"
            strokeWidth="3"
            strokeDasharray="2 5"
            opacity=".4"
          />
          <path
            d="M100 50 Q 130 65 140 100 Q 130 135 100 150 Q 70 135 60 100 Q 70 65 100 50 Z"
            fill="#0E4D4B"
            opacity=".88"
          />
          <circle cx="100" cy="80" r="6" fill="#F3D5B2" />
          <circle cx="116" cy="105" r="5" fill="#25B5AB" />
          <circle cx="86" cy="118" r="5" fill="#C76842" />
          <path
            d="M100 38 Q 105 28 100 22"
            fill="none"
            stroke="#0E4D4B"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse cx="108" cy="28" rx="5" ry="9" fill="#25B5AB" transform="rotate(20 108 28)" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g fill="none" stroke="#0E4D4B" strokeWidth="3.5" strokeLinecap="round">
            <path d="M70 30 C 130 60, 70 100, 130 130 C 70 160, 130 180, 100 188" />
            <path d="M130 30 C 70 60, 130 100, 70 130 C 130 160, 70 180, 100 188" />
          </g>
          <g stroke="#25B5AB" strokeWidth="2.5" strokeLinecap="round" opacity=".75">
            <line x1="84" y1="50" x2="116" y2="50" />
            <line x1="78" y1="72" x2="122" y2="72" />
            <line x1="74" y1="94" x2="126" y2="94" />
            <line x1="78" y1="118" x2="122" y2="118" />
            <line x1="84" y1="140" x2="116" y2="140" />
            <line x1="90" y1="162" x2="110" y2="162" />
          </g>
          <circle cx="84" cy="50" r="3.5" fill="#0E4D4B" />
          <circle cx="116" cy="50" r="3.5" fill="#0E4D4B" />
          <circle cx="74" cy="94" r="3.5" fill="#25B5AB" />
          <circle cx="126" cy="94" r="3.5" fill="#25B5AB" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="78" y="60" width="12" height="80" rx="3" fill="#0E4D4B" />
          <rect x="110" y="60" width="12" height="80" rx="3" fill="#0E4D4B" />
          <rect x="60" y="76" width="20" height="48" rx="4" fill="#25B5AB" />
          <rect x="120" y="76" width="20" height="48" rx="4" fill="#25B5AB" />
          <rect x="50" y="88" width="14" height="24" rx="3" fill="#C76842" />
          <rect x="136" y="88" width="14" height="24" rx="3" fill="#C76842" />
          <path
            d="M40 100 Q 30 100 30 100"
            stroke="#0E4D4B"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M160 100 Q 170 100 170 100"
            stroke="#0E4D4B"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M100 30 L 160 50 L 158 110 C 158 142 132 168 100 180 C 68 168 42 142 42 110 L 44 50 Z"
            fill="#0E4D4B"
          />
          <path
            d="M100 44 L 148 60 L 146 110 C 146 134 126 154 100 164 C 74 154 54 134 54 110 L 56 60 Z"
            fill="none"
            stroke="rgba(248,228,204,0.3)"
            strokeWidth="1.5"
          />
          <path
            d="M76 108 L 94 126 L 130 90"
            stroke="#FAF6EF"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M100 50 C 70 50 50 70 50 100 C 50 130 80 145 100 158 C 120 145 150 130 150 100 C 150 70 130 50 100 50 Z"
            fill="#C76842"
            opacity=".88"
          />
          <circle cx="100" cy="100" r="22" fill="#FAF6EF" />
          <path
            d="M100 92 L 100 100 L 108 100"
            stroke="#1F1A14"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="60" cy="60" r="4" fill="#25B5AB" opacity=".7" />
          <circle cx="150" cy="70" r="3.5" fill="#0E4D4B" opacity=".5" />
          <circle cx="65" cy="150" r="3.5" fill="#25B5AB" opacity=".6" />
        </svg>
      );
    case 6:
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="100" cy="100" r="64" fill="none" stroke="#0E4D4B" strokeWidth="3" />
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="#0E4D4B"
            strokeWidth="2.5"
            opacity=".5"
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="60"
            stroke="#0E4D4B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="100"
            y1="100"
            x2="128"
            y2="115"
            stroke="#C76842"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="6" fill="#25B5AB" />
          <g stroke="#0E4D4B" strokeWidth="2.5" strokeLinecap="round">
            <line x1="100" y1="48" x2="100" y2="42" />
            <line x1="152" y1="100" x2="158" y2="100" />
            <line x1="100" y1="152" x2="100" y2="158" />
            <line x1="48" y1="100" x2="42" y2="100" />
          </g>
        </svg>
      );
    case 7:
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse
            cx="100"
            cy="120"
            rx="62"
            ry="38"
            fill="#FAF6EF"
            stroke="#0E4D4B"
            strokeWidth="3"
          />
          <ellipse cx="100" cy="120" rx="48" ry="26" fill="#F8E4CC" />
          <circle cx="80" cy="115" r="8" fill="#C76842" />
          <circle cx="110" cy="118" r="7" fill="#25B5AB" />
          <circle cx="95" cy="128" r="6" fill="#0E4D4B" />
          <circle cx="120" cy="108" r="5" fill="#F3D5B2" />
          <path
            d="M70 60 Q 80 50 100 55 Q 120 50 130 60"
            stroke="#0E4D4B"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M80 75 L 80 95" stroke="#0E4D4B" strokeWidth="3" strokeLinecap="round" />
          <path d="M120 75 L 120 95" stroke="#0E4D4B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 8:
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r="72"
            fill="none"
            stroke="#0E4D4B"
            strokeWidth="2.5"
            opacity=".25"
          />
          <circle
            cx="100"
            cy="100"
            r="52"
            fill="none"
            stroke="#0E4D4B"
            strokeWidth="2.5"
            opacity=".4"
          />
          <circle cx="100" cy="100" r="32" fill="#25B5AB" opacity=".85" />
          <circle cx="100" cy="100" r="12" fill="#FAF6EF" />
          <g fill="#C76842">
            <circle cx="62" cy="62" r="5" />
            <circle cx="138" cy="60" r="4" />
            <circle cx="158" cy="120" r="5" />
            <circle cx="48" cy="130" r="4" />
            <circle cx="100" cy="40" r="4" />
          </g>
          <g stroke="#0E4D4B" strokeWidth="1.5" opacity=".4" fill="none">
            <line x1="62" y1="62" x2="100" y2="100" />
            <line x1="138" y1="60" x2="100" y2="100" />
            <line x1="158" y1="120" x2="100" y2="100" />
            <line x1="48" y1="130" x2="100" y2="100" />
            <line x1="100" y1="40" x2="100" y2="100" />
          </g>
        </svg>
      );
    case 9:
    default:
      return (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M100 30 C 60 30 40 70 60 110 C 70 130 90 140 100 170 C 110 140 130 130 140 110 C 160 70 140 30 100 30 Z"
            fill="#0E4D4B"
          />
          <path
            d="M100 50 C 78 50 65 75 78 100 C 85 112 95 118 100 138 C 105 118 115 112 122 100 C 135 75 122 50 100 50 Z"
            fill="#25B5AB"
            opacity=".88"
          />
          <circle cx="100" cy="90" r="10" fill="#FAF6EF" />
          <circle cx="76" cy="60" r="3" fill="#F3D5B2" />
          <circle cx="124" cy="65" r="3" fill="#F3D5B2" />
        </svg>
      );
  }
}

export function FeaturedRibbon() {
  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="ribG1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0E4D4B" />
          <stop offset="100%" stopColor="#25B5AB" />
        </linearGradient>
        <linearGradient id="ribG2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C76842" />
          <stop offset="100%" stopColor="#F3D5B2" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#ribG1)" strokeWidth="14" strokeLinecap="round" opacity=".92">
        <path d="M60 40 C 220 60, 100 140, 260 160 C 100 180, 220 260, 60 280" />
      </g>
      <g fill="none" stroke="url(#ribG2)" strokeWidth="14" strokeLinecap="round" opacity=".85">
        <path d="M260 40 C 100 60, 220 140, 60 160 C 220 180, 100 260, 260 280" />
      </g>
      <g stroke="#1F1A14" strokeWidth="2" strokeLinecap="round" opacity=".30">
        <line x1="100" y1="70" x2="220" y2="70" />
        <line x1="90" y1="100" x2="230" y2="100" />
        <line x1="80" y1="130" x2="240" y2="130" />
        <line x1="80" y1="190" x2="240" y2="190" />
        <line x1="90" y1="220" x2="230" y2="220" />
        <line x1="100" y1="250" x2="220" y2="250" />
      </g>
      <circle cx="160" cy="160" r="6" fill="#0E4D4B" />
      <circle cx="80" cy="130" r="4" fill="#25B5AB" />
      <circle cx="240" cy="190" r="4" fill="#C76842" />
    </svg>
  );
}
