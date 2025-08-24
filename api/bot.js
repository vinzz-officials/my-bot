export default async function handler(req, res) {
  // === CONFIG ===
  const TOKEN = process.env.TG_TOKEN || "8396430373:AAGZ9lbLgPhAhIZUghflXgYls1taRpmPudY"; // disarankan: gunakan env var TG_TOKEN
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
          `<b>👋 Halo!</b>\n` +
            `Selamat datang di <b>nakano miku multi device</b> 🚀\n` +
            `<b>Version:</b> 2.0.0\n` +
            `Pilih menu di bawah untuk mulai.`,
          startKeyboard()
        );
        return ok(res);
      }

      if (text === "/help") {
        await sendHTML(
          chat_id,
          `📌 <b>Bantuan</b>\n\n` +
            `• /start — buka menu utama\n` +
            `• Pilih tombol untuk fitur`
        );
        return ok(res);
      }

      // ===== REPLY HANDLER =====
if (update.message.reply_to_message) {
  const repliedText = update.message.reply_to_message.text || "";
  const url = text.trim();

  if (/TikTok Video Download/.test(repliedText)) {
    await handleTiktokVideoDownload(chat_id, url);
    return ok(res);
  }

  if (/TikTok Photo\/Slideshow Download/.test(repliedText)) {
    await handleTiktokPhotoDownload(chat_id, url);
    return ok(res);
  }
}

      if (
        update.message.reply_to_message &&
        /Masukkan username TikTok/.test(update.message.reply_to_message.text || "")
      ) {
        const username = text.replace(/^@/, ""); // hapus @ kalau ada
        await handleTiktokStalk(chat_id, username);
        return ok(res);
      }
      
      if (
        update.message.reply_to_message &&
        /APK Search/.test(update.message.reply_to_message.text || "")
      ) {
        const query = text;
        await handleApkSearch(chat_id, query);
        return ok(res);
      }

      if (
        update.message.reply_to_message &&
        /Pinterest search/.test(update.message.reply_to_message.text || "")
      ) {
        const query = text;
        await handlePinterestSearch(chat_id, query);
        return ok(res);
      }

      if (
        update.message.reply_to_message &&
        /Masukkan IP atau domain/.test(update.message.reply_to_message.text || "")
      ) {
        const target = text;
        await handleIpLookup(chat_id, target);
        return ok(res);
      }

      // pesan lain diabaikan
      return ok(res);
    }

    // ========= CALLBACK BUTTON =========
    if (update.callback_query) {
      const cq = update.callback_query;
      const chat_id = cq.message.chat.id;
      const message_id = cq.message.message_id;
      const data = cq.data;

      // wajib biar tombol gak “loading” putih
      await fetch(`${API}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: cq.id }),
      });

      if (data === "menksnwikwns") {
        await editOrSend(
          chat_id,
          message_id,
          `<b>👋 Halo!</b>\n` +
            `Selamat datang di <b>nakano miku multi device</b> 🚀\n` +
            `<b>Version:</b> 2.0.0\n` +
            `Pilih menu di bawah untuk mulai.`,
          startKeyboard()
        );
        return ok(res);
      }

      if (data === "abksnwikwns") {
        await editOrSend(
          chat_id,
          message_id,
          `ℹ️ <b>Tentang Bot</b>\n\n` +
            `Bot multi fungsi yang berjalan tanpa batas 24/7 yang bisa bertahan hampir selamanya, dikembangkan oleh <b>Vinzz Official</b> dengan banyak fitur tanpa <b>limit</b>.`,
          aboutKeyboard()
        );
        return ok(res);
      }

      if (data === "owksnwikwns") {
        await editOrSend(
          chat_id,
          message_id,
          `👤 <b>Owner</b>\n` +
            `Nama: <b>${escapeHTML(OWNER_NAME)}</b>\n` +
            `Kontak: ${escapeHTML(OWNER_CONTACT)}\n` +
            `Whatsapp: ${escapeHTML(WHATSAPP_CONTACT)}`,
          backKeyboard()
        );
        return ok(res);
      }

      if (data === "feaksnwikwns") {
        await editOrSend(
          chat_id,
          message_id,
          `🧩 <b>Fitur</b>\n\n` +
            `• IP Tracker (IP/Domain → lokasi, ASN, ISP, koordinat)\n` +
            `• APK search\n` +
            `• Pinterest search`,
          featuresKeyboard()
        );
        return ok(res);
      }

       if (data === "tikkbakakwnjs") {
        await tg("sendMessage", {
          chat_id,
          text:
            "🎵 <b>TikTok Stalk</b>\nMasukkan username TikTok (contoh: <code>mrbeast</code>):",
          parse_mode: "HTML",
          reply_markup: JSON.stringify({ force_reply: true, selective: true }),
        });
        return ok(res);
      }
      
if (data === "tikdlvideo") {
  await tg("sendMessage", {
    chat_id,
    text: "⬇️ <b>TikTok Video Download</b>\nKirim link TikTok video di bawah ini:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}

if (data === "tikdlfoto") {
  await tg("sendMessage", {
    chat_id,
    text: "📸 <b>TikTok Photo/Slideshow Download</b>\nKirim link TikTok slideshow/foto di bawah ini:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}
      
      if (data === "apnehisjeneh") {
  await tg("sendMessage", {
    chat_id,
    text: "🔍 <b>APK Search</b>\nMasukkan kata kunci aplikasi/game yang ingin dicari:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}

      if (data === "pinaknshians") {
        await tg("sendMessage", {
          chat_id,
          text:
            "📷 <b>Pinterest search</b>\nMasukkan judul foto yang ingin dicari:",
          parse_mode: "HTML",
          reply_markup: JSON.stringify({ force_reply: true, selective: true }),
        });
        return ok(res);
      }

      if (data === "ipksnwikwns") {
        // minta user balas dengan IP/domain via Force Reply
        await requestIpInput(chat_id);
        return ok(res);
      }

      // fallback
      return ok(res);
    }

    return ok(res);
  } catch (err) {
    console.error("BOT ERROR:", err);
    try {
      return res
        .status(200)
        .json({ ok: false, error: err?.message || String(err) });
    } catch {
      return res.status(200).send("OK");
    }
  }

  // ========= HELPERS =========

  function startKeyboard() {
    return mkInline([
      [
        { text: "🧩 Fitur", callback_data: "feaksnwikwns" },
        { text: "ℹ️ About", callback_data: "abksnwikwns" },
      ],
      [
        { text: "👤 Owner", callback_data: "owksnwikwns" },
        { text: "🪀 Whatsapp", url: "https://wa.me/62815247824152" },
      ],
    ]);
  }

  function featuresKeyboard() {
  return mkInline([
    [
      { text: "🛰 IP Tracker", callback_data: "ipksnwikwns" },
      { text: "🔍 Apk Mod", callback_data: "apnehisjeneh" }
    ],
    [
      { text: "📷 Pinterest", callback_data: "pinaknshians" },
      { text: "🎵 TikTok Stalk", callback_data: "tikkbakakwnjs" }
    ],
    [
      { text: "⬇️ TikTok Video", callback_data: "tikdlvideo" },
      { text: "📸 TikTok Foto", callback_data: "tikdlfoto" }
    ],
    [{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }]
  ]);
}

  function backKeyboard() {
    return mkInline([[{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }]]);
  }

  // ====== FEATURE HANDLERS ======

async function handleTiktokStalk(chat_id, username) {
    try {
      await sendHTML(chat_id, `🔎 Mencari info TikTok: <code>${escapeHTML(username)}</code> ...`);

      const res = await fetch(
        `https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(username)}`
      );
      const json = await res.json();

      if (!json || !json.status || !json.data?.user) {
        await sendHTML(chat_id, `❌ Tidak ada data untuk username <code>${escapeHTML(username)}</code>`);
        return;
      }

      const u = json.data.user;
      const stats = json.data.stats;

      const caption =
        `🎵 <b>TikTok Profile</b>\n\n` +
        `👤 <b>${escapeHTML(u.nickname || "-")}</b>\n` +
        `🔗 @${escapeHTML(u.uniqueId)}\n` +
        (u.signature ? `📝 Bio: ${escapeHTML(u.signature)}\n` : "") +
        (u.verified ? `✔️ Verified\n` : "") +
        (stats
          ? `\n👥 Followers: ${stats.followerCount}\n` +
            `👤 Following: ${stats.followingCount}\n` +
            `❤️ Likes: ${stats.heartCount}\n` +
            `🎬 Videos: ${stats.videoCount}\n`
          : "");

      if (u.avatarLarger) {
        await sendPhoto(chat_id, u.avatarLarger, caption);
      } else {
        await sendHTML(chat_id, caption);
      }
    } catch (err) {
      console.error("TikTok Stalk error:", err);
      await sendHTML(chat_id, "⚠️ Gagal mengambil data TikTok. Coba lagi nanti.");
    }
  }
  
async function handleApkSearch(chat_id, query) {
  try {
    await sendHTML(chat_id, `🔎 Mencari: <code>${escapeHTML(query)}</code> ...`);

    const result2 = await fetch(
      `https://api.siputzx.my.id/api/apk/an1?search=${encodeURIComponent(query)}`
    );
    const json = await result2.json();

    if (!json || !json.data || json.data.length === 0) {
      await sendHTML(chat_id, `❌ Tidak ada hasil untuk: <code>${escapeHTML(query)}</code>`);
      return;
    }

    const results = json.data.slice(0, 5);

    for (const item of results) {
      const caption =
        `📱 <b>${escapeHTML(item.title || "-")}</b>\n` +
        (item.developer ? `👨‍💻 Dev: ${escapeHTML(item.developer)}\n` : "") +
        (item.type ? `📂 Tipe: ${escapeHTML(item.type)}\n` : "") +
        (item.rating?.value ? `⭐ Rating: ${item.rating.value} (${item.rating.percentage}%)\n` : "") +
        (item.link ? `🔗 <a href="${item.link}">Download</a>\n` : "");

      if (item.image) {
        await sendPhoto(chat_id, item.image, caption);
      } else {
        await sendHTML(chat_id, caption);
      }
    }
  } catch (err) {
    console.error("APK Search error:", err);
    await sendHTML(chat_id, "⚠️ Gagal mencari aplikasi. Coba lagi nanti.");
  }
}


