const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.log('Usage: node scripts/generate-hash.js <password>');
  console.log('Example: node scripts/generate-hash.js mySecretPassword123');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log('Password hash:');
console.log(hash);
console.log('');
console.log('Add this to your .env file:');
console.log(`ADMIN_PASS_HASH=${hash}`);
