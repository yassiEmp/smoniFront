import { type ImgHTMLAttributes } from "react";

type Props = {
  picture: Picture;
  alt: string;
  sizes?: string;
  // When provided, used as the <img src> fallback instead of picture.img.src.
  // Useful when vite-imagetools `?as=picture` defaults the fallback to the
  // largest raster (e.g. a 480w PNG) but we'd rather ship a smaller variant
  // to the tiny minority of browsers without AVIF/WebP support.
  fallbackSrc?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet">;

export const ResponsivePicture = ({ picture, alt, sizes, className, fallbackSrc, ...rest }: Props) => {
  return (
    <picture>
      {Object.entries(picture.sources).map(([type, srcset]) => (
        <source key={type} type={type} srcSet={srcset} sizes={sizes} />
      ))}
      <img
        src={fallbackSrc ?? picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        className={className}
        {...rest}
      />
    </picture>
  );
};
