export default async function handler(req, res) {
  // === CONFIG ===
  const TOKEN = process.env.TG_TOKEN || "8396430373:AAE4BhMcJ0xl5V71sM55Dl2RQLIuNDBDTpQ";
  const OWNER_NAME = "Vinzz Official";
  const OWNER_CONTACT = "@vinzz_official_store";
  const IdOwner = "7777604508";
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
      if (update.message.reply_to_message &&
    /Masukkan username Roblox/.test(update.message.reply_to_message.text || "")
) {
  const username = text.trim();
  await handleRobloxStalk(chat_id, username);
  return ok(res);
}

if (update.message.reply_to_message) {
  const repliedText = update.message.reply_to_message.text || "";
  const url = text.trim();

  if (/YouTube MP3 Downloader/.test(repliedText)) {
    await handleYtMp3Download(chat_id, url)
    return ok(res);
  }
  
  if (/iPhone Quote/.test(repliedText)) {
  const quoteText = text.trim();
  await handleIqc(chat_id, quoteText);
  return ok(res);
}

  if (/TikTok Video Download/.test(repliedText)) {
    await handleTiktokVideoDownload(chat_id, url);
    return ok(res);
  }

if (update.message.reply_to_message && /Cek Host/.test(update.message.reply_to_message.text || "")) {
  const targetUrl = text.trim();
  await handleCekHost(chat_id, targetUrl);
  return ok(res);
}

  if (/TikTok Photo Download/.test(repliedText)) {
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
        /Masukkan username Instagram/.test(update.message.reply_to_message.text || "")
      ) {
        const username = text.replace(/^@/, ""); 
        await handleIGStalk(chat_id, username);
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
  /TikTok Search/.test(update.message.reply_to_message.text || "")
) {
  const keyword = text.trim();
  if (keyword) {
    await handleTiktokSearch(chat_id, keyword);
  } else {
    await sendHTML(chat_id, "⚠️ Kata kunci kosong, coba lagi.");
  }
  return ok(res);
}

if (
  update.message.reply_to_message &&
  /Masukan Text/.test(update.message.reply_to_message.text || "")
) {
  const text = text.trim();
  if (text) {
    await handleText2Base64(chat_id, text);
  } else {
    await sendHTML(chat_id, "⚠️ Text kosong, coba lagi.");
  }
  return ok(res);
}

if (
  update.message.reply_to_message &&
  /Masukan Code Base64/.test(update.message.reply_to_message.text || "")
) {
  const text = text.trim();
  if (text) {
    await handleBase642Text(chat_id, text);
  } else {
    await sendHTML(chat_id, "⚠️ Code kosong, coba lagi.");
  }
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
          backKeyboard()
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
            `• APK Search\n` +
            `• Pinterest search\n` + `• Tiktok stalk\n` + `• Tiktok Download Video\n` + `• Tiktok Download Foto\n` + `• Roblox Stalk\n` + `• IG Stalk\n` + `• TikTok Search\n` + `• Youtube MP3 Downloader`,
          featuresKeyboard()
        );
        return ok(res);
      }

if (data === "robiwjwjkwmsj") {
  await tg("sendMessage", {
    chat_id,
    text: "🎮 <b>Roblox Stalk</b>\nMasukkan username Roblox:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}

if (data === "text2base64_page2") {
  await tg("sendMessage", {
    chat_id,
    text: "🔧 <b>Text to Base64</b>\nMasukkan Text:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}

if (data === "base642text_page2") {
  await tg("sendMessage", {
    chat_id,
    text: "🔧 <b>Base64 to Text</b>\nMasukkan Code Base64:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}

if (data === "ytaknskandj") {
  await tg("sendMessage", {
    chat_id,
    text: "🎶 <b>YouTube MP3 Downloader</b>\nKirim link YouTube di bawah ini:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}

       if (data === "igkwnakke") {
        await tg("sendMessage", {
          chat_id,
          text:
            "🎵 <b>IG Stalk</b>\nMasukkan username Instagram (contoh: <code>mrbeast</code>):",
          parse_mode: "HTML",
          reply_markup: JSON.stringify({ force_reply: true, selective: true }),
        });
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
      
      if (data === "cekhost_page2") {
  await tg("sendMessage", {
    chat_id,
    text: "🌐 <b>Cek Host</b>\nMasukkan URL atau domain untuk dicek:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}
      
if (data === "fitur_page2") {
await editOrSend(
          chat_id,
          message_id,
          `🧩 <b>Fitur</b>\n\n` +
            `• Cek Host\n` + `• Text to Base64\n` + `• Base64 to Text`,
          featuresKeyboard1()
        );
        return ok(res);
      }
      
      if (data === "fitur_page1") {
await editOrSend(
          chat_id,
          message_id,
          `🧩 <b>Fitur</b>\n\n` +
            `• IP Tracker (IP/Domain → lokasi, ASN, ISP, koordinat)\n` +
            `• APK Search\n` +
            `• Pinterest search\n` + `• Tiktok stalk\n` + `• Tiktok Download Video\n` + `• Tiktok Download Foto\n` + `• Roblox Stalk\n` + `• IG Stalk\n` + `• TikTok Search\n` + `• Youtube MP3 Downloader`,
          featuresKeyboard()
        );
        return ok(res);
      }
      
      if (data === "fitur_page_info") {
await editOrSend(
          chat_id,
          message_id,
          `<b>Silahkan Pilih Page</b>`,
          fitur_page_info()
          
        );
        return ok(res);
      }
      
if (data === "tikvidnaikaniwn") {
  await tg("sendMessage", {
    chat_id,
    text: "⬇️ <b>TikTok Video Download</b>\nKirim link TikTok video di bawah ini:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}

if (data === "tikfotnaikaniwn") {
  await tg("sendMessage", {
    chat_id,
    text: "📸 <b>TikTok Photo Download</b>\nKirim link TikTok foto di bawah ini:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}

if (data === "iqc_feature_page2") {
  await tg("sendMessage", {
    chat_id,
    text: "📱 <b>iPhone Quote</b>\nMasukkan text pesan:",
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
      
      if (data === "ratjwjnsjsjs") {
        await editOrSend(
          chat_id,
          message_id,
          `🌟 <b>Rate Bot</b>\n\nSilakan pilih rating kamu (1-5):`,
          JSON.stringify({
            inline_keyboard: [
              [
                { text: "⭐ 1", callback_data: "rate:1" },
                { text: "⭐⭐ 2", callback_data: "rate:2" },
                { text: "⭐⭐⭐ 3", callback_data: "rate:3" },
              ],
              [
                { text: "⭐⭐⭐⭐ 4", callback_data: "rate:4" },
                { text: "⭐⭐⭐⭐⭐ 5", callback_data: "rate:5" },
              ],
              [{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }],
            ],
          })
        );
        return ok(res);
      }

      if (data.startsWith("rate:")) {
  const rating = data.split(":")[1];
  const stars = "⭐".repeat(rating);

  // --- Balas ke user ---
  await editOrSend(
    chat_id,
    message_id,
    `✅ Terima kasih! Rating anda: ${stars}`,
    backKeyboard()
  );

  // --- Kirim notif ke Owner ---
  const user = cq.from; // ambil data user dari callback_query
  const username = user.username ? `@${user.username}` : user.first_name;
  const OWNER_ID = IdOwner;

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: OWNER_ID,
      text: `📩 <b>Rating Baru!</b>\n\n👤 User: ${username} (ID: <code>${user.id}</code>)\n⭐ Rating: ${stars}`,
      parse_mode: "HTML",
    }),
  });

  return ok(res);
}
      
if (data === "ttsjakwnsi") {
  await tg("sendMessage", {
    chat_id,
    text: "🔎 <b>TikTok Search</b>\nKetik kata kunci video yang ingin dicari:",
    parse_mode: "HTML",
    reply_markup: JSON.stringify({ force_reply: true, selective: true }),
  });
  return ok(res);
}

if (data.startsWith("ttsnkanaokejs:")) {
  const [_, keyword, indexStr] = data.split(":");
  const index = parseInt(indexStr, 10) || 0;
  await handleTiktokSearch(chat_id, keyword, index);
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
      [
       { text: "🌟 Rate", callback_data: "ratjwjnsjsjs" },
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
      { text: "⬇️ TikTok Video", callback_data: "tikvidnaikaniwn" },
      { text: "📸 TikTok Foto", callback_data: "tikfotnaikaniwn" }
    ],
    [
      { text: "🔎 TikTok Search", callback_data: "ttsjakwnsi" },
      { text: "🎮 Roblox Stalk", callback_data: "robiwjwjkwmsj" }
    ],
    [
      { text: "👀 Instagram Stalk", callback_data: "igkwnakke" },
      
  { text: "⬇️ YouTube MP3", callback_data: "ytaknskandj" }
    ],
          [
      { text: "⬅️", callback_data: "fitur_page1" },
      { text: "1/2", callback_data: "fitur_page_info" },
            { text: "➡️", callback_data: "fitur_page2" }
    ],
    [{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }]
  ]);
}

function featuresKeyboard1() {
  return mkInline([
    [
      { text: "🖥 Cek Host", callback_data: "cekhost_page2" },
      { text: "🔧 Text to Base64", callback_data: "text2base64_page2" },
      { text: "🔧 Base64 to Text", callback_data: "base642text_page2" },
  { text: "📱 iPhone Quote", callback_data: "iqc_feature_page2" }
    ],
        [
      { text: "⬅️", callback_data: "fitur_page1" },
      { text: "2/2", callback_data: "fitur_page_info" },
            { text: "➡️", callback_data: "fitur_page2" }
    ],
    [
      { text: "⬅️ Kembali", callback_data: "menksnwikwns" }
    ]
  ]);
}

function fitur_page_info() {
    return mkInline([[{ text: "Page 1", callback_data: "feaksnwikwns" },
    { text: "Page 2", callback_data: "fitur_page2" }],
    [
      { text: "⬅️ Kembali", callback_data: "menksnwikwns" }
    ]]);
  }
  

  function backKeyboard() {
    return mkInline([[{ text: "⬅️ Kembali", callback_data: "menksnwikwns" }]]);
  }

  // ====== FEATURE HANDLERS ======

async function handleText2Base64(chat_id, text) {
  try {
    await sendHTML(chat_id, `🔎 Memproses Text: <code>${escapeHTML(text)}</code> ...`);

    const res = await fetch(
      `https://api.siputzx.my.id/api/tools/text2base64?text=${encodeURIComponent(text)}`
    );
    const json = await res.json();

    if (!json || !json.status || !json.data?.base64) {
      await sendHTML(chat_id, `❌ Tidak ada hasil untuk text <code>${escapeHTML(text)}</code>`);
      return;
    }

    const r = json.data;
    const caption = `✅ Hasil: <code>${r.base64}</code>`;

    await sendHTML(chat_id, caption);
  } catch (err) {
    console.error("Text to Base64 error:", err);
    await sendHTML(chat_id, "⚠️ Gagal mengenkripsi data ke Base64. Coba lagi nanti.");
  }
}

async function handleBase642Text(chat_id, text) {
  try {
    await sendHTML(chat_id, `🔎 Memproses Data: <code>${escapeHTML(text)}</code> ...`);

    const res = await fetch(
      `https://api.siputzx.my.id/api/tools/base642text?base64=${encodeURIComponent(text)}`
    );
    const json = await res.json();

    if (!json || !json.status || !json.data?.text) {
      await sendHTML(chat_id, `❌ Tidak ada hasil untuk data <code>${escapeHTML(text)}</code>`);
      return;
    }

    const r = json.data;
    const caption = `✅ Hasil: <code>${r.text}</code>`;

    await sendHTML(chat_id, caption);
  } catch (err) {
    console.error("Base64 to text error:", err);
    await sendHTML(chat_id, "⚠️ Gagal mendekripsi Base64 ke text. Coba lagi nanti.");
  }
}
  
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
        (u.signature ? `📝 Bio: ${escapeHTML(u.signature)}\n` : `📝 Bio: <b>User Tidak Memakai Bio</b>\n`) +
        (u.verified ? `✔️ Verified: ✅\n` : "✔️ Verified: ❌\n") +
        (u.privateAccount ? `🔑 Private: ✅\n` : "🔑 Private: ❌\n") +
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
  
  async function handleIGStalk(chat_id, username) {
    try {
      await sendHTML(chat_id, `👀 Mencari info Instagram: <code>${escapeHTML(username)}</code> ...`);

      const res = await fetch(
        `https://api.siputzx.my.id/api/stalk/instagram?username=${encodeURIComponent(username)}`
      );
      const json = await res.json();

      if (!json || !json.status || !json.data) {
        await sendHTML(chat_id, `❌ Tidak ada data untuk username <code>${escapeHTML(username)}</code>`);
        return;
      }

      const u = json.data;
      const verified = u.is_verified ? `✅` : `❌`;
      const priv = u.is_private ? `✅` : `❌`;
      const bisnis = u.is_business_account ? `✅` : `❌`;
      const bio = u.biography
  ? `📝 Bio: ${escapeHTML(u.biography)}\n`
  : `📝 Bio: Tidak ada`;
      const caption =
        `👀 <b>Instagram Profile</b>\n\n` +
        `👤 <b>${escapeHTML(u.full_name || "-")}</b>\n` +
        `🔗 @${escapeHTML(u.username)}\n` +
        bio  +
        `✔️ Verified: ${verified}\n` + `🔑 Private: ${priv}\n` + `📇 Business Account: ${bisnis}\n` + (u
        ? `\n👥 Followers: ${u.followers_count}\n` +
            `👤 Following: ${u.following_count}\n` +
            `🎬 Videos: ${u.posts_count}\n`
          : "");

      if (u.profile_pic_url) {
        await sendPhoto(chat_id, u.profile_pic_url, caption);
      } else {
        await sendHTML(chat_id, caption);
      }
    } catch (err) {
      console.error("IG Stalk error:", err);
      await sendHTML(chat_id, "⚠️ Gagal mengambil data IG. Coba lagi nanti.");
    }
  }
 
  async function handleTiktokSearch(chat_id, keyword, index = 0) {
  try {
    if (index === 0) {
      await sendHTML(chat_id, `🔎 Mencari di TikTok: <code>${escapeHTML(keyword)}</code> ...`);
    }

    const res = await fetch(
      `https://api.siputzx.my.id/api/s/tiktok?query=${encodeURIComponent(keyword)}`
    );
    const json = await res.json();

    if (!json?.status || !Array.isArray(json.data) || json.data.length === 0) {
      await sendHTML(chat_id, `❌ Tidak ada hasil untuk: <code>${escapeHTML(keyword)}</code>`);
      return;
    }

    if (index >= json.data.length) {
      await sendHTML(chat_id, `✅ Udah gak ada hasil lagi untuk: <code>${escapeHTML(keyword)}</code>`);
      return;
    }

    const v = json.data[index];
    const videoUrl = v.play || v.wmplay;
    const title = v.title || "(tanpa judul)";
    const creatorName = v?.author?.nickname || "-";
    const creatorId = v?.author?.unique_id ? `@${v.author.unique_id}` : "-";

    const caption = `🎬 <b>${escapeHTML(title)}</b>\n\n👤 Creator: ${escapeHTML(creatorName)} (${escapeHTML(creatorId)})\n📌 Hasil ke <b>${index + 1}</b> dari <b>${json.data.length}</b>`;

    await tg("sendVideo", {
      chat_id,
      video: videoUrl,
      caption,
      parse_mode: "HTML",
      reply_markup: JSON.stringify({
        inline_keyboard: [[
          { text: "Cari lagi 🔎", callback_data: `ttsnkanaokejs:${keyword}:${index + 1}` }
        ]]
      }),
    });
  } catch (err) {
    console.error("TikTok Search error:", err);
    await sendHTML(chat_id, "⚠️ Gagal mencari di TikTok. Coba lagi nanti.");
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

async function handleIqc(chat_id, text) {
  try {
    const time = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());

    // bikin url api
    const url = `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(
      time
    )}&batteryPercentage=${Math.floor(Math.random() * 100) + 1}&carrierName=TELKOMSEL&messageText=${encodeURIComponent(
      text
    )}&emojiStyle=apple`;

    await sendPhoto(chat_id, url, `📱 iPhone Quote\n\n💬 ${escapeHTML(text)}`);
  } catch (err) {
    console.error("iPhone Quote error:", err);
    await sendHTML(chat_id, "⚠️ Gagal membuat iPhone Quote. Coba lagi nanti.");
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
      const images = (urls || []).map(a => a[0]).filter(Boolean);

      if (images.length === 0) {
        await sendHTML(chat_id, "⚠️ Tidak ada foto ditemukan di slideshow.");
        return;
      }

      // Buat caption 
      const caption = `📸 <b>${escapeHTML(json.data.metadata.title || "-")}
</b>\n👤 Creator: ${escapeHTML(json.data.metadata.creator || "-")}`;

      // Kirim semua foto sekaligus sebagai media_group
      const media = images.slice(0, 20).map((img, i) => ({
        type: "photo",
        media: img,
        caption: i === 0 ? caption : undefined, // caption hanya di foto pertama
        parse_mode: "HTML",
      }));

      await tg("sendMediaGroup", {
        chat_id,
        media,
      });
    } else {
      await sendHTML(chat_id, "⚠️ Link ini bukan foto TikTok.");
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

async function handleRobloxStalk(chat_id, username) {
  try {
    await sendHTML(chat_id, `🔎 Mencari info Roblox: <code>${escapeHTML(username)}</code> ...`);

    const res = await fetch(
      `https://api.siputzx.my.id/api/stalk/roblox?user=${encodeURIComponent(username)}`
    );
    const json = await res.json();

    if (!json || !json.status || !json.data) {
      await sendHTML(chat_id, `❌ Tidak ada data untuk username <code>${escapeHTML(username)}</code>`);
      return;
    }

    const u = json.data;

    // Deskripsi utama
    const basic = u.basic || {};
    const social = u.social || {};
    const presence = u.presence?.userPresences?.[0] || {};
    const avatar = u.avatar?.headshot?.data?.[0]?.imageUrl || null;
    const bannedStatus = basic.isBanned ? "Ya" : "Tidak";

    // Groups singkat
    const groups = (u.groups?.list?.data || []).map(g => `• ${escapeHTML(g.group.name)} (Role: ${escapeHTML(g.role.name)})`).join("\n");

    // Achievements badges
    const badges = (u.achievements?.robloxBadges || []).map(b => `• ${escapeHTML(b.name)}`).join("\n");

    const caption =
      `👤 <b>${escapeHTML(basic.displayName || basic.name || "-")}</b>\n` +
      `🆔 UserID: <code>${basic.id}</code>\n` +
      `📄 Bio: ${escapeHTML(basic.description || "-")}\n` +
      `📝 Akun dibuat: ${basic.created ? new Date(basic.created).toLocaleString() : "-"}\n` +
      `⛔ Banned: ${bannedStatus}\n` +
      `🌐 Last presence: ${escapeHTML(presence.lastLocation || "-")}\n\n` +
      `👥 Followers: ${social.followers?.count || 0}\n` +
      `👤 Following: ${social.following?.count || 0}\n` +
      `🤝 Friends: ${social.friends?.count || 0}\n\n` +
      `🏢 Groups:\n${groups || "-"}` +
      (badges ? `\n\n🏅 Badges:\n${badges}` : "");

    if (avatar) {
      await sendPhoto(chat_id, avatar, caption);
    } else {
      await sendHTML(chat_id, caption);
    }

  } catch (err) {
    console.error("Roblox Stalk error:", err);
    await sendHTML(chat_id, "⚠️ Gagal mengambil data Roblox. Coba lagi nanti.");
  }
}

async function handleCekHost(chat_id, targetUrl) {
  try {
    await sendHTML(chat_id, `🌐 Mengecek host untuk: <code>${escapeHTML(targetUrl)}</code> ...`);

    const res = await fetch(`https://api.vreden.my.id/api/tools/cekhost?url=${encodeURIComponent(targetUrl)}`);
    const json = await res.json();

    if (!json || json.status !== 200 || !json.result?.checks) {
      await sendHTML(chat_id, `❌ Gagal memeriksa host untuk <code>${escapeHTML(targetUrl)}</code>`);
      return;
    }

    const checks = json.result.checks;
    let msg = `🛰 <b>Hasil Cek Host</b>\nURL: <code>${escapeHTML(targetUrl)}</code>\n\n`;

    for (const check of checks) {
      const server = check.server || {};
      const http = check.http_check || {};
      msg += `🌍 Server: ${server.host || "-"} (${server.city || "-"}, ${server.country || "-"})\n`;
      msg += `IP Server: ${server.ip || "-"}\n`;
      msg += `Status HTTP: ${http.status_code || "-"} (${http.result || "-"})\n`;
      msg += `Ping: ${http.ping || "-"}s\n`;
      msg += `IP Website: ${http.ip_web || "-"}\n\n`;
    }

    await sendHTML(chat_id, msg);

  } catch (err) {
    console.error("Cek Host error:", err);
    await sendHTML(chat_id, "⚠️ Gagal mengecek host. Coba lagi nanti.");
  }
}

async function handleYtMp3Download(chat_id, url) {
  try {
    await sendHTML(chat_id, "⏳ Sedang memproses YouTube MP3...");

    const res = await fetch(
      `https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(url)}`
    );
    const json = await res.json();

    if (!json?.result?.status) {
      await sendHTML(chat_id, "❌ Gagal mengambil data YouTube. Pastikan link valid.");
      return;
    }

    const { metadata, download } = json.result;
    if (!download?.url) {
      await sendHTML(chat_id, "⚠️ Tidak ada file audio ditemukan.");
      return;
    }

    const caption =
      `🎶 <b>${escapeHTML(metadata.title || "Audio YouTube")}</b>\n` +
      `👤 Channel: ${escapeHTML(metadata.author?.name || "-")}\n` +
      `🕒 Durasi: ${escapeHTML(metadata.duration?.timestamp || "-")}\n` +
      `👀 Views: ${metadata.views || 0}\n` +
      `📂 Quality: ${download.quality}`;

    await tg("sendAudio", {
      chat_id,
      audio: download.url,
      caption,
      parse_mode: "HTML",
      title: metadata.title,
      performer: metadata.author?.name || "Unknown",
    });
  } catch (err) {
    console.error("YouTube MP3 error:", err);
    await sendHTML(chat_id, "⚠️ Gagal mendownload audio. Coba lagi nanti.");
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
