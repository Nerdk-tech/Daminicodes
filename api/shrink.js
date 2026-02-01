export default function handler(req, res) {
    res.status(200).json({ status: "Ready", method: "POST", format: "WebP/JPEG" });
}
