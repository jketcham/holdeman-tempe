-- Migration number: 0003 	 2025-01-01T21:44:24.295Z
-- Create the `banner_updates` table
CREATE TABLE IF NOT EXISTS banner_updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    link_url TEXT,
    link_label TEXT,
    start_date DATETIME,
    end_date DATETIME
);
