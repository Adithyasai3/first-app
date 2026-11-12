-- Sample data for local learning. Safe to re-run.
CREATE TABLE IF NOT EXISTS tasks (
  id         serial PRIMARY KEY,
  title      text        NOT NULL,
  done       boolean     NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO tasks (title, done)
SELECT * FROM (VALUES
  ('Install the dev toolchain', true),
  ('Run the Vite app', true),
  ('Pass Playwright on mobile', true),
  ('Browse this table in DBeaver', false)
) AS v(title, done)
WHERE NOT EXISTS (SELECT 1 FROM tasks);
