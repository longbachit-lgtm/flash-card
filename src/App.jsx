import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import cardData from "./data/cards.json";
import Home from "./components/Home";
import Admin from "./components/Admin";

function App() {
  const [data, setData] = useState(cardData);

  const saveToDisk = async (newCategories, newDecks) => {
    const updatedData = {
      categories: newCategories,
      decks: newDecks
    };

    setData(updatedData);

    try {
      const response = await fetch("/api/save-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        console.log("Data saved successfully");
      } else {
        console.error("Failed to save data");
      }
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        {/* Premium Sticky Header */}
        <header className="sticky top-0 z-50 glass border-b border-indigo-100/50 px-6 py-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <i data-feather="box" className="w-6 h-6"></i>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-indigo-950 font-playfair hidden sm:block">
                Tư Duy Tích Cực
              </h1>
            </div>

            <nav className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-white hover:shadow-sm text-slate-600 hover:text-indigo-600 flex items-center gap-2"
              >
                <i data-feather="home" className="w-4 h-4"></i>
                Trang chủ
              </Link>
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-white hover:shadow-sm text-slate-600 hover:text-indigo-600 flex items-center gap-2"
              >
                <i data-feather="settings" className="w-4 h-4"></i>
                Quản trị
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <Routes>
            <Route
              path="/"
              element={<Home decks={data.decks} categories={data.categories} />}
            />
            <Route
              path="/admin"
              element={<Admin decks={data.decks} categories={data.categories} onSave={saveToDisk} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
