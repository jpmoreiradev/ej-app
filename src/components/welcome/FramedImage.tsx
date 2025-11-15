import React from 'react';
import Image from 'next/image';
import styles from './FramedImage.module.css';

interface FramedImageProps {
  src: string;
  alt: string;
}

const FramedImage: React.FC<FramedImageProps> = ({ src, alt }) => {
  return (
    <div className={styles.container}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {/* Moldura externa */}
        <rect x="0" y="0" width="800" height="500" rx="18" fill="#1a1a1a" />

        {/* Borda interna */}
        <rect x="20" y="20" width="760" height="460" rx="10" fill="#000" />

        {/* Clip path para a imagem */}
        <defs>
          <clipPath id="frameClip">
            <rect x="20" y="20" width="760" height="460" rx="10" />
          </clipPath>
        </defs>

        {/* Área para a imagem */}
        <foreignObject
          x="20"
          y="20"
          width="760"
          height="460"
          clipPath="url(#frameClip)"
        >
          <div className={styles.imageWrapper}>
            <Image
              src={src}
              alt={alt}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default FramedImage;
