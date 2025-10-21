import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("auth")) window.location.href = "/";
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setTokens(data.tokens || []));
  }, []);

  const addToken = async (e) => {
    e.preventDefault();
    setMessage("⏳ Menambahkan token...");
    try {
      const res = await fetch("/api/add-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      setMessage(data.message);
      setToken("");
      setTokens((prev) => [...prev, token]);
    } catch {
      setMessage("❌ Gagal menambahkan token!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto bg-gray-800/80 p-8 rounded-2xl shadow-xl backdrop-blur-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          🧩 Token Manager
        </h1>

        <form onSubmit={addToken} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Masukkan token baru..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Tambah Token
          </motion.button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">📜 Token Tersimpan:</h2>
          <div className="bg-gray-900 p-3 rounded-lg max-h-60 overflow-auto">
            {tokens.length > 0 ? (
              tokens.map((t, i) => (
                <div
                  key={i}
                  className="bg-gray-700/60 px-3 py-2 my-1 rounded text-sm font-mono"
                >
                  {t}
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">Belum ada token...</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
