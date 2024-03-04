import CryptoJS from 'crypto-js';

export function encryptAvatarData(apelido: string, cor: string): string {
    const data = `${apelido}|${cor};`;
    const secretUUID = process.env.NEXT_PUBLIC_SECRET_UUID || 'kachris123!';
    const encryptedData = CryptoJS.AES.encrypt(data, secretUUID).toString();
    return encryptedData;
}