-- Migration number: 0002 	 2025-01-01T21:44:07.945Z
-- Create the `link_events` table
CREATE TABLE IF NOT EXISTS link_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    link_id INTEGER NOT NULL,
    event_type TEXT NOT NULL DEFAULT 'click',
    event_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    ip_address TEXT,
    FOREIGN KEY (link_id) REFERENCES links (id)
);
