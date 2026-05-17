DROP TABLE IF EXISTS submissions CASCADE;

CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('department_review', 'community_feedback', 'growth_feedback', 'enforcement')),
  data JSONB NOT NULL DEFAULT '{}',
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_submissions_type ON submissions(type);
CREATE INDEX idx_submissions_resolved ON submissions(resolved);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON submissions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public reads" ON submissions FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public updates" ON submissions FOR UPDATE TO anon USING (true);
