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

    // Map common language codes to standardized format
    const languageMapping: { [key: string]: string } = {
      'pt-BR': 'pt',
      'pt-PT': 'pt', 
      'en-US': 'en',
      'en-GB': 'en',
      'es-ES': 'es',
      'es-MX': 'es',
      'fr-FR': 'fr',
      'de-DE': 'de',
      'it-IT': 'it',
      'ja-JP': 'ja',
      'zh-CN': 'zh',
      'zh-TW': 'zh',
      'ru-RU': 'ru',
      'ar-SA': 'ar'
    };

    const mappedLanguage = languageMapping[targetLanguage.trim()] || targetLanguage.trim();
    
    console.log('[DEBUG] Mapeamento de idioma:', { 
      original: targetLanguage.trim(), 
      mapped: mappedLanguage 
    });

    const translation = await translate(text, { to: mappedLanguage, autoCorrect: true });
    const translationText = Array.isArray(translation) ? translation[0].text : translation.text;
    const translationTextStr = typeof translationText === 'string' ? translationText : String(translationText);

    console.log('[DEBUG] Tradução realizada com sucesso:', {
      originalLength: text.length,
      translatedLength: translationTextStr.length,
      targetLanguage: mappedLanguage
    });

    return NextResponse.json({
      result: translationText,
      language: supportedLanguages[targetLanguage as SupportedLanguage] || supportedLanguages[mappedLanguage as SupportedLanguage] || 'Idioma desconhecido',
    });
  } catch (error) {
    console.error('[ERROR] Erro na tradução:', error);
    return NextResponse.json({ error: `A tradução do Google falhou: ${error}` }, { status: 500 });
  }
}