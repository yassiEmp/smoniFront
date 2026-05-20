import { type ImgHTMLAttributes } from "react";

type Props = {
  picture: Picture;
  alt: string;
  sizes?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet">;

export const ResponsivePicture = ({ picture, alt, sizes, className, ...rest }: Props) => {
  return (
    <picture>
      {Object.entries(picture.sources).map(([type, srcset]) => (
        <source key={type} type={type} srcSet={srcset} sizes={sizes} />
      ))}
      <img
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        className={className}
        {...rest}
      />
    </picture>
  );
};
