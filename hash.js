// hash.js
require('dotenv').config({ path: '.env.local' }); // Tells Node to load your .env.local file
const crypto = require('crypto');

const SALT = process.env.HQ_SALT; 

if (!SALT) {
  console.error('❌ Error: HQ_SALT is missing in .env.local!');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: node hash.js <password> <optional: pin>');
  process.exit(1);
}

const [pass, pin] = args;

const passHash = crypto.createHash('sha256').update(pass + SALT).digest('hex');
console.log('PASSWORD HASH:', passHash);

if (pin) {
  const pinHash = crypto.createHash('sha256').update(pin + SALT).digest('hex');
  console.log('PIN HASH:', pinHash);
}