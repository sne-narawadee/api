// api/line.js
export default async (req, res) => {
  // ตรวจสอบว่าเป็น Request จาก LINE
  if (req.method === "POST") {
    const events = req.body.events;

    // ถ้าเป็นเหตุการณ์ "ส่งข้อความ"
    if (events && events[0].type === "message") {
      const userMessage = events[0].message.text;
      console.log("ได้รับข้อความจาก LINE:", userMessage);

      // ตอบกลับด้วยข้อความเดียวกัน + คำว่า "คุณพูดว่า: "
      return res.json({
        replies: [
          { type: "text", text: `คุณพูดว่า: ${userMessage}` }
        ]
      });
    }
  }

  // สำหรับการ Verify Webhook (LINE ต้องการ Response 200)
  return res.status(200).end();
};