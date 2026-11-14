import type { MessageKey } from './en';

const messages = {
  'app.name': 'Lurker Drops',
  'app.loadErrorTitle': 'Lurker Drops konnte nicht geladen werden',
  'app.loading': 'Deine Lurker werden geladen...',
  'app.backgroundUnavailable':
    'Der Lurker-Drops-Hintergrunddienst hat nicht geantwortet.',
  'app.genericError': 'Etwas ist schiefgelaufen.',

  'common.cancel': 'Abbrechen',
  'common.optional': 'Optional',
  'common.anyCategory': 'Alle Kategorien',
  'common.twitch': 'Twitch',
  'common.on': 'An',
  'common.off': 'Aus',
  'common.expand': 'Erweitern',
  'common.collapse': 'Einklappen',
  'common.goBack': 'Zurück',
  'common.popOut': 'In Fenster öffnen',
  'common.browserTab': 'Browser-Tab',
  'common.currentTab': 'Aktueller Tab',
  'common.viewers': '{count} Zuschauer',

  'nav.tagline': 'Twitch-Auto-Lurker',
  'nav.presets': 'Voreinstellungen',
  'nav.presetsSubtitle': 'Filter verwalten',
  'nav.editPreset': 'Voreinstellung bearbeiten',
  'nav.newPreset': 'Neue Voreinstellung',
  'nav.formSubtitle': 'Lurker-Filter',
  'nav.newLurker': 'Neuer Lurker',
  'nav.editLurker': 'Lurker bearbeiten',
  'nav.lurkerSubtitle': 'Lurker-Einstellungen',
  'nav.about': 'Über',
  'nav.aboutSubtitle': 'App-Informationen',
  'about.madeBy': 'Erstellt von',
  'about.version': 'Version',
  'nav.activeBadge': 'Aktiv: {count}',
  'nav.activeTooltip': 'Lurkende Tabs: {count}',
  'nav.idleTooltip': 'Lurker Drops ist inaktiv',

  'main.lurkingTabs': 'Lurkende Tabs',
  'main.addLurker': 'Hinzufügen',
  'main.livePreview': 'Live-Vorschau',
  'main.noLivePreview': 'Gerade keine passende Live.',
  'main.pausedCount': 'Pausiert: {count}',
  'main.noTabsTitle': 'Noch keine Tabs am Lurken',
  'main.noTabsHint':
    'Wähle unten eine Voreinstellung und aktiviere den Lurker für diesen Tab.',
  'main.status': 'Status',
  'main.preset': 'Voreinstellung',
  'main.noPresets': 'Noch keine Voreinstellungen',
  'main.selectPreset': 'Voreinstellung wählen',
  'main.createPresetFirst': 'Erstelle zuerst eine Voreinstellung',
  'main.searchPresets': 'Voreinstellungen durchsuchen...',
  'main.noPresetMatches': 'Keine passende Voreinstellung.',
  'main.managePresets': 'Voreinstellungen verwalten',
  'main.createFirstPreset': 'Erste Voreinstellung erstellen',
  'main.muted': 'Stumm',
  'main.mutedHint':
    'Den Browser-Tab stummschalten, nicht nur den Twitch-Player.',
  'main.pursue': 'Verfolgen',
  'main.pursueHint':
    'Dem meistgesehenen passenden Live folgen. Aus behält das aktuelle Live, solange es gültig bleibt.',
  'main.turnOffLurker': 'Lurker deaktivieren',
  'main.turnOnLurker': 'Lurker aktivieren',
  'main.footer':
    'Lurker Drops prüft Twitch jede Minute, solange ein lurkender Tab aktiv ist.',

  'status.paused': 'Pausiert',
  'overlay.title': 'Lurker-Modus',
  'overlay.subtitle': 'Dieser Tab wird von Lurker Drops verwaltet.',
  'overlay.disable': 'Lurker deaktivieren',
  'overlay.turningOff': 'Wird deaktiviert...',
  'overlay.dialogTitle': 'Lurker-Modus verlassen?',
  'overlay.dialogMessage': 'Dieser Tab ist im Lurker-Modus. Wenn du fortfährst, wird der Lurker für diesen Tab deaktiviert.',
  'overlay.confirm': 'Deaktivieren und fortfahren',
  'status.pausedDetail': 'Der Lurker ist für diesen Tab aus.',
  'status.live': 'Live',
  'status.watchingStream': 'Schaue {channel} · {title}',
  'status.watchingLive': 'Schaue ein Live.',
  'status.searching': 'Suche',
  'status.searchingDetail':
    'Twitch wird nach einem passenden Live für diese Voreinstellung durchsucht...',
  'status.waiting': 'Warte',
  'status.waitingDetail':
    'Gerade kein passendes Live. Der Lurker prüft jede Minute erneut.',
  'status.error': 'Fehler',
  'status.errorDetail': 'Twitch ist nicht erreichbar.',
  'status.idle': 'Inaktiv',
  'status.idleDetail': 'Der Lurker ist bereit.',
  'status.off': 'Aus',

  'row.presetLabel': 'Voreinstellung: {name}',
  'row.presetRemoved': 'Voreinstellung entfernt',
  'row.couldNotCheck': 'Twitch konnte nicht geprüft werden',
  'row.searchingMatch': 'Suche nach einem passenden Live',
  'row.waitingMatch': 'Warte auf ein passendes Live',
  'row.lurkerPaused': 'Lurker pausiert',
  'row.goTo': 'Öffnen',
  'row.goToTitle': 'Zum lurkenden Tab wechseln',
  'row.mute': 'Stumm',
  'row.unmute': 'Ton an',
  'row.muteTitle': 'Diesen Tab stummschalten',
  'row.unmuteTitle': 'Ton für diesen Tab einschalten',
  'row.turnOn': 'Aktivieren',
  'row.turnOff': 'Deaktivieren',
  'row.turnOnTitle': 'Lurker für diesen Tab aktivieren',
  'row.turnOffTitle': 'Lurker für diesen Tab deaktivieren',
  'row.pursueOn': 'Verfolgen an',
  'row.pursueOff': 'Verfolgen aus',
  'row.pursueOnTitle': 'Die meistgesehene Live verfolgen',
  'row.pursueOffTitle': 'Die aktuelle Live behalten, solange sie gültig ist',
  'row.close': 'Schließen',
  'row.closeConfirm': 'Diesen Tab schließen? Der Lurker wird dabei deaktiviert.',
  'row.closeTitle': 'Diesen Tab schließen und den Lurker deaktivieren',
  'row.edit': 'Bearbeiten',

  'presets.saved': 'Gespeicherte Voreinstellungen',
  'presets.total': 'Gesamt: {count}',
  'presets.emptyTitle': 'Noch keine Voreinstellungen',
  'presets.emptyHint':
    'Eine Voreinstellung legt fest, welche Twitch-Kategorie, welcher Titel, welche Favoriten- und blockierten Kanäle genutzt werden.',
  'presets.edit': 'Voreinstellung bearbeiten',
  'presets.select': 'Voreinstellung auswählen',
  'presets.delete': 'Voreinstellung löschen',
  'presets.titleContains': 'Titel enthält „{filter}“',
  'presets.anyTitle': 'beliebiger Titel',
  'presets.favoritesCount': 'Favoriten: {count}',
  'presets.blockedCount': 'Blockiert: {count}',
  'presets.inUseCount': 'In Verwendung: {count}',
  'presets.deleteConfirm': '{name} löschen?',
  'presets.deleteInUse':
    'Tabs, die sie nutzen, werden pausiert. Das kann nicht rückgängig gemacht werden.',
  'presets.deleteUnused':
    'Das kann nicht rückgängig gemacht werden.',
  'presets.deleting': 'Wird gelöscht...',
  'presets.tip':
    'Favoriten werden zuerst geprüft; die Sperrliste gewinnt immer. Nutze Verfolgen pro Tab, um dem meistgesehenen Live zu folgen.',

  'form.name': 'Name',
  'form.namePlaceholder': 'z. B. Drops bei der Arbeit',
  'form.nameHint':
    'Ein kurzer Name, um diese Voreinstellung zu erkennen.',
  'form.nameRequired': 'Gib dieser Voreinstellung einen Namen.',
  'form.category': 'Twitch-Kategorie',
  'form.categoryHint':
    'Durchsuche Twitch oder gib eine Kategorie manuell ein. Leer lassen, um alle Kategorien zuzulassen.',
  'form.titleFilter': 'Titelfilter',
  'form.titleFilterPlaceholder': 'z. B. drops, ranked, ohne Kommentar',
  'form.titleFilterHint':
    'Nur Lives, deren Titel diesen Text enthält, sind zulässig. Groß-/Kleinschreibung egal.',
  'form.favorites': 'Favoriten',
  'form.favoritesPlaceholder': 'Kanal-Slugs eingeben oder einfügen...',
  'form.favoritesHint':
    'Favoriten haben Vorrang. Pro Tab entscheidet die Option Verfolgen, ob der meistgesehene zulässige Kanal das aktuelle Live ersetzen darf.',
  'form.blacklist': 'Sperrliste',
  'form.blacklistPlaceholder':
    'Kanal-Slugs zum Ignorieren eingeben oder einfügen...',
  'form.blacklistHint':
    'Diese Kanäle werden nie ausgewählt, auch wenn sie Favoriten sind.',
  'form.save': 'Voreinstellung speichern',
  'form.saveLurker': 'Lurker speichern',
  'form.newTab': 'Neuer Tab',
  'form.newTabHint': 'Einen neuen Tab öffnen und den Lurker dort starten.',
  'form.saving': 'Wird gespeichert...',

  'category.searchPlaceholder': 'Twitch-Kategorien durchsuchen...',
  'category.searching': 'Twitch wird durchsucht...',
  'category.none':
    'Keine Kategorien gefunden. Gib einen Namen ein, um ihn manuell zu verwenden.',
  'category.use': '„{name}“ verwenden',
  'category.footer':
    'Kategorien stammen von Twitch. Eigene Namen sind erlaubt.',

  'multi.defaultPlaceholder': 'Twitch-Kanal-Slug eingeben',
  'multi.searchPlaceholder': 'Kanal-Slug suchen oder eingeben...',
  'multi.priorityOrder': 'Prioritätsreihenfolge',
  'multi.selected': 'Ausgewählt',
  'multi.remove': '{channel} entfernen',
  'multi.moveUp': '{channel} nach oben',
  'multi.moveDown': '{channel} nach unten',
  'multi.alreadyAdded': '@{channel} ist bereits hinzugefügt',
  'multi.add': '@{channel} hinzufügen',
  'multi.footerReorder':
    'Favoriten haben Vorrang. Die Reihenfolge gilt, wenn Verfolgen aus ist oder um Zuschauer-Gleichstand zu brechen.',
  'multi.footerAdd':
    'Mit Kommas mehrere Kanäle auf einmal hinzufügen.',
  'multi.typeOrPaste':
    'Kanal-Slug eingeben oder Twitch-URL einfügen.',

  'combo.selectOption': 'Option wählen',
  'combo.search': 'Suchen...',
  'combo.noResults': 'Keine Ergebnisse.',

  'error.choosePreset':
    'Wähle eine Voreinstellung, bevor du den Lurker startest.',
  'error.tabNotManaged':
    'Dieser Tab wird nicht von Lurker Drops verwaltet.',
  'error.presetMissing': 'Diese Voreinstellung existiert nicht mehr.',
  'error.unknownRequest': 'Unbekannte Anfrage: {request}',
  'error.unauthorized': 'Nicht autorisierter Absender.',
  'error.couldNotOpenChannel':
    '{channel} konnte nicht geöffnet werden: {error}',
  'error.presetNoLongerExists':
    'Die Voreinstellung existiert nicht mehr.',
  'error.presetRemoved':
    'Die von diesem Tab verwendete Voreinstellung wurde entfernt.',

  'twitch.timeout': 'Twitch hat zu lange gebraucht, um zu antworten.',
  'twitch.unreachable':
    'Twitch ist nicht erreichbar. Prüfe deine Verbindung.',
  'twitch.rateLimited':
    'Twitch begrenzt Anfragen. Versuche es in einer Minute erneut.',
  'twitch.httpError':
    'Die Twitch-API hat HTTP {status} zurückgegeben.',
  'twitch.empty':
    'Die Twitch-API hat eine leere Antwort zurückgegeben.',
} satisfies Record<MessageKey, string>;

export default messages;
