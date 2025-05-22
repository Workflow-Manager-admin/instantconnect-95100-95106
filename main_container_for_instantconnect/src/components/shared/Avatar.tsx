"use client";

import Image from "next/image";

// PUBLIC_INTERFACE
interface AvatarProps {
  /**
   * URL of the image to display
   */
  src?: string;
  
  /**
   * Alternative text for accessibility
   */
  alt: string;
  
  /**
   * Size of the avatar in pixels
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Text to display when no image is provided (usually initials)
   */
  fallback?: string;
  
  /**
   * Status to display (optional)
   */
  status?: 'online' | 'offline' | 'away' | 'busy';
}

// Size mapping for different avatar sizes
const sizeMap = {
  sm: {
    container: "w-8 h-8",
    text: "text-xs",
  },
  md: {
    container: "w-10 h-10",
    text: "text-sm",
  },
  lg: {
    container: "w-12 h-12",
    text: "text-base",
  },
};

// Status color mapping
const statusColorMap = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500",
  busy: "bg-red-500",
};

// PUBLIC_INTERFACE
/**
 * Avatar component for displaying user profile images
 */
export default function Avatar({ src, alt, size = 'md', fallback, status }: AvatarProps) {
  const { container, text } = sizeMap[size];
  
  return (
    <div className="relative">
      <div className={`${container} rounded-full overflow-hidden flex items-center justify-center bg-black/20 dark:bg-white/20`}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={size === 'lg' ? 48 : size === 'md' ? 40 : 32}
            height={size === 'lg' ? 48 : size === 'md' ? 40 : 32}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className={`font-medium ${text} text-foreground`}>
            {fallback || alt.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      
      {status && (
        <div 
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${statusColorMap[status]}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}
