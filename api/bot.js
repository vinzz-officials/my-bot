export default async function handler(req, res) {
  // === CONFIG ===
  const TOKEN = process.env.TG_TOKEN || "8396430373:AAGZ9lbLgPhAhIZUghflXgYls1taRpmPudY";
  const OWNER_NAME = "Vinzz Official";
  const OWNER_CONTACT = "@vinzz_official_store";
  const WHATSAPP_CONTACT = "wa.me/62815247824152";

  const API = `https://api.telegram.org/bot${TOKEN}`;

  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const update = req.body;

  try {
    // ========= TEXT MESSAGE =========
    if (update.message) {
      const chat_id = update.message.chat.id;
      const text = (update.message.text || "").trim();

      if (text === "/start") {
        await sendHTML(
          chat_id,
          `<b>👋 Halo!</b>\nSelamat datang di <b>nakano miku multi device</b> 🚀\n<b>Version:</b> 2.0.0\nPilih menu di bawah untuk mulai.`,
          startKeyboard()
        );
        return ok(res);
      }

      if (text === "/help") {
        await sendHTML(chat_id, `📌 <b>Bantuan</b>\n\n• /start — buka menu utama\n• Pilih tombol untuk fitur`);
        return ok(res);
      }

      // === Reply Handlers ===
      if (update.message.reply_to_message) {
        const replyText = update.message.reply_to_message.text || "";

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

        if (/Masukkan username \/ url TikTok/.test(replyText)) {
          if (/^https?:\/\/(www\.)?tiktok\.com\//i.test(text)) {
            await handleTiktokDownload(chat_id, text);
          } else {
            const username = text.replace(/^@/, "");
            await handleTiktokStalk(chat_id, username);
          }
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

      await fetch(`${API}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: cq.id }),
      });

      if (data === "menksnwikwns") {
        await editOrSend(chat_id, message_id, `<b>👋 Halo!</b>\nSelamat datang di <b>nakano miku multi device</b> 🚀\n<b>Version:</b> 2.0.0\nPilih menu di bawah untuk mulai.`, startKeyboard());
        return ok(res);
      }

      if (data === "abksnwikwns") {
        await editOrSend(chat_id, message_id, `ℹ️ <b>Tentang Bot</b>\n\nBot multi fungsi 24/7 dikembangkan oleh <b>Vinzz Official</b>.`, aboutKeyboard());
        return ok(res);
      }

      if (data === "owksnwikwns") {
        await editOrSend(chat_id, message_id, `👤 <b>Owner</b>\nNama: <b>${escapeHTML(OWNER_NAME)}</b>\nKontak: ${escapeHTML(OWNER_CONTACT)}\nWhatsapp: ${escapeHTML(WHATSAPP_CONTACT)}`, backKeyboard());
        return ok(res);
      }

      if (data === "feaksnwikwns") {
        await editOrSend(chat_id, message_id, `🧩 <b>Fitur</b>\n\n• IP Tracker\n• APK search\n• Pinterest search\n• TikTok Stalk/Downloader`, featuresKeyboard());
        return ok(res);
      }

      if (data === "apnehisjeneh") {
        await tg("sendMessage", {
          chat_id,
          text: "🔍 <b>APK Search</b>\nMasukkan kata kunci aplikasi/game:",
          parse_mode: "HTML",
          reply_markup: JSON.stringify({ force_reply: true, selective: true }),
        });
        return ok(res);
      }

      if (data === "pinaknshians") {
        await tg("sendMessage", {
          chat_id,
          text: "📷 <b>Pinterest search</b>\nMasukkan judul foto:",
          parse_mode: "HTML",
          reply_markup: JSON.stringify({ force_reply: true, selective: true }),
        });
        return ok(res);
      }

      if (data === "ipksnwikwns") {
        await requestIpInput(chat_id);
        return ok(res);
      }

      if (data === "tiktok") {
        await tg("sendMessage", {
          chat_id,
          text: "🎵 <b>TikTok</b>\nMasukkan username (@user) atau url video TikTok:",
          parse_mode: "HTML",
          reply_markup: JSON.stringify({ force_reply: true, selective: true }),
        });
        return ok(res);
      }

      return ok(res);
    }

    return ok(res);
  } catch (err) {
    console.error("BOT ERROR:", err);
    return res.status(200).json({ ok: false, error: err?.message || String(err) });
  }

  // ========= KEYBOARDS =========
  function startKeyboard() {
    return mkInline([
      [{ text: "🧩 Fitur", callback_data: "feaksnwikwns" }, { text: "ℹ️ About", callback_data: "abksnwikwns" }],
      [{ text: "👤 Owner", callback_data: "owksnwikwns" }, { text: "🪀 Whatsapp", url: "https://wa.me/62815247824152" }],
    ]);
  }

  function aboutKeyboard() {
    return mkInline([[{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }]]);
  }

  function featuresKeyboard() {
    return mkInline([
      [{ text: "🛰 IP Tracker", callback_data: "ipksnwikwns" }, { text: "🔍 Apk Mod", callback_data: "apnehisjeneh" }],
      [{ text: "📷 Pinterest", callback_data: "pinaknshians" }],
      [{ text: "🎵 TikTok", callback_data: "tiktok" }],
      [{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }],
    ]);
  }

  function backKeyboard() {
    return mkInline([[{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }]]);
  }

  // ========= HANDLERS =========
  async function handleApkSearch(chat_id, query) {
    try {
      await sendHTML(chat_id, `🔎 Mencari: <code>${escapeHTML(query)}</code> ...`);
      const result2 = await fetch(`https://api.siputzx.my.id/api/apk/an1?search=${encodeURIComponent(query)}`);
      const json = await result2.json();

      if (!json?.data?.length) {
        await sendHTML(chat_id, `❌ Tidak ada hasil untuk: <code>${escapeHTML(query)}</code>`);
        return;
      }

      for (const item of json.data.slice(0, 5)) {
        const caption =
          `📱 <b>${escapeHTML(item.title || "-")}</b>\n` +
          (item.developer ? `👨‍💻 Dev: ${escapeHTML(item.developer)}\n` : "") +
          (item.type ? `📂 Tipe: ${escapeHTML(item.type)}\n` : "") +
          (item.rating?.value ? `⭐ Rating: ${item.rating.value} (${item.rating.percentage}%)\n` : "") +
          (item.link ? `🔗 <a href="${item.link}">Download</a>\n` : "");
        if (item.image) await sendPhoto(chat_id, item.image, caption);
        else await sendHTML(chat_id, caption);
      }
    } catch (err) {
      console.error("APK Search error:", err);
      await sendHTML(chat_id, "⚠️ Gagal mencari aplikasi. Coba lagi nanti.");
    }
  }

  async function handlePinterestSearch(chat_id, query) {
    try {
      await sendHTML(chat_id, `🔎 Mencari gambar Pinterest untuk: <code>${escapeHTML(query)}</code> ...`);
      const res = await fetch(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(query)}&type=image`);
      const json = await res.json();

      if (!json?.data?.length) {
        await sendHTML(chat_id, `❌ Tidak ada hasil untuk: <code>${escapeHTML(query)}</code>`);
        return;
      }

      for (const item of json.data.slice(0, 5)) {
        const caption =
          `📌 <b>${escapeHTML(item.grid_title || item.description || "Tanpa judul")}</b>\n` +
          (item.pinner?.full_name ? `👤 ${escapeHTML(item.pinner.full_name)} (@${escapeHTML(item.pinner.username)})\n` : "") +
          (item.board?.name ? `📂 Board: ${escapeHTML(item.board.name)}\n` : "") +
          (item.reaction_counts?.["1"] ? `❤️ ${item.reaction_counts["1"]} likes\n` : "") +
          (item.pin ? `🔗 <a href="${item.pin}">Lihat di Pinterest</a>` : "");
        const img = item.image_url || item.images || item.url || item.image;
        if (img) await sendPhoto(chat_id, img, caption);
        else await sendHTML(chat_id, caption);
      }
    } catch (err) {
      console.error("Pinterest Search error:", err);
      await sendHTML(chat_id, "⚠️ Gagal mencari di Pinterest. Coba lagi nanti.");
    }
  }

  async function requestIpInput(chat_id) {
    await tg("sendMessage", {
      chat_id,
      text: "🛰 <b>IP Tracker</b>\nMasukkan IP/domain lalu kirim balasan ini.",
      parse_mode: "HTML",
      reply_markup: JSON.stringify({ force_reply: true, selective: true }),
    });
  }

  async function handleIpLookup(chat_id, target) {
    await sendHTML(chat_id, `🔎 Memeriksa: <code>${escapeHTML(target)}</code> ...`);
    const ip = await toIP(target);
    if (!ip) return sendHTML(chat_id, `❌ Tidak bisa resolve target: <code>${escapeHTML(target)}</code>`);
    const info = await getIpInfo(ip);
    if (!info) return sendHTML(chat_id, `⚠️ Lookup gagal untuk IP <code>${ip}</code>.`);

    const lines = [];
    lines.push(`🛰 <b>IP Tracker Result</b>`);
    lines.push(`IP: <code>${ip}</code>`);
    if (info.hostname) lines.push(`Host: <code>${escapeHTML(info.hostname)}</code>`);
    if (info.city || info.region || info.country_name) lines.push(`Lokasi: ${[info.city, info.region, info.country_name].filter(Boolean).join(", ")}`);
    if (info.org || info.asn) lines.push(`ASN/Org: ${[info.asn, info.org].filter(Boolean).join(" / ")}`);
    if (info.isp) lines.push(`ISP: ${escapeHTML(info.isp)}`);
    if (info.latitude !== undefined && info.longitude !== undefined) {
      lines.push(`Koordinat: ${info.latitude},${info.longitude}`);
      lines.push(`Map: https://maps.google.com/?q=${info.latitude},${info.longitude}`);
    }
    if (info.timezone) lines.push(`Zona Waktu: ${escapeHTML(info.timezone)}`);
    if (info.proxy !== undefined) lines.push(`Proxy/VPN: ${info.proxy ? "Ya" : "Tidak"}`);

    await sendHTML(chat_id, lines.join("\n"));
  }

  async function handleTiktokStalk(chat_id, username) {
    try {
      await sendHTML(chat_id, `🔎 Mengecek profil TikTok: <code>${escapeHTML(username)}</code> ...`);
      const res = await fetch(`https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(username)}`);
      const json = await res.json();
      if (!json?.status) return sendHTML(chat_id, `❌ Username <code>${escapeHTML(username)}</code> tidak ditemukan.`);

      const u = json.data.user;
      const s = json.data.stats;
      const caption =
        `🎵 <b>TikTok Profile</b>\n\n` +
        `👤 <b>${escapeHTML(u.nickname)}</b> (@${escapeHTML(u.uniqueId)})\n` +
        (u.signature ? `📝 Bio: ${escapeHTML(u.signature)}\n` : "") +
        (u.bioLink?.link ? `🔗 <a href="${u.bioLink.link}">${u.bioLink.link}</a>\n` : "") +
        `\n📊 <b>Stats</b>\n` +
        `👥 Followers: ${s.followerCount.toLocaleString()}\n` +
        `👤 Following: ${s.followingCount.toLocaleString()}\n` +
        `❤️ Likes: ${s.heartCount.toLocaleString()}\n` +
        `🎬 Video: ${s.videoCount.toLocaleString()}`;
      await sendPhoto(chat_id, u.avatarLarger, caption);
    } catch (err) {
      console.error("TikTok Stalk error:", err);
      await sendHTML(chat_id, "⚠️ Gagal mengambil data TikTok.");
    }
  }

  async function handleTiktokDownload(chat_id, url) {
    try {
      await sendHTML(chat_id, `⬇️ Mendownload video TikTok...\n<code>${escapeHTML(url)}</code>`);
      const res = await fetch(`https://api.siputzx.my.id/api/download/tiktok?url=${encodeURIComponent(url)}`);
      const json = await res.json();
      if (!json?.status || !json.data) return sendHTML(chat_id, "❌ Gagal download video TikTok.");

      const v = json.data;
      const caption =
        `🎵 <b>TikTok Video</b>\n` +
        (v.title ? `📝 ${escapeHTML(v.title)}\n` : "") +
        (v.author ? `👤 ${escapeHTML(v.author.uniqueId)}\n` : "");
      await tg("sendVideo", { chat_id, video: v.play, caption, parse_mode: "HTML" });
    } catch (err) {
      console.error("TikTok Download error:", err);
      await sendHTML(chat_id, "⚠️ Gagal mengambil video TikTok.");
    }
  }

  async function toIP(target) {
    const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    if (ipRegex.test(target)) return target;
    try {
      const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(target)}&type=A`);
      const j = await r.json();
      const a = j?.Answer?.find((x) => x.type === 1 && x.data);
      return a?.data || null;
    } catch {
      return null;
    }
  }

  async function getIpInfo(ip) {
    try {
      const r = await fetch(`https://ipapi.co/${ip}/json/`);
      const j = await r.json();
      if (j && !j.error) return { ip: j.ip, hostname: j.hostname, city: j.city, region: j.region, country_name: j.country_name, asn: j.asn, org: j.org, latitude: j.latitude, longitude: j.longitude, timezone: j.timezone, proxy: j.proxy };
    } catch {}
    try {
      const r2 = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,timezone,isp,org,as,query,reverse,proxy`);
      const j2 = await r2.json();
      if (j2?.status === "success") return { ip: j2.query, hostname: j2.reverse, city: j2.city, region: j2.regionName, country_name: j2.country, asn: j2.as, org: j2.org, isp: j2.isp, latitude: j2.lat, longitude: j2.lon, timezone: j2.timezone, proxy: j2.proxy };
    } catch {}
    return null;
  }

  // ========= UTIL =========
  function mkInline(inline_keyboard) {
    return JSON.stringify({ inline_keyboard });
  }
  async function tg(method, payload) {
    await fetch(`${API}/${method}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  }
  async function sendHTML(chat_id, html, reply_markup) {
    await tg("sendMessage", { chat_id, text: html, parse_mode: "HTML", ...(reply_markup ? { reply_markup } : {}) });
  }
  async function sendPhoto(chat_id, photoUrl, captionHTML, reply_markup) {
    await tg("sendPhoto", { chat_id, photo: photoUrl, caption: captionHTML, parse_mode: "HTML", ...(reply_markup ? { reply_markup } : {}) });
  }
  async function editOrSend(chat_id, message_id, html, reply_markup) {
    try {
      await tg("editMessageText", { chat_id, message_id, text: html, parse_mode: "HTML", ...(reply_markup ? { reply_markup } : {}) });
    } catch {
      await sendHTML(chat_id, html, reply_markup);
    }
  }
  function escapeHTML(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function ok(res) {
    return res.status(200).json({ ok: true });
  }
           }
