import CryptoJS from 'crypto-js';

export function encryptAvatarData(apelido: string, cor: string): string {
    const data = `${apelido}|${cor};`;
    const encryptedData = CryptoJS.AES.encrypt(data, "8b556a77-565b-487e-bd09-7ec4a3531a56").toString(CryptoJS.format.OpenSSL);
    return encryptedData;
}