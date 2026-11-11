import type { MessageKey } from './en';

const messages = {
  'app.name': 'Lurker Drops',
  'app.loadErrorTitle': 'Não foi possível carregar o Lurker Drops',
  'app.loading': 'Carregando seus lurkers...',
  'app.backgroundUnavailable':
    'O serviço em segundo plano do Lurker Drops não respondeu.',
  'app.genericError': 'Algo deu errado.',

  'common.cancel': 'Cancelar',
  'common.optional': 'Opcional',
  'common.anyCategory': 'Qualquer categoria',
  'common.twitch': 'Twitch',
  'common.on': 'Ligado',
  'common.off': 'Desligado',
  'common.expand': 'Expandir',
  'common.collapse': 'Recolher',
  'common.goBack': 'Voltar',
  'common.popOut': 'Abrir em janela',
  'common.browserTab': 'Aba do navegador',
  'common.currentTab': 'Aba atual',
  'common.viewers': '{count} espectadores',

  'nav.tagline': 'Auto-lurker para Twitch',
  'nav.presets': 'Predefinições',
  'nav.presetsSubtitle': 'Gerencie seus filtros',
  'nav.editPreset': 'Editar predefinição',
  'nav.newPreset': 'Nova predefinição',
  'nav.formSubtitle': 'Filtros do lurker',
  'nav.newLurker': 'Novo lurker',
  'nav.editLurker': 'Editar lurker',
  'nav.lurkerSubtitle': 'Opções do lurker',
  'nav.activeBadge': 'Ativos: {count}',
  'nav.activeTooltip': 'Abas em lurker: {count}',
  'nav.idleTooltip': 'O Lurker Drops está inativo',

  'main.lurkingTabs': 'Abas em lurker',
  'main.addLurker': 'Adicionar',
  'main.livePreview': 'Prévia da live',
  'main.noLivePreview': 'Nenhuma live compatível agora.',
  'main.pausedCount': 'Pausadas: {count}',
  'main.noTabsTitle': 'Nenhuma aba em lurker ainda',
  'main.noTabsHint':
    'Escolha uma predefinição abaixo e ative o lurker para esta aba.',
  'main.status': 'Status',
  'main.preset': 'Predefinição',
  'main.noPresets': 'Nenhuma predefinição ainda',
  'main.selectPreset': 'Escolha uma predefinição',
  'main.createPresetFirst': 'Crie uma predefinição primeiro',
  'main.searchPresets': 'Pesquisar predefinições...',
  'main.noPresetMatches': 'Nenhuma predefinição corresponde.',
  'main.managePresets': 'Gerenciar predefinições',
  'main.createFirstPreset': 'Crie sua primeira predefinição',
  'main.muted': 'Mudo',
  'main.mutedHint':
    'Silencie a aba do navegador, não apenas o player da Twitch.',
  'main.pursue': 'Perseguir',
  'main.pursueHint':
    'Siga a live mais assistida compatível com esta predefinição. Desligado, mantém a live atual enquanto ela continuar válida.',
  'main.turnOffLurker': 'Desligar lurker',
  'main.turnOnLurker': 'Ligar lurker',
  'main.footer':
    'O Lurker Drops verifica a Twitch a cada minuto enquanto alguma aba em lurker estiver ligada.',

  'status.paused': 'Pausado',
  'overlay.title': 'Modo lurker',
  'overlay.subtitle': 'Esta aba é gerenciada pelo Lurker Drops.',
  'overlay.disable': 'Desligar lurker',
  'overlay.turningOff': 'Desligando...',
  'overlay.dialogTitle': 'Sair do modo lurker?',
  'overlay.dialogMessage': 'Esta aba está no modo lurker. Continuar vai desligar o lurker nesta aba.',
  'overlay.confirm': 'Desligar e continuar',
  'status.pausedDetail': 'O lurker está desligado para esta aba.',
  'status.live': 'Ao vivo',
  'status.watchingStream': 'Assistindo {channel} · {title}',
  'status.watchingLive': 'Assistindo a uma live.',
  'status.searching': 'Pesquisando',
  'status.searchingDetail':
    'Pesquisando na Twitch uma live compatível com esta predefinição...',
  'status.waiting': 'Aguardando',
  'status.waitingDetail':
    'Nenhuma live compatível agora. O lurker verificará novamente a cada minuto.',
  'status.error': 'Erro',
  'status.errorDetail': 'Não foi possível acessar a Twitch.',
  'status.idle': 'Inativo',
  'status.idleDetail': 'O lurker está pronto.',
  'status.off': 'Desligado',

  'row.presetLabel': 'Predefinição: {name}',
  'row.presetRemoved': 'Predefinição removida',
  'row.couldNotCheck': 'Não foi possível verificar a Twitch',
  'row.searchingMatch': 'Pesquisando uma live compatível',
  'row.waitingMatch': 'Aguardando uma live compatível',
  'row.lurkerPaused': 'Lurker pausado',
  'row.goTo': 'Ir',
  'row.goToTitle': 'Ir para a aba em lurker',
  'row.mute': 'Silenciar',
  'row.unmute': 'Reativar som',
  'row.muteTitle': 'Silenciar esta aba',
  'row.unmuteTitle': 'Reativar o som desta aba',
  'row.turnOn': 'Ligar',
  'row.turnOff': 'Desligar',
  'row.turnOnTitle': 'Ligar o lurker nesta aba',
  'row.turnOffTitle': 'Desligar o lurker nesta aba',
  'row.pursueOn': 'Perseguir sim',
  'row.pursueOff': 'Perseguir não',
  'row.pursueOnTitle': 'Perseguir a live mais assistida',
  'row.pursueOffTitle': 'Manter a live atual enquanto ela for válida',
  'row.close': 'Fechar',
  'row.closeConfirm': 'Fechar esta aba? Isso também desliga o lurker dela.',
  'row.closeTitle': 'Fechar esta aba e desligar o lurker dela',
  'row.edit': 'Editar',

  'presets.saved': 'Predefinições salvas',
  'presets.total': 'Total: {count}',
  'presets.emptyTitle': 'Nenhuma predefinição ainda',
  'presets.emptyHint':
    'Uma predefinição diz ao lurker qual categoria, título, canais favoritos e canais bloqueados da Twitch usar.',
  'presets.edit': 'Editar predefinição',
  'presets.delete': 'Excluir predefinição',
  'presets.titleContains': 'o título contém “{filter}”',
  'presets.anyTitle': 'qualquer título',
  'presets.favoritesCount': 'Favoritos: {count}',
  'presets.blockedCount': 'Bloqueados: {count}',
  'presets.inUseCount': 'Em uso: {count}',
  'presets.deleteConfirm': 'Excluir {name}?',
  'presets.deleteInUse':
    'As abas que a usam serão pausadas. Isso não pode ser desfeito.',
  'presets.deleteUnused': 'Isso não pode ser desfeito.',
  'presets.deleting': 'Excluindo...',
  'presets.tip':
    'Os favoritos são verificados primeiro; a lista de bloqueio sempre vence. Use Perseguir em cada aba para buscar a live mais assistida.',

  'form.name': 'Nome',
  'form.namePlaceholder': 'ex.: Drops enquanto trabalho',
  'form.nameHint':
    'Um nome curto para reconhecer esta predefinição.',
  'form.nameRequired': 'Dê um nome a esta predefinição.',
  'form.category': 'Categoria da Twitch',
  'form.categoryHint':
    'Pesquise na Twitch ou digite uma categoria manualmente. Deixe vazio para permitir qualquer categoria.',
  'form.titleFilter': 'Filtro de título',
  'form.titleFilterPlaceholder': 'ex.: drops, ranked, sem comentários',
  'form.titleFilterHint':
    'Apenas lives cujo título contém este texto são elegíveis. Não diferencia maiúsculas de minúsculas.',
  'form.favorites': 'Favoritos',
  'form.favoritesPlaceholder': 'Digite ou cole slugs de canais...',
  'form.favoritesHint':
    'Os favoritos têm prioridade. Em cada aba, a opção Perseguir decide se o canal elegível mais assistido pode substituir a live atual.',
  'form.blacklist': 'Lista de bloqueio',
  'form.blacklistPlaceholder':
    'Digite ou cole slugs de canais para ignorar...',
  'form.blacklistHint':
    'Estes canais nunca são selecionados, mesmo que sejam favoritos.',
  'form.save': 'Salvar predefinição',
  'form.saveLurker': 'Salvar lurker',
  'form.newTab': 'Nova aba',
  'form.newTabHint': 'Abrir uma nova aba e iniciar este lurker nela.',
  'form.saving': 'Salvando...',

  'category.searchPlaceholder': 'Pesquisar categorias da Twitch...',
  'category.searching': 'Pesquisando na Twitch...',
  'category.none':
    'Nenhuma categoria encontrada. Digite um nome para usá-lo manualmente.',
  'category.use': 'Usar “{name}”',
  'category.footer':
    'As categorias vêm da Twitch. Nomes personalizados são permitidos.',

  'multi.defaultPlaceholder': 'Digite um slug de canal da Twitch',
  'multi.searchPlaceholder':
    'Pesquise ou digite um slug de canal...',
  'multi.priorityOrder': 'Ordem de prioridade',
  'multi.selected': 'Selecionados',
  'multi.remove': 'Remover {channel}',
  'multi.moveUp': 'Mover {channel} para cima',
  'multi.moveDown': 'Mover {channel} para baixo',
  'multi.alreadyAdded': '@{channel} já foi adicionado',
  'multi.add': 'Adicionar @{channel}',
  'multi.footerReorder':
    'Os favoritos têm prioridade. A ordem é usada quando Perseguir está desligado ou para desempatar por espectadores.',
  'multi.footerAdd':
    'Use vírgulas para adicionar vários canais de uma vez.',
  'multi.typeOrPaste':
    'Digite um slug de canal ou cole uma URL da Twitch.',

  'combo.selectOption': 'Selecione uma opção',
  'combo.search': 'Pesquisar...',
  'combo.noResults': 'Nenhum resultado encontrado.',

  'error.choosePreset':
    'Escolha uma predefinição antes de iniciar o lurker.',
  'error.tabNotManaged':
    'Esta aba não é gerenciada pelo Lurker Drops.',
  'error.presetMissing': 'Essa predefinição não existe mais.',
  'error.unknownRequest': 'Solicitação desconhecida: {request}',
  'error.unauthorized': 'Remetente não autorizado.',
  'error.couldNotOpenChannel':
    'Não foi possível abrir {channel}: {error}',
  'error.presetNoLongerExists':
    'A predefinição não existe mais.',
  'error.presetRemoved':
    'A predefinição usada por esta aba foi removida.',

  'twitch.timeout': 'A Twitch demorou demais para responder.',
  'twitch.unreachable':
    'Não foi possível acessar a Twitch. Verifique sua conexão.',
  'twitch.rateLimited':
    'A Twitch está limitando solicitações. Tente novamente em um minuto.',
  'twitch.httpError': 'A API da Twitch retornou HTTP {status}.',
  'twitch.empty': 'A API da Twitch retornou uma resposta vazia.',
} satisfies Record<MessageKey, string>;

export default messages;
