const crypto = require('crypto');
const { execSync } = require('child_process');

// 🚨 LOAD FROM ENV, NOT HARDCODED
require('dotenv').config(); // Ensure you have 'dotenv' installed (npm install dotenv)
const SALT = process.env.HQ_SALT;

if (!SALT) {
  console.error("Error: HQ_SALT is missing. Make sure .env.local exists.");
  process.exit(1);
}

// Argument parsing: node add-user.js <local|remote> <username> <password> <pin> <email>
const args = process.argv.slice(2);

if (args.length !== 5) {
  console.error('Usage: node add-user.js <local|remote> <username> <password> <pin> <email>');
  process.exit(1);
}

const [env, username, password, pin, email] = args;
const targetFlag = env === 'remote' ? '--remote' : '--local';

async function hashSecret(secret) {
  const data = secret + SALT;
  return crypto.createHash('sha256').update(data).digest('hex');
}

async function run() {
  const passHash = await hashSecret(password);
  const pinHash = await hashSecret(pin);

  const sql = `INSERT OR REPLACE INTO hq_agents (username, password_hash, pin_hash, email) VALUES ('${username}', '${passHash}', '${pinHash}', '${email}');`;

  console.log(`--- PROVISIONING AGENT: ${username} to ${env.toUpperCase()} ---`);
  
  try {
    // Run the command using the targetFlag (either --local or --remote)
    execSync(`npx wrangler d1 execute reality-decoded-db ${targetFlag} --command="${sql}"`, { stdio: 'inherit' });
    console.log(`\n✅ Agent ${username} successfully injected into ${env} HQ.`);
  } catch (err) {
    console.error('\n❌ Failed to provision agent:', err.message);
  }
}

run();