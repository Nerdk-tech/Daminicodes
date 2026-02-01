import crypto from 'crypto';
export default function handler(req, res) {
    const { data } = req.query;
    if (!data) return res.status(400).json({ error: "Nothing to hash." });
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    res.status(200).json({ sha256: hash });
}
