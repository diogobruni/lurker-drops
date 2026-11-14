import de from './locales/de';
import en, { type MessageKey } from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import it from './locales/it';
import ja from './locales/ja';
import ko from './locales/ko';
import nl from './locales/nl';
import pl from './locales/pl';
import ptBR from './locales/pt_BR';
import ru from './locales/ru';
import tr from './locales/tr';
import zhCN from './locales/zh_CN';
import zhTW from './locales/zh_TW';

export const LOCALES = [
  'en',
  'es',
  'fr',
  'de',
  'zh_CN',
  'ja',
  'it',
  'pt_BR',
  'ko',
  'zh_TW',
  'nl',
  'pl',
  'ru',
  'tr',
] as const;

export type Locale = (typeof LOCALES)[number];
export type { MessageKey };

type Catalog = Record<MessageKey, string>;
type Params = Record<string, string | number>;

const catalogs: Record<Locale, Catalog> = {
  en,
  es,
  fr,
  de,
  zh_CN: zhCN,
  ja,
  it,
  pt_BR: ptBR,
  ko,
  zh_TW: zhTW,
  nl,
  pl,
  ru,
  tr,
};

const supported = new Set<string>(LOCALES);

let activeLocale: Locale | null = null;

export function normalizeLocale(input?: string | null): Locale {
  if (!input) return 'en';
  const value = input.trim().toLowerCase().replace(/_/g, '-');
  if (!value) return 'en';
  if (value.startsWith('pt')) return 'pt_BR';
  if (value.startsWith('zh')) {
    return /(^|-)tw($|-)|hant|hk|mo/.test(value) ? 'zh_TW' : 'zh_CN';
  }
  const base = value.split('-')[0];
  return (supported.has(base) ? base : 'en') as Locale;
}

function detectedLanguage(): string | null {
  try {
    if (typeof chrome !== 'undefined' && chrome.i18n?.getUILanguage) {
      return chrome.i18n.getUILanguage();
    }
  } catch {
    // Extension APIs are unavailable outside extension pages.
  }
  if (typeof navigator !== 'undefined') return navigator.language;
  return null;
}

export function getLocale(): Locale {
  if (!activeLocale) activeLocale = normalizeLocale(detectedLanguage());
  return activeLocale;
}

function interpolate(template: string, params: Params): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(params, name)
      ? String(params[name])
      : match,
  );
}

export function t(key: MessageKey, params?: Params): string {
  const template = catalogs[getLocale()]?.[key] ?? en[key] ?? key;
  return params ? interpolate(template, params) : template;
}

/** BCP 47 tag for `Intl` and the document `lang` attribute. */
export function localeTag(locale: Locale = getLocale()): string {
  return locale.replace('_', '-');
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat(localeTag(), {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export { en as englishMessages };
