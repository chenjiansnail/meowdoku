interface Props {
  className?: string
}

// A friendly cat mark drawn from scratch. It stays readable in small cells,
// while the tail, highlights, blush, and whiskers keep it lively.
export function CatIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M48 41c7 1 10 6 8 10-2 5-10 5-15 1"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15 21 9 7l14 9M49 21 55 7 41 16"
        fill="currentColor"
        stroke="#1f1410"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 18.5 13.7 11.8 20.4 16.1M47.5 18.5l2.8-6.7-6.7 4.3"
        fill="#f6a7ba"
      />
      <ellipse
        cx="32"
        cy="36"
        rx="23"
        ry="20.5"
        fill="currentColor"
        stroke="#1f1410"
        strokeWidth="1.1"
      />
      <path
        d="M18 27c3-4 8-6 14-6 9 0 16 5 19 13-4-5-10-8-19-8-6 0-10 1-14 1Z"
        fill="rgba(255,255,255,0.13)"
      />
      <g fill="#fff">
        <ellipse cx="24" cy="34.5" rx="4.3" ry="4.8" />
        <ellipse cx="40" cy="34.5" rx="4.3" ry="4.8" />
      </g>
      <g fill="#1f1410">
        <ellipse cx="25.2" cy="35.2" rx="1.8" ry="2.2" />
        <ellipse cx="41.2" cy="35.2" rx="1.8" ry="2.2" />
      </g>
      <g fill="#fff">
        <circle cx="24.5" cy="33.4" r="1" />
        <circle cx="40.5" cy="33.4" r="1" />
      </g>
      <g fill="#f6a7ba" opacity="0.85">
        <ellipse cx="19.5" cy="40.5" rx="3.3" ry="2" />
        <ellipse cx="44.5" cy="40.5" rx="3.3" ry="2" />
      </g>
      <path
        d="M28 44.5 Q32 48 36 44.5"
        stroke="#1f1410"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 42.5 32 44 34 42.5"
        stroke="#1f1410"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <g stroke="#1f1410" strokeWidth="1.4" strokeLinecap="round" opacity="0.86">
        <path d="M18 38.5h-8M18.5 42l-7 2M46 38.5h8M45.5 42l7 2" />
      </g>
    </svg>
  )
}

export function HeartIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M12 21s-7.5-4.7-9.5-9.1C1 8.4 3 4 7 4c2 0 3.7 1.1 5 3 1.3-1.9 3-3 5-3 4 0 6 4.4 4.5 7.9C19.5 16.3 12 21 12 21z" />
    </svg>
  )
}

export function XMarkIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  )
}
