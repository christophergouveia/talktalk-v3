import { NextResponse } from 'next/server';
import translate from 'google-translate-api-x';
import { supportedLanguages } from './languages';

type SupportedLanguage = keyof typeof supportedLanguages;

export async function POST(request: Request) {
  const { text, targetLanguage } = await request.json();

  console.log('[DEBUG] Requisição de tradução recebida:', { text, targetLanguage });

  if (!text || !targetLanguage) {
    return NextResponse.json({ error: 'Missing text or targetLanguage' }, { status: 400 });
  }

  //if (!(targetLanguage in supportedLanguages)) {
    //return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
  //}

  try {

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