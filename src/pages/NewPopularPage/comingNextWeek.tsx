import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ImgHorizontalPoster from "./imgHorizontalPoster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPlus,
  faThumbsUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

interface NextW {
  id: number;
  backdrop_path: string;
  adult: boolean;
  media_type: string;
  original_language: string;
  genre_ids: number[];
}

interface mGenres {
  id: number;
  name: string;
}

interface ComingNextWeekProps {
  comingNextWeek: NextW[];
  movieGenres: mGenres[];
  hovered: number | null;
  modalPosition: { top: number; left: number } | null;
  handleMouseEnter: (
    e: React.MouseEvent<HTMLImageElement>,
    movieId: number
  ) => void;
  handleMouseLeave: () => void;
  setIsHoveringModal: React.Dispatch<React.SetStateAction<boolean>>;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

const slideCnt = 1;

const ComingNextWeek: React.FC<ComingNextWeekProps> = ({
  comingNextWeek,
  movieGenres,
  hovered,
  modalPosition,
  handleMouseEnter,
  handleMouseLeave,
  setIsHoveringModal,
  setHovered,
}) => {
  return (
    <div className="coming_n_w bg-black p-4 overflow-x-hidden">
      <Swiper
        spaceBetween={3}
        slidesPerView={1} // 기본 슬라이드 개수
        breakpoints={{
          // 창 넓이에 따라 슬라이드 개수 조정
          240: { slidesPerView: slideCnt + 0 },
          320: { slidesPerView: slideCnt + 1 },
          480: { slidesPerView: slideCnt + 1 },
          600: { slidesPerView: slideCnt + 1 },
          640: { slidesPerView: slideCnt + 1 },
          768: { slidesPerView: slideCnt + 2 },
          800: { slidesPerView: slideCnt + 2 },
          864: { slidesPerView: slideCnt + 2 },
          1024: { slidesPerView: slideCnt + 3 },
          1050: { slidesPerView: slideCnt + 3 },
          1152: { slidesPerView: slideCnt + 3 },
          1200: { slidesPerView: slideCnt + 4 },
          1280: { slidesPerView: slideCnt + 4 },
          1400: { slidesPerView: slideCnt + 5 },
          1536: { slidesPerView: slideCnt + 5 },
          1600: { slidesPerView: slideCnt + 5 },
          1720: { slidesPerView: slideCnt + 6 },
          1800: { slidesPerView: slideCnt + 6 },
          1910: { slidesPerView: slideCnt + 6 },
          2048: { slidesPerView: slideCnt + 7 },
          2400: { slidesPerView: slideCnt + 7 },
          3200: { slidesPerView: slideCnt + 7 },
        }}
        navigation
        pagination={{ clickable: true }}
        className="max-w-full"
      >
        {comingNextWeek.map((nextW) => {
          //   console.log(nextW.backdrop_path);
          return (
            <SwiperSlide key={nextW.id}>
              <div>
                <ImgHorizontalPoster
                  src={`https://image.tmdb.org/t/p/w300${nextW.backdrop_path}`}
                  alt={`Movie poster ${nextW.id}`}
                  onMouseEnter={(e) => handleMouseEnter(e, nextW.id)}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Detail Modal */}
      {hovered !== null &&
        modalPosition &&
        (() => {
          const hoveredItem = comingNextWeek.find(
            (item) => item.id === hovered
          );

          // 유효성 검사: hoveredItem, backdrop_path 확인
          if (!hoveredItem || !hoveredItem.backdrop_path) {
            return null; // 모달을 렌더링하지 않음
          }

          return (
            <div
              className="absolute z-50"
              style={{
                top: modalPosition.top - 20,
                left: modalPosition.left - 20,
                width: "18rem",
              }}
              onMouseEnter={() => setIsHoveringModal(true)}
              onMouseLeave={() => {
                setIsHoveringModal(false);
                setHovered(null);
              }}
            >
              <div className="bg-black text-white rounded-lg shadow-xl">
                <div className="mb-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${hoveredItem.backdrop_path}`}
                    alt="Modal"
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>

                <div className="pt-1 pb-3 px-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => console.log("Play 버튼이 눌렸습니다.")}
                        className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                      >
                        <FontAwesomeIcon icon={faPlay} className="text-white" />
                      </button>
                      <button
                        onClick={() => console.log("Add 버튼이 눌렸습니다.")}
                        className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-white" />
                      </button>
                      <button
                        onClick={() => console.log("Like 버튼이 눌렸습니다.")}
                        className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                      >
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          className="text-white"
                        />
                      </button>
                    </div>
                    <button
                      onClick={() => console.log("Details 버튼이 눌렸습니다.")}
                      className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                    >
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-white"
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                    <span className="border border-gray-500 px-2 py-1 rounded">
                      {hoveredItem.adult ? "19+" : "15+"}
                    </span>
                    <span className="border border-gray-500 px-2 py-1 rounded">
                      {hoveredItem.media_type?.toUpperCase() || "MOVIE"}
                    </span>
                    <span className="border border-gray-500 px-2 py-1 rounded">
                      {hoveredItem.original_language?.toUpperCase() || "EN"}
                    </span>
                  </div>

                  <div className="text-sm text-gray-300 mt-2 break-words whitespace-normal text-left">
                    {hoveredItem.genre_ids
                      .map(
                        (genreId) =>
                          movieGenres.find((genre) => genre.id === genreId)
                            ?.name
                      )
                      .filter((name) => name)
                      .join(" · ") || "No Categories"}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

      {/* Detail Modal */}
      {/* {hovered !== null && modalPosition && (
        <div
          className="absolute z-50"
          style={{
            top: modalPosition.top - 20,
            left: modalPosition.left - 20,
            width: "18rem",
          }}
          onMouseEnter={() => setIsHoveringModal(true)}
          onMouseLeave={() => {
            setIsHoveringModal(false);
            setHovered(null);
          }}
        >
          <div className="bg-black text-white rounded-lg shadow-xl">
            <div className="mb-4">
              <img
                src={`https://image.tmdb.org/t/p/w300${
                  comingNextWeek.find((item) => item.id === hovered)
                    ?.backdrop_path
                }`}
                alt="Modal"
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>

            <div className="pt-1 pb-3 px-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => console.log("Play 버튼이 눌렸습니다.")}
                    className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                  >
                    <FontAwesomeIcon icon={faPlay} className="text-white" />
                  </button>
                  <button
                    onClick={() => console.log("Add 버튼이 눌렸습니다.")}
                    className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                  >
                    <FontAwesomeIcon icon={faPlus} className="text-white" />
                  </button>
                  <button
                    onClick={() => console.log("Like 버튼이 눌렸습니다.")}
                    className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                  >
                    <FontAwesomeIcon icon={faThumbsUp} className="text-white" />
                  </button>
                </div>
                <button
                  onClick={() => console.log("Details 버튼이 눌렸습니다.")}
                  className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-white"
                  />
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                <span className="border border-gray-500 px-2 py-1 rounded">
                  {comingNextWeek.find((item) => item.id === hovered)?.adult
                    ? "19+"
                    : "15+"}
                </span>
                <span className="border border-gray-500 px-2 py-1 rounded">
                  {comingNextWeek
                    .find((item) => item.id === hovered)
                    ?.media_type?.toUpperCase() || "MOVIE"}
                </span>
                <span className="border border-gray-500 px-2 py-1 rounded">
                  {comingNextWeek
                    .find((item) => item.id === hovered)
                    ?.original_language?.toUpperCase() || "EN"}
                </span>
              </div>

              <div className="text-sm text-gray-300 mt-2 break-words whitespace-normal text-left">
                {(() => {
                  const genreNames = comingNextWeek
                    .find((item) => item.id === hovered)
                    ?.genre_ids.map(
                      (genreId) =>
                        movieGenres.find((genre) => genre.id === genreId)?.name
                    )
                    .filter((name) => name); 

                  if (genreNames && genreNames.length > 0) {
                    return genreNames.join(" · "); 
                  } else {
                    return "Movie";
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ComingNextWeek;
