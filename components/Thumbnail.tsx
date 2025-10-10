import Image from "next/image";

type ThumbnailProps = {
  url: string;
  width?: number;
  height?: number;
  className?: string;
  alt: string;
};

export default function Thumbnail({
  url,
  width = 240,
  height = 120,
  className = "rounded-md",
  alt,
}: ThumbnailProps) {
  return (
    <Image
      src={url}
      width={width}
      height={height}
      className={className + "rounded-md"}
      alt={alt}
    />
  );
}
