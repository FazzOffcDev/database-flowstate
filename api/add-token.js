import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { token } = req.body;
  const filePath = path.join(process.cwd(), "public", "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  if (data.tokens.includes(token)) {
    return res.status(400).json({ message: "Token sudah ada!" });
  }

  data.tokens.push(token);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return res.status(200).json({ message: "Token berhasil ditambahkan!" });
}
