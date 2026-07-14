const crypto = require('crypto');
const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const SALT = process.env.HQ_SALT;

if (!SALT) {
  console.error('❌ Error: HQ_SALT is missing.');
  process.exit(1);
}

// 🚨 UPDATED: Accepts 6 or 7 arguments (Avatar URL is optional)
const args = process.argv.slice(2);
if (args.length < 6 || args.length > 7) {
  console.error('Usage: node add-user.js <local|remote> <username> <password> <pin> <email> "Full Name" ["Avatar URL"]');
  process.exit(1);
}

const [env, username, password, pin, email, fullName, avatarArg] = args;
const targetFlag = env === 'remote' ? '--remote' : '--local';

// 🚨 FALLBACK LOGIC: If avatarArg is provided, use it. Otherwise, use default.
const avatarUrl = avatarArg && avatarArg.trim() !== '' ? avatarArg : '/default-avatar.png';

async function hashSecret(secret) {
  const data = secret + SALT;
  return crypto.createHash('sha256').update(data).digest('hex');
}

async function run() {
  const passHash = await hashSecret(password);
  const pinHash = await hashSecret(pin);

  // 1. Create the Secure Login
  const sql1 = `INSERT OR REPLACE INTO hq_agents (username, password_hash, pin_hash, email, name) VALUES ('${username}', '${passHash}', '${pinHash}', '${email}', '${fullName}');`;
  
  // 2. Create the Author Profile with the dynamic avatar URL
  const sql2 = `INSERT OR IGNORE INTO syndicate_agents (id, name, avatar) VALUES ('${username}', '${fullName}', '${avatarUrl}');`;

  console.log(`--- PROVISIONING AGENT: ${username} to ${env.toUpperCase()} ---`);
  
  try {
    execSync(`npx wrangler d1 execute reality-decoded-db ${targetFlag} --command="${sql1}"`, { stdio: 'inherit' });
    execSync(`npx wrangler d1 execute reality-decoded-db ${targetFlag} --command="${sql2}"`, { stdio: 'inherit' });
    console.log(`\n✅ Agent ${fullName} (${username}) successfully integrated. Avatar: ${avatarUrl}`);
  } catch (err) {
    console.error('\n❌ Failed to provision agent:', err.message);
  }
}

run();