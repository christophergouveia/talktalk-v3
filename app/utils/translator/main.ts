'use server';

const translate = require('google-translate-api-x');

export const supportedLanguages = {
  af: 'Afrikaans',
  sq: 'Albanian',
  am: 'Amharic',
  ar: 'Arabic',
  hy: 'Armenian',
  az: 'Azerbaijani',
  eu: 'Basque',
  be: 'Belarusian',
  bn: 'Bengali',
  bs: 'Bosnian',
  bg: 'Bulgarian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  ny: 'Chichewa',
  'zh-CN': 'Chinese (Simplified)',
  'zh-TW': 'Chinese (Traditional)',
  co: 'Corsican',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  nl: 'Dutch',
  en: 'English',
  eo: 'Esperanto',
  et: 'Estonian',
  tl: 'Filipino',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Frisian',
  gl: 'Galician',
  ka: 'Georgian',
  de: 'German',
  el: 'Greek',
  gu: 'Gujarati',
  ht: 'Haitian Creole',
  ha: 'Hausa',
  haw: 'Hawaiian',
  iw: 'Hebrew',
  hi: 'Hindi',
  hmn: 'Hmong',
  hu: 'Hungarian',
  is: 'Icelandic',
  ig: 'Igbo',
  id: 'Indonesian',
  ga: 'Irish',
  it: 'Italian',
  ja: 'Japanese',
  jw: 'Javanese',
  kn: 'Kannada',
  kk: 'Kazakh',
  km: 'Khmer',
  ko: 'Korean',
  ku: 'Kurdish (Kurmanji)',
  ky: 'Kyrgyz',
  lo: 'Lao',
  la: 'Latin',
  lv: 'Latvian',
  lt: 'Lithuanian',
  lb: 'Luxembourgish',
  mk: 'Macedonian',
  mg: 'Malagasy',
  ms: 'Malay',
  ml: 'Malayalam',
  mt: 'Maltese',
  mi: 'Maori',
  mr: 'Marathi',
  mn: 'Mongolian',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  no: 'Norwegian',
  or: 'Odia (Oriya)',
  ps: 'Pashto',
  fa: 'Persian',
  pl: 'Polish',
  pt: 'Portuguese',
  pa: 'Punjabi',
  ro: 'Romanian',
  ru: 'Russian',
  sm: 'Samoan',
  gd: 'Scots Gaelic',
  sr: 'Serbian',
  st: 'Sesotho',
  sn: 'Shona',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somali',
  es: 'Spanish',
  su: 'Sundanese',
  sw: 'Swahili',
  sv: 'Swedish',
  tg: 'Tajik',
  ta: 'Tamil',
  te: 'Telugu',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  ug: 'Uyghur',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  cy: 'Welsh',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zu: 'Zulu',
} as const;


type SupportedLanguage = keyof typeof supportedLanguages;


/**
 * Método assíncrono para traduzir texto para um idioma de destino usando um servidor proxy aleatório.
 * 
 * @param text O texto a ser traduzido.
 * @param targetLanguage O código do idioma de destino para o qual o texto será traduzido.
 * @returns Uma Promise que resolve para o texto traduzido.
 * @throws Error se a tradução do Google falhar.
 */
export async function translateText(text: string, targetLanguage: SupportedLanguage): Promise<{ result: string, language: string }> {
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

    const options = {
      proxy: {
        host: proxy.host,
        port: proxy.port,
      },
    };
    console.log(text, targetLanguage);
    const translation = await translate(text, { to: targetLanguage, proxyOptions: options });
    return {
      result: translation.text,
      language: supportedLanguages[targetLanguage]
    }
  } catch (erro) {
    throw new Error(`A tradução do Google falhou: ${erro}`);
  }
}