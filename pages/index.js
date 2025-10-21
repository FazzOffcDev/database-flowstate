import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      localStorage.setItem("auth", "true");
      router.push("/dashboard");
    } else {
      alert("⚠️ Password salah!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6 tracking-wide">
          🔒 Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Masukkan password..."
            className="w-full p-3 mb-5 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Masuk
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
