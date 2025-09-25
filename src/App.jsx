import React, { useState } from "react";
import feather from "feather-icons";
import { useEffect } from "react";
import parse from "html-react-parser";

const cardDecks = {
  business: [
    "<b>🏆 Chiến Thắng Trò Chơi Bên Trong</b> <br><br> <p>🔮 BÙA – CHÚ :</p><br>  Dán xung quanh nhắc nhở mình, thể hiện năng lượng cao và đọc thường xuyên<br><br> “THAY VÌ NÓI TÔI NGU LẮM → TÔI GIỎI LẮM.NẾU NHẬN MÌNH NGU MÌNH SẼ DỪNG HÀNH ĐỘNG  ",
    "<b>🌟 Khó khăn & Thành công</b> <br> <br> Khó khăn là bài kiểm tra của cuộc sống. Người thành công xem khó khăn như thử thách, kẻ bỏ cuộc thì coi thử thách là khó khăn.<br> <br> 💡 Kết luận: Khó khăn chỉ đo năng lực, không phải để ngăn bạn tiến lên.",
    "<b>🔑 Không thể hành động mà không có chiến lược rõ ràng</b> <br><br> Trước khi hành động → cần tư duy &amp; xây dựng chiến lược phù hợp.<br><br> 💡 Nguyên tắc: Đặt mục tiêu phải hoàn thành, hoàn thành không xong không ăn không uống không nghỉ.",
    "<b>🌱 Cách đạt được mục tiêu hiệu quả</b> <br><br> 1. <b>Biết mình mong muốn gì</b><br> Xác định rõ mục tiêu trước khi bắt đầu học.<br> Mục tiêu càng cụ thể thì định hướng càng rõ ràng.<br><br> 2. <b>Hằng ngày kiểm tra, đo lường và đánh giá</b><br> Đặt thói quen phản chiếu (review) mỗi ngày.<br> Biết hôm nay mình học được gì, còn thiếu gì.<br><br> 3. <b>Càng làm nhiều lần bao nhiêu, càng giỏi bấy nhiêu</b><br> Thành công không đến từ số lượng việc bạn làm,<br> mà từ số lần lặp lại."

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

  // NEW: modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (htmlString) => {
    setModalContent(htmlString);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

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
  }, [flippedCards, activeDeck, isModalOpen]);

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
          className={`px-4 py-2 rounded-lg ${activeDeck === "business"
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Kinh Doanh
        </button>
        <button
          onClick={() => changeDeck("finance")}
          className={`px-4 py-2 rounded-lg ${activeDeck === "finance"
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Tài Chính
        </button>
        <button
          onClick={() => changeDeck("motivation")}
          className={`px-4 py-2 rounded-lg ${activeDeck === "motivation"
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
            className={`card ${flippedCards[index] ? "flipped" : ""} cursor-pointer`}
            onClick={() => flipCard(index)}
          >
            <div className="card-inner">
              <div className="card-front bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
                <i
                  data-feather={index === 0 ? "zap" : index === 1 ? "trending-up" : "star"}
                  className="w-16 h-16 mb-6 text-yellow-300"
                />
                <h2 className="text-2xl font-bold mb-2 text-center font-playfair">Thẻ {index + 1}</h2>
                <p className="text-center opacity-90">Nhận lời khuyên hữu ích</p>
              </div>

              {/* CARD BACK: click để mở modal */}
              <div
                className="card-back bg-gradient-to-br from-amber-50 to-yellow-100 truncate-back"
                onClick={(e) => {
                  e.stopPropagation(); // không lật ngược thêm
                  openModal(currentMessages[index]);
                }}
                role="button"
                title="Nhấn để xem chi tiết"
              >
                <i data-feather="award" className="w-16 h-16 mb-4 text-amber-500" />
                <p className="text-lg md:text-xl text-center font-medium text-gray-800 font-poppins back-content">
                  {parse(currentMessages[index] || "")}
                </p>

                {/* nhãn gợi ý */}
           
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Nội dung chi tiết</h3>
              <button className="modal-close" onClick={closeModal} aria-label="Đóng">
                <i data-feather="x" />
              </button>
            </div>
            <div className="modal-body font-poppins prose max-w-none">
              {parse(modalContent || "")}
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={closeModal}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

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
