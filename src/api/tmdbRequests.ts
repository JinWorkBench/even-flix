const baseUrlOrigin = "https://api.themoviedb.org/3";

const requestEndPoints = {
  fetchNowPlaying: "movie/now_playing",
  fetchNetflixOriginals: "/discover/tv?with_networks=213",
  fetchTrending: "/trending/all/week",
  fetchTopRated: "movie/top_rated",
  fetchActionMovies: "/discover/movie?with_genres=28",
  fetchComedyMovies: "/discover/movie?with_genres=35",
  fetchHorrorMovies: "/discover/movie?with_genres=27",
  fetchRomanceMovies: "/discover/movie?with_genres=10749",
  fetchDocumentaries: "/discover/movie?with_genres=99",

  // 홈화면에서 사용하는 부분 (위와 중복이 있을 수도 있지만 헷갈리지 않도록 이름을 다르게 했습니다.)
  fetchForYou: "/trending/all/day?language=ko-KR", // 회원님을 위해 엄선한 오늘의 콘텐츠
  fetchTodayTop10Series: "/trending/tv/day", //오늘 전세계의 TOP 10 시리즈
  //---- fetchTodayTop10SeriesKR 로 필터링된 오늘 대한민국의 TOP 10 시리즈

  fetchRealitySeries:
    "/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10764", // 재미를 주는 리얼리티 시리즈
  fetchTopRatedSeries: "/tv/top_rated", // 평단의 찬사! 감명을 주는 시리즈
  fetchEnglishContents:
    "/discover/tv?include_adult=false&include_null_first_air_dates=false&sort_by=vote_average&language=ko-KR&with_original_language=en", // 즐거운 영어 세상 속으로!
  fetchUSMovies:
    "/discover/movie?include_adult=false&include_video=true&language=ko-KR&sort_by=popularity.desc&with_origin_country=US&without_genres=10763", // 미국 영화
  fetchKoreanSeries:
    "/discover/tv?include_adult=false&&include_null_first_air_dates=false&language=ko-KR&sort_by=popularity.desc&with_origin_country=KR&without_genres=10763%2C%2010768", // 한국 시리즈
  // 시청 중인 컨텐츠
  fetchPopularMovies: "/movie/popular", // 오늘 전세계의 TOP 10 영화
  fetchNowPlayingMovies: "/movie/now_playing", // 지금 상영 중인 영화
  fetchSFAndFantasySeries:
    "/discover/tv?include_adult=false&include_null_first_air_dates=false&language=ko-KR&sort_by=popularity.desc&with_genres=10765&with_origin_country=KR&without_genres=10762", // SF &  판타지 시리즈

  // New & Popular
  // 확인이 어려운 api경로는 임의의 api경로로를 추가
  // newOnNetflix
  newOnNetflix: "/movie/popular?language=en-US&page=1",
  // nowPlaying
  nowPlaying: "/movie/now_playing?language=en-US&page=1",
  // upComing
  upComing: "/movie/upcoming?language=en-US&page=1",
  // topRated
  topRated: "/movie/top_rated?language=en-US&page=1",
  // Coming Next Week
  comingNextWeek: "/trending/movie/day?language=ko-KR",
  // movie genres
  movieGenres: "/genre/movie/list?language=en",
};

export { baseUrlOrigin, requestEndPoints };
