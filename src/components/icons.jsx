export const ArrowUpRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const Menu = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Sparkle = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
  </svg>
);

export const Telegram = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16-1.97 9.28c-.15.67-.55.83-1.12.51l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.22-.05-.34-.37-.13l-6.87 4.33-2.96-.92c-.64-.2-.65-.64.13-.95l11.57-4.46c.53-.19 1 .13.89.93z" />
  </svg>
);

export const Instagram = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
  </svg>
);

export const ServiceIcon = ({ name, className = "w-6 h-6" }) => {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "landing":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M7 13h6M7 16h4" />
        </svg>
      );
    case "business":
      return (
        <svg {...common}>
          <path d="M3 21h18M5 21V8l7-5 7 5v13" />
          <path d="M9 21v-5h6v5M9 11h.01M15 11h.01" />
        </svg>
      );
    case "shop":
      return (
        <svg {...common}>
          <path d="M4 7h16l-1.2 12.2A2 2 0 0 1 16.8 21H7.2a2 2 0 0 1-2-1.8L4 7z" />
          <path d="M8 7a4 4 0 0 1 8 0" />
        </svg>
      );
    case "premium":
      return (
        <svg {...common}>
          <path d="M12 2l2.6 6.3L21 9l-5 4.4L17.2 20 12 16.7 6.8 20 8 13.4 3 9l6.4-.7L12 2z" />
        </svg>
      );
    case "redesign":
      return (
        <svg {...common}>
          <path d="M21 12a9 9 0 1 1-3-6.7" />
          <path d="M21 3v5h-5" />
        </svg>
      );
    case "custom":
      return (
        <svg {...common}>
          <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
        </svg>
      );
    default:
      return null;
  }
};

export const TechIcon = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case "HTML5":
      return (
        <svg className={className} viewBox="0 0 48 48">
          <path d="M8 4l2.9 33.2L24 42l13.1-4.8L40 4H8z" fill="#e34f26" />
          <path d="M24 39.2V7.3H35.4l-2.4 27.7L24 39.2z" fill="#ef6a3c" />
          <text x="24" y="30" textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" fontFamily="Sora, sans-serif">5</text>
        </svg>
      );
    case "CSS3":
      return (
        <svg className={className} viewBox="0 0 48 48">
          <path d="M8 4l2.9 33.2L24 42l13.1-4.8L40 4H8z" fill="#264de4" />
          <path d="M24 39.2V7.3h11.4l-2.4 27.7L24 39.2z" fill="#2965f1" />
          <text x="24" y="30" textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" fontFamily="Sora, sans-serif">3</text>
        </svg>
      );
    case "JavaScript":
      return (
        <svg className={className} viewBox="0 0 48 48">
          <rect width="36" height="36" x="6" y="6" rx="5" fill="#f7df1e" />
          <text x="24" y="31" textAnchor="middle" fontSize="15" fontWeight="800" fill="#09090b" fontFamily="Sora, sans-serif">JS</text>
        </svg>
      );
    case "React":
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" stroke="#61dafb" strokeWidth="2.4">
          <circle cx="24" cy="24" r="4.2" fill="#61dafb" stroke="none" />
          <ellipse cx="24" cy="24" rx="19" ry="7.6" />
          <ellipse cx="24" cy="24" rx="19" ry="7.6" transform="rotate(60 24 24)" />
          <ellipse cx="24" cy="24" rx="19" ry="7.6" transform="rotate(120 24 24)" />
        </svg>
      );
    case "REST APIs":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#ff003c" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 7H7a5 5 0 0 0 0 10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" />
        </svg>
      );
    case "Git & GitHub":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#fff">
          <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.57 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.23-3.17-.12-.3-.53-1.5.12-3.13 0 0 1-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.28-1.53 3.29-1.21 3.29-1.21.65 1.63.24 2.83.12 3.13.77.83 1.23 1.88 1.23 3.17 0 4.53-2.8 5.53-5.48 5.82.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .32.21.69.83.57A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
        </svg>
      );
    case "Responsive Design":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#ff5c8a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="13" height="10" rx="1.5" />
          <rect x="16" y="9" width="5" height="11" rx="1.5" />
          <path d="M6 18h7" />
        </svg>
      );
    case "Deployment":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#ff003c" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c3 1.5 5 5 5 9l-2 3H9l-2-3c0-4 2-7.5 5-9z" />
          <circle cx="12" cy="10" r="1.6" />
          <path d="M9 15l-2 4 4-1M15 15l2 4-4-1" />
        </svg>
      );
    default:
      return null;
  }
};
