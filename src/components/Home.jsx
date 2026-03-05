import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import feather from "feather-icons";
import { motion, AnimatePresence } from "framer-motion";
import parse from "html-react-parser";

const Home = ({ decks, categories }) => {
    const [activeDeck, setActiveDeck] = useState(categories[0]?.id || "business");
    const [flippedCards, setFlippedCards] = useState([false, false, false]);
    const [currentMessages, setCurrentMessages] = useState(["", "", ""]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    useEffect(() => {
        feather.replace();
        resetAllCards();
    }, [activeDeck, decks]);

    useEffect(() => {
        feather.replace();
    }, [flippedCards, isModalOpen]);

    const flipCard = (index) => {
        const newFlipped = [...flippedCards];
        newFlipped[index] = !newFlipped[index];
        setFlippedCards(newFlipped);
    };

    const resetAllCards = () => {
        setFlippedCards([false, false, false]);
        const deck = decks[activeDeck] || [];
        if (deck.length >= 3) {
            const shuffled = [...deck].sort(() => 0.5 - Math.random());
            setCurrentMessages(shuffled.slice(0, 3));
        } else {
            setCurrentMessages([
                deck[0] || "Chưa có nội dung",
                deck[1] || "Chưa có nội dung",
                deck[2] || "Chưa có nội dung"
            ]);
        }
    };

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModals = () => {
        setIsModalOpen(false);
    };

    const activeLabel = categories.find(c => c.id === activeDeck)?.name || "";

    return (
        <div className="flex flex-col items-center max-w-7xl mx-auto py-10">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 px-4"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">Kiến tạo tương lai</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair text-slate-900 leading-tight">
                    Lời Khuyên <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{activeLabel}</span>
                </h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
                    Những thông điệp ý nghĩa được chắt lọc giúp bạn có thêm góc nhìn và động lực trong hành trình cuộc sống.
                </p>
                <div className="h-1.5 w-24 bg-indigo-600 rounded-full mx-auto opacity-20"></div>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2 mb-20 p-1.5 glass rounded-[2rem] border border-white/60 shadow-xl shadow-indigo-900/5 max-w-fit mx-auto"
            >
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setActiveDeck(cat.id);
                            resetAllCards();
                        }}
                        className={`px-8 py-3.5 rounded-[1.5rem] text-sm font-bold transition-all duration-500 ${activeDeck === cat.id
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-300 scale-105"
                            : "text-slate-500 hover:text-indigo-600 hover:bg-white/50"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-20 px-6">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        className="flex justify-center"
                        onClick={() => flippedCards[index] && openModal(currentMessages[index])}
                    >
                        <FlashCard
                            index={index}
                            flipped={flippedCards[index]}
                            backContent={currentMessages[index]}
                            onFlip={() => flipCard(index)}
                        />
                    </motion.div>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetAllCards}
                className="group px-10 py-5 bg-slate-900 text-white font-bold rounded-[2rem] shadow-2xl shadow-slate-900/20 hover:bg-indigo-600 transition-all duration-500 flex items-center gap-4 border-b-4 border-slate-950/20"
            >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                    <i data-feather="refresh-cw" className="w-4 h-4 text-white"></i>
                </div>
                Bắt Đầu Lượt Mới
            </motion.button>

            {/* Modal logic remains similar but with cleaner styles */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                        onClick={closeModals}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="modal-dialog glass !bg-white/95 !max-w-3xl overflow-hidden shadow-2xl border-indigo-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header flex justify-between items-center p-6 border-b border-indigo-50">
                                <h2 className="modal-title !text-indigo-950">Chi Tiết Thông Điệp</h2>
                                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400" onClick={closeModals}>
                                    <i data-feather="x" className="w-5 h-5"></i>
                                </button>
                            </div>
                            <div className="modal-body p-10 max-h-[70vh] overflow-y-auto">
                                <div className="prose prose-indigo max-w-none">
                                    {parse(modalContent)}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
