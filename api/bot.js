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
            [{ text: "🌐 Website", url: "https://free-panels-pterodactyl.netlify.app" }]
          ]
        };

        await fetch(`${API}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id,
            text: "👋 Halo, selamat datang di *Bot Vinzz berbasis Node.js* 🚀\n\nPilih menu di bawah:",
            parse_mode: "Markdown",
            reply_markup: JSON.stringify(keyboard)
          })
        });

      } else if (text === "/help") {
        await sendText(chat_id, "📌 Gunakan /start untuk membuka menu utama.\nCoba juga tekan tombol yang ada.");

      }
      // catatan: text === "menu" atau "about" gak perlu disini
      // karena itu *callback_data* (bukan pesan teks)
    }

    // klik tombol (callback query)
    if (update.callback_query) {
      const chat_id = update.callback_query.message.chat.id;
      const data = update.callback_query.data;

      // WAJIB: biar tombol gak stuck putih
      await fetch(`${API}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: update.callback_query.id })
      });

      if (data === "menu") {
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
            reply_markup: JSON.stringify(keyboard)
          })
        });

      } else if (data === "about") {
        await sendText(chat_id, "🤖 Bot ini dibuat dengan *Node.js + Vercel Serverless*.\nDikembangkan oleh Vinzz Official.");

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

  // helper kirim pesan
  async function sendText(chat_id, text) {
    await fetch(`${API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text, parse_mode: "Markdown" })
    });
  }
}
