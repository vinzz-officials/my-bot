export default async function handler(req, res) {
  // === CONFIG ===
  const TOKEN = process.env.TG_TOKEN || "8396430373:AAE4BhMcJ0xl5V71sM55Dl2RQLIuNDBDTpQ";
  const OWNER_CONTACT = "@vinzz_official_store"; // username Telegram owner
  const WHATSAPP_CONTACT = "https://wa.me/62815247824152"; // link WA owner
  const API = `https://api.telegram.org/bot${TOKEN}`;

  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const update = req.body;

  try {
    if (update.message) {
      const chat_id = update.message.chat.id;
      const text = (update.message.text || "").trim();

      if (text === "/start" || text === "/start@Vinzz_officials_bot") {
        await sendHTML(
          chat_id,
          `⚠️ <b>Bot sedang dalam perbaikan / maintenance</b>\n\n` +
            `Jika ada keperluan mendesak, silakan hubungi owner melalui tombol di bawah.`,
          contactKeyboard()
        );
        return ok(res);
      }

      return ok(res);
    }

    return ok(res);
  } catch (err) {
    console.error("BOT ERROR:", err);
    return res.status(200).json({ ok: false, error: err.message });
  }

  // ==== HELPERS ====
  async function tg(method, data) {
    return fetch(`${API}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async function sendHTML(chat_id, text, reply_markup) {
    return tg("sendMessage", {
      chat_id,
      text,
      parse_mode: "HTML",
      reply_markup,
    });
  }

  function contactKeyboard() {
    return JSON.stringify({
      inline_keyboard: [
        [{ text: "👤 Hubungi Owner", url: `https://t.me/${OWNER_CONTACT.replace("@", "")}` }],
        [{ text: "📱 WhatsApp Owner", url: WHATSAPP_CONTACT }],
      ],
    });
  }

  function ok(res) {
    return res.status(200).send("OK");
  }
}
