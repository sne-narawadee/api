// api/line.js
export default (req, res) => {
  // สำหรับ LINE Webhook Verification
  if (req.method === "GET" || !req.body.events) {
    return res.status(200).end(); // ต้องตอบ 200 เวลา Verify
  }
  // จัดการข้อความจาก LINE
  console.log(req.body.events);
  res.json({ replies: [{ type: "text", text: "Hello from LINE!" }] });
};