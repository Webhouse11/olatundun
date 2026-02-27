import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("site_settings.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`);

// Default settings
const defaultSettings = {
  "site_name": "Olatundun Nursing Home and Geriatric Center",
  "logo_text": "O",
  "logo_url": "https://res.cloudinary.com/dhzouslh1/image/upload/v1772182746/1000097630_hultaz.jpg",
  "hero_title": "Compassionate Care for Every Stage of Life",
  "hero_subtitle": "Holistic healthcare for the elderly, mothers, and families — at our facility or in the comfort of your home.",
  "hero_image": "https://res.cloudinary.com/dhzouslh1/image/upload/c_fill,w_auto,f_auto,q_auto/v1772182745/1000097638_rczupj.jpg",
  "about_title": "A Professional Healthcare Facility Committed to Compassionate Care",
  "about_description": "Olatundun Nursing Home and Geriatric Center LTD is a professional healthcare facility committed to compassionate care for the elderly, mothers, and families.",
  "about_image": "/images/about_image.png",
  "ceo_name": "Adio Lateefat Oluwakemi",
  "ceo_role": "Founder & Lead Nurse",
  "ceo_image": "https://res.cloudinary.com/dhzouslh1/image/upload/c_scale,w_300,f_auto,q_auto/v1772182747/1000097622_ucji4x.png",
  "contact_phone": "08078175508",
  "contact_email": "olatundungeriatric25@gmail.com",
  "contact_address": "123 Healthcare Avenue, Osogbo, Osun State, Nigeria",
  "team_members": "[{\"name\":\"Adio Lateefat Oluwakemi\",\"role\":\"CEO & Founder\",\"expertise\":\"Geriatric & Maternity Specialist\",\"image\":\"/images/team_0.jpg\"},{\"name\":\"Dr. Samuel Okoro\",\"role\":\"Lead Geriatrician\",\"expertise\":\"Elderly Chronic Disease Management\",\"image\":\"/images/team_1.jpg\"},{\"name\":\"Nurse Blessing Adeyemi\",\"role\":\"Maternity Lead\",\"expertise\":\"Obstetric & Fertility Support\",\"image\":\"/images/team_2.jpg\"},{\"name\":\"Dr. Fatima Ibrahim\",\"role\":\"Reproductive Health Expert\",\"expertise\":\"Fertility & Family Planning\",\"image\":\"/images/team_3.jpg\"}]"
};

const insert = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
Object.entries(defaultSettings).forEach(([key, value]) => {
  insert.run(key, value);
});

// Force update the email if it's the old default
db.prepare("UPDATE settings SET value = ? WHERE key = 'contact_email' AND value = 'info@olatundunhealth.com'").run("olatundungeriatric25@gmail.com");

// Force update the phone number if it's the old default
db.prepare("UPDATE settings SET value = ? WHERE key = 'contact_phone' AND value = '+234 800 000 0000'").run("08078175508");

// Force update the logo URL to the new Cloudinary link
db.prepare("UPDATE settings SET value = ? WHERE key = 'logo_url'").run("https://res.cloudinary.com/dhzouslh1/image/upload/v1772182746/1000097630_hultaz.jpg");

// Force update the hero image URL to the new Cloudinary link
db.prepare("UPDATE settings SET value = ? WHERE key = 'hero_image'").run("https://res.cloudinary.com/dhzouslh1/image/upload/c_fill,w_auto,f_auto,q_auto/v1772182745/1000097638_rczupj.jpg");

// Force update the CEO image URL to the new Cloudinary link
db.prepare("UPDATE settings SET value = ? WHERE key = 'ceo_image'").run("https://res.cloudinary.com/dhzouslh1/image/upload/c_scale,w_300,f_auto,q_auto/v1772182747/1000097622_ucji4x.png");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get("/api/settings", (req, res) => {
    const rows = db.prepare("SELECT * FROM settings").all();
    const settings = rows.reduce((acc: any, row: any) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
    res.json(settings);
  });

  app.post("/api/settings", (req, res) => {
    const settings = req.body;
    const update = db.prepare("UPDATE settings SET value = ? WHERE key = ?");
    
    const transaction = db.transaction((data) => {
      for (const [key, value] of Object.entries(data)) {
        update.run(value, key);
      }
    });

    try {
      transaction(settings);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save settings" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve from dist
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    
    // Fallback for SPA
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
