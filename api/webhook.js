// /api/webhook.js

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("LINE Webhook OK");
  }
  try {
    // 1. 手動讀取原始資料
    let body = "";
    await new Promise(resolve => {
      req.on("data", chunk => { body += chunk; });
      req.on("end", resolve);
    });
    const json = JSON.parse(body || "{}");
    const events = json.events || [];

    // 2. 處理 follow 事件，自動回傳 User ID
    for (const event of events) {
      if (event.type === "follow" && event.source && event.source.userId) {
        const userId = event.source.userId;
        const replyToken = event.replyToken;
        const msg = {
          replyToken,
          messages: [
            { type: "text", text: `🎉 您已加入好友！\n您的 LINE ID 是：\n${userId}\n請複製並提供給老師！` }
          ]
        };
        // 呼叫 LINE reply API
        await fetch("https://api.line.me/v2/bot/message/reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
          },
          body: JSON.stringify(msg),
        });
      }
      // 你可以根據需要繼續處理 message event ...
    }

    // 3. 回應 LINE 200 OK
    res.status(200).send("OK");
  } catch (e) {
    res.status(200).send("OK");
  }
}
