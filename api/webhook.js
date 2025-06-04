// api/webhook.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("LINE Webhook OK");
  }
  try {
    const body = req.body;
    const events = body.events || [];
    for (const event of events) {
      if (event.type === "follow" && event.source && event.source.userId) {
        const userId = event.source.userId;
        // 這裡請自行填入你的 LINE CHANNEL ACCESS TOKEN
        const CHANNEL_ACCESS_TOKEN = "mTS8jHgrpVIOU12AC/q+FUFPrxetZjMbZxF7+Td9ldSoMIADOUh7Cj8k7qNGwiDrmYMIDDVjesBOTJLWlRaNX94KvbO/Z5EHN45sofx7s2NUxcO9Wt1QA06HcZUv4xQF2MN2oFUu06TB+WiCCePKsQdB04t89/1O/w1cDnyilFU=";
        const replyToken = event.replyToken;
        const msg = {
          replyToken,
          messages: [
            { type: "text", text: `🎉 您已加入好友！\n您的 LINE ID 是：\n${userId}\n請複製並提供給老師！` }
          ]
        };
        await fetch("https://api.line.me/v2/bot/message/reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`,
          },
          body: JSON.stringify(msg),
        });
      } else if (event.type === "message" && event.source && event.source.userId) {
        const userId = event.source.userId;
        const CHANNEL_ACCESS_TOKEN = "YOUR_LINE_CHANNEL_ACCESS_TOKEN";
        const replyToken = event.replyToken;
        const msg = {
          replyToken,
          messages: [
            { type: "text", text: `您的 LINE ID 是：\n${userId}\n請複製並提供給老師！` }
          ]
        };
        await fetch("https://api.line.me/v2/bot/message/reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`,
          },
          bo
