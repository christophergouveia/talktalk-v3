"use client";

const crypto = require("crypto");

class Criptografia {
    async criptografar(string) {
        const hash = crypto.createHash('sha256');
        hash.update(string);
        return hash.digest('hex');
    }

    async verificarHash(string, hash) {
        const stringHash = crypto.createHash('sha256').update(string).digest('hex');
        return stringHash === hash;
    }
}

export default Criptografia;
