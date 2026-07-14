CREATE TABLE IF NOT EXISTS hq_agents (
  username TEXT PRIMARY KEY,
  password_hash TEXT,
  pin_hash TEXT,
  email TEXT
);

CREATE TABLE IF NOT EXISTS hq_otps (
  email TEXT PRIMARY KEY,
  code TEXT,
  expires_at DATETIME
);

-- Clear any old test agents just in case
DELETE FROM hq_agents;

-- Insert your secure Agent Profile
INSERT INTO hq_agents (username, password_hash, pin_hash, email) 
VALUES (
  'agent_neo', 
  'a485411de9f8a3c7d3d4c0e88618a884461b9758ac2d1ab1a90d7229f3730f86', 
  '669bc82911b47ebe4ec7e65d94d93d55e120cdc2e881152c369e19c980f2840a', 
  'sb.sarojit@gmail.com' 
);