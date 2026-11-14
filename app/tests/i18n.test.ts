import { describe, expect, it } from 'vitest';

import { englishMessages, normalizeLocale, t } from '../src/shared/i18n';
import de from '../src/shared/locales/de';
import es from '../src/shared/locales/es';
import fr from '../src/shared/locales/fr';
import itLocale from '../src/shared/locales/it';
import ja from '../src/shared/locales/ja';
import ko from '../src/shared/locales/ko';
import nl from '../src/shared/locales/nl';
import pl from '../src/shared/locales/pl';
import ptBR from '../src/shared/locales/pt_BR';
import ru from '../src/shared/locales/ru';
import tr from '../src/shared/locales/tr';
import zhCN from '../src/shared/locales/zh_CN';
import zhTW from '../src/shared/locales/zh_TW';

const catalogs = {
  de,
  es,
  fr,
  it: itLocale,
  ja,
  ko,
  nl,
  pl,
  pt_BR: ptBR,
  ru,
  tr,
  zh_CN: zhCN,
  zh_TW: zhTW,
};

const englishKeys = Object.keys(englishMessages).sort();

function placeholders(text: string): string[] {
  return [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
}

describe('translations', () => {
  it.each(Object.entries(catalogs))(
    '%s has the same keys and placeholders as English',
    (_locale, catalog) => {
      const messages = catalog as Record<string, string>;
      expect(Object.keys(messages).sort()).toEqual(englishKeys);

      for (const key of englishKeys) {
        expect(messages[key]?.trim().length, key).toBeGreaterThan(0);
        expect(placeholders(messages[key] ?? ''), key).toEqual(
          placeholders(englishMessages[key as keyof typeof englishMessages]),
        );
      }
    },
  );

  it('interpolates named parameters', () => {
    expect(t('row.presetLabel', { name: 'Drops' })).toContain('Drops');
    expect(t('twitch.httpError', { status: 429 })).toContain('429');
  });
});

describe('locale normalization', () => {
  it.each([
    ['en-US', 'en'],
    ['pt-BR', 'pt_BR'],
    ['pt-PT', 'pt_BR'],
    ['zh-CN', 'zh_CN'],
    ['zh-Hans', 'zh_CN'],
    ['zh-TW', 'zh_TW'],
    ['zh-HK', 'zh_TW'],
    ['zh-Hant', 'zh_TW'],
    ['es-419', 'es'],
    ['de-AT', 'de'],
    ['fr-CA', 'fr'],
    ['ja-JP', 'ja'],
    ['ko-KR', 'ko'],
    ['ru-RU', 'ru'],
    ['tr-TR', 'tr'],
    ['pl-PL', 'pl'],
    ['nl-NL', 'nl'],
    ['xx-YY', 'en'],
    [null, 'en'],
  ])('maps %s to %s', (input, expected) => {
    expect(normalizeLocale(input)).toBe(expected);
  });
});
