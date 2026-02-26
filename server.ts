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
  site_name: "Olatundun Nursing Home and Geriatric Center",
  logo_text: "O",
  logo_url: "", // Base64 or URL
  hero_title: "Compassionate Care for Every Stage of Life",
  hero_subtitle: "Holistic healthcare for the elderly, mothers, and families — at our facility or in the comfort of your home.",
  hero_image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1920",
  about_title: "A Professional Healthcare Facility Committed to Compassionate Care",
  about_description: "Olatundun Nursing Home and Geriatric Center LTD is a professional healthcare facility committed to compassionate care for the elderly, mothers, and families.",
  about_image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
  ceo_name: "Adio Lateefat Oluwakemi",
  ceo_role: "Founder & Lead Nurse",
  ceo_image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400",
  contact_phone: "+234 800 000 0000",
  contact_email: "olatundungeriatric25@gmail.com",
  contact_address: "123 Healthcare Avenue, Osogbo, Osun State, Nigeria",
  team_members: JSON.stringify([
    {
      name: 'Adio Lateefat Oluwakemi',
      role: 'CEO & Founder',
      expertise: 'Geriatric & Maternity Specialist',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Dr. Samuel Okoro',
      role: 'Lead Geriatrician',
      expertise: 'Elderly Chronic Disease Management',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Nurse Blessing Adeyemi',
      role: 'Maternity Lead',
      expertise: 'Obstetric & Fertility Support',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Dr. Fatima Ibrahim',
      role: 'Reproductive Health Expert',
      expertise: 'Fertility & Family Planning',
      image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400'
    }
  ])
};

const insert = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
Object.entries(defaultSettings).forEach(([key, value]) => {
  insert.run(key, value);
});

// Force update the email if it's the old default
db.prepare("UPDATE settings SET value = ? WHERE key = 'contact_email' AND value = 'info@olatundunhealth.com'").run("olatundungeriatric25@gmail.com");

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
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
