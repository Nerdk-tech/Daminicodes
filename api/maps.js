export default function handler(req, res) {
    res.status(200).json({ 
        style: "mapbox://styles/damini/dark-v11", 
        zoom: "Global",
        status: "Authorized"
    });
}
