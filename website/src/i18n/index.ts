import { en } from './en';
import { es } from './es';
import { ptBR } from './pt-br';

export const dictionaries = { en, 'pt-br': ptBR, es } as const;

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];

export const SITE = 'https://diogobruni.github.io';
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/lurker-drops/ebcahoihcbkbebpebmdmofpfohnfinoc';
export const GITHUB_URL = 'https://github.com/diogobruni/lurker-drops';
export const RELEASES_URL = `${GITHUB_URL}/releases`;
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest/download/lurker-drops.zip`;

export function href(path: string): string {
  return `${BASE}${path}`;
}

export function asset(name: string): string {
  return `${BASE}/${name}`;
}

export function pageUrl(path: string): string {
  return `${SITE}${BASE}${path}`;
}

export const alternates = locales.map((locale) => ({
  locale,
  hrefLang: dictionaries[locale].htmlLang,
  url: pageUrl(dictionaries[locale].path),
}));
