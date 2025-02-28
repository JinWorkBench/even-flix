import React, { useRef, useState } from "react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import "../styles/swiper.css";
import DetailCard from "./DetailCard";
import { Media } from "../models/Media";

interface HoverPosition {
  top: number;
  left: number;
}

interface CardListProps {
  title: string;
  mediaList: Media[];
}

const CardList: React.FC<CardListProps> = ({ title, mediaList }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const pagination = {
    el: paginationRef.current,
    renderBullet: function (index: number, className: string) {
      return `
      <span class="${className}"></span>
    `;
    },
  };

  // 디테일 카드 호버 부분
  const [hoveredItem, setHoveredItem] = useState<{
    media: Media;
    index: number;
  } | null>(null);
  const [hoverPosition, setHoverPosition] = useState<HoverPosition | null>(
    null
  );

  const handleCardMouseEnter = (media: Media, index: number, rect: DOMRect) => {
    setHoveredItem({ media, index });
    setHoverPosition({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width / 2,
    });
  };

  const handleDetailMouseEnter = () => {
    // 디테일 카드로 마우스 이동시 아무 효과 없음
  };

  const handleDetailMouseLeave = () => {
    setHoveredItem(null);
    setHoverPosition(null);
  };

  const getSlidesPerView = (): number => {
    const width = window.innerWidth;
    if (width >= 1378) return 6;
    if (width >= 998) return 5;
    if (width >= 625) return 4;
    return 3;
  };

  return (
    <section className="cardList my-6 mx-12 overflow-visible">
      {/* 타이틀, 페이지네이션*/}
      <div className="title-and-pagination relative flex flex-row justify-between mb-1">
        <h2 className="text-l font-bold left-2">{title}</h2>
        <div className="swiper-pagination" ref={paginationRef}></div>
      </div>
      {/* 스와이퍼 */}
      <div className="swiper-and-buttons relative overflow-visible w-full z-5">
        <Swiper
          // allowTouchMove={true}
          loop={true}
          loopAddBlankSlides={false}
          spaceBetween={5}
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper: SwiperType) => {
            const navigation = swiper.params.navigation;

            if (navigation && navigation !== true) {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
            if (paginationRef.current) {
              paginationRef.current.style.display = "flex";
            }
            const pagination = swiper.params.pagination;
            if (pagination && pagination !== true) {
              pagination.el = paginationRef.current;
            }
          }}
          pagination={pagination}
          breakpoints={{
            1378: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
        >
          {mediaList.map((media, index) => (
            <SwiperSlide
              key={`${media.id}-${index}`}
              style={{ position: "relative" }}
              onMouseEnter={(event) => {
                const rect = (
                  event.currentTarget as HTMLElement
                ).getBoundingClientRect();
                handleCardMouseEnter(media, index, rect);
              }}
              onMouseLeave={() => {
                if (!hoveredItem) {
                  setHoveredItem(null);
                }
              }}
            >
              <Card media={media} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* 디테일 카드 호버 */}
        {hoveredItem && hoverPosition && (
          <DetailCard
            media={hoveredItem.media}
            style={{
              position: "absolute",
              top: "cal(hoverPosition.top - scrollY)",
              left: hoverPosition.left,
              transform: (() => {
                const hoveredElement = document.querySelector(
                  `.swiper-slide[data-swiper-slide-index="${hoveredItem.index}"]`
                );

                const activeIndex = parseInt(
                  document
                    .querySelector(".swiper-slide-active")
                    ?.getAttribute("data-swiper-slide-index") || "0",
                  10
                );
                const slidesPerView = getSlidesPerView();

                const targetIndex = activeIndex + (slidesPerView - 1);
                if (hoveredElement) {
                  const isActive = hoveredElement.classList.contains(
                    "swiper-slide-active"
                  );
                  const isTarget =
                    parseInt(
                      hoveredElement.getAttribute("data-swiper-slide-index") ||
                        "-1",
                      10
                    ) === targetIndex;

                  if (isActive) {
                    return "translate(-52%, -60%)";
                  } else if (isTarget) {
                    return "translate(-78%, -60%)";
                  }
                }

                return "translate(-75%, -60%)";
              })(),
              zIndex: 10,
            }}
            isActive={true}
            onMouseEnter={handleDetailMouseEnter}
            onMouseLeave={handleDetailMouseLeave}
          />
        )}
        {/* 양쪽 버튼 */}
        <button
          ref={prevRef}
          className="absolute top-1/2 -left-12 transform -translate-y-1/2 h-full p-2 px-[0.9rem] rounded-s-s bg-black opacity-0 text-white hover:opacity-70  hover:text-4xl focus:outline-none z-20"
        >
          <i className="fas fa-chevron-left text-2xl hover:opacity-100"></i>
        </button>
        <button
          ref={nextRef}
          className="absolute top-1/2 -right-12 transform -translate-y-1/2 h-full p-2 px-[0.9rem] rounded-s-s bg-black opacity-0 text-white hover:opacity-70 hover:text-4xl  focus:outline-none z-20"
        >
          <i className="fas fa-chevron-right text-2xl hover:opacity-100"></i>
        </button>
      </div>
    </section>
  );
};

export default CardList;
