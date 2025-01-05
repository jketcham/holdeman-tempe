-- Clear `link_events` table first (due to foreign key constraint)
DELETE FROM link_events;

-- Clear `links` table
DELETE FROM links;

-- Seed `links` table
INSERT INTO links (link_url, link_label, "order", start_date, end_date)
VALUES 
('/survey', 'Project Ideas Survey', 1, '2024-12-31 00:00:00', '2025-01-30 23:59:59'),
('https://chng.it/4f6hV2SFhw', 'Sign Petition to Fix Outdated Parking Rules', 2, '2024-12-31 00:00:00', NULL),
('https://holdemantempe.org/newsletter', 'Signup for our newsletter', 3, '2024-12-31 00:00:00', NULL);

-- Clear `banner_updates` table
DELETE FROM banner_updates;

-- Seed `banner_updates` table
INSERT INTO banner_updates (title, content, link_url, link_label, start_date, end_date)
VALUES 
('Help choose our next project!', 
 'Share your ideas for our **2025–2026 Neighborhood Grant Project**.

Survey open through **January 24th**.',
 '/survey', 
 'Take the Survey', 
 '2024-12-30 00:00:00', 
 '2025-01-24 23:59:59');

-- Clear `events` table
DELETE FROM events;

-- Seed `events` table with a date that's always the next Jan 22 at 6pm Phoenix time (UTC-7)
INSERT INTO events (type, name, description, location, slug, start_date)
VALUES (
  'meeting',
  'Annual Meeting',
  'Join us for our annual planning meeting where we''ll discuss neighborhood projects and priorities for the year.',
  'Clark Park Community Center',
  'annual-meeting',
  CASE 
    WHEN date('now') > date(strftime('%Y', 'now') || '-01-22')
    THEN datetime(strftime('%Y', 'now', '+1 year') || '-01-23 01:00:00')  -- Jan 22, 6:00 PM MST = Jan 23, 1:00 AM UTC
    ELSE datetime(strftime('%Y', 'now') || '-01-23 01:00:00')
  END
);
