-- 🚨 DANGER: This ONLY removes your auth tables, not your videos!
DROP TABLE IF EXISTS hq_agents;
DROP TABLE IF EXISTS hq_otps;

-- Create the Agent table
CREATE TABLE IF NOT EXISTS hq_agents (
  username TEXT PRIMARY KEY,
  password_hash TEXT,
  pin_hash TEXT,
  email TEXT
);

-- Create the temporary OTP table
CREATE TABLE IF NOT EXISTS hq_otps (
  email TEXT PRIMARY KEY,
  code TEXT,
  expires_at DATETIME
);