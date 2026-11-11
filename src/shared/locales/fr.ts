import type { MessageKey } from './en';

const messages = {
  'app.name': 'Lurker Drops',
  'app.loadErrorTitle': 'Impossible de charger Lurker Drops',
  'app.loading': 'Chargement de vos lurkers...',
  'app.backgroundUnavailable':
    "Le service en arrière-plan de Lurker Drops n'a pas répondu.",
  'app.genericError': 'Une erreur est survenue.',

  'common.cancel': 'Annuler',
  'common.optional': 'Facultatif',
  'common.anyCategory': 'Toutes les catégories',
  'common.twitch': 'Twitch',
  'common.on': 'Activé',
  'common.off': 'Désactivé',
  'common.expand': 'Développer',
  'common.collapse': 'Réduire',
  'common.goBack': 'Retour',
  'common.popOut': 'Ouvrir dans une fenêtre',
  'common.browserTab': 'Onglet du navigateur',
  'common.currentTab': 'Onglet actuel',
  'common.viewers': '{count} spectateurs',

  'nav.tagline': 'Auto-lurker Twitch',
  'nav.presets': 'Préréglages',
  'nav.presetsSubtitle': 'Gérez vos filtres',
  'nav.editPreset': 'Modifier le préréglage',
  'nav.newPreset': 'Nouveau préréglage',
  'nav.formSubtitle': 'Filtres du lurker',
  'nav.newLurker': 'Nouveau lurker',
  'nav.editLurker': 'Modifier le lurker',
  'nav.lurkerSubtitle': 'Réglages du lurker',
  'nav.activeBadge': 'Actifs : {count}',
  'nav.activeTooltip': 'Onglets en lurker : {count}',
  'nav.idleTooltip': 'Lurker Drops est inactif',

  'main.lurkingTabs': 'Onglets en lurker',
  'main.addLurker': 'Ajouter',
  'main.livePreview': 'Aperçu de la live',
  'main.noLivePreview': 'Aucune live compatible pour l\'instant.',
  'main.pausedCount': 'En pause : {count}',
  'main.noTabsTitle': "Aucun onglet en lurker pour l'instant",
  'main.noTabsHint':
    'Choisissez un préréglage ci-dessous et activez le lurker pour cet onglet.',
  'main.status': 'Statut',
  'main.preset': 'Préréglage',
  'main.noPresets': 'Aucun préréglage',
  'main.selectPreset': 'Choisir un préréglage',
  'main.createPresetFirst': "Créez d'abord un préréglage",
  'main.searchPresets': 'Rechercher des préréglages...',
  'main.noPresetMatches': 'Aucun préréglage ne correspond.',
  'main.managePresets': 'Gérer les préréglages',
  'main.createFirstPreset': 'Créez votre premier préréglage',
  'main.muted': 'Muet',
  'main.mutedHint':
    "Coupez le son de l'onglet lui-même, pas seulement du lecteur Twitch.",
  'main.pursue': 'Poursuivre',
  'main.pursueHint':
    'Suivez le direct le plus regardé correspondant à ce préréglage. Désactivé, le direct actuel est conservé tant qu’il reste valide.',
  'main.turnOffLurker': 'Désactiver le lurker',
  'main.turnOnLurker': 'Activer le lurker',
  'main.footer':
    "Lurker Drops vérifie Twitch chaque minute tant qu'un onglet en lurker est actif.",

  'status.paused': 'En pause',
  'overlay.title': 'Mode lurker',
  'overlay.subtitle': 'Cet onglet est géré par Lurker Drops.',
  'overlay.disable': 'Désactiver le lurker',
  'overlay.turningOff': 'Désactivation...',
  'overlay.dialogTitle': 'Quitter le mode lurker ?',
  'overlay.dialogMessage': 'Cet onglet est en mode lurker. Continuer désactivera le lurker pour cet onglet.',
  'overlay.confirm': 'Désactiver et continuer',
  'status.pausedDetail': 'Le lurker est désactivé pour cet onglet.',
  'status.live': 'En direct',
  'status.watchingStream': 'Lecture de {channel} · {title}',
  'status.watchingLive': "Lecture d'un direct.",
  'status.searching': 'Recherche',
  'status.searchingDetail':
    'Recherche sur Twitch d’un direct correspondant à ce préréglage...',
  'status.waiting': 'En attente',
  'status.waitingDetail':
    'Aucun direct correspondant pour l’instant. Le lurker vérifiera à nouveau chaque minute.',
  'status.error': 'Erreur',
  'status.errorDetail': 'Impossible de joindre Twitch.',
  'status.idle': 'Inactif',
  'status.idleDetail': 'Le lurker est prêt.',
  'status.off': 'Désactivé',

  'row.presetLabel': 'Préréglage : {name}',
  'row.presetRemoved': 'Préréglage supprimé',
  'row.couldNotCheck': 'Impossible de vérifier Twitch',
  'row.searchingMatch': "Recherche d'un direct correspondant",
  'row.waitingMatch': "En attente d'un direct correspondant",
  'row.lurkerPaused': 'Lurker en pause',
  'row.goTo': 'Ouvrir',
  'row.goToTitle': "Aller à l'onglet en lurker",
  'row.mute': 'Couper le son',
  'row.unmute': 'Rétablir le son',
  'row.muteTitle': 'Couper le son de cet onglet',
  'row.unmuteTitle': 'Rétablir le son de cet onglet',
  'row.turnOn': 'Activer',
  'row.turnOff': 'Désactiver',
  'row.turnOnTitle': 'Activer le lurker sur cet onglet',
  'row.turnOffTitle': 'Désactiver le lurker sur cet onglet',
  'row.pursueOn': 'Poursuivre oui',
  'row.pursueOff': 'Poursuivre non',
  'row.pursueOnTitle': 'Poursuivre la live la plus regardée',
  'row.pursueOffTitle': 'Garder la live actuelle tant qu\'elle reste valide',
  'row.close': 'Fermer',
  'row.closeConfirm': 'Fermer cet onglet ? Son lurker sera aussi désactivé.',
  'row.closeTitle': 'Fermer cet onglet et désactiver son lurker',
  'row.edit': 'Modifier',

  'presets.saved': 'Préréglages enregistrés',
  'presets.total': 'Total : {count}',
  'presets.emptyTitle': 'Aucun préréglage',
  'presets.emptyHint':
    'Un préréglage indique au lurker la catégorie, le titre, les chaînes favorites et les chaînes bloquées à utiliser sur Twitch.',
  'presets.edit': 'Modifier le préréglage',
  'presets.delete': 'Supprimer le préréglage',
  'presets.titleContains': 'le titre contient « {filter} »',
  'presets.anyTitle': "n'importe quel titre",
  'presets.favoritesCount': 'Favoris : {count}',
  'presets.blockedCount': 'Bloquées : {count}',
  'presets.inUseCount': 'Utilisé : {count}',
  'presets.deleteConfirm': 'Supprimer {name} ?',
  'presets.deleteInUse':
    "Les onglets qui l'utilisent seront mis en pause. Cette action est irréversible.",
  'presets.deleteUnused': 'Cette action est irréversible.',
  'presets.deleting': 'Suppression...',
  'presets.tip':
    'Les favoris sont vérifiés en premier ; la liste noire gagne toujours. Utilisez Poursuivre par onglet pour viser le direct le plus regardé.',

  'form.name': 'Nom',
  'form.namePlaceholder': 'ex. Drops pendant le travail',
  'form.nameHint': 'Un nom court pour reconnaître ce préréglage.',
  'form.nameRequired': 'Donnez un nom à ce préréglage.',
  'form.category': 'Catégorie Twitch',
  'form.categoryHint':
    'Recherchez sur Twitch ou saisissez une catégorie manuellement. Laissez vide pour autoriser toutes les catégories.',
  'form.titleFilter': 'Filtre de titre',
  'form.titleFilterPlaceholder': 'ex. drops, ranked, sans commentaire',
  'form.titleFilterHint':
    'Seuls les directs dont le titre contient ce texte sont éligibles. Insensible à la casse.',
  'form.favorites': 'Chaînes favorites',
  'form.favoritesPlaceholder':
    'Saisissez ou collez des slugs de chaîne...',
  'form.favoritesHint':
    "Les favoris sont prioritaires. Sur chaque onglet, l'option Poursuivre décide si la chaîne éligible la plus regardée peut remplacer le direct actuel.",
  'form.blacklist': 'Liste noire',
  'form.blacklistPlaceholder':
    'Saisissez ou collez des slugs de chaîne à ignorer...',
  'form.blacklistHint':
    'Ces chaînes ne sont jamais sélectionnées, même si ce sont des favorites.',
  'form.save': 'Enregistrer le préréglage',
  'form.saveLurker': 'Enregistrer le lurker',
  'form.newTab': 'Nouvel onglet',
  'form.newTabHint': 'Ouvrir un nouvel onglet et y démarrer ce lurker.',
  'form.saving': 'Enregistrement...',

  'category.searchPlaceholder': 'Rechercher des catégories Twitch...',
  'category.searching': 'Recherche sur Twitch...',
  'category.none':
    "Aucune catégorie trouvée. Saisissez un nom pour l'utiliser manuellement.",
  'category.use': 'Utiliser « {name} »',
  'category.footer':
    'Les catégories proviennent de Twitch. Les noms personnalisés sont autorisés.',

  'multi.defaultPlaceholder': 'Saisissez un slug de chaîne Twitch',
  'multi.searchPlaceholder':
    'Recherchez ou saisissez un slug de chaîne...',
  'multi.priorityOrder': 'Ordre de priorité',
  'multi.selected': 'Sélectionnées',
  'multi.remove': 'Retirer {channel}',
  'multi.moveUp': 'Monter {channel}',
  'multi.moveDown': 'Descendre {channel}',
  'multi.alreadyAdded': '@{channel} est déjà ajouté',
  'multi.add': 'Ajouter @{channel}',
  'multi.footerReorder':
    "Les favoris sont prioritaires. L'ordre sert quand Poursuivre est désactivé ou pour départager les spectateurs.",
  'multi.footerAdd':
    'Utilisez des virgules pour ajouter plusieurs chaînes à la fois.',
  'multi.typeOrPaste':
    'Saisissez un slug de chaîne ou collez une URL Twitch.',

  'combo.selectOption': 'Choisir une option',
  'combo.search': 'Rechercher...',
  'combo.noResults': 'Aucun résultat.',

  'error.choosePreset':
    "Choisissez un préréglage avant d'activer le lurker.",
  'error.tabNotManaged':
    "Cet onglet n'est pas géré par Lurker Drops.",
  'error.presetMissing': "Ce préréglage n'existe plus.",
  'error.unknownRequest': 'Requête inconnue : {request}',
  'error.unauthorized': 'Expéditeur non autorisé.',
  'error.couldNotOpenChannel': 'Impossible d’ouvrir {channel} : {error}',
  'error.presetNoLongerExists': "Le préréglage n'existe plus.",
  'error.presetRemoved':
    'Le préréglage utilisé par cet onglet a été supprimé.',

  'twitch.timeout': 'Twitch a mis trop de temps à répondre.',
  'twitch.unreachable':
    'Impossible de joindre Twitch. Vérifiez votre connexion.',
  'twitch.rateLimited':
    'Twitch limite les requêtes. Réessayez dans une minute.',
  'twitch.httpError': "L'API Twitch a renvoyé HTTP {status}.",
  'twitch.empty': "L'API Twitch a renvoyé une réponse vide.",
} satisfies Record<MessageKey, string>;

export default messages;
