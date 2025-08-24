export default async function handler(req, res) {
  // === CONFIG ===
  const TOKEN = process.env.TG_TOKEN || "8396430373:AAGZ9lbLgPhAhIZUghflXgYls1taRpmPudY"; // better: set di Vercel Env (TG_TOKEN)
  const OWNER_NAME = "Vinzz Official";
  const OWNER_CONTACT = "@vinzz_official_store";
  const WHATSAPP_CONTACT = "wa.me/62815247824152"

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
            `Selamat datang di <b>nakano miku multi device</b> 🚀\n` + `<b>Version:</b> 2.0.0\n` +
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
        /Masukkan IP atau domain/.test(
          update.message.reply_to_message.text || ""
        )
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
            `Selamat datang di <b>nakano miku multi device</b> 🚀\n` + `<b>Version:</b> 2.0.0\n` +
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
            `Bot multi fungsi yang di kembangkan oleh <b>Vinzz Official</b> dengan banyak fitur tampa <b>limit</b>.\n`,
          aboutKeyboard()
        );
        return ok(res);
      }

      if (data === "owksnwikwns") {
        await editOrSend(
          chat_id,
          message_id,
          `👤 <b>Owner</b>\n` +
            `Nama: <b>${OWNER_NAME}</b>\n` +
            `Kontak: <b>${OWNER_CONTACT}</b>\n` +
            `Whatsapp: ${WHATSAPP_CONTACT}`,
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
            `• APK mod search`,
          featuresKeyboard()
        );
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
  async function handleApkSearch(chat_id, query) {
  try {
    await sendHTML(chat_id, `🔎 Mencari: <code>${escapeHTML(query)}</code> ...`);

    const r = await fetch(
      `https://api.siputzx.my.id/api/apk/an1?search=${encodeURIComponent(query)}`
    );
    const j = await r.json();

    if (!j || !j.result || j.result.length === 0) {
      await sendHTML(chat_id, `❌ Tidak ada hasil untuk: <code>${escapeHTML(query)}</code>`);
      return;
    }

    // ambil maksimal 5 hasil pertama biar gak spam
    const results = j.result.slice(0, 5);

    for (const item of results) {
      const caption =
        `📱 <b>${escapeHTML(item.title || "-")}</b>\n` +
        (item.category ? `Kategori: ${escapeHTML(item.category)}\n` : "") +
        (item.version ? `Versi: ${escapeHTML(item.version)}\n` : "") +
        (item.size ? `Size: ${escapeHTML(item.size)}\n` : "") +
        (item.link ? `🔗 <a href="${item.link}">Download</a>\n` : "");

      if (item.thumbnail) {
        await sendPhoto(chat_id, item.thumbnail, caption);
      } else {
        await sendHTML(chat_id, caption);
      }
    }
  } catch (err) {
    console.error("APK Search error:", err);
    await sendHTML(chat_id, "⚠️ Gagal mencari aplikasi. Coba lagi nanti.");
  }
}

  function startKeyboard() {
    return mkInline([
      [
        { text: "🧩 Fitur", callback_data: "feaksnwikwns" },
        { text: "ℹ️ About", callback_data: "abksnwikwns" },
      ],
      [
        { text: "👤 Owner", callback_data: "owksnwikwns" },
            { text: "🪀 Whatsapp", url: "https://wa.me/62815247824152" }
      ],
    ]);
  }

  function aboutKeyboard() {
    return mkInline([[{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }]]);
  }

  function featuresKeyboard() {
    return mkInline([
      [{ text: "🛰 IP Tracker", callback_data: "ipksnwikwns" }],
      [{ text: "🔍 Apk Mod", callback_data: "apnehisjeneh" }],
      [{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }],
    ]);
  }

  function backKeyboard() {
    return mkInline([[{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }]]);
  }

  async function requestIpInput(chat_id) {
    const payload = {
      chat_id,
      text: "🛰 <b>IP Tracker</b>\nMasukkan IP atau domain (contoh: <code>1.1.1.1</code> atau <code>google.com</code>) lalu kirim balasan ini.",
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
    if (info.isp) lines.push(`ISP: ${info.isp}`);
    if (
      typeof info.latitude !== "undefined" &&
      typeof info.longitude !== "undefined"
    ) {
      lines.push(`Koordinat: ${info.latitude}, ${info.longitude}`);
      lines.push(`Map: https://maps.google.com/?q=${info.latitude},${info.longitude}`);
    }
    if (info.timezone) lines.push(`Zona Waktu: ${info.timezone}`);
    if (typeof info.proxy !== "undefined")
      lines.push(`Proxy/VPN: ${info.proxy ? "Ya" : "Tidak"}`);

    await sendHTML(chat_id, lines.join("\n"));
  }

  async function toIP(target) {
    const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
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
      .replace(/>/g, "&gt;");
  }

  function ok(res) {
    return res.status(200).json({ ok: true });
  }
    }
