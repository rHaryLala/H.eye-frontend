import { cn } from "../lib/utils"

export const Logo = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
  return (
    <svg
      viewBox="0 0 78 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-foreground h-5 w-auto", className)}
    >
      {/* Camera body */}
      <path
        d="M3 7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V11C13 12.6569 11.6569 14 10 14H6C4.34315 14 3 12.6569 3 11V7Z"
        fill={uniColor ? "currentColor" : "url(#logo-gradient)"}
      />
      {/* Camera lens */}
      <path
        d="M8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5Z"
        fill={uniColor ? "currentColor" : "white"}
      />
      {/* Camera extension */}
      <path
        d="M13 8L18 5V13L13 10"
        stroke={uniColor ? "currentColor" : "url(#logo-gradient)"}
        strokeWidth="1.5"
        fill="none"
      />

      {/* H.eye text */}
      <text x="24" y="13" fill="currentColor" fontFamily="Arial" fontWeight="bold" fontSize="12">
        H
      </text>
      <text x="34" y="13" fill="currentColor" fontFamily="Arial" fontWeight="bold" fontSize="12">
        .
      </text>
      <circle cx="43" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="43" cy="9" r="1.5" fill="currentColor" />
      <text x="48" y="13" fill="currentColor" fontFamily="Arial" fontWeight="bold" fontSize="12">
        ye
      </text>

      <defs>
        <linearGradient id="logo-gradient" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const LogoIcon = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-5", className)}
    >
      {/* Camera body */}
      <path
        d="M3 7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V11C13 12.6569 11.6569 14 10 14H6C4.34315 14 3 12.6569 3 11V7Z"
        fill={uniColor ? "currentColor" : "url(#logo-gradient)"}
      />
      {/* Camera lens */}
      <path
        d="M8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5Z"
        fill={uniColor ? "currentColor" : "white"}
      />
      {/* Camera extension */}
      <path
        d="M13 8L18 5V13L13 10"
        stroke={uniColor ? "currentColor" : "url(#logo-gradient)"}
        strokeWidth="1.5"
        fill="none"
      />
      <defs>
        <linearGradient id="logo-gradient" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const LogoStroke = ({ className }: { className?: string }) => {
  return (
    <svg className={cn("size-7 w-7", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Camera body outline */}
      <path
        d="M2 7C2 4.79086 3.79086 3 6 3H14C16.2091 3 18 4.79086 18 7V17C18 19.2091 16.2091 21 14 21H6C3.79086 21 2 19.2091 2 17V7Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      {/* Camera lens */}
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Camera extension */}
      <path d="M18 10L22 7V17L18 14" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Detection line */}
      <path d="M10 15C10 15 14 14 14 10" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  )
}
