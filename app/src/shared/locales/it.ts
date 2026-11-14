import type { MessageKey } from './en';

const messages = {
  'app.name': 'Lurker Drops',
  'app.loadErrorTitle': 'Impossibile caricare Lurker Drops',
  'app.loading': 'Caricamento dei tuoi lurker...',
  'app.backgroundUnavailable':
    'Il servizio in background di Lurker Drops non ha risposto.',
  'app.genericError': 'Qualcosa è andato storto.',

  'common.cancel': 'Annulla',
  'common.optional': 'Facoltativo',
  'common.anyCategory': 'Qualsiasi categoria',
  'common.twitch': 'Twitch',
  'common.on': 'Attivo',
  'common.off': 'Disattivato',
  'common.expand': 'Espandi',
  'common.collapse': 'Comprimi',
  'common.goBack': 'Indietro',
  'common.popOut': 'Apri in finestra',
  'common.browserTab': 'Scheda del browser',
  'common.currentTab': 'Scheda corrente',
  'common.viewers': '{count} spettatori',

  'nav.tagline': 'Auto-lurker per Twitch',
  'nav.presets': 'Preset',
  'nav.presetsSubtitle': 'Gestisci i tuoi filtri',
  'nav.editPreset': 'Modifica preset',
  'nav.newPreset': 'Nuovo preset',
  'nav.formSubtitle': 'Filtri del lurker',
  'nav.newLurker': 'Nuovo lurker',
  'nav.editLurker': 'Modifica lurker',
  'nav.lurkerSubtitle': 'Impostazioni lurker',
  'nav.about': 'Informazioni',
  'nav.aboutSubtitle': 'Informazioni sull\'app',
  'about.madeBy': 'Creato da',
  'about.version': 'Versione',
  'nav.activeBadge': 'Attivi: {count}',
  'nav.activeTooltip': 'Schede in lurker: {count}',
  'nav.idleTooltip': 'Lurker Drops è inattivo',

  'main.lurkingTabs': 'Schede in lurker',
  'main.addLurker': 'Aggiungi',
  'main.livePreview': 'Anteprima live',
  'main.noLivePreview': 'Nessuna live compatibile al momento.',
  'main.pausedCount': 'In pausa: {count}',
  'main.noTabsTitle': 'Nessuna scheda in lurker',
  'main.noTabsHint':
    'Scegli un preset qui sotto e attiva il lurker per questa scheda.',
  'main.status': 'Stato',
  'main.preset': 'Preset',
  'main.noPresets': 'Nessun preset',
  'main.selectPreset': 'Scegli un preset',
  'main.createPresetFirst': 'Crea prima un preset',
  'main.searchPresets': 'Cerca preset...',
  'main.noPresetMatches': 'Nessun preset corrispondente.',
  'main.managePresets': 'Gestisci preset',
  'main.createFirstPreset': 'Crea il tuo primo preset',
  'main.muted': 'Muto',
  'main.mutedHint':
    "Disattiva l'audio della scheda, non solo del player Twitch.",
  'main.pursue': 'Segui',
  'main.pursueHint':
    'Segui la diretta più vista compatibile con questo preset. Se disattivato, mantiene la diretta corrente finché resta valida.',
  'main.turnOffLurker': 'Disattiva lurker',
  'main.turnOnLurker': 'Attiva lurker',
  'main.footer':
    'Lurker Drops controlla Twitch ogni minuto mentre una scheda in lurker è attiva.',

  'status.paused': 'In pausa',
  'overlay.title': 'Modalità lurker',
  'overlay.subtitle': 'Questa scheda è gestita da Lurker Drops.',
  'overlay.disable': 'Disattiva lurker',
  'overlay.turningOff': 'Disattivazione...',
  'overlay.dialogTitle': 'Uscire dalla modalità lurker?',
  'overlay.dialogMessage': 'Questa scheda è in modalità lurker. Continuando, il lurker verrà disattivato per questa scheda.',
  'overlay.confirm': 'Disattiva e continua',
  'status.pausedDetail': 'Il lurker è disattivato per questa scheda.',
  'status.live': 'In diretta',
  'status.watchingStream': 'Stai guardando {channel} · {title}',
  'status.watchingLive': 'Stai guardando una diretta.',
  'status.searching': 'Ricerca',
  'status.searchingDetail':
    'Ricerca su Twitch di una diretta compatibile con questo preset...',
  'status.waiting': 'In attesa',
  'status.waitingDetail':
    'Nessuna diretta compatibile al momento. Il lurker ricontrollerà ogni minuto.',
  'status.error': 'Errore',
  'status.errorDetail': 'Impossibile raggiungere Twitch.',
  'status.idle': 'Inattivo',
  'status.idleDetail': 'Il lurker è pronto.',
  'status.off': 'Disattivato',

  'row.presetLabel': 'Preset: {name}',
  'row.presetRemoved': 'Preset rimosso',
  'row.couldNotCheck': 'Impossibile controllare Twitch',
  'row.searchingMatch': 'Ricerca di una diretta compatibile',
  'row.waitingMatch': 'In attesa di una diretta compatibile',
  'row.lurkerPaused': 'Lurker in pausa',
  'row.goTo': 'Vai',
  'row.goToTitle': 'Vai alla scheda in lurker',
  'row.mute': 'Muto',
  'row.unmute': 'Riattiva audio',
  'row.muteTitle': "Disattiva l'audio di questa scheda",
  'row.unmuteTitle': "Riattiva l'audio di questa scheda",
  'row.turnOn': 'Attiva',
  'row.turnOff': 'Disattiva',
  'row.turnOnTitle': 'Attiva il lurker su questa scheda',
  'row.turnOffTitle': 'Disattiva il lurker su questa scheda',
  'row.pursueOn': 'Segui sì',
  'row.pursueOff': 'Segui no',
  'row.pursueOnTitle': 'Segui la live più vista',
  'row.pursueOffTitle': 'Mantieni la live attuale finché è valida',
  'row.close': 'Chiudi',
  'row.closeConfirm': 'Chiudere questa scheda? Il suo lurker verrà disattivato.',
  'row.closeTitle': 'Chiudi questa scheda e disattiva il suo lurker',
  'row.edit': 'Modifica',

  'presets.saved': 'Preset salvati',
  'presets.total': 'Totale: {count}',
  'presets.emptyTitle': 'Nessun preset',
  'presets.emptyHint':
    'Un preset indica al lurker quale categoria, titolo, canali preferiti e canali bloccati di Twitch usare.',
  'presets.edit': 'Modifica preset',
  'presets.delete': 'Elimina preset',
  'presets.titleContains': 'il titolo contiene «{filter}»',
  'presets.anyTitle': 'qualsiasi titolo',
  'presets.favoritesCount': 'Preferiti: {count}',
  'presets.blockedCount': 'Bloccati: {count}',
  'presets.inUseCount': 'In uso: {count}',
  'presets.deleteConfirm': 'Eliminare {name}?',
  'presets.deleteInUse':
    "Le schede che lo usano verranno messe in pausa. L'operazione non può essere annullata.",
  'presets.deleteUnused':
    "L'operazione non può essere annullata.",
  'presets.deleting': 'Eliminazione...',
  'presets.tip':
    'I preferiti vengono controllati per primi; la blacklist vince sempre. Usa Segui per scheda per inseguire la diretta più vista.',

  'form.name': 'Nome',
  'form.namePlaceholder': 'es. Drops mentre lavoro',
  'form.nameHint': 'Un nome breve per riconoscere questo preset.',
  'form.nameRequired': 'Dai un nome a questo preset.',
  'form.category': 'Categoria Twitch',
  'form.categoryHint':
    'Cerca su Twitch o digita una categoria manualmente. Lascia vuoto per consentire qualsiasi categoria.',
  'form.titleFilter': 'Filtro titolo',
  'form.titleFilterPlaceholder': 'es. drops, ranked, senza commento',
  'form.titleFilterHint':
    'Solo le dirette il cui titolo contiene questo testo sono idonee. Senza distinzione tra maiuscole e minuscole.',
  'form.favorites': 'Preferiti',
  'form.favoritesPlaceholder': 'Digita o incolla gli slug dei canali...',
  'form.favoritesHint':
    "I preferiti hanno priorità. In ogni scheda, l'opzione Segui decide se il canale idoneo più visto può sostituire la diretta corrente.",
  'form.blacklist': 'Blacklist',
  'form.blacklistPlaceholder':
    'Digita o incolla gli slug dei canali da ignorare...',
  'form.blacklistHint':
    'Questi canali non vengono mai selezionati, anche se sono preferiti.',
  'form.save': 'Salva preset',
  'form.saveLurker': 'Salva lurker',
  'form.newTab': 'Nuova scheda',
  'form.newTabHint': 'Apri una nuova scheda e avvia questo lurker lì.',
  'form.saving': 'Salvataggio...',

  'category.searchPlaceholder': 'Cerca categorie Twitch...',
  'category.searching': 'Ricerca su Twitch...',
  'category.none':
    'Nessuna categoria trovata. Digita un nome per usarlo manualmente.',
  'category.use': 'Usa «{name}»',
  'category.footer':
    'Le categorie provengono da Twitch. Sono consentiti nomi personalizzati.',

  'multi.defaultPlaceholder': 'Digita uno slug di canale Twitch',
  'multi.searchPlaceholder': 'Cerca o digita uno slug di canale...',
  'multi.priorityOrder': 'Ordine di priorità',
  'multi.selected': 'Selezionati',
  'multi.remove': 'Rimuovi {channel}',
  'multi.moveUp': 'Sposta {channel} su',
  'multi.moveDown': 'Sposta {channel} giù',
  'multi.alreadyAdded': '@{channel} è già aggiunto',
  'multi.add': 'Aggiungi @{channel}',
  'multi.footerReorder':
    "I preferiti hanno priorità. L'ordine si usa con Segui disattivato o per risolvere i pareggi di spettatori.",
  'multi.footerAdd':
    'Usa le virgole per aggiungere più canali alla volta.',
  'multi.typeOrPaste':
    'Digita uno slug di canale o incolla un URL Twitch.',

  'combo.selectOption': "Scegli un'opzione",
  'combo.search': 'Cerca...',
  'combo.noResults': 'Nessun risultato.',

  'error.choosePreset':
    'Scegli un preset prima di avviare il lurker.',
  'error.tabNotManaged':
    'Questa scheda non è gestita da Lurker Drops.',
  'error.presetMissing': 'Quel preset non esiste più.',
  'error.unknownRequest': 'Richiesta sconosciuta: {request}',
  'error.unauthorized': 'Mittente non autorizzato.',
  'error.couldNotOpenChannel':
    'Impossibile aprire {channel}: {error}',
  'error.presetNoLongerExists': 'Il preset non esiste più.',
  'error.presetRemoved':
    'Il preset usato da questa scheda è stato rimosso.',

  'twitch.timeout': 'Twitch ha impiegato troppo tempo a rispondere.',
  'twitch.unreachable':
    'Impossibile raggiungere Twitch. Controlla la connessione.',
  'twitch.rateLimited':
    'Twitch sta limitando le richieste. Riprova tra un minuto.',
  'twitch.httpError':
    "L'API di Twitch ha restituito HTTP {status}.",
  'twitch.empty':
    "L'API di Twitch ha restituito una risposta vuota.",
} satisfies Record<MessageKey, string>;

export default messages;
