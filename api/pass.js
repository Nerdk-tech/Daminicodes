export default function handler(req, res) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 16; i++) pass += charset.charAt(Math.floor(Math.random() * charset.length));
    res.status(200).json({ password: pass });
}
