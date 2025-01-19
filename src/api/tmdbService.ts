import { tmdbAxios } from "./tmdbAxios";
import { baseUrlOrigin, requestEndPoints } from "../api/tmdbRequests";

export const tmdbAxiosGetRequest = async (endpoint: string): Promise<any[]> => {
  try {
    const response = await tmdbAxios.get(endpoint); // tmdbAxios를 사용하여 GET 요청
    // console.log(response.data);
    if (endpoint == requestEndPoints.comingNextWeek) {
      return response.data.results; // 결과 반환
    } else if (endpoint == requestEndPoints.movieGenres) {
      return response.data.genres; // 결과 반환
    } else {
      return response.data.results; // 결과 반환
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
