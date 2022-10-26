import Image from "next/image"

type Image_Props = {
  src: string,
  height: number,
  width: number,
  alt?: string,
  className?: string,
}

export const ImagePost = ({ src, height, width, alt, className }: Image_Props) => {

  return (
    <Image
      src={src}
      height={height}
      width={width}
      alt={alt}
      className={className}
    />
  )
}