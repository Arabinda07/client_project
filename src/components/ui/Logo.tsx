import React from 'react';
import { cn } from '../../lib/utils';

interface LogoProps {
  variant?: 'wordmark' | 'monogram' | 'full';
  className?: string;
  color?: string; // Tailwind color class or hex (default: terracotta)
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'wordmark', 
  className,
  color = 'text-terracotta'
}) => {
  const isDark = color.includes('warm-ivory') || color.includes('white');

  // Butterfly SVG paths
  const Butterfly: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} className="transition-transform duration-700 hover:scale-105 origin-center">
      {/* Right Wing */}
      <path 
        d="M 2,-1 C 6,-6 10,-3 8,2 C 7,5 3,3 2,1" 
        fill={isDark ? '#FDFBF5' : '#B35C38'} 
        stroke={isDark ? '#1D1815' : '#4E2113'} 
        strokeWidth="0.6" 
      />
      <path 
        d="M 2,1 C 5,5 7,4 6,1 C 5,-1 3,0 2,1" 
        fill={isDark ? '#FDFBF5' : '#B35C38'} 
        stroke={isDark ? '#1D1815' : '#4E2113'} 
        strokeWidth="0.4" 
      />
      {/* Left Wing */}
      <path 
        d="M 0,-1 C -4,-6 -8,-3 -6,2 C -5,5 -1,3 0,1" 
        fill={isDark ? '#FDFBF5' : '#B35C38'} 
        stroke={isDark ? '#1D1815' : '#4E2113'} 
        strokeWidth="0.6" 
      />
      <path 
        d="M 0,1 C -3,5 -5,4 -4,1 C -3,-1 -1,0 0,1" 
        fill={isDark ? '#FDFBF5' : '#B35C38'} 
        stroke={isDark ? '#1D1815' : '#4E2113'} 
        strokeWidth="0.4" 
      />
      {/* Body & Antennae */}
      <path d="M 1,-3 L 1,4" stroke={isDark ? '#FDFBF5' : '#4E2113'} strokeWidth="1" strokeLinecap="round" />
      <path d="M 0.5,-3 Q -0.5,-6 -1,-5" stroke={isDark ? '#FDFBF5' : '#4E2113'} strokeWidth="0.4" fill="none" />
      <path d="M 1.5,-3 Q 2.5,-6 3,-5" stroke={isDark ? '#FDFBF5' : '#4E2113'} strokeWidth="0.4" fill="none" />
    </g>
  );

  // Jhumka (Earring) SVG paths
  const Jhumka: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Hanging Wire */}
      <line x1="0" y1="-8" x2="0" y2="2" stroke={isDark ? '#FDFBF5' : '#B35C38'} strokeWidth="1.2" />
      {/* Small Loop/Cap */}
      <circle cx="0" cy="3" r="1.5" fill="none" stroke={isDark ? '#FDFBF5' : '#B35C38'} strokeWidth="1" />
      
      {/* Dome / Bell Shape */}
      <path 
        d="M -6,11 C -6,5 6,5 6,11 L 7,14 C 7,15 -7,15 -7,14 Z" 
        fill={isDark ? '#FDFBF5' : '#B35C38'} 
        stroke={isDark ? '#1D1815' : '#4E2113'} 
        strokeWidth="0.75" 
      />
      
      {/* Hanging beads from dome */}
      <g transform="translate(0, 14)">
        <circle cx="-5" cy="2" r="0.8" fill={isDark ? '#FDFBF5' : '#B35C38'} />
        <circle cx="-2.5" cy="3" r="0.8" fill={isDark ? '#FDFBF5' : '#B35C38'} />
        <circle cx="0" cy="3.5" r="1" fill={isDark ? '#FDFBF5' : '#B35C38'} />
        <circle cx="2.5" cy="3" r="0.8" fill={isDark ? '#FDFBF5' : '#B35C38'} />
        <circle cx="5" cy="2" r="0.8" fill={isDark ? '#FDFBF5' : '#B35C38'} />
        
        {/* Central dangling bead */}
        <line x1="0" y1="3.5" x2="0" y2="7" stroke={isDark ? '#FDFBF5' : '#B35C38'} strokeWidth="0.8" />
        <circle cx="0" cy="8" r="1.2" fill={isDark ? '#FDFBF5' : '#B35C38'} />
      </g>
    </g>
  );

  if (variant === 'monogram') {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={cn("w-16 h-16 shrink-0 select-none", className)}
        aria-label="goonjaa Monogram"
      >
        {/* Soft background stamp circle */}
        <circle cx="50" cy="50" r="46" fill="#F7F0E7" stroke="rgba(179, 92, 56, 0.15)" strokeWidth="1" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(179, 92, 56, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Lowercase "g" in Serif */}
        <text 
          x="37" 
          y="62" 
          fontFamily="Boska, Georgia, serif" 
          fontSize="48" 
          fontWeight="500" 
          fill="#B35C38"
          className="select-none"
        >
          g
        </text>
      </svg>
    );
  }

  if (variant === 'full') {
    return (
      <div className={cn("flex flex-col items-center select-none", className)}>
        <svg 
          viewBox="0 0 200 68" 
          className="w-56 h-auto"
          aria-label="goonjaa Full Logo"
        >
          {/* Lowercase "goonjaa" in single Boska font block */}
          <text 
            x="30" 
            y="45" 
            fontFamily="Boska, Georgia, serif" 
            fontSize="42" 
            fontWeight="500" 
            fill={isDark ? '#FDFBF5' : '#B35C38'} 
            letterSpacing="0.01em"
          >
            goonjaa
          </text>

          {/* Butterfly above the 'j' (x=109, y=9) */}
          <Butterfly x={109} y={9} scale={0.9} />

          {/* Hanging Earring from 'a' (x=169, y=44) */}
          <Jhumka x={169} y={44} scale={0.95} />
        </svg>
      </div>
    );
  }

  // Default: Wordmark (simplified for navigation header)
  return (
    <svg 
      viewBox="0 0 200 68" 
      className={cn("w-56 h-auto shrink-0 select-none", className)}
      aria-label="goonjaa Wordmark"
    >
      {/* Lowercase "goonjaa" in single Boska font block */}
      <text 
        x="30" 
        y="45" 
        fontFamily="Boska, Georgia, serif" 
        fontSize="42" 
        fontWeight="500" 
        fill={isDark ? '#FDFBF5' : '#B35C38'} 
        letterSpacing="0.01em"
      >
        goonjaa
      </text>

      {/* Butterfly above the 'j' (x=109, y=9) */}
      <Butterfly x={109} y={9} scale={0.9} />

      {/* Hanging Earring from 'a' (x=169, y=44) */}
      <Jhumka x={169} y={44} scale={0.95} />
    </svg>
  );
};
