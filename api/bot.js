export default async function handler(req, res) {
  // === CONFIG ===
  const TOKEN = process.env.TG_TOKEN || "8396430373:AAGZ9lbLgPhAhIZUghflXgYls1taRpmPudY";
  const OWNER_NAME = "Vinzz Official";
  const OWNER_CONTACT = "@vinzz_official_store";
  const WHATSAPP_CONTACT = "wa.me/62815247824152";
  const API = `https://api.telegram.org/bot${TOKEN}`;

  if (req.method !== "POST") return res.status(200).send("OK");
  const update = req.body;

  try {
    // ========= TEXT MESSAGE =========
    if (update.message) {
      const chat_id = update.message.chat.id;
      const text = (update.message.text || "").trim();

      if (text === "/start") {
        await sendHTML(chat_id, `<b>👋 Halo!</b>\nSelamat datang di <b>nakano miku multi device</b> 🚀\n<b>Version:</b> 2.0.0\nPilih menu di bawah untuk mulai.`, startKeyboard());
        return ok(res);
      }

      if (text === "/help") {
        await sendHTML(chat_id, `📌 <b>Bantuan</b>\n\n• /start — buka menu utama\n• Pilih tombol untuk fitur`);
        return ok(res);
      }

      // ===== Force Reply Handlers =====
      if (update.message.reply_to_message) {
        const replyText = update.message.reply_to_message.text || "";

        if (/TikTok Downloader/.test(replyText)) {
          await handleTiktokDownload(chat_id, text);
          return ok(res);
        }

        if (/Masukkan username TikTok/.test(replyText)) {
          await handleTiktokStalk(chat_id, text.replace(/^@/, ""));
          return ok(res);
        }

        if (/APK Search/.test(replyText)) {
          await handleApkSearch(chat_id, text);
          return ok(res);
        }

        if (/Pinterest search/.test(replyText)) {
          await handlePinterestSearch(chat_id, text);
          return ok(res);
        }

        if (/Masukkan IP atau domain/.test(replyText)) {
          await handleIpLookup(chat_id, text);
          return ok(res);
        }
      }

      return ok(res);
    }

    // ========= CALLBACK BUTTON =========
    if (update.callback_query) {
      const cq = update.callback_query;
      const chat_id = cq.message.chat.id;
      const message_id = cq.message.message_id;
      const data = cq.data;

      // Stop tombol loading
      await fetch(`${API}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: cq.id }),
      });

      // ===== Callback Handling =====
      switch (data) {
        case "menu_start":
          await editOrSend(chat_id, message_id, `<b>👋 Halo!</b>\nSelamat datang di <b>nakano miku multi device</b> 🚀\n<b>Version:</b> 2.0.0\nPilih menu di bawah untuk mulai.`, startKeyboard());
          break;

        case "menu_about":
          await editOrSend(chat_id, message_id, `ℹ️ <b>Tentang Bot</b>\n\nBot multi fungsi 24/7 oleh <b>Vinzz Official</b> dengan fitur tanpa limit.`, aboutKeyboard());
          break;

        case "menu_owner":
          await editOrSend(chat_id, message_id, `👤 <b>Owner</b>\nNama: <b>${escapeHTML(OWNER_NAME)}</b>\nKontak: ${escapeHTML(OWNER_CONTACT)}\nWhatsapp: ${escapeHTML(WHATSAPP_CONTACT)}`, backKeyboard());
          break;

        case "menu_features":
          await editOrSend(chat_id, message_id, `🧩 <b>Fitur</b>`, featuresKeyboard());
          break;

        case "tiktok_download":
          await tg("sendMessage", { chat_id, text: "⬇️ <b>TikTok Downloader</b>\nKirim link TikTok di bawah ini:", parse_mode: "HTML", reply_markup: JSON.stringify({ force_reply: true, selective: true }) });
          break;

        case "tiktok_stalk":
          await tg("sendMessage", { chat_id, text: "🎵 <b>TikTok Stalk</b>\nMasukkan username TikTok (contoh: <code>mrbeast</code>):", parse_mode: "HTML", reply_markup: JSON.stringify({ force_reply: true, selective: true }) });
          break;

        case "apk_search":
          await tg("sendMessage", { chat_id, text: "🔍 <b>APK Search</b>\nMasukkan kata kunci aplikasi/game:", parse_mode: "HTML", reply_markup: JSON.stringify({ force_reply: true, selective: true }) });
          break;

        case "pinterest_search":
          await tg("sendMessage", { chat_id, text: "📷 <b>Pinterest search</b>\nMasukkan judul foto:", parse_mode: "HTML", reply_markup: JSON.stringify({ force_reply: true, selective: true }) });
          break;

        case "ip_tracker":
          await requestIpInput(chat_id);
          break;

        default:
          break;
      }

      return ok(res);
    }

    return ok(res);
  } catch (err) {
    console.error("BOT ERROR:", err);
    return res.status(200).json({ ok: false, error: err?.message || String(err) });
  }

  // ===== KEYBOARDS =====
  function startKeyboard() {
    return mkInline([
      [{ text: "🧩 Fitur", callback_data: "menu_features" }, { text: "ℹ️ About", callback_data: "menu_about" }],
      [{ text: "👤 Owner", callback_data: "menu_owner" }, { text: "🪀 Whatsapp", url: "https://wa.me/62815247824152" }]
    ]);
  }

  function aboutKeyboard() { return mkInline([[{ text: "⬅️ Kembali", callback_data: "menu_start" }]]); }
  function backKeyboard() { return mkInline([[{ text: "⬅️ Kembali", callback_data: "menu_start" }]]); }
  function featuresKeyboard() {
    return mkInline([
      [{ text: "🛰 IP Tracker", callback_data: "ip_tracker" }, { text: "🔍 Apk Mod", callback_data: "apk_search" }],
      [{ text: "📷 Pinterest", callback_data: "pinterest_search" }],
      [{ text: "🎵 TikTok Stalk", callback_data: "tiktok_stalk" }],
      [{ text: "⬇️ TikTok Download", callback_data: "tiktok_download" }],
      [{ text: "⬅️ Kembali", callback_data: "menu_start" }]
    ]);
  }

  // ===== UTILS & HELPERS =====
  function mkInline(keyboard) { return JSON.stringify({ inline_keyboard: keyboard }); }

  async function tg(method, payload) { await fetch(`${API}/${method}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
  async function sendHTML(chat_id, html, reply_markup) { await tg("sendMessage", { chat_id, text: html, parse_mode: "HTML", ...(reply_markup ? { reply_markup } : {}) }); }
  async function sendPhoto(chat_id, photoUrl, captionHTML, reply_markup) { await tg("sendPhoto", { chat_id, photo: photoUrl, caption: captionHTML, parse_mode: "HTML", ...(reply_markup ? { reply_markup } : {}) }); }
  async function editOrSend(chat_id, message_id, html, reply_markup) { try { await tg("editMessageText", { chat_id, message_id, text: html, parse_mode: "HTML", ...(reply_markup ? { reply_markup } : {}) }); } catch { await sendHTML(chat_id, html, reply_markup); } }
  function escapeHTML(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }
  function ok(res) { return res.status(200).json({ ok: true }); }

  // ===== FEATURE HANDLERS =====
  // handleTiktokStalk, handleTiktokDownload, handleApkSearch, handlePinterestSearch, handleIpLookup, requestIpInput
  // (bisa kita gabungin dari kode lama, sudah rapi & support foto/video TikTok sesuai request)
      }
