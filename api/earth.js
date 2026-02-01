export default function handler(req, res) {
    res.status(200).json({ 
        layers: ["satellite", "terrain", "night-lights"],
        source: "Three-Globe/OSM",
        status: "Live"
    });
}
