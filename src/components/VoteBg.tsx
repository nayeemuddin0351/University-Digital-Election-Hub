export default function VoteBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Election scene — left side */}
      <svg className="absolute top-[25%] -left-6 w-56 sm:w-72" viewBox="0 0 800 350" fill="none">
        <rect width="800" height="350" fill="#F0F7FF" />
        <ellipse cx="120" cy="60" rx="80" ry="30" fill="white" opacity="0.5" />
        <ellipse cx="160" cy="50" rx="60" ry="25" fill="white" opacity="0.35" />
        <ellipse cx="650" cy="45" rx="90" ry="28" fill="white" opacity="0.4" />
        <ellipse cx="700" cy="35" rx="50" ry="20" fill="white" opacity="0.3" />
        <ellipse cx="400" cy="70" rx="70" ry="22" fill="white" opacity="0.25" />
        <ellipse cx="450" cy="60" rx="45" ry="18" fill="white" opacity="0.2" />
        <rect x="0" y="290" width="800" height="60" fill="#E8EDF4" />
        <ellipse cx="400" cy="295" rx="380" ry="12" fill="#DCE2EC" opacity="0.4" />
        {/* Monitor */}
        <rect x="355" y="210" width="90" height="12" rx="3" fill="#C5CCD6" />
        <rect x="375" y="222" width="50" height="50" rx="4" fill="#B5BCC8" />
        <rect x="385" y="272" width="30" height="18" rx="3" fill="#A5ADBA" />
        <rect x="280" y="80" width="240" height="140" rx="12" fill="#4A5A6E" />
        <rect x="285" y="85" width="230" height="130" rx="8" fill="#3A4A5E" />
        <rect x="295" y="95" width="210" height="110" rx="4" fill="#F5F8FC" />
        <rect x="295" y="95" width="210" height="22" rx="4" fill="#7CA3E6" />
        <text x="310" y="110" fontSize="10" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">RMSTU ELECTION 2026</text>
        <circle cx="490" cy="106" r="4" fill="#6ED4A0" />
        {/* VOTE boxes */}
        <rect x="310" y="128" width="55" height="60" rx="6" fill="#F5A0A0" opacity="0.75" />
        <rect x="315" y="133" width="45" height="10" rx="3" fill="#E88888" />
        <rect x="330" y="140" width="15" height="4" rx="1" fill="#FCC" opacity="0.4" />
        <text x="323" y="172" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial,sans-serif">VOTE</text>
        <path d="M326 150 L332 156 L342 144" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="372" y="128" width="55" height="60" rx="6" fill="#F5A0A0" opacity="0.75" />
        <rect x="377" y="133" width="45" height="10" rx="3" fill="#E88888" />
        <rect x="394" y="140" width="15" height="4" rx="1" fill="#FCC" opacity="0.4" />
        <text x="385" y="172" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial,sans-serif">VOTE</text>
        <path d="M388 150 L394 156 L404 144" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="434" y="128" width="55" height="60" rx="6" fill="#F5A0A0" opacity="0.75" />
        <rect x="439" y="133" width="45" height="10" rx="3" fill="#E88888" />
        <rect x="456" y="140" width="15" height="4" rx="1" fill="#FCC" opacity="0.4" />
        <text x="447" y="172" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial,sans-serif">VOTE</text>
        <path d="M450 150 L456 156 L466 144" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="295" y="195" width="210" height="10" rx="0" fill="#E8EDF4" />
        <rect x="295" y="195" width="140" height="10" rx="0" fill="#7CA3E6" opacity="0.25" />
        {/* Person 1 */}
        <rect x="100" y="198" width="28" height="40" rx="8" fill="#C4B0F0" />
        <circle cx="114" cy="185" r="16" fill="#FEF0C8" />
        <ellipse cx="114" cy="175" rx="17" ry="12" fill="#A08060" />
        <line x1="108" y1="238" x2="103" y2="275" stroke="#6A7A8A" strokeWidth="5" strokeLinecap="round" />
        <line x1="120" y1="238" x2="125" y2="275" stroke="#6A7A8A" strokeWidth="5" strokeLinecap="round" />
        <line x1="100" y1="210" x2="82" y2="225" stroke="#FEF0C8" strokeWidth="4" strokeLinecap="round" />
        <line x1="128" y1="210" x2="145" y2="220" stroke="#FEF0C8" strokeWidth="4" strokeLinecap="round" />
        <rect x="140" y="210" width="20" height="26" rx="2" fill="white" stroke="#D0D8E4" strokeWidth="1" />
        <line x1="144" y1="216" x2="156" y2="216" stroke="#D0D8E4" strokeWidth="1.5" />
        <line x1="144" y1="222" x2="156" y2="222" stroke="#D0D8E4" strokeWidth="1.5" />
        <line x1="144" y1="228" x2="152" y2="228" stroke="#D0D8E4" strokeWidth="1.5" />
        {/* Person 2 */}
        <rect x="40" y="200" width="26" height="38" rx="7" fill="#8CB8F8" />
        <circle cx="53" cy="188" r="15" fill="#FEF0C8" />
        <ellipse cx="53" cy="178" rx="16" ry="11" fill="#4A5A6E" />
        <line x1="47" y1="238" x2="43" y2="272" stroke="#6A7A8A" strokeWidth="5" strokeLinecap="round" />
        <line x1="59" y1="238" x2="63" y2="272" stroke="#6A7A8A" strokeWidth="5" strokeLinecap="round" />
        <line x1="40" y1="212" x2="25" y2="225" stroke="#FEF0C8" strokeWidth="4" strokeLinecap="round" />
        <line x1="66" y1="212" x2="78" y2="220" stroke="#FEF0C8" strokeWidth="4" strokeLinecap="round" />
        <rect x="70" y="206" width="18" height="24" rx="2" fill="#FCD872" stroke="#E0B84C" strokeWidth="1" />
        <circle cx="79" cy="211" r="2" fill="#E0B84C" />
        {/* Person 3 */}
        <rect x="610" y="196" width="28" height="40" rx="8" fill="#F0A0C8" />
        <circle cx="624" cy="183" r="16" fill="#FEF0C8" />
        <ellipse cx="624" cy="173" rx="17" ry="12" fill="#7A5A8A" />
        <line x1="618" y1="236" x2="613" y2="273" stroke="#6A7A8A" strokeWidth="5" strokeLinecap="round" />
        <line x1="630" y1="236" x2="635" y2="273" stroke="#6A7A8A" strokeWidth="5" strokeLinecap="round" />
        <line x1="610" y1="208" x2="592" y2="222" stroke="#FEF0C8" strokeWidth="4" strokeLinecap="round" />
        <line x1="638" y1="208" x2="655" y2="218" stroke="#FEF0C8" strokeWidth="4" strokeLinecap="round" />
        <rect x="650" y="208" width="18" height="25" rx="2" fill="white" stroke="#D0D8E4" strokeWidth="1" />
        <rect x="654" y="212" width="10" height="3" rx="1" fill="#F5A0A0" />
        <rect x="654" y="218" width="10" height="3" rx="1" fill="#F5A0A0" />
        <rect x="654" y="224" width="10" height="3" rx="1" fill="#F5A0A0" />
        {/* Person 4 */}
        <rect x="700" y="200" width="26" height="38" rx="7" fill="#70D0A0" />
        <circle cx="713" cy="186" r="15" fill="#FEF0C8" />
        <ellipse cx="713" cy="176" rx="16" ry="11" fill="#B09050" />
        <line x1="707" y1="238" x2="703" y2="272" stroke="#6A7A8A" strokeWidth="5" strokeLinecap="round" />
        <line x1="719" y1="238" x2="723" y2="272" stroke="#6A7A8A" strokeWidth="5" strokeLinecap="round" />
        <line x1="700" y1="212" x2="688" y2="225" stroke="#FEF0C8" strokeWidth="4" strokeLinecap="round" />
        <line x1="726" y1="212" x2="735" y2="220" stroke="#FEF0C8" strokeWidth="4" strokeLinecap="round" />
        {/* Person 5 */}
        <rect x="195" y="195" width="26" height="40" rx="7" fill="#FCD872" />
        <circle cx="208" cy="182" r="15" fill="#FEF0C8" />
        <ellipse cx="208" cy="172" rx="16" ry="11" fill="#3A4A5E" />
        <line x1="202" y1="235" x2="198" y2="272" stroke="#6A7A8A" strokeWidth="5" strokeLinecap="round" />
        <line x1="214" y1="235" x2="218" y2="272" stroke="#6A7A8A" strokeWidth="5" strokeLinecap="round" />
        <line x1="221" y1="210" x2="260" y2="195" stroke="#FEF0C8" strokeWidth="4" strokeLinecap="round" />
        <line x1="195" y1="210" x2="178" y2="225" stroke="#FEF0C8" strokeWidth="4" strokeLinecap="round" />
        {/* Results board */}
        <rect x="540" y="90" width="100" height="80" rx="6" fill="#F0FDF4" stroke="#6ED4A0" strokeWidth="2" />
        <rect x="540" y="90" width="100" height="18" rx="6" fill="#6ED4A0" />
        <text x="554" y="103" fontSize="8" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">RESULTS</text>
        <rect x="550" y="116" width="80" height="3" rx="1.5" fill="#A8E8C0" />
        <rect x="550" y="126" width="65" height="3" rx="1.5" fill="#A8E8C0" />
        <rect x="550" y="136" width="70" height="3" rx="1.5" fill="#A8E8C0" />
        <rect x="550" y="146" width="60" height="3" rx="1.5" fill="#A8E8C0" />
        <path d="M575 154 L580 160 L585 154 L582 148 L578 148 Z" fill="#FCD872" opacity="0.7" />
        {/* Decorations */}
        <circle cx="30" cy="30" r="2" fill="#7CA3E6" opacity="0.15" />
        <circle cx="60" cy="25" r="1.5" fill="#7CA3E6" opacity="0.12" />
        <circle cx="750" cy="25" r="2" fill="#7CA3E6" opacity="0.15" />
        <circle cx="770" cy="40" r="1.5" fill="#7CA3E6" opacity="0.12" />
        <circle cx="20" cy="100" r="1.5" fill="#7CA3E6" opacity="0.12" />
        <circle cx="780" cy="120" r="2" fill="#7CA3E6" opacity="0.12" />
        <polygon points="770,75 772,81 778,81 773,85 775,91 770,87 765,91 767,85 762,81 768,81" fill="#FCD872" opacity="0.25" />
        <polygon points="30,140 32,146 38,146 33,150 35,156 30,152 25,156 27,150 22,146 28,146" fill="#FCD872" opacity="0.2" />
        <path d="M50 160 L55 165 L65 153" stroke="#6ED4A0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
        <text x="260" y="170" fontSize="11" fontWeight="800" fill="#F5A0A0" opacity="0.2" fontFamily="Arial,sans-serif" transform="rotate(-15,260,170)">VOTE</text>
        <text x="530" y="178" fontSize="11" fontWeight="800" fill="#7CA3E6" opacity="0.2" fontFamily="Arial,sans-serif" transform="rotate(10,530,178)">VOTE</text>
      </svg>

      {/* Gradient mesh background */}

      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-[0.15]" style={{
        background: `
          radial-gradient(ellipse at 15% 20%, rgba(255,120,0,0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 15%, rgba(0,200,255,0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 80%, rgba(0,255,150,0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 75%, rgba(200,100,255,0.15) 0%, transparent 50%)
        `
      }} />

      {/* Floating particles */}
      <div className="absolute top-[8%] left-[5%] w-2 h-2 rounded-full bg-orange-400 opacity-[0.15] animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute top-[15%] right-[12%] w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-[0.12] animate-pulse" style={{ animationDuration: "3s", animationDelay: "1s" }} />
      <div className="absolute top-[40%] left-[3%] w-2.5 h-2.5 rounded-full bg-green-400 opacity-[0.1] animate-pulse" style={{ animationDuration: "5s", animationDelay: "0.5s" }} />
      <div className="absolute top-[60%] right-[8%] w-1.5 h-1.5 rounded-full bg-purple-400 opacity-[0.12] animate-pulse" style={{ animationDuration: "3.5s", animationDelay: "2s" }} />
      <div className="absolute top-[75%] left-[10%] w-2 h-2 rounded-full bg-yellow-400 opacity-[0.1] animate-pulse" style={{ animationDuration: "4.5s", animationDelay: "1.5s" }} />
      <div className="absolute top-[85%] right-[5%] w-2.5 h-2.5 rounded-full bg-pink-400 opacity-[0.1] animate-pulse" style={{ animationDuration: "3.8s", animationDelay: "0.8s" }} />
      <div className="absolute top-[25%] left-[50%] w-1 h-1 rounded-full bg-orange-300 opacity-[0.15] animate-ping" style={{ animationDuration: "6s" }} />
      <div className="absolute top-[55%] left-[30%] w-1.5 h-1.5 rounded-full bg-cyan-300 opacity-[0.1] animate-ping" style={{ animationDuration: "7s", animationDelay: "2s" }} />

      {/* Ballot box — top left */}
      <svg className="absolute -top-8 -left-8 opacity-[0.06] w-64 h-64 text-fg" viewBox="0 0 100 100" fill="currentColor">
        <rect x="10" y="35" width="80" height="55" rx="3" />
        <rect x="15" y="25" width="70" height="14" rx="2" />
        <rect x="40" y="29" width="20" height="6" rx="1" fill="currentColor" opacity="0.15" />
        <path d="M35 55 L45 65 L65 45" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>

      {/* Vote check — top right */}
      <svg className="absolute top-16 -right-10 opacity-[0.05] w-56 h-56 text-fg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="40" strokeWidth="4" />
        <path d="M30 50 L44 64 L70 36" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Stars / sparkle — middle left */}
      <svg className="absolute top-1/2 -translate-y-1/2 -left-4 opacity-[0.05] w-40 h-40 text-fg" viewBox="0 0 100 100" fill="currentColor">
        <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" />
      </svg>

      {/* Ballot box — bottom right */}
      <svg className="absolute -bottom-10 -right-10 opacity-[0.07] w-80 h-80 text-fg" viewBox="0 0 100 100" fill="currentColor">
        <rect x="10" y="35" width="80" height="55" rx="3" />
        <rect x="15" y="25" width="70" height="14" rx="2" />
        <rect x="40" y="29" width="20" height="6" rx="1" fill="currentColor" opacity="0.15" />
        <path d="M35 55 L45 65 L65 45" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>

      {/* University gear — bottom left */}
      <svg className="absolute -bottom-16 -left-12 opacity-[0.06] w-72 h-72 text-fg" viewBox="0 0 100 100" fill="currentColor">
        <path d="M43.3 5.8l-2 7.5a35 35 0 00-8.5 3.5l-7-3.9-9.2 9.2 3.9 7a35 35 0 00-3.5 8.5l-7.5 2v13l7.5 2a35 35 0 003.5 8.5l-3.9 7 9.2 9.2 7-3.9a35 35 0 008.5 3.5l2 7.5h13l2-7.5a35 35 0 008.5-3.5l7 3.9 9.2-9.2-3.9-7a35 35 0 003.5-8.5l7.5-2v-13l-7.5-2a35 35 0 00-3.5-8.5l3.9-7-9.2-9.2-7 3.9a35 35 0 00-8.5-3.5l-2-7.5h-13zm6.7 24.2a20 20 0 110 40 20 20 0 010-40z" />
      </svg>

      {/* Ballot paper with check — center right */}
      <svg className="absolute top-[35%] right-[5%] opacity-[0.04] w-36 h-36 text-fg" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="10" y="5" width="80" height="90" rx="4" />
        <line x1="25" y1="25" x2="75" y2="25" />
        <line x1="25" y1="40" x2="60" y2="40" />
        <line x1="25" y1="55" x2="70" y2="55" />
        <path d="M30 70 L40 80 L60 60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Fingerprint — bottom center */}
      <svg className="absolute bottom-[15%] right-[25%] opacity-[0.03] w-28 h-28 text-fg" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M50 20c-10 0-18 8-18 18v12c0 10 8 18 18 18s18-8 18-18V38c0-10-8-18-18-18z" />
        <path d="M35 45v5c0 8 7 15 15 15s15-7 15-15v-5" />
        <path d="M30 38c0-11 9-20 20-20s20 9 20 20" />
        <path d="M25 42c0-14 11-25 25-25s25 11 25 25" />
      </svg>

      {/* Hand with ballot — bottom center left */}
      <svg className="absolute bottom-[10%] left-[20%] opacity-[0.04] w-32 h-32 text-fg" viewBox="0 0 100 100" fill="currentColor">
        <rect x="35" y="30" width="30" height="40" rx="3" />
        <rect x="38" y="33" width="24" height="3" rx="1" />
        <rect x="38" y="39" width="24" height="3" rx="1" />
        <rect x="38" y="45" width="24" height="3" rx="1" />
        <path d="M50 70v12M44 82h12" strokeWidth="3" />
        <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.3" />
      </svg>

      {/* Detailed hand voting — center right */}
      <svg className="absolute top-[45%] right-[2%] opacity-[0.03] w-48 h-48 text-fg" viewBox="0 0 200 200" fill="none">
        <rect x="40" y="80" width="120" height="100" rx="8" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <rect x="35" y="75" width="130" height="15" rx="4" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" />
        <rect x="75" y="68" width="50" height="8" rx="2" fill="currentColor" opacity="0.2" />
        <path d="M155 50 Q170 45 175 60 Q180 75 165 78 L155 78" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="currentColor" opacity="0.1" />
        <circle cx="165" cy="65" r="7" fill="currentColor" opacity="0.15" />
        <rect x="80" y="60" width="55" height="75" rx="3" fill="currentColor" opacity="0.06" stroke="currentColor" strokeWidth="1" />
        <rect x="85" y="66" width="45" height="3" rx="1" fill="currentColor" opacity="0.15" />
        <rect x="85" y="73" width="45" height="3" rx="1" fill="currentColor" opacity="0.15" />
        <rect x="85" y="80" width="45" height="3" rx="1" fill="currentColor" opacity="0.15" />
        <rect x="85" y="87" width="45" height="3" rx="1" fill="currentColor" opacity="0.15" />
        <path d="M92 70 L100 78 L110 66" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </svg>

      {/* Group of voters — bottom right */}
      <svg className="absolute bottom-[5%] right-[5%] opacity-[0.02] w-44 h-28 text-fg" viewBox="0 0 200 120" fill="none">
        <circle cx="35" cy="30" r="10" fill="currentColor" opacity="0.08" />
        <path d="M12 63 Q35 40 58 63" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.06" />
        <circle cx="100" cy="28" r="10" fill="currentColor" opacity="0.08" />
        <path d="M77 61 Q100 38 123 61" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.06" />
        <circle cx="165" cy="32" r="10" fill="currentColor" opacity="0.08" />
        <path d="M142 65 Q165 42 188 65" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.06" />
        <rect x="65" y="72" width="70" height="34" rx="4" fill="currentColor" opacity="0.04" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Election rosette badge — top center right */}
      <svg className="absolute top-[10%] right-[8%] opacity-[0.03] w-20 h-20 text-fg" viewBox="0 0 100 100" fill="none">
        <path d="M10 30 L25 30 L25 80 L17.5 70 L10 80 Z" fill="currentColor" opacity="0.06" />
        <path d="M75 30 L90 30 L90 80 L82.5 70 L75 80 Z" fill="currentColor" opacity="0.06" />
        <circle cx="50" cy="40" r="26" fill="currentColor" opacity="0.04" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="40" r="19" stroke="currentColor" strokeWidth="1" opacity="0.1" />
        <polygon points="50,24 54,34 65,34 57,40 60,51 50,44 40,51 43,40 35,34 46,34" fill="currentColor" opacity="0.15" />
      </svg>

      {/* Decorative rings */}
      <div className="absolute top-[20%] right-[20%] w-32 h-32 rounded-full border border-fg/5 opacity-[0.08]" />
      <div className="absolute top-[20%] right-[20%] w-48 h-48 rounded-full border border-fg/5 opacity-[0.05]" />
      <div className="absolute bottom-[30%] left-[15%] w-40 h-40 rounded-full border border-fg/5 opacity-[0.06]" />
      <div className="absolute bottom-[30%] left-[15%] w-56 h-56 rounded-full border border-fg/5 opacity-[0.04]" />

      {/* Small dots pattern */}
      <div className="absolute inset-0 opacity-[0.03] text-fg" style={{
        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      {/* Subtle radial glow center */}
      <div className="absolute inset-0 opacity-[0.12]" style={{
        background: "radial-gradient(ellipse at 50% 45%, rgba(255,120,0,0.25) 0%, transparent 65%)"
      }} />
    </div>
  );
}
