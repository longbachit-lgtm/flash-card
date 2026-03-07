import { useState, useEffect } from "react";
import feather from "feather-icons";
import parse from "html-react-parser";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Admin = ({ decks, categories, onSave }) => {
    const [editorDeck, setEditorDeck] = useState(categories[0]?.id || "business");
    const [newCardInput, setNewCardInput] = useState("");
    const [editorImageUrl, setEditorImageUrl] = useState("");
    const [isAiLoading, setIsAiLoading] = useState(false);

    // Quill Toolbar Modules
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'clean']                        // remove formatting button
        ]
    };

    // Category management state
    const [newCatName, setNewCatName] = useState("");
    const [newCatId, setNewCatId] = useState("");

    useEffect(() => {
        feather.replace();
    }, []);

    const insertImage = () => {
        const url = editorImageUrl.trim();
        if (!url) return;
        setNewCardInput(prev => prev + `< img src = "${url}" alt = "image" /> `);
        setEditorImageUrl("");
    };

    const addCard = () => {
        if (!newCardInput.trim()) return;
        const updatedDecks = { ...decks };
        if (!updatedDecks[editorDeck]) updatedDecks[editorDeck] = [];
        updatedDecks[editorDeck].push(newCardInput.trim());
        onSave(categories, updatedDecks);
        setNewCardInput("");
    };

    const addCategory = () => {
        const id = newCatId.trim().toLowerCase();
        const name = newCatName.trim();
        if (!id || !name) return;
        if (categories.find(c => c.id === id)) {
            alert("ID danh mục đã tồn tại!");
            return;
        }
        const updatedCategories = [...categories, { id, name }];
        const updatedDecks = { ...decks, [id]: [] };
        onSave(updatedCategories, updatedDecks);
        setNewCatId("");
        setNewCatName("");
    };

    const deleteCategory = (id) => {
        if (window.confirm(`Bạn có chắc muốn xóa danh mục "${id}" và tất cả thẻ trong đó ? `)) {
            const updatedCategories = categories.filter(c => c.id !== id);
            const updatedDecks = { ...decks };
            delete updatedDecks[id];
            onSave(updatedCategories, updatedDecks);
            if (editorDeck === id) setEditorDeck(updatedCategories[0]?.id || "");
        }
    };

    const handleAIFormat = async () => {
        if (!newCardInput.trim()) {
            alert("Vui lòng nhập nội dung cần trình bày trước!");
            return;
        }

        let apiKey = localStorage.getItem("GEMINI_API_KEY");
        if (!apiKey) {
            apiKey = prompt("Vui lòng nhập Gemini API Key của bạn để sử dụng tính năng AI (chỉ cần nhập 1 lần):");
            if (!apiKey) return;
            localStorage.setItem("GEMINI_API_KEY", apiKey.trim());
        }

        setIsAiLoading(true);
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const promptText = `
Bạn là một chuyên gia trình bày nội dung cho Flashcard học tập.
Hãy định dạng lại nội dung dưới đây thành HTML thật đẹp và trực quan.
Sử dụng các thẻ HTML cơ bản (<b>, <i>, <ul>, <li>, <h3>, <p>, <br>) hoặc các class Tailwind phổ biến (như text-xl, font-bold, text-indigo-600, mb-4, v.v...) để nội dung dễ đọc nhất.
Sử dụng emoji phù hợp để làm nổi bật các tiêu đề hoặc ý chính.
Biến các gạch đầu dòng hoặc số thứ tự thủ công thành cấu trúc danh sách <ul> <li> hợp lý.
Chỉ trả về trực tiếp MÃ HTML, TUYỆT ĐỐI KHÔNG bọc trong markdown code block (không dùng \`\`\`html).

Nội dung gốc cần trình bày lại:
${newCardInput}
            `;

            const result = await model.generateContent(promptText);
            let responseText = result.response.text();

            // Dọn dẹp markdown code block nếu AI vô tình thêm vào
            responseText = responseText.replace(/^\`\`\`html/i, "").replace(/^\`\`\`/i, "").replace(/\`\`\`$/i, "").trim();

            setNewCardInput(responseText);
        } catch (error) {
            console.error("AI Error:", error);
            alert("Có lỗi xảy ra khi gọi AI: " + error.message);
            if (error.message.includes("API key not valid") || error.status === 403) {
                localStorage.removeItem("GEMINI_API_KEY");
            }
        } finally {
            setIsAiLoading(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-end border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 font-playfair mb-2">Trung tâm Quản trị</h1>
                    <p className="text-slate-500 font-medium">Quản lý danh mục và nội dung flashcards của bạn</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Category Management */}
                <div className="lg:col-span-5 glass p-8 rounded-3xl space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                            <i data-feather="folder-plus" className="w-6 h-6"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Danh Mục</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-white/40 rounded-2xl space-y-3 border border-white/60">
                            <input
                                className="admin-input"
                                placeholder="ID danh mục (ví dụ: suc-khoe)"
                                value={newCatId}
                                onChange={(e) => setNewCatId(e.target.value)}
                            />
                            <input
                                className="admin-input"
                                placeholder="Tên danh mục hiển thị"
                                value={newCatName}
                                onChange={(e) => setNewCatName(e.target.value)}
                            />
                            <button
                                onClick={addCategory}
                                className="w-full admin-btn admin-btn-primary"
                            >
                                Thêm danh mục mới
                            </button>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 text-left">ID</th>
                                        <th className="px-6 py-4 text-left">Tên</th>
                                        <th className="px-6 py-4 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {categories.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-slate-400">{cat.id}</td>
                                            <td className="px-6 py-4 font-bold text-slate-700">{cat.name}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => deleteCategory(cat.id)}
                                                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                                >
                                                    <i data-feather="trash-2" className="w-4 h-4"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Card Editor */}
                <div className="lg:col-span-7 glass p-8 rounded-3xl space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                            <i data-feather="edit-3" className="w-6 h-6"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Biên soạn Flashcard</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Chọn danh mục</label>
                                <select
                                    className="admin-input appearance-none bg-no-repeat bg-[right_1rem_center]"
                                    value={editorDeck}
                                    onChange={(e) => setEditorDeck(e.target.value)}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2 relative">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Nội dung (Trình soạn thảo kiểu CMS)</label>
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 quill-container">
                                <ReactQuill
                                    theme="snow"
                                    value={newCardInput}
                                    onChange={setNewCardInput}
                                    modules={modules}
                                    placeholder="Nội dung chi tiết của bạn..."
                                    className="h-64"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-12">
                            <input
                                className="flex-1 admin-input"
                                placeholder="Link hình ảnh minh họa (tùy chọn)"
                                value={editorImageUrl}
                                onChange={(e) => setEditorImageUrl(e.target.value)}
                            />
                            <button className="admin-btn admin-btn-secondary whitespace-nowrap" onClick={insertImage}>
                                Chèn ảnh
                            </button>
                            <button
                                className="admin-btn bg-indigo-600 text-white hover:bg-indigo-700 whitespace-nowrap flex items-center gap-2"
                                onClick={handleAIFormat}
                                disabled={isAiLoading}
                            >
                                {isAiLoading ? (
                                    <i data-feather="loader" className="w-5 h-5 animate-spin"></i>
                                ) : (
                                    <i data-feather="zap" className="w-5 h-5"></i>
                                )}
                                {isAiLoading ? "Đang xử lý..." : "Trình bày bằng AI"}
                            </button>
                        </div>

                        <button
                            onClick={addCard}
                            className="w-full admin-btn py-4 bg-emerald-600 text-white shadow-xl shadow-emerald-100 hover:bg-emerald-700 hover:shadow-emerald-200 text-lg"
                        >
                            Lưu Thẻ Mới Vào Deck
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div className="glass p-1 rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-slate-50/50 px-8 py-4 border-b border-white/60 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Xem trước hiển thị</h3>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    </div>
                </div>
                <div className="p-12 bg-white flex justify-center items-center min-h-[300px]">
                    <div className="w-full max-w-lg p-10 rounded-3xl border-2 border-dashed border-slate-100 text-center relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-slate-300 tracking-tighter">PREVIEW AREA</div>
                        <div className="prose prose-slate max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-b:text-indigo-600">
                            {parse(newCardInput || "<p class='italic text-slate-300'>Nội dung của bạn sẽ hiển thị tại đây...</p>")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
