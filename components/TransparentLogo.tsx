'use client';
import React, { useEffect, useState } from 'react';

interface TransparentLogoProps {
  className?: string;
}

export default function TransparentLogo({ className = '' }: TransparentLogoProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = '/images/logo.jpg';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        // Calculate luminance
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        
        // Enhance contrast for the alpha mask
        // Background is dark blue (low brightness), text/logo is white (high brightness)
        let alpha = (brightness - 40) * 2.5; 
        
        if (alpha < 0) alpha = 0;
        if (alpha > 255) alpha = 255;
        
        // Make all visible pixels pure white
        data[i] = 255;     // R
        data[i+1] = 255;   // G
        data[i+2] = 255;   // B
        data[i+3] = alpha; // A
      }
      
      ctx.putImageData(imageData, 0, 0);
      setDataUrl(canvas.toDataURL('image/png'));
    };
  }, []);

  if (!dataUrl) {
    return <div className={`opacity-0 ${className}`} />;
  }

  return (
    <img src={dataUrl} alt="Elvina Infra Logo" className={className} />
  );
}
