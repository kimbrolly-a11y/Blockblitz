-- BlockBlitz World Leaderboard — run this in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New query → paste → Run)

CREATE TABLE IF NOT EXISTS scores (
  id          TEXT        NOT NULL,
  name        TEXT        NOT NULL,
  avatar      TEXT        NOT NULL DEFAULT '🎮',
  color       TEXT        NOT NULL DEFAULT '#90caf9',
  score       INTEGER     NOT NULL DEFAULT 0,
  level       INTEGER     NOT NULL DEFAULT 1,
  mode        TEXT        NOT NULL DEFAULT 'classic',
  date        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Fast descending score queries
CREATE INDEX IF NOT EXISTS idx_scores_score ON scores (score DESC);

-- Row Level Security: anyone can read & insert, nobody can modify or delete
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"   ON scores FOR SELECT USING (true);
CREATE POLICY "public insert" ON scores FOR INSERT WITH CHECK (true);
