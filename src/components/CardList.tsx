import React, { useRef } from "react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import "../styles/swiper.css";

interface CardProps {
	id: number;
	backdrop_path: string;
}

interface CardListProps {
	title: string;
	cardProps: CardProps[];
}

const CardList: React.FC<CardListProps> = ({ title, cardProps }) => {
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

  return (
    <section className="cardList my-6 mx-12 overflow-visible">
      <div className="title-and-pagination relative flex flex-row justify-between mb-1">
        <h2 className="text-l font-bold left-2">{title}</h2>
        <div className="swiper-pagination" ref={paginationRef}></div>
      </div>

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
          {cardProps.map((item) => (
            <SwiperSlide >
              <Card id={item.id} backdropPath={item.backdrop_path} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <button
            ref={prevRef}
            className="absolute top-1/2 -left-12 transform -translate-y-1/2 h-full p-2 px-[0.9rem] rounded-s-s bg-black opacity-0 text-white hover:opacity-70  hover:text-4xl focus:outline-none z-50"
          >
            <i className="fas fa-chevron-left text-2xl hover:opacity-100"></i>
          </button>
        </div>
        <button
          ref={nextRef}
          className="absolute top-1/2 -right-12 transform -translate-y-1/2 h-full p-2 px-[0.9rem] rounded-s-s bg-black opacity-0 text-white hover:opacity-70 hover:text-4xl  focus:outline-none z-50"
        >
          <i className="fas fa-chevron-right text-2xl hover:opacity-100"></i>
        </button>
      </div>
    </section>
  );
};

export default CardList;
