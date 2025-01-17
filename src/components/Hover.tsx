import { useState } from "react";

function Hover() {
  const [hovered, setHovered] = useState<number | null>(null); // 현재 활성화된 모달 인덱스
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null); // 모달 위치

  const images = [
    {
      src: "",
      alt: "First",
      title: "CHEF & MY FRIDGE",
      description: "Humorous · Quirky · Korean Entertainment",
      details: "15+ · 12 Episodes · HD",
      age: "15+",
      ep: "12 Episodes",
      HD: "HD",
      modalImage: "",
      isMostLiked: 1, // Most Liked
    },
    {
      src: "",
      alt: "Second",
      title: "Cooking Show",
      description: "Delicious · Fun · International Cuisine",
      details: "All · 20 Episodes · FHD",
      age: "All+",
      ep: "20 Episodes",
      HD: "FHD",
      modalImage: "",
      isMostLiked: 2, // New Episode
    },
  ];

  return (
    <div className="text-center min-h-screen p-8 relative">
      <h1 className="text-3xl font-bold text-white mb-8">Welcome to Even-Flix</h1>
      <div className="grid grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full sm:w-60 md:w-72 lg:w-80"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect(); // 이미지의 위치 가져오기
              setModalPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
              setHovered(index); // 현재 활성화된 인덱스 설정
            }}
          >
            {/* 이미지 */}
            <img src={image.src} alt={image.alt} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        ))}
      </div>

      {/* 모달 창 */}
      {hovered !== null && modalPosition && (
        <div
          className="absolute"
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
            width: "16rem",
          }}
          onMouseLeave={() => setHovered(null)} // 모달 창 닫기
        >
          <div className="relative bg-black text-white rounded-lg shadow-xl">
            {/* 모달 내부 이미지 */}
            <div className="mb-4">
              <img
                src={images[hovered].modalImage}
                alt="Modal"
                className="w-full h-full object-cover rounded-t-lg" // 상단만 둥글게 처리
              />
            </div>

            <div className="test123 pt-1 pb-3 px-3">

            {/* 중단 */}
            <div>
              <div className="flex justify-between items-center">
                {/* 왼쪽 버튼 그룹 */}
                <div className="flex items-center gap-4">
                  {/* 플레이 버튼 */}
                  <button
                    className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                    onClick={() => console.log("Play 버튼이 눌렸습니다.")}
                  >
                    {/* <FontAwesomeIcon icon={faPlay} className="text-white" /> */}
                  </button>

                  {/* 추가 버튼 */}
                  <button
                    className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                    onClick={() => console.log("Add 버튼이 눌렸습니다.")}
                  >
                    {/* <FontAwesomeIcon icon={faPlus} className="text-white" /> */}
                  </button>

                  {/* 좋아요 버튼 */}
                  <button
                    className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                    onClick={() => console.log("Like 버튼이 눌렸습니다.")}
                  >
                    {/* <FontAwesomeIcon icon={faThumbsUp} className="text-white" /> */}
                  </button>
                </div>

                {/* 오른쪽 버튼 그룹 */}
                <div>
                  {/* 자세히 버튼 */}
                  <button
                    className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-500 flex items-center justify-center hover:bg-gray-600"
                    onClick={() => console.log("Details 버튼이 눌렸습니다.")}
                  >
                    {/* <FontAwesomeIcon icon={faChevronDown} className="text-white" /> */}
                  </button>
                </div>
              </div>
            </div>

              {/* 영상정보 */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                <span className="border border-gray-500 px-2 py-1 rounded">{images[hovered].age}</span>
                <span>{images[hovered].ep}</span>
                <span className="border border-gray-500 px-2 py-1 rounded">{images[hovered].HD}</span>
              </div>

              {/* 카테고리 정보 */}
              <div className="text-sm text-gray-300 mt-2 break-words whitespace-normal text-left">
                {images[hovered].description}
              </div>

              {/* 추가 정보 */}
              <div className="flex items-center gap-2 mt-2">
                {images[hovered].isMostLiked === 1 ? (
                  // Most Liked인 경우
                  <div className="flex items-center gap-2">
                    {/* 따봉 아이콘 네모 상자 */}
                    <div className="bg-red-600 text-white px-2 py-1 border border-gray-500">
                      {/* <FontAwesomeIcon icon={faThumbsUp} className="text-white" /> */}
                    </div>
                    <span>Most Liked</span>
                  </div>
                ) : images[hovered].isMostLiked === 2 ? (
                  // New Episode인 경우
                  <div className="flex items-center gap-2">
                    {/* N 아이콘 네모 상자 */}
                    <div className="bg-red-600 text-white px-2 py-1 border border-gray-500">
                      <span className="font-bold text-lg">N</span>
                    </div>
                    <span>New Episode</span>
                  </div>
                ) : (
                  // 0 또는 그 외의 값인 경우
                  <div></div>
                )}
              </div>

              {/* 콘텐츠 */}
              {/* <div>
                <h2 className="text-lg font-bold mt-2">{images[hovered].title}</h2>
                <p className="text-sm text-gray-300">{images[hovered].details}</p>
                <p className="text-sm text-gray-400 mb-4">{images[hovered].description}</p>
              </div> */}

            </div>

          </div>
        </div>
      )}


    </div>
  );
}

export default Hover;