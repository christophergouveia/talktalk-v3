import { NextResponse } from 'next/server';
import translate from 'google-translate-api-x';
import { supportedLanguages } from './languages';

type SupportedLanguage = keyof typeof supportedLanguages;

export async function POST(request: Request) {
  try {
    const { text, targetLanguage } = await request.json();

    console.log('[DEBUG] Requisição de tradução recebida:', { 
      text: text?.substring(0, 50) + '...',
      targetLanguage,
      textLength: text?.length || 0,
      hasText: !!text,
      hasTargetLanguage: !!targetLanguage,
      targetLanguageType: typeof targetLanguage
    });

    if (!text || !targetLanguage) {
      console.log('[ERROR] Missing text or targetLanguage:', { text: !!text, targetLanguage });
      return NextResponse.json({ error: 'Missing text or targetLanguage' }, { status: 400 });
    }

    // Validate that targetLanguage is not empty or just whitespace
    if (typeof targetLanguage !== 'string' || targetLanguage.trim() === '') {
      console.log('[ERROR] Invalid targetLanguage:', { targetLanguage, type: typeof targetLanguage });
      return NextResponse.json({ error: 'Invalid targetLanguage - must be non-empty string' }, { status: 400 });
    }

    //if (!(targetLanguage in supportedLanguages)) {
      //return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
    //}

    const translation = await translate(text, { to: targetLanguage.trim(), autoCorrect: true });
    const translationText = Array.isArray(translation) ? translation[0].text : translation.text;

    console.log('[DEBUG] Tradução realizada com sucesso:', {
      originalLength: text.length,
      translatedLength: translationText.length,
      targetLanguage: targetLanguage.trim()
    });

    return NextResponse.json({
      result: translationText,
      language: supportedLanguages[targetLanguage as SupportedLanguage],
    });
  } catch (error) {
    console.error('[ERROR] Erro na tradução:', error);
    return NextResponse.json({ error: `A tradução do Google falhou: ${error}` }, { status: 500 });
  }
}