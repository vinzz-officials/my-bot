export default async function handler(req, res) {
  const TOKEN = "8396430373:AAGZ9lbLgPhAhIZUghflXgYls1taRpmPudY"; // token bot
  const API = `https://api.telegram.org/bot${TOKEN}`;

  if (req.method === "POST") {
    const update = req.body;

    // pesan teks
    if (update.message) {
      const chat_id = update.message.chat.id;
      const text = update.message.text;

      if (text === "/start") {
        const keyboard = {
          inline_keyboard: [
            [
              { text: "📖 Menu", callback_data: "menu" },
              { text: "ℹ️ About", callback_data: "about" }
            ],
            [{ text: "🌐 Website", url: "https://vinzz.com" }]
          ]
        };

        await fetch(`${API}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id,
            text: "👋 Halo, selamat datang di *Bot Vinzz berbasis php* 🚀\n\nPilih menu di bawah:",
            parse_mode: "Markdown",
            // 👉 WAJIB: stringify biar tombol tampil normal
            reply_markup: JSON.stringify(keyboard)
          })
        });

      } else if (text === "/help") {
        await sendText(chat_id, "📌 Gunakan /start untuk membuka menu utama.\nCoba juga /about, atau klik tombol yang ada.");

      } else if (text === "/about") {
        await sendText(chat_id, "🤖 Bot ini dibuat dengan *Node.js + Vercel Serverless*.\nDikembangkan oleh Vinzz Official.");

      } else if (text === "/menu") {
        const keyboard = {
          inline_keyboard: [
            [
              { text: "🔊 Fitur 1", callback_data: "fitur1" },
              { text: "📂 Fitur 2", callback_data: "fitur2" }
            ],
            [{ text: "🎲 Random", callback_data: "random" }]
          ]
        };

        await fetch(`${API}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id,
            text: "📖 Daftar Menu Fitur:\n\n1. Fitur 1\n2. Fitur 2\n3. Random Generator",
            // 👉 WAJIB: stringify
            reply_markup: JSON.stringify(keyboard)
          })
        });

      }
      // non-command dibiarkan diam (no reply)
    }

    // klik tombol (callback)
    if (update.callback_query) {
      const chat_id = update.callback_query.message.chat.id;
      const data = update.callback_query.data;

      // 👉 WAJIB: jawab callback biar tombol ga stuck putih
      await fetch(`${API}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: update.callback_query.id })
      });

      if (data === "menu") {
        await sendText(chat_id, "📖 Kamu membuka Menu utama!");
      } else if (data === "about") {
        await sendText(chat_id, "ℹ️ Ini adalah bot contoh dengan fitur tombol interaktif.");
      } else if (data === "fitur1") {
        await sendText(chat_id, "🔊 Ini fitur 1 (contoh: kirim suara, musik, dll).");
      } else if (data === "fitur2") {
        await sendText(chat_id, "📂 Ini fitur 2 (contoh: ambil data dari API).");
      } else if (data === "random") {
        const rand = Math.floor(Math.random() * 100);
        await sendText(chat_id, `🎲 Angka random kamu: *${rand}*`);
      }
    }

    return res.status(200).json({ ok: true });
  }

  // GET / ping
  return res.status(200).send("OK");

  // helper kirim text
  async function sendText(chat_id, text) {
    await fetch(`${API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text, parse_mode: "Markdown" })
    });
  }
}
