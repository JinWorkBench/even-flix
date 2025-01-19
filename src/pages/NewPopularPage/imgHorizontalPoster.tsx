import React from "react";

// Props 인터페이스 정의
interface ImgHorizontalPosterProps {
  src: string; // 이미지 URL
  alt: string; // 대체 텍스트
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
}

const ImgHorizontalPoster: React.FC<ImgHorizontalPosterProps> = ({
  src,
  alt,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      // className="w-full h-auto rounded-sm shadow-lg"
      className="w-full h-auto rounded-sm shadow-lg" // 고정 크기 설정
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default ImgHorizontalPoster;
