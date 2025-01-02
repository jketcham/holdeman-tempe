-- Migration number: 0004 	 2025-01-02T03:13:21.935Z
-- Add deleted_at column to links and banner_updates
ALTER TABLE links ADD COLUMN deleted_at DATETIME;
ALTER TABLE banner_updates ADD COLUMN deleted_at DATETIME;