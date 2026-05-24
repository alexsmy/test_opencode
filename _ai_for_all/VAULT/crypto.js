const crypto = require('crypto');
const fs = require('fs');

const mode = process.argv[2];
const password = process.argv[3];
if (!mode || !password) {
    console.error('Usage: node crypto.js <encrypt|decrypt> <password>');
    process.exit(1);
}

const ITERS = 600000;
const KEY_LEN = 32;

if (mode === 'encrypt') {
    const salt = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12);
    const key = crypto.pbkdf2Sync(password, salt, ITERS, KEY_LEN, 'sha256');
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const input = fs.readFileSync(0);
    const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);
    const tag = cipher.getAuthTag();

    process.stdout.write(salt);
    process.stdout.write(iv);
    process.stdout.write(tag);
    process.stdout.write(encrypted);
} else if (mode === 'decrypt') {
    const data = fs.readFileSync(0);
    if (data.length < 32 + 12 + 16) {
        console.error('Invalid encrypted data');
        process.exit(1);
    }
    const salt = data.subarray(0, 32);
    const iv = data.subarray(32, 44);
    const tag = data.subarray(44, 60);
    const encrypted = data.subarray(60);

    const key = crypto.pbkdf2Sync(password, salt, ITERS, KEY_LEN, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    try {
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        process.stdout.write(decrypted);
    } catch (e) {
        console.error('Decryption failed: wrong password or corrupted data');
        process.exit(1);
    }
}