async function handleTiktokVideoDownload(chat_id, url) {
  try {
    await sendHTML(chat_id, "⏳ Sedang memproses TikTok video...");

    const res = await fetch(
      `https://api.vreden.my.id/api/tiktok?url=${encodeURIComponent(url)}`
    );
    const json = await res.json();

    if (!json?.result?.status) {
      await sendHTML(chat_id, "❌ Gagal mengambil data TikTok. Pastikan link valid.");
      return;
    }

    const { result } = json;
    const videoData = result.data?.[0]; // ambil video pertama (nowatermark)
    if (!videoData || !videoData.url) {
      await sendHTML(chat_id, "⚠️ Tidak ada video ditemukan di link tersebut.");
      return;
    }

    await tg("sendVideo", {
      chat_id,
      video: videoData.url,
      caption: `🎥 <b>${escapeHTML(result.title || "Video TikTok")}</b>\n👤 Creator: ${escapeHTML(result.author?.nickname || "-")}`,
      parse_mode: "HTML",
    });
  } catch (err) {
    console.error("TikTok Video Download error:", err);
    await sendHTML(chat_id, "⚠️ Gagal mendownload video. Coba lagi nanti.");
  }
}

async function handleTiktokPhotoDownload(chat_id, url) {
  try {
    await sendHTML(chat_id, "⏳ Sedang memproses TikTok foto...");

    const res = await fetch(
      `https://api.siputzx.my.id/api/d/tiktok?url=${encodeURIComponent(url)}`
    );
    const json = await res.json();

    if (!json || !json.status) {
      await sendHTML(chat_id, "❌ Gagal mengambil data TikTok. Pastikan link valid.");
      return;
    }

    const { type, urls } = json.data;

    if (type === "slideshow") {
      const images = urls || [];
      if (images.length === 0) {
        await sendHTML(chat_id, "⚠️ Tidak ada foto ditemukan di slideshow.");
        return;
      }

      for (const img of images.slice(0, 20)) {
        await sendPhoto(chat_id, img, "📸 TikTok Photo");
      }
    } else {
      await sendHTML(chat_id, "⚠️ Link ini bukan slideshow/foto TikTok.");
    }
  } catch (err) {
    console.error("TikTok Photo Download error:", err);
    await sendHTML(chat_id, "⚠️ Gagal mendownload foto. Coba lagi nanti.");
  }
}

  async function handlePinterestSearch(chat_id, query) {
    try {
      await sendHTML(
        chat_id,
        `🔎 Mencari gambar Pinterest untuk: <code>${escapeHTML(query)}</code> ...`
      );

      const res = await fetch(
        `https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(
          query
        )}&type=image`
      );
      const json = await res.json();

      if (!json || !json.data || json.data.length === 0) {
        await sendHTML(
          chat_id,
          `❌ Tidak ada hasil Pinterest untuk: <code>${escapeHTML(
            query
          )}</code>`
        );
        return;
      }

      const results = json.data.slice(0, 5); // batas maksimal 5 biar gak spam

      for (const item of results) {
        const caption =
          `📌 <b>${escapeHTML(
            item.grid_title || item.description || "Tanpa judul"
          )}</b>\n` +
          (item.pinner?.full_name
            ? `👤 ${escapeHTML(item.pinner.full_name)} (@${escapeHTML(
                item.pinner.username
              )})\n`
            : "") +
          (item.board?.name
            ? `📂 Board: ${escapeHTML(item.board.name)}\n`
            : "") +
          (item.reaction_counts?.["1"]
            ? `❤️ ${item.reaction_counts["1"]} likes\n`
            : "") +
          (item.pin ? `🔗 <a href="${item.pin}">Lihat di Pinterest</a>` : "");

        const img =
          item.image_url || item.images || item.url || item.image || null;

        if (img) {
          await sendPhoto(chat_id, img, caption);
        } else {
          await sendHTML(chat_id, caption);
        }
      }
    } catch (err) {
      console.error("Pinterest Search error:", err);
      await sendHTML(
        chat_id,
        "⚠️ Gagal mencari di Pinterest. Coba lagi nanti."
      );
    }
  }

  
  async function requestIpInput(chat_id) {
    const payload = {
      chat_id,
      text:
        "🛰 <b>IP Tracker</b>\nMasukkan IP atau domain (contoh: <code>1.1.1.1</code> atau <code>google.com</code>) lalu kirim balasan ini.",
      parse_mode: "HTML",
      reply_markup: JSON.stringify({ force_reply: true, selective: true }),
    };
    await tg("sendMessage", payload);
  }

  async function handleIpLookup(chat_id, target) {
    await sendHTML(
      chat_id,
      `🔎 Memeriksa: <code>${escapeHTML(target)}</code> ...`
    );
    const ip = await toIP(target);
    if (!ip) {
      await sendHTML(
        chat_id,
        `❌ Tidak bisa resolve target: <code>${escapeHTML(target)}</code>`
      );
      return;
    }
    const info = await getIpInfo(ip);
    if (!info) {
      await sendHTML(
        chat_id,
        `⚠️ Lookup gagal untuk IP <code>${ip}</code>. Coba lagi nanti.`
      );
      return;
    }

    const lines = [];
    lines.push(`🛰 <b>IP Tracker Result</b>`);
    lines.push(`IP: <code>${ip}</code>`);
    if (info.hostname)
      lines.push(`Host: <code>${escapeHTML(info.hostname)}</code>`);
    if (info.city || info.region || info.country_name) {
      lines.push(
        `Lokasi: ${[info.city, info.region, info.country_name]
          .filter(Boolean)
          .join(", ")}`
      );
    }
    if (info.org || info.asn)
      lines.push(`ASN/Org: ${[info.asn, info.org].filter(Boolean).join(" / ")}`);
    if (info.isp) lines.push(`ISP: ${escapeHTML(info.isp)}`);
    if (
      typeof info.latitude !== "undefined" &&
      typeof info.longitude !== "undefined"
    ) {
      lines.push(`Koordinat: ${info.latitude}, ${info.longitude}`);
      lines.push(
        `Map: https://maps.google.com/?q=${info.latitude},${info.longitude}`
      );
    }
    if (info.timezone) lines.push(`Zona Waktu: ${escapeHTML(info.timezone)}`);
    if (typeof info.proxy !== "undefined")
      lines.push(`Proxy/VPN: ${info.proxy ? "Ya" : "Tidak"}`);

    await sendHTML(chat_id, lines.join("\n"));
  }

  async function toIP(target) {
    const ipRegex =
      /^(?:\d{1,3}\.){3}\d{1,3}$/; // IPv4 sederhana (tanpa validasi 0-255)
    if (ipRegex.test(target)) return target;
    try {
      const r = await fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(target)}&type=A`
      );
      const j = await r.json();
      const answers = j?.Answer || [];
      const a = answers.find((x) => x.type === 1 && x.data);
      return a?.data || null;
    } catch {
      return null;
    }
  }

  async function getIpInfo(ip) {
    try {
      const r = await fetch(`https://ipapi.co/${ip}/json/`);
      const j = await r.json();
      if (j && !j.error) {
        return {
          ip: j.ip,
          hostname: j.hostname,
          city: j.city,
          region: j.region,
          country_name: j.country_name,
          asn: j.asn,
          org: j.org,
          latitude: j.latitude,
          longitude: j.longitude,
          timezone: j.timezone,
          proxy: j.proxy,
        };
      }
    } catch {}
    try {
      const r2 = await fetch(
        `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,timezone,isp,org,as,query,reverse,proxy`
      );
      const j2 = await r2.json();
      if (j2 && j2.status === "success") {
        return {
          ip: j2.query,
          hostname: j2.reverse,
          city: j2.city,
          region: j2.regionName,
          country_name: j2.country,
          asn: j2.as,
          org: j2.org,
          isp: j2.isp,
          latitude: j2.lat,
          longitude: j2.lon,
          timezone: j2.timezone,
          proxy: j2.proxy,
        };
      }
    } catch {}
    return null;
  }

  // ====== UTIL ======

  function mkInline(inline_keyboard) {
    return JSON.stringify({ inline_keyboard });
  }

  async function tg(method, payload) {
    await fetch(`${API}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  async function sendHTML(chat_id, html, reply_markup) {
    await tg("sendMessage", {
      chat_id,
      text: html,
      parse_mode: "HTML",
      ...(reply_markup ? { reply_markup } : {}),
    });
  }

  async function sendPhoto(chat_id, photoUrl, captionHTML, reply_markup) {
    await tg("sendPhoto", {
      chat_id,
      photo: photoUrl,
      caption: captionHTML,
      parse_mode: "HTML",
      ...(reply_markup ? { reply_markup } : {}),
    });
  }

  async function editOrSend(chat_id, message_id, html, reply_markup) {
    try {
      await tg("editMessageText", {
        chat_id,
        message_id,
        text: html,
        parse_mode: "HTML",
        ...(reply_markup ? { reply_markup } : {}),
      });
    } catch {
      await sendHTML(chat_id, html, reply_markup);
    }
  }

  function escapeHTML(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function ok(res) {
    return res.status(200).json({ ok: true });
  }
          }
