import React, { useState } from "react";
import feather from "feather-icons";
import { useEffect } from "react";

const cardDecks = {
  business: [
    "Thị trường luôn đúng. Đừng cố chống lại xu hướng.",
    "Rủi ro lớn nhất là không chấp nhận rủi ro nào. - Mark Zuckerberg",
    "Hãy tìm ra điều bạn thích làm rồi tìm cách kiếm tiền từ nó.",
    "Thành công trong kinh doanh đòi hỏi sự kiên nhẫn và tầm nhìn dài hạn.",
    "Khách hàng hài lòng là quảng cáo tốt nhất cho doanh nghiệp.",
  ],
  finance: [
    "Tiết kiệm tiền là kiếm tiền. - Benjamin Franklin",
    "Đừng tiết kiệm những gì còn lại sau khi chi tiêu, hãy chi tiêu những gì còn lại sau khi tiết kiệm.",
    "Giá trị thực sự của đồng tiền nằm ở cách bạn sử dụng nó.",
    "Đa dạng hóa đầu tư để giảm thiểu rủi ro.",
    "Lãi kép là kỳ quan thứ 8 của thế giới. - Albert Einstein",
  ],
  motivation: [
    "Đầu tư vào kiến thức luôn mang lại lợi nhuận cao nhất.",
    "Cơ hội không đến từ may mắn, nó đến từ sự chuẩn bị.",
    "Đầu tư vào bản thân là khoản đầu tư không bao giờ lỗ.",
    "Thất bại chỉ là cơ hội để bắt đầu lại một cách thông minh hơn. - Henry Ford",
    "Đừng sợ từ bỏ điều tốt để theo đuổi điều tuyệt vời. - John D. Rockefeller",
  ],
};

function App() {
  const [flippedCards, setFlippedCards] = useState([false, false, false]);
  const [currentMessages, setCurrentMessages] = useState(["", "", ""]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeDeck, setActiveDeck] = useState("business");

  const flipCard = (index) => {
    if (!flippedCards[index]) {
      const deck = cardDecks[activeDeck];
      const randomIndex = Math.floor(Math.random() * deck.length);
      const newMessages = [...currentMessages];
      newMessages[index] = deck[randomIndex];
      setCurrentMessages(newMessages);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    const newFlipped = [...flippedCards];
    newFlipped[index] = !newFlipped[index];
    setFlippedCards(newFlipped);
  };

  const resetAllCards = () => {
    setFlippedCards([false, false, false]);
    setCurrentMessages(["", "", ""]);
  };

  const changeDeck = (deckType) => {
    setActiveDeck(deckType);
    resetAllCards();
  };

  useEffect(() => {
    feather.replace();
  }, [flippedCards, activeDeck]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 font-playfair text-indigo-900">
        Lời Khuyên{" "}
        {activeDeck === "business"
          ? "Kinh Doanh"
          : activeDeck === "finance"
          ? "Tài Chính"
          : "Tạo Động Lực"}{" "}
        Hôm Nay
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => changeDeck("business")}
          className={`px-4 py-2 rounded-lg ${
            activeDeck === "business"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Kinh Doanh
        </button>
        <button
          onClick={() => changeDeck("finance")}
          className={`px-4 py-2 rounded-lg ${
            activeDeck === "finance"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Tài Chính
        </button>
        <button
          onClick={() => changeDeck("motivation")}
          className={`px-4 py-2 rounded-lg ${
            activeDeck === "motivation"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Động Lực
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`card ${
              flippedCards[index] ? "flipped" : ""
            } cursor-pointer`}
            onClick={() => flipCard(index)}
          >
            <div className="card-inner">
              <div className="card-front bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
                <i
                  data-feather={
                    index === 0 ? "zap" : index === 1 ? "trending-up" : "star"
                  }
                  className="w-16 h-16 mb-6 text-yellow-300"
                ></i>
                <h2 className="text-2xl font-bold mb-2 text-center font-playfair">
                  Thẻ {index + 1}
                </h2>
                <p className="text-center opacity-90">Nhận lời khuyên hữu ích</p>
              </div>
              <div className="card-back bg-gradient-to-br from-amber-50 to-yellow-100">
                <i
                  data-feather="award"
                  className="w-16 h-16 mb-6 text-amber-500"
                ></i>
                <p className="text-lg md:text-xl text-center font-medium text-gray-800 font-poppins">
                  {currentMessages[index]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={resetAllCards}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center"
      >
        <i data-feather="refresh-cw" className="mr-2"></i>
        Lật Lại Tất Cả
      </button>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
