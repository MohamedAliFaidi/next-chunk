import { writeFileSync } from 'fs';
import { generateKeyPairSync } from 'crypto';

// Generate a new RSA key pair
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,  // You can adjust the key size (2048 bits is a common choice)
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// Save the keys to files or use them as needed
writeFileSync('private_key.pem', privateKey);
writeFileSync('public_key.pem', publicKey);
