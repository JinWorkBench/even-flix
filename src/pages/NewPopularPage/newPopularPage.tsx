import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
// import "./App.css"; // Tailwind CSS 파일
// import "./index.css"; // CSS 파일
import "../../App.css";
import "../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPlus,
  faThumbsUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { tmdbAxiosGetRequest } from "../../api/tmdbService";
import { baseUrlOrigin, requestEndPoints } from "../../api/tmdbRequests";

import ImgHorizontalPoster from "./imgHorizontalPoster";
import ComingNextWeek from "./comingNextWeek";
import NewOnNetflix from "./newOnNetflix";

// 인터페이스 정의
interface NextW {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
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

function NewPopularPage() {
  const [newOnNetflix, setNewOnNetflix] = useState<NextW[]>([]);
  const [nowPlaying, setNowPlaying] = useState<NextW[]>([]);
  const [upComing, setUpComing] = useState<NextW[]>([]);
  const [topRated, setTopRated] = useState<NextW[]>([]);
  const [comingNextWeek, setComingNextWeek] = useState<NextW[]>([]);

  const [movieGenres, setMovieGenres] = useState<mGenres[]>([]);

  const [hovered, setHovered] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [isHoveringModal, setIsHoveringModal] = useState(false);

  useEffect(() => {
    const fetchDataNewOnNet = async () => {
      try {
        // API 요청
        const data3 = await tmdbAxiosGetRequest(requestEndPoints.newOnNetflix);
        setNewOnNetflix(data3); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching Coming Next Week data:", error);
      }
    };

    const fetchDataNowPlaying = async () => {
      try {
        // API 요청
        const data4 = await tmdbAxiosGetRequest(requestEndPoints.nowPlaying);
        setNowPlaying(data4); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching Coming Next Week data:", error);
      }
    };

    const fetchDataUpComing = async () => {
      try {
        // API 요청
        const data5 = await tmdbAxiosGetRequest(requestEndPoints.upComing);
        setUpComing(data5); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching Coming Next Week data:", error);
      }
    };

    const fetchDataTopRated = async () => {
      try {
        // API 요청
        const data7 = await tmdbAxiosGetRequest(requestEndPoints.topRated);
        setTopRated(data7); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching Coming Next Week data:", error);
      }
    };

    const fetchData = async () => {
      try {
        // API 요청
        const data = await tmdbAxiosGetRequest(requestEndPoints.comingNextWeek);
        setComingNextWeek(data); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching Coming Next Week data:", error);
      }
    };

    const fetchMovieGenresData = async () => {
      try {
        // API 요청
        const data2 = await tmdbAxiosGetRequest(requestEndPoints.movieGenres);
        setMovieGenres(data2); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching Coming Next Week data:", error);
      }
    };

    fetchMovieGenresData();
    fetchDataNewOnNet();
    fetchDataNowPlaying();
    fetchDataUpComing();
    fetchDataTopRated();
    fetchData();
  }, []);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLImageElement>,
    movieId: number
  ) => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const modalWidth = 256; // 16rem (CSS rem 단위를 px로 변환, 기본 폰트 크기 16px 기준)
    const windowWidth = window.innerWidth;

    const calculatedLeft = rect.left + window.scrollX;

    // 모달이 화면 오른쪽 경계를 넘어가지 않도록 조정
    const adjustedLeft =
      calculatedLeft + modalWidth > windowWidth
        ? windowWidth - modalWidth - 230 // 10px은 여유 공간
        : calculatedLeft;

    const timer = setTimeout(() => {
      setModalPosition({
        top: rect.top + window.scrollY,
        left: adjustedLeft,
      });
      setHovered(movieId);
    }, 700); // 디테일카드모달 열리는 초 딜레이 추가
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    if (!isHoveringModal) setHovered(null);
  };

  return (
    <div
      style={{
        overflowX: "hidden", // 좌우 스크롤 숨김
      }}
    >
      <div className="bg-black p-4">
        <h1 className="text-white text-left text-lg font-semibold">
          New on Netflix
        </h1>
      </div>
      {/* NewOnNetflix 부분 */}
      <ComingNextWeek
        comingNextWeek={newOnNetflix}
        movieGenres={movieGenres}
        hovered={hovered}
        modalPosition={modalPosition}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        setIsHoveringModal={setIsHoveringModal}
        setHovered={setHovered}
      />
      <div className="bg-black p-4">
        <h1 className="text-white text-left text-lg font-semibold">
          Now Playing
        </h1>
      </div>
      {/* nowPlaying 부분 */}
      <ComingNextWeek
        comingNextWeek={nowPlaying}
        movieGenres={movieGenres}
        hovered={hovered}
        modalPosition={modalPosition}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        setIsHoveringModal={setIsHoveringModal}
        setHovered={setHovered}
      />
      <div className="bg-black p-4">
        <h1 className="text-white text-left text-lg font-semibold">Upcoming</h1>
      </div>
      {/* Upcoming 부분 */}
      <ComingNextWeek
        comingNextWeek={upComing}
        movieGenres={movieGenres}
        hovered={hovered}
        modalPosition={modalPosition}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        setIsHoveringModal={setIsHoveringModal}
        setHovered={setHovered}
      />
      <div className="bg-black p-4">
        <h1 className="text-white text-left text-lg font-semibold">
          Coming This Week
        </h1>
      </div>
      {/* topRated 부분 */}
      <ComingNextWeek
        comingNextWeek={topRated}
        movieGenres={movieGenres}
        hovered={hovered}
        modalPosition={modalPosition}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        setIsHoveringModal={setIsHoveringModal}
        setHovered={setHovered}
      />
      <div className="bg-black p-4">
        <h1 className="text-white text-left text-lg font-semibold">
          Coming Next Week
        </h1>
      </div>
      {/* coming_n_w 부분 */}
      <ComingNextWeek
        comingNextWeek={comingNextWeek}
        movieGenres={movieGenres}
        hovered={hovered}
        modalPosition={modalPosition}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        setIsHoveringModal={setIsHoveringModal}
        setHovered={setHovered}
      />
    </div>
  );
}

export default NewPopularPage;
