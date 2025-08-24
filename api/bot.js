export default async function handler(req, res) {
  const TOKEN = process.env.TG_TOKEN || "8396430373:AAGZ9lbLgPhAhIZUghflXgYls1taRpmPudY"; 
  const API = `https://api.telegram.org/bot${TOKEN}`;
  const OWNER_NAME = "Vinzz Official";
  const OWNER_CONTACT = "@vinzz_official_store";
  const SUPER_OWNER = 7777604508;

  // ===== DATABASE SEDERHANA =====
  let db = global.db || {
    owners: [],
    premium: [],
    users: {}, // { id: { limit:30, lastReset:"date", session:{}, lang:"id", country:"ID"} }
  };
  global.db = db;

  function getUser(id) {
    const today = new Date().toDateString();
    if (!db.users[id] || db.users[id].lastReset !== today) {
      db.users[id] = { limit:30, lastReset:today, session:{}, lang:"id", country:"Indonesia" };
    }
    return db.users[id];
  }
  function isSuperOwner(id) { return id===SUPER_OWNER; }
  function isOwner(id) { return db.owners.includes(id) || isSuperOwner(id); }
  function isPremium(id) { return db.premium.includes(id) || isOwner(id) || isSuperOwner(id); }
  function deductLimit(id, feature="general") {
    if (isPremium(id) || isOwner(id) || isSuperOwner(id)) return true;
    const u = getUser(id);
    u.session[feature] = true; // create session
    if (u.limit>0) { u.limit-=1; return true; }
    return false;
  }

  if (req.method !== "POST") return res.status(200).send("OK");
  const update = req.body;

  // ===== GENERATE CALLBACK DATA RANDOM =====
  function randomKey(len=10){
    const chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let s="";
    for(let i=0;i<len;i++) s+=chars.charAt(Math.floor(Math.random()*chars.length));
    return s;
  }

  function mainMenu(){
    const ipCb=randomKey();
    const apkCb=randomKey();
    const profCb=randomKey();
    const backCb=randomKey();

    // simpan mapping global sementara
    global.buttonMap = global.buttonMap || {};
    global.buttonMap[ipCb]="iptracker";
    global.buttonMap[apkCb]="apksearch";
    global.buttonMap[profCb]="profile";
    global.buttonMap[backCb]="mainmenu";

    return mkInline([
      [{text:"🛰 IP Tracker", callback_data: ipCb}],
      [{text:"📱 APK Mod Search", callback_data: apkCb}],
      [{text:"👤 Profile", callback_data: profCb}],
      [{text:"⬅️ Kembali", callback_data: backCb}],
    ]);
  }

  try {
    if (update.message) {
      const chat_id = update.message.chat.id;
      const user_id = update.message.from.id;
      const text = (update.message.text||"").trim();

      if (text==="/start") {
        await sendHTML(chat_id,
          `<b>👋 Halo!</b>\nSelamat datang di <b>Nakano Miku Multi Device</b> 🚀\nVersi: <b>2.0.0</b>\nPilih menu di bawah:`,
          mainMenu()
        );
        return ok(res);
      }

      // ===== OWNER/SUPER OWNER COMMANDS via TEXT =====
      if (text.startsWith("/addowner ")) {
        if (!isOwner(user_id)) return ok(res);
        const id=parseInt(text.split(" ")[1]);
        if(!db.owners.includes(id)) db.owners.push(id);
        await sendHTML(chat_id, `✅ Owner ditambahkan: ${id}`);
        return ok(res);
      }
      if (text.startsWith("/delowner ")) {
        if (!isOwner(user_id)) return ok(res);
        const id=parseInt(text.split(" ")[1]);
        db.owners = db.owners.filter(x=>x!==id);
        await sendHTML(chat_id, `🗑 Owner dihapus: ${id}`);
        return ok(res);
      }
      if (text.startsWith("/addpremium ")) {
        if (!isOwner(user_id)) return ok(res);
        const id=parseInt(text.split(" ")[1]);
        if(!db.premium.includes(id)) db.premium.push(id);
        await sendHTML(chat_id, `🌟 Premium ditambahkan: ${id}`);
        return ok(res);
      }
      if (text.startsWith("/delpremium ")) {
        if (!isOwner(user_id)) return ok(res);
        const id=parseInt(text.split(" ")[1]);
        db.premium=db.premium.filter(x=>x!==id);
        await sendHTML(chat_id, `🗑 Premium dihapus: ${id}`);
        return ok(res);
      }

      // ===== FEATURE SESSION HANDLER =====
      const u=getUser(user_id);
      if (u.session["iptracker"] && update.message.reply_to_message) {
        await handleIpLookup(chat_id, text);
        delete u.session["iptracker"];
        return ok(res);
      }
      if (u.session["apksearch"] && update.message.reply_to_message) {
        await handleApkSearch(chat_id, text);
        delete u.session["apksearch"];
        return ok(res);
      }

      return ok(res);
    }

    if (update.callback_query) {
      const cq=update.callback_query;
      const chat_id=cq.message.chat.id;
      const user_id=cq.from.id;
      const cb = cq.data;

      await tg("answerCallbackQuery", { callback_query_id:cq.id });

      const feature = global.buttonMap?.[cb];
      if(!feature) return ok(res); // tombol kadaluarsa/acak

      const u=getUser(user_id);

      if(feature==="iptracker"){
        if(!deductLimit(user_id,"iptracker")) return sendHTML(chat_id,"❌ Limit habis");
        u.session["iptracker"]=true;
        await sendHTML(chat_id,"🛰 Masukkan IP/domain:");
        return ok(res);
      }
      if(feature==="apksearch"){
        if(!deductLimit(user_id,"apksearch")) return sendHTML(chat_id,"❌ Limit habis");
        u.session["apksearch"]=true;
        await sendHTML(chat_id,"📱 Masukkan nama APK:");
        return ok(res);
      }
      if(feature==="profile"){
        let status="Free";
        if(isSuperOwner(user_id)) status="Super Owner";
        else if(isOwner(user_id)) status="Owner";
        else if(isPremium(user_id)) status="Premium";

        const msg=`👤 Profile Info
ID: ${user_id}
Status: ${status}
Limit sisa: ${u.limit}
Reset: ${u.lastReset}
Negara: ${u.country}
Bahasa: ${u.lang}`;
        await sendHTML(chat_id,msg);
        return ok(res);
      }
      if(feature==="mainmenu"){
        await sendHTML(chat_id,
          `<b>👋 Halo!</b>\nSelamat datang di <b>Nakano Miku Multi Device</b> 🚀`,
          mainMenu()
        );
        return ok(res);
      }
    }

    return ok(res);
  } catch(err) {
    console.error(err);
    return res.status(200).json({ok:false,error:err?.message||String(err)});
  }

  // ===== FEATURE FUNCTIONS =====
  async function handleIpLookup(chat_id,target){
    const r=await fetch(`https://ipapi.co/${target}/json/`);
    const j=await r.json();
    if(!j || j.error) return sendHTML(chat_id,"⚠️ Lookup gagal!");
    await sendHTML(chat_id,`🛰 IP Tracker Result\nIP: ${j.ip}\nCity: ${j.city}\nRegion: ${j.region}\nCountry: ${j.country_name}\nISP: ${j.org||j.asn}`);
  }

  async function handleApkSearch(chat_id,query){
    await sendHTML(chat_id,`🔎 Cari APK: ${query}`);
    try{
      const r=await fetch(`https://api.siputzx.my.id/api/apk/an1?search=${encodeURIComponent(query)}`);
      const j=await r.json();
      if(!j?.result || j.result.length===0) return sendHTML(chat_id,`⚠️ Tidak ada hasil untuk ${query}`);
      let msg="📦 Hasil APK\n";
      j.result.slice(0,5).forEach((apk,i)=>{
        msg+=`${i+1}. ${apk.title}\n📥 <a href="${apk.link}">Download</a>\n`;
      });
      await sendHTML(chat_id,msg);
    }catch{
      await sendHTML(chat_id,"❌ Error API");
    }
  }

  // ===== UTIL =====
  function mkInline(inline_keyboard){ return JSON.stringify({inline_keyboard}); }
  async function tg(method,payload){ await fetch(`${API}/${method}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}); }
  async function sendHTML(chat_id,html,reply_markup){ await tg("sendMessage",{chat_id,text:html,parse_mode:"HTML",...(reply_markup?{reply_markup}:{}),disable_web_page_preview:true}); }
  function ok(res){ return res.status(200).json({ok:true}); }
}
