// /api/webhook.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(200).send("LINE Webhook OK");
    return;
  }
  // 這裡不管有沒有錯都要 200 回傳
  try {
    // 你可以放 log 看 body
    // console.log("收到:", req.body);
    res.status(200).send("OK"); // 立刻回 200
    // ...這之後才做任何事
  } catch (e) {
    res.status(200).send("OK"); // 任何錯誤都要回 200
  }
}
