import { NextResponse } from 'next/server';
import translate from 'google-translate-api-x';
import { supportedLanguages } from './languages';

type SupportedLanguage = keyof typeof supportedLanguages;

export async function POST(request: Request) {
  const { text, targetLanguage } = await request.json();

  if (!text || !targetLanguage) {
    return NextResponse.json({ error: 'Missing text or targetLanguage' }, { status: 400 });
  }

  if (!(targetLanguage in supportedLanguages)) {
    return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  }

  try {
    const proxies = [
      { host: '20.111.54.16', port: 8123 },
      { host: '157.254.53.50', port: 80 },
      { host: '160.86.242.23', port: 8080 },
      { host: '158.255.77.169', port: 80 },
      { host: '43.200.77.128', port: 3128 },
      { host: '179.96.28.58', port: 80 },
      { host: '89.179.71.21', port: 3128 },
      { host: '195.26.247.214', port: 8081 },
      { host: '77.221.136.168', port: 8000 },
      { host: '77.221.139.76', port: 8000 },
      { host: '45.119.133.218', port: 3128 },
      { host: '89.145.162.81', port: 3128 },
      { host: '148.72.168.80', port: 30127 },
      { host: '198.74.51.79', port: 8888 },
      { host: '193.227.129.212', port: 54759 },
      { host: '178.128.199.145', port: 80 },
    ];

    const proxyIndex = Math.floor(Math.random() * proxies.length);
    const proxy = proxies[proxyIndex];

    const translation = await translate(text, { to: targetLanguage, autoCorrect: true });
    const translationText = Array.isArray(translation) ? translation[0].text : translation.text;

    return NextResponse.json({
      result: translationText,
      language: supportedLanguages[targetLanguage as SupportedLanguage],
    });
  } catch (error) {
    return NextResponse.json({ error: `A tradução do Google falhou: ${error}` }, { status: 500 });
  }
} 