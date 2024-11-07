'use server';

const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

export const criptografar = async (string) => {
  const hash = crypto.createHash('sha256');
  hash.update(string);
  return hash.digest('hex');
}

export const criptografarUserData = async (data) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET não está definido');
  }
  const jwtSecretIv = process.env.JWT_SECRET_IV;
  if (!jwtSecretIv) {
    throw new Error('JWT_SECRET_IV não está definido');
  }
  const chave = crypto.createHash('sha256').update(String(jwtSecret)).digest();
  const iv = Buffer.from(jwtSecretIv, 'hex');
  if (iv.length !== 16) {
    throw new Error('JWT_SECRET_IV deve ter 16 bytes (32 caracteres hexadecimais)');
  }
  const aes = crypto.createCipheriv('aes-256-cbc', chave, iv);

  const dadoCriptografado = Buffer.concat([aes.update(JSON.stringify(data), 'utf8'), aes.final()]);

  return {
    chave: chave.toString('hex'),
    iv: iv.toString('hex'),
    dadoCriptografado: dadoCriptografado.toString('hex'),
  };
}

export const descriptografarUserData = async (dadoCriptografado) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET não está definido');
  }
  const jwtSecretIv = process.env.JWT_SECRET_IV;
  if (!jwtSecretIv) {
    throw new Error('JWT_SECRET_IV não está definido');
  }
  const chave = crypto.createHash('sha256').update(String(jwtSecret)).digest();
  const iv = Buffer.from(jwtSecretIv, 'hex');
  if (iv.length !== 16) {
    throw new Error('JWT_SECRET_IV deve ter 16 bytes (32 caracteres hexadecimais)');
  }
  if (dadoCriptografado.trim().length == 0) return '';
  const decipher = crypto.createDecipheriv('aes-256-cbc', chave, iv);

  const dadoDescriptografado = Buffer.concat([
    decipher.update(Buffer.from(dadoCriptografado, 'hex')),
    decipher.final(),
  ]);
  const dadoDescriptografadoJson = JSON.parse(dadoDescriptografado.toString('utf8'));

  return dadoDescriptografadoJson;
}

export const verificarDados = async (data, dataCriptografada) => {
  const dadoDescriptografado = await descriptografarUserData(dataCriptografada.dadoCriptografado);
  return JSON.stringify(data) === JSON.stringify(dadoDescriptografado);
}

export const verificarHash = async (string, hash) => {
  const stringHash = crypto.createHash('sha256').update(string).digest('hex');
  return stringHash === hash;
} 