import type { MessageKey } from './en';

const messages = {
  'app.name': 'Lurker Drops',
  'app.loadErrorTitle': 'Nie można załadować Lurker Drops',
  'app.loading': 'Ładowanie lurkerów...',
  'app.backgroundUnavailable':
    'Usługa w tle Lurker Drops nie odpowiedziała.',
  'app.genericError': 'Coś poszło nie tak.',

  'common.cancel': 'Anuluj',
  'common.optional': 'Opcjonalne',
  'common.anyCategory': 'Dowolna kategoria',
  'common.twitch': 'Twitch',
  'common.on': 'Włączone',
  'common.off': 'Wyłączone',
  'common.expand': 'Rozwiń',
  'common.collapse': 'Zwiń',
  'common.goBack': 'Wstecz',
  'common.popOut': 'Otwórz w oknie',
  'common.browserTab': 'Karta przeglądarki',
  'common.currentTab': 'Bieżąca karta',
  'common.viewers': '{count} widzów',

  'nav.tagline': 'Automatyczny lurker Twitch',
  'nav.presets': 'Ustawienia wstępne',
  'nav.presetsSubtitle': 'Zarządzaj filtrami',
  'nav.editPreset': 'Edytuj ustawienie wstępne',
  'nav.newPreset': 'Nowe ustawienie wstępne',
  'nav.formSubtitle': 'Filtry lurkera',
  'nav.newLurker': 'Nowy lurker',
  'nav.editLurker': 'Edytuj lurkera',
  'nav.lurkerSubtitle': 'Ustawienia lurkera',
  'nav.about': 'O aplikacji',
  'nav.aboutSubtitle': 'Informacje o aplikacji',
  'about.madeBy': 'Stworzone przez',
  'about.version': 'Wersja',
  'nav.activeBadge': 'Aktywne: {count}',
  'nav.activeTooltip': 'Karty w lurkerze: {count}',
  'nav.idleTooltip': 'Lurker Drops jest bezczynny',

  'main.lurkingTabs': 'Karty w lurkerze',
  'main.addLurker': 'Dodaj',
  'main.livePreview': 'Podgląd transmisji',
  'main.noLivePreview': 'Brak pasującej transmisji na żywo.',
  'main.pausedCount': 'Wstrzymane: {count}',
  'main.noTabsTitle': 'Brak kart w lurkerze',
  'main.noTabsHint':
    'Wybierz ustawienie wstępne poniżej i włącz lurker dla tej karty.',
  'main.status': 'Stan',
  'main.preset': 'Ustawienie wstępne',
  'main.noPresets': 'Brak ustawień wstępnych',
  'main.selectPreset': 'Wybierz ustawienie wstępne',
  'main.createPresetFirst': 'Najpierw utwórz ustawienie wstępne',
  'main.searchPresets': 'Szukaj ustawień wstępnych...',
  'main.noPresetMatches': 'Brak pasujących ustawień wstępnych.',
  'main.managePresets': 'Zarządzaj ustawieniami wstępnymi',
  'main.createFirstPreset': 'Utwórz pierwsze ustawienie wstępne',
  'main.muted': 'Wyciszona',
  'main.mutedHint':
    'Wycisz kartę przeglądarki, a nie tylko odtwarzacz Twitch.',
  'main.pursue': 'Śledzenie',
  'main.pursueHint':
    'Śledź najchętniej oglądaną transmisję pasującą do tego ustawienia. Wyłączone zachowuje bieżącą transmisję, dopóki pozostaje ważna.',
  'main.turnOffLurker': 'Wyłącz lurker',
  'main.turnOnLurker': 'Włącz lurker',
  'main.footer':
    'Lurker Drops sprawdza Twitch co minutę, gdy dowolna karta w lurkerze jest włączona.',

  'status.paused': 'Wstrzymana',
  'overlay.title': 'Tryb lurkera',
  'overlay.subtitle': 'Ta karta jest zarządzana przez Lurker Drops.',
  'overlay.disable': 'Wyłącz lurkera',
  'overlay.turningOff': 'Wyłączanie...',
  'overlay.dialogTitle': 'Opuścić tryb lurkera?',
  'overlay.dialogMessage': 'Ta karta jest w trybie lurkera. Kontynuowanie wyłączy lurkera na tej karcie.',
  'overlay.confirm': 'Wyłącz i kontynuuj',
  'status.pausedDetail': 'Lurker jest wyłączony dla tej karty.',
  'status.live': 'Na żywo',
  'status.watchingStream': 'Oglądasz {channel} · {title}',
  'status.watchingLive': 'Oglądasz transmisję na żywo.',
  'status.searching': 'Szukanie',
  'status.searchingDetail':
    'Szukanie na Twitch transmisji pasującej do tego ustawienia...',
  'status.waiting': 'Oczekiwanie',
  'status.waitingDetail':
    'Brak pasującej transmisji. Lurker sprawdzi ponownie za minutę.',
  'status.error': 'Błąd',
  'status.errorDetail': 'Nie można połączyć się z Twitch.',
  'status.idle': 'Bezczynny',
  'status.idleDetail': 'Lurker jest gotowy.',
  'status.off': 'Wyłączony',

  'row.presetLabel': 'Ustawienie wstępne: {name}',
  'row.presetRemoved': 'Usunięto ustawienie wstępne',
  'row.couldNotCheck': 'Nie można sprawdzić Twitch',
  'row.searchingMatch': 'Szukanie pasującej transmisji',
  'row.waitingMatch': 'Oczekiwanie na pasującą transmisję',
  'row.lurkerPaused': 'Lurker wstrzymany',
  'row.goTo': 'Przejdź',
  'row.goToTitle': 'Przejdź do karty w lurkerze',
  'row.mute': 'Wycisz',
  'row.unmute': 'Wyłącz wyciszenie',
  'row.muteTitle': 'Wycisz tę kartę',
  'row.unmuteTitle': 'Wyłącz wyciszenie tej karty',
  'row.turnOn': 'Włącz',
  'row.turnOff': 'Wyłącz',
  'row.turnOnTitle': 'Włącz lurker na tej karcie',
  'row.turnOffTitle': 'Wyłącz lurker na tej karcie',
  'row.pursueOn': 'Śledź tak',
  'row.pursueOff': 'Śledź nie',
  'row.pursueOnTitle': 'Śledź najczęściej oglądaną transmisję',
  'row.pursueOffTitle': 'Zachowaj bieżącą transmisję, dopóki jest ważna',
  'row.close': 'Zamknij',
  'row.closeConfirm': 'Zamknąć tę kartę? Lurker zostanie wtedy wyłączony.',
  'row.closeTitle': 'Zamknij tę kartę i wyłącz jej lurker',
  'row.edit': 'Edytuj',

  'presets.saved': 'Zapisane ustawienia wstępne',
  'presets.total': 'Razem: {count}',
  'presets.emptyTitle': 'Brak ustawień wstępnych',
  'presets.emptyHint':
    'Ustawienie wstępne określa kategorię Twitch, tytuł, ulubione i zablokowane kanały używane przez lurker.',
  'presets.edit': 'Edytuj ustawienie wstępne',
  'presets.delete': 'Usuń ustawienie wstępne',
  'presets.titleContains': 'tytuł zawiera „{filter}”',
  'presets.anyTitle': 'dowolny tytuł',
  'presets.favoritesCount': 'Ulubione: {count}',
  'presets.blockedCount': 'Zablokowane: {count}',
  'presets.inUseCount': 'W użyciu: {count}',
  'presets.deleteConfirm': 'Usunąć {name}?',
  'presets.deleteInUse':
    'Karty, które go używają, zostaną wstrzymane. Tej operacji nie można cofnąć.',
  'presets.deleteUnused': 'Tej operacji nie można cofnąć.',
  'presets.deleting': 'Usuwanie...',
  'presets.tip':
    'Najpierw sprawdzane są ulubione; czarna lista zawsze wygrywa. Użyj Śledzenia na karcie, aby podążać za najchętniej oglądaną transmisją.',

  'form.name': 'Nazwa',
  'form.namePlaceholder': 'np. Drops podczas pracy',
  'form.nameHint':
    'Krótka nazwa ułatwiająca rozpoznanie tego ustawienia.',
  'form.nameRequired': 'Nadaj nazwę temu ustawieniu wstępnemu.',
  'form.category': 'Kategoria Twitch',
  'form.categoryHint':
    'Wyszukaj na Twitch lub wpisz nazwę kategorii ręcznie. Pozostaw puste, aby zezwolić na dowolną kategorię.',
  'form.titleFilter': 'Filtr tytułu',
  'form.titleFilterPlaceholder': 'np. drops, ranked, bez komentarza',
  'form.titleFilterHint':
    'Kwalifikują się tylko transmisje, których tytuł zawiera ten tekst. Bez rozróżniania wielkości liter.',
  'form.favorites': 'Ulubione',
  'form.favoritesPlaceholder': 'Wpisz lub wklej slugi kanałów...',
  'form.favoritesHint':
    'Ulubione mają priorytet. Na każdej karcie opcja Śledzenie decyduje, czy najchętniej oglądany odpowiedni kanał może zastąpić bieżącą transmisję.',
  'form.blacklist': 'Czarna lista',
  'form.blacklistPlaceholder':
    'Wpisz lub wklej slugi kanałów do ignorowania...',
  'form.blacklistHint':
    'Te kanały nigdy nie są wybierane, nawet jeśli są ulubione.',
  'form.save': 'Zapisz ustawienie',
  'form.saveLurker': 'Zapisz lurkera',
  'form.newTab': 'Nowa karta',
  'form.newTabHint': 'Otwórz nową kartę i uruchom tam tego lurkera.',
  'form.saving': 'Zapisywanie...',

  'category.searchPlaceholder': 'Szukaj kategorii Twitch...',
  'category.searching': 'Szukanie na Twitch...',
  'category.none':
    'Nie znaleziono kategorii. Wpisz nazwę, aby użyć jej ręcznie.',
  'category.use': 'Użyj „{name}”',
  'category.footer':
    'Kategorie pochodzą z Twitch. Niestandardowe nazwy są dozwolone.',

  'multi.defaultPlaceholder': 'Wpisz slug kanału Twitch',
  'multi.searchPlaceholder': 'Szukaj lub wpisz slug kanału...',
  'multi.priorityOrder': 'Kolejność priorytetów',
  'multi.selected': 'Wybrane',
  'multi.remove': 'Usuń {channel}',
  'multi.moveUp': 'Przesuń {channel} w górę',
  'multi.moveDown': 'Przesuń {channel} w dół',
  'multi.alreadyAdded': '@{channel} jest już dodany',
  'multi.add': 'Dodaj @{channel}',
  'multi.footerReorder':
    'Ulubione mają priorytet. Kolejność działa przy wyłączonym Śledzeniu lub przy remisie widzów.',
  'multi.footerAdd':
    'Użyj przecinków, aby dodać kilka kanałów naraz.',
  'multi.typeOrPaste':
    'Wpisz slug kanału lub wklej adres URL Twitch.',

  'combo.selectOption': 'Wybierz opcję',
  'combo.search': 'Szukaj...',
  'combo.noResults': 'Brak wyników.',

  'error.choosePreset':
    'Wybierz ustawienie wstępne przed uruchomieniem lurkera.',
  'error.tabNotManaged':
    'Ta karta nie jest zarządzana przez Lurker Drops.',
  'error.presetMissing': 'To ustawienie wstępne już nie istnieje.',
  'error.unknownRequest': 'Nieznane żądanie: {request}',
  'error.unauthorized': 'Nieautoryzowany nadawca.',
  'error.couldNotOpenChannel': 'Nie można otworzyć {channel}: {error}',
  'error.presetNoLongerExists':
    'Ustawienie wstępne już nie istnieje.',
  'error.presetRemoved':
    'Ustawienie wstępne używane przez tę kartę zostało usunięte.',

  'twitch.timeout': 'Twitch odpowiedział zbyt wolno.',
  'twitch.unreachable':
    'Nie można połączyć się z Twitch. Sprawdź połączenie.',
  'twitch.rateLimited':
    'Twitch ogranicza żądania. Spróbuj ponownie za minutę.',
  'twitch.httpError': 'API Twitch zwróciło HTTP {status}.',
  'twitch.empty': 'API Twitch zwróciło pustą odpowiedź.',
} satisfies Record<MessageKey, string>;

export default messages;
