import React, { useState, ImgHTMLAttributes } from 'react';

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  src?: string;
  alt?: string;
  className?: string;
}

export default function SafeImage({ 
  src, 
  alt, 
  fallback = 'https://picsum.photos/seed/placeholder/800/600', 
  className,
  ...props 
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallback);
      setHasError(true);
    }
  };

  // Update imgSrc if src prop changes
  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  if (!src) return null;

  const isExternal = src.startsWith('http');

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      referrerPolicy={isExternal ? "no-referrer" : undefined}
    />
  );
}
