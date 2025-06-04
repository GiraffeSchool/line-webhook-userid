// /api/webhook.js

// 關閉 Next.js 自動 body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(200).send("LINE Webhook OK");
    return;
  }
  try {
    // 手動讀 raw body
    let body = "";
    await new Promise((resolve) => {
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", resolve);
    });
    const json = JSON.parse(body || "{}");

    // 立刻回 200
    res.status(200).send("OK");

    // 下面可加 log
    // console.log("收到:", json);

    // ...未來你要的處理可以加在這
  } catch (e) {
    res.status(200).send("OK");
  }
}
