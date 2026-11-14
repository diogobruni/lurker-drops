import type { MessageKey } from './en';

const messages = {
  'app.name': 'Lurker Drops',
  'app.loadErrorTitle': 'Lurker Drops kon niet worden geladen',
  'app.loading': 'Je lurkers worden geladen...',
  'app.backgroundUnavailable':
    'De achtergrondservice van Lurker Drops reageerde niet.',
  'app.genericError': 'Er is iets misgegaan.',

  'common.cancel': 'Annuleren',
  'common.optional': 'Optioneel',
  'common.anyCategory': 'Elke categorie',
  'common.twitch': 'Twitch',
  'common.on': 'Aan',
  'common.off': 'Uit',
  'common.expand': 'Uitvouwen',
  'common.collapse': 'Samenvouwen',
  'common.goBack': 'Terug',
  'common.popOut': 'In venster openen',
  'common.browserTab': 'Browsertabblad',
  'common.currentTab': 'Huidig tabblad',
  'common.viewers': '{count} kijkers',

  'nav.tagline': 'Twitch-auto-lurker',
  'nav.presets': 'Voorinstellingen',
  'nav.presetsSubtitle': 'Beheer je filters',
  'nav.editPreset': 'Voorinstelling bewerken',
  'nav.newPreset': 'Nieuwe voorinstelling',
  'nav.formSubtitle': 'Lurkerfilters',
  'nav.newLurker': 'Nieuwe lurker',
  'nav.editLurker': 'Lurker bewerken',
  'nav.lurkerSubtitle': 'Lurkerinstellingen',
  'nav.about': 'Over',
  'nav.aboutSubtitle': 'App-informatie',
  'about.madeBy': 'Gemaakt door',
  'about.version': 'Versie',
  'nav.activeBadge': 'Actief: {count}',
  'nav.activeTooltip': 'Lurkende tabbladen: {count}',
  'nav.idleTooltip': 'Lurker Drops is inactief',

  'main.lurkingTabs': 'Lurkende tabbladen',
  'main.addLurker': 'Toevoegen',
  'main.livePreview': 'Livevoorbeeld',
  'main.noLivePreview': 'Momenteel geen passende live.',
  'main.pausedCount': 'Gepauzeerd: {count}',
  'main.noTabsTitle': 'Nog geen lurkende tabbladen',
  'main.noTabsHint':
    'Kies hieronder een voorinstelling en zet de lurker aan voor dit tabblad.',
  'main.status': 'Status',
  'main.preset': 'Voorinstelling',
  'main.noPresets': 'Nog geen voorinstellingen',
  'main.selectPreset': 'Kies een voorinstelling',
  'main.createPresetFirst': 'Maak eerst een voorinstelling',
  'main.searchPresets': 'Voorinstellingen zoeken...',
  'main.noPresetMatches': 'Geen voorinstellingen gevonden.',
  'main.managePresets': 'Voorinstellingen beheren',
  'main.createFirstPreset': 'Maak je eerste voorinstelling',
  'main.muted': 'Gedempt',
  'main.mutedHint':
    'Demp het browsertabblad zelf, niet alleen de Twitch-speler.',
  'main.pursue': 'Volgen',
  'main.pursueHint':
    'Volg de meest bekeken live die bij deze voorinstelling past. Uit houdt de huidige live vast zolang die geldig blijft.',
  'main.turnOffLurker': 'Lurker uitzetten',
  'main.turnOnLurker': 'Lurker aanzetten',
  'main.footer':
    'Lurker Drops controleert Twitch elke minuut zolang er een lurkend tabblad aan staat.',

  'status.paused': 'Gepauzeerd',
  'overlay.title': 'Lurkermodus',
  'overlay.subtitle': 'Dit tabblad wordt beheerd door Lurker Drops.',
  'overlay.disable': 'Lurker uitzetten',
  'overlay.turningOff': 'Uitzetten...',
  'overlay.dialogTitle': 'Lurkermodus verlaten?',
  'overlay.dialogMessage': 'Dit tabblad staat in lurkermodus. Als je doorgaat, wordt de lurker voor dit tabblad uitgezet.',
  'overlay.confirm': 'Uitzetten en doorgaan',
  'status.pausedDetail': 'De lurker staat uit voor dit tabblad.',
  'status.live': 'Live',
  'status.watchingStream': '{channel} aan het kijken · {title}',
  'status.watchingLive': 'Een live aan het kijken.',
  'status.searching': 'Zoeken',
  'status.searchingDetail':
    'Twitch wordt doorzocht op een live die bij deze voorinstelling past...',
  'status.waiting': 'Wachten',
  'status.waitingDetail':
    'Nu geen passende live. De lurker controleert elke minuut opnieuw.',
  'status.error': 'Fout',
  'status.errorDetail': 'Twitch is niet bereikbaar.',
  'status.idle': 'Inactief',
  'status.idleDetail': 'De lurker is klaar.',
  'status.off': 'Uit',

  'row.presetLabel': 'Voorinstelling: {name}',
  'row.presetRemoved': 'Voorinstelling verwijderd',
  'row.couldNotCheck': 'Twitch kon niet worden gecontroleerd',
  'row.searchingMatch': 'Zoeken naar een passende live',
  'row.waitingMatch': 'Wachten op een passende live',
  'row.lurkerPaused': 'Lurker gepauzeerd',
  'row.goTo': 'Ga naar',
  'row.goToTitle': 'Ga naar het lurkende tabblad',
  'row.mute': 'Demp',
  'row.unmute': 'Geluid aan',
  'row.muteTitle': 'Dit tabblad dempen',
  'row.unmuteTitle': 'Geluid van dit tabblad aanzetten',
  'row.turnOn': 'Aanzetten',
  'row.turnOff': 'Uitzetten',
  'row.turnOnTitle': 'Lurker aanzetten op dit tabblad',
  'row.turnOffTitle': 'Lurker uitzetten op dit tabblad',
  'row.pursueOn': 'Volgen aan',
  'row.pursueOff': 'Volgen uit',
  'row.pursueOnTitle': 'De meest bekeken live volgen',
  'row.pursueOffTitle': 'De huidige live houden zolang die geldig is',
  'row.close': 'Sluiten',
  'row.closeConfirm': 'Dit tabblad sluiten? De lurker wordt dan uitgeschakeld.',
  'row.closeTitle': 'Dit tabblad sluiten en de lurker uitzetten',
  'row.edit': 'Bewerken',

  'presets.saved': 'Opgeslagen voorinstellingen',
  'presets.total': 'Totaal: {count}',
  'presets.emptyTitle': 'Nog geen voorinstellingen',
  'presets.emptyHint':
    'Een voorinstelling vertelt de lurker welke Twitch-categorie, titel, favoriete kanalen en geblokkeerde kanalen hij moet gebruiken.',
  'presets.edit': 'Voorinstelling bewerken',
  'presets.select': 'Voorinstelling selecteren',
  'presets.delete': 'Voorinstelling verwijderen',
  'presets.titleContains': 'titel bevat “{filter}”',
  'presets.anyTitle': 'elke titel',
  'presets.favoritesCount': 'Favorieten: {count}',
  'presets.blockedCount': 'Geblokkeerd: {count}',
  'presets.inUseCount': 'In gebruik: {count}',
  'presets.deleteConfirm': '{name} verwijderen?',
  'presets.deleteInUse':
    'Tabbladen die hem gebruiken worden gepauzeerd. Dit kan niet ongedaan worden gemaakt.',
  'presets.deleteUnused':
    'Dit kan niet ongedaan worden gemaakt.',
  'presets.deleting': 'Verwijderen...',
  'presets.tip':
    'Favorieten worden eerst gecontroleerd; de zwarte lijst wint altijd. Gebruik Volgen per tabblad om de meest bekeken live te zoeken.',

  'form.name': 'Naam',
  'form.namePlaceholder': 'bijv. Drops tijdens werk',
  'form.nameHint':
    'Een korte naam om deze voorinstelling te herkennen.',
  'form.nameRequired': 'Geef deze voorinstelling een naam.',
  'form.category': 'Twitch-categorie',
  'form.categoryHint':
    'Zoek op Twitch of typ handmatig een categorienaam. Laat leeg om elke categorie toe te staan.',
  'form.titleFilter': 'Titelfilter',
  'form.titleFilterPlaceholder': 'bijv. drops, ranked, geen commentaar',
  'form.titleFilterHint':
    'Alleen lives waarvan de titel deze tekst bevat, komen in aanmerking. Hoofdletterongevoelig.',
  'form.favorites': 'Favorieten',
  'form.favoritesPlaceholder': 'Typ of plak kanaalslugs...',
  'form.favoritesHint':
    'Favorieten hebben voorrang. Per tabblad bepaalt de optie Volgen of het meest bekeken geschikte kanaal de huidige live mag vervangen.',
  'form.blacklist': 'Zwarte lijst',
  'form.blacklistPlaceholder':
    'Typ of plak kanaalslugs om te negeren...',
  'form.blacklistHint':
    'Deze kanalen worden nooit gekozen, ook niet als ze favoriet zijn.',
  'form.save': 'Voorinstelling opslaan',
  'form.saveLurker': 'Lurker opslaan',
  'form.newTab': 'Nieuw tabblad',
  'form.newTabHint': 'Open een nieuw tabblad en start deze lurker daar.',
  'form.saving': 'Opslaan...',

  'category.searchPlaceholder': 'Twitch-categorieën zoeken...',
  'category.searching': 'Twitch doorzoeken...',
  'category.none':
    'Geen categorieën gevonden. Typ een naam om die handmatig te gebruiken.',
  'category.use': '“{name}” gebruiken',
  'category.footer':
    'Categorieën komen van Twitch. Eigen namen zijn toegestaan.',

  'multi.defaultPlaceholder': 'Typ een Twitch-kanaalslug',
  'multi.searchPlaceholder': 'Zoek of typ een kanaalslug...',
  'multi.priorityOrder': 'Prioriteitsvolgorde',
  'multi.selected': 'Geselecteerd',
  'multi.remove': '{channel} verwijderen',
  'multi.moveUp': '{channel} omhoog',
  'multi.moveDown': '{channel} omlaag',
  'multi.alreadyAdded': '@{channel} is al toegevoegd',
  'multi.add': '@{channel} toevoegen',
  'multi.footerReorder':
    'Favorieten hebben voorrang. De volgorde geldt als Volgen uit staat of om kijkersgelijke standen te breken.',
  'multi.footerAdd':
    "Gebruik komma's om meerdere kanalen tegelijk toe te voegen.",
  'multi.typeOrPaste':
    'Typ een kanaalslug of plak een Twitch-URL.',

  'combo.selectOption': 'Kies een optie',
  'combo.search': 'Zoeken...',
  'combo.noResults': 'Geen resultaten.',

  'error.choosePreset':
    'Kies een voorinstelling voordat je de lurker start.',
  'error.tabNotManaged':
    'Dit tabblad wordt niet beheerd door Lurker Drops.',
  'error.presetMissing': 'Die voorinstelling bestaat niet meer.',
  'error.unknownRequest': 'Onbekend verzoek: {request}',
  'error.unauthorized': 'Niet-geautoriseerde afzender.',
  'error.couldNotOpenChannel':
    'Kon {channel} niet openen: {error}',
  'error.presetNoLongerExists':
    'De voorinstelling bestaat niet meer.',
  'error.presetRemoved':
    'De voorinstelling van dit tabblad is verwijderd.',

  'twitch.timeout': 'Twitch deed er te lang over om te reageren.',
  'twitch.unreachable':
    'Twitch is niet bereikbaar. Controleer je verbinding.',
  'twitch.rateLimited':
    'Twitch beperkt verzoeken. Probeer het over een minuut opnieuw.',
  'twitch.httpError':
    'De Twitch-API retourneerde HTTP {status}.',
  'twitch.empty':
    'De Twitch-API retourneerde een lege reactie.',
} satisfies Record<MessageKey, string>;

export default messages;
