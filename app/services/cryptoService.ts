"use server";

const API_KEY = process.env.CRYPTO_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL ? 
  `http://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 
  'http://localhost:3000';

interface CryptoResponse {
  data: any;
  error?: string;
}

interface CriptografiaResult {
  data: string;
}

async function processCryptoRequest(body: any): Promise<any> {
  const response = await fetch(`${BASE_URL}/api/crypto`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  let result: CryptoResponse;
  
  try {
    result = JSON.parse(text);
  } catch (error) {
    console.error('Invalid JSON response:', text);
    throw new Error('Invalid JSON response from crypto service');
  }

  if (result.error) throw new Error(result.error);
  return result;
}

export async function criptografar(string: string): Promise<CryptoResponse> {
  return await processCryptoRequest({
    data: string,
    action: 'encrypt',
  });
}

export async function descriptografar(string: string): Promise<CryptoResponse> {
  return await processCryptoRequest({
    data: string,
    action: 'decrypt',
  });
}

export async function criptografarUserData(data: any): Promise<CriptografiaResult> {
  return await processCryptoRequest({
    data,
    action: 'encryptUserData',
  });
}

export async function descriptografarUserData(dadoCriptografado: string): Promise<CryptoResponse> {
  return await processCryptoRequest({
    data: dadoCriptografado,
    action: 'decryptUserData',
  });
}

export async function verificarDados(data: any, dataCriptografada: CriptografiaResult): Promise<boolean> {
  return await processCryptoRequest({
    data,
    dataCriptografada,
    action: 'verifyData',
  });
}

export async function verificarHash(string: string, hash: string): Promise<boolean> {
  return await processCryptoRequest({
    data: string,
    hash,
    action: 'verifyHash',
  });
}