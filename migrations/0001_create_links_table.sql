-- Migration number: 0001 	 2025-01-01T21:43:38.831Z
-- Create the `links` table
CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    link_url TEXT NOT NULL,
    link_label TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    start_date DATETIME,
    end_date DATETIME
);
