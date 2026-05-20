interface Props {
  className?: string;
}

export function HandVoteIllustration({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none">
      {/* Ballot box body */}
      <rect x="40" y="80" width="120" height="100" rx="8" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
      <rect x="35" y="75" width="130" height="15" rx="4" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      {/* Slot */}
      <rect x="75" y="68" width="50" height="8" rx="2" fill="currentColor" opacity="0.25" />
      {/* Arm */}
      <path d="M155 50 Q170 45 175 60 Q180 75 165 78 L155 78" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="currentColor" opacity="0.15" />
      {/* Hand */}
      <circle cx="165" cy="65" r="8" fill="currentColor" opacity="0.2" />
      {/* Ballot paper going into slot */}
      <rect x="80" y="60" width="55" height="75" rx="3" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" />
      <rect x="85" y="66" width="45" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="85" y="74" width="45" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="85" y="82" width="45" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="85" y="90" width="45" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <rect x="85" y="98" width="45" height="4" rx="1" fill="currentColor" opacity="0.2" />
      {/* Checkmark on ballot */}
      <path d="M92 72 L100 80 L110 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      {/* VOTE text */}
      <text x="160" y="170" fontSize="28" fontWeight="900" fill="currentColor" opacity="0.15" fontFamily="Georgia, serif">VOTE</text>
    </svg>
  );
}

export function VotersIllustration({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 200 120" fill="none">
      {/* Person 1 */}
      <circle cx="35" cy="30" r="12" fill="currentColor" opacity="0.1" />
      <path d="M10 65 Q35 40 60 65" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.08" />
      {/* Person 1 arm raising */}
      <path d="M50 48 Q65 30 72 38 Q78 45 70 50" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.12" />

      {/* Person 2 */}
      <circle cx="100" cy="28" r="12" fill="currentColor" opacity="0.1" />
      <path d="M75 63 Q100 38 125 63" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.08" />

      {/* Person 3 */}
      <circle cx="165" cy="32" r="12" fill="currentColor" opacity="0.1" />
      <path d="M140 67 Q165 42 190 67" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.08" />
      {/* Person 3 arm holding ballot */}
      <path d="M168 42 Q180 50 178 60" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity="0.12" />
      <rect x="170" y="56" width="18" height="25" rx="2" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1.5" />

      {/* Ballot box behind */}
      <rect x="60" y="70" width="80" height="40" rx="6" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1.5" />
      <rect x="85" y="64" width="30" height="8" rx="2" fill="currentColor" opacity="0.12" />

      {/* VOTE text */}
      <text x="50" y="108" fontSize="18" fontWeight="900" fill="currentColor" opacity="0.1" fontFamily="Georgia, serif">EVERY VOTE COUNTS</text>
    </svg>
  );
}

export function BallotCheckIllustration({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 100 120" fill="none">
      {/* Ballot paper */}
      <rect x="10" y="5" width="80" height="110" rx="6" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2" />
      {/* Header bar */}
      <rect x="10" y="5" width="80" height="20" rx="6" fill="currentColor" opacity="0.1" />
      <text x="30" y="19" fontSize="10" fontWeight="700" fill="currentColor" opacity="0.4" fontFamily="Georgia, serif">BALLOT</text>
      {/* Lines */}
      <line x1="20" y1="38" x2="80" y2="38" stroke="currentColor" strokeWidth="2" opacity="0.15" />
      <circle cx="25" cy="38" r="4" fill="currentColor" opacity="0.2" />
      <line x1="20" y1="56" x2="80" y2="56" stroke="currentColor" strokeWidth="2" opacity="0.15" />
      <circle cx="25" cy="56" r="4" fill="currentColor" opacity="0.2" />
      <line x1="20" y1="74" x2="80" y2="74" stroke="currentColor" strokeWidth="2" opacity="0.15" />
      <circle cx="25" cy="74" r="4" fill="currentColor" opacity="0.25" />
      {/* Checkmark on selected */}
      <path d="M21 71 L25 77 L33 67" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <line x1="20" y1="92" x2="60" y2="92" stroke="currentColor" strokeWidth="2" opacity="0.1" />
    </svg>
  );
}

export function ElectionBadge({ className = "" }: Props) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      {/* Ribbon left */}
      <path d="M10 30 L25 30 L25 80 L17.5 70 L10 80 Z" fill="currentColor" opacity="0.08" />
      {/* Ribbon right */}
      <path d="M75 30 L90 30 L90 80 L82.5 70 L75 80 Z" fill="currentColor" opacity="0.08" />
      {/* Circle */}
      <circle cx="50" cy="40" r="30" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="2" />
      {/* Inner ring */}
      <circle cx="50" cy="40" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      {/* Star */}
      <polygon points="50,22 55,34 68,34 58,42 61,55 50,47 39,55 42,42 32,34 45,34" fill="currentColor" opacity="0.2" />
      {/* Text */}
      <text x="50" y="85" fontSize="10" fontWeight="800" fill="currentColor" opacity="0.2" fontFamily="Georgia, serif" textAnchor="middle">RMSTU</text>
    </svg>
  );
}
