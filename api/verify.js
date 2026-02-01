export default function handler(req, res) {
    const { email } = req.query;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    res.status(200).json({ email, valid: regex.test(email) });
}
