export default async function handler(req, res) {
    if (req.method === "POST") {
        // การตรวจสอบ signature และการส่งข้อความไป LINE
        const signature = req.headers["x-line-signature"];
        const body = JSON.stringify(req.body);
        const secret = "a7c5104d400d51d3eafe69a7f3e3352b";  // ใส่ค่า Channel Secret ของคุณที่นี่
        const hash = crypto
            .createHmac("SHA256", secret)
            .update(body)
            .digest("base64");

        if (signature !== hash) {
            return res.status(400).send("Invalid signature");
        }

        const userId = req.body.events[0].source.userId;
        const replyToken = req.body.events[0].replyToken;
        
        await axios.post(`https://api.line.me/v2/bot/message/reply`, {
            replyToken: replyToken,
            messages: [
                {
                    type: "text",
                    text: `Hello user ${userId}!`
                }
            ]
        }, {
            headers: {
                "Authorization": `Bearer oOayH51RFPXv/yOGOD4u4S5FaIZK1/YuJzV22Pxv1/4ntGl3t94mFT58lGFtvMaMTszpx9jCSzkscWsCMHG1V3/AUqg4mfgjoIX+t2qMrZhNZfb+d3JoxCLY0UIZc222pWJyHLE13trNIesgNfl3qwdB04t89/1O/w1cDnyilFU=`  // ใส่ Channel Token ของคุณที่นี่
            }
        });

        res.status(200).send("OK");
    } else if (req.method === "GET") {
        // สำหรับการทดสอบเบื้องต้น
        res.status(200).json({ message: "API is working!" });
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
