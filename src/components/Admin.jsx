import React, { useState, useRef, useEffect } from "react";
import feather from "feather-icons";
import parse from "html-react-parser";

const Admin = ({ decks, categories, onSave }) => {
    const [editorDeck, setEditorDeck] = useState(categories[0]?.id || "business");
    const [newCardInput, setNewCardInput] = useState("");
    const [editorColor, setEditorColor] = useState("#111827");
    const [editorImageUrl, setEditorImageUrl] = useState("");
    const editorRef = useRef(null);

    // Category management state
    const [newCatName, setNewCatName] = useState("");
    const [newCatId, setNewCatId] = useState("");

    useEffect(() => {
        feather.replace();
    }, []);

    const wrapSelection = (before, after = "") => {
        const el = editorRef.current;
        if (!el) return;
        const start = el.selectionStart || 0;
        const end = el.selectionEnd || 0;
        const value = newCardInput;
        const selected = value.slice(start, end) || "nội dung";
        const next =
            value.slice(0, start) + before + selected + after + value.slice(end);
        setNewCardInput(next);
        requestAnimationFrame(() => {
            el.focus();
            const cursor = start + before.length + selected.length + after.length;
            el.setSelectionRange(cursor, cursor);
        });
    };

    const insertImage = () => {
        const url = editorImageUrl.trim();
        if (!url) return;
        const tag = `<img src="${url}" alt="image" />`;
        wrapSelection(tag, "");
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
        if (window.confirm(`Bạn có chắc muốn xóa danh mục "${id}" và tất cả thẻ trong đó?`)) {
            const updatedCategories = categories.filter(c => c.id !== id);
            const updatedDecks = { ...decks };
            delete updatedDecks[id];
            onSave(updatedCategories, updatedDecks);
            if (editorDeck === id) setEditorDeck(updatedCategories[0]?.id || "");
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
                            <div className="space-y-2">
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
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Công cụ nhanh</label>
                                <div className="flex gap-2 h-[52px]">
                                    <button className="flex-1 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors font-bold" onClick={() => wrapSelection("<b>", "</b>")}>B</button>
                                    <button className="flex-1 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors italic font-serif text-lg" onClick={() => wrapSelection("<i>", "</i>")}>I</button>
                                    <button className="flex-1 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors text-xs font-bold" onClick={() => wrapSelection("<br/>", "")}>LINE</button>
                                    <div className="flex-1 relative overflow-hidden rounded-xl border border-slate-200">
                                        <input type="color" className="absolute -inset-2 w-[200%] h-[200%] cursor-pointer" value={editorColor} onChange={(e) => setEditorColor(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Nội dung (HTML)</label>
                            <textarea
                                ref={editorRef}
                                className="admin-input h-48 resize-none"
                                placeholder="Ví dụ: <b>Tiêu đề</b><br>Nội dung chi tiết của bạn..."
                                value={newCardInput}
                                onChange={(e) => setNewCardInput(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-3">
                            <input
                                className="flex-1 admin-input"
                                placeholder="Link hình ảnh minh họa (tùy chọn)"
                                value={editorImageUrl}
                                onChange={(e) => setEditorImageUrl(e.target.value)}
                            />
                            <button className="admin-btn admin-btn-secondary whitespace-nowrap" onClick={insertImage}>
                                Chèn ảnh
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
