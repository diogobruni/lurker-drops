import type { MessageKey } from './en';

const messages = {
  'app.name': 'Lurker Drops',
  'app.loadErrorTitle': 'Не удалось загрузить Lurker Drops',
  'app.loading': 'Загрузка ваших луркеров...',
  'app.backgroundUnavailable':
    'Фоновая служба Lurker Drops не ответила.',
  'app.genericError': 'Что-то пошло не так.',

  'common.cancel': 'Отмена',
  'common.optional': 'Необязательно',
  'common.anyCategory': 'Любая категория',
  'common.twitch': 'Twitch',
  'common.on': 'Вкл.',
  'common.off': 'Выкл.',
  'common.expand': 'Развернуть',
  'common.collapse': 'Свернуть',
  'common.goBack': 'Назад',
  'common.popOut': 'Открыть в окне',
  'common.browserTab': 'Вкладка браузера',
  'common.currentTab': 'Текущая вкладка',
  'common.viewers': '{count} зрителей',

  'nav.tagline': 'Автоматический луркер Twitch',
  'nav.presets': 'Шаблоны',
  'nav.presetsSubtitle': 'Управление фильтрами',
  'nav.editPreset': 'Изменить шаблон',
  'nav.newPreset': 'Новый шаблон',
  'nav.formSubtitle': 'Фильтры луркера',
  'nav.newLurker': 'Новый луркер',
  'nav.editLurker': 'Изменить луркера',
  'nav.lurkerSubtitle': 'Настройки луркера',
  'nav.about': 'О приложении',
  'nav.aboutSubtitle': 'Информация о приложении',
  'about.madeBy': 'Создано',
  'about.version': 'Версия',
  'nav.activeBadge': 'Активные: {count}',
  'nav.activeTooltip': 'Вкладки в луркере: {count}',
  'nav.idleTooltip': 'Lurker Drops бездействует',

  'main.lurkingTabs': 'Вкладки в луркере',
  'main.addLurker': 'Добавить',
  'main.livePreview': 'Предпросмотр трансляции',
  'main.noLivePreview': 'Сейчас нет подходящей трансляции.',
  'main.pausedCount': 'На паузе: {count}',
  'main.noTabsTitle': 'Пока нет вкладок в луркере',
  'main.noTabsHint':
    'Выберите шаблон ниже и включите луркер для этой вкладки.',
  'main.status': 'Статус',
  'main.preset': 'Шаблон',
  'main.noPresets': 'Шаблонов пока нет',
  'main.selectPreset': 'Выберите шаблон',
  'main.createPresetFirst': 'Сначала создайте шаблон',
  'main.searchPresets': 'Поиск шаблонов...',
  'main.noPresetMatches': 'Нет подходящих шаблонов.',
  'main.managePresets': 'Управление шаблонами',
  'main.createFirstPreset': 'Создайте первый шаблон',
  'main.muted': 'Без звука',
  'main.mutedHint':
    'Выключить звук самой вкладки браузера, а не только плеера Twitch.',
  'main.pursue': 'Следование',
  'main.pursueHint':
    'Следить за самым популярным стримом, подходящим под шаблон. Если выключено, текущий стрим сохраняется, пока остаётся допустимым.',
  'main.turnOffLurker': 'Выключить луркер',
  'main.turnOnLurker': 'Включить луркер',
  'main.footer':
    'Lurker Drops проверяет Twitch каждую минуту, пока включена хотя бы одна вкладка в луркере.',

  'status.paused': 'Пауза',
  'overlay.title': 'Режим луркера',
  'overlay.subtitle': 'Эта вкладка управляется Lurker Drops.',
  'overlay.disable': 'Выключить луркер',
  'overlay.turningOff': 'Выключение...',
  'overlay.dialogTitle': 'Выйти из режима луркера?',
  'overlay.dialogMessage': 'Эта вкладка в режиме луркера. Продолжение выключит луркер на этой вкладке.',
  'overlay.confirm': 'Выключить и продолжить',
  'status.pausedDetail': 'Луркер выключен для этой вкладки.',
  'status.live': 'В эфире',
  'status.watchingStream': 'Просмотр {channel} · {title}',
  'status.watchingLive': 'Просмотр стрима.',
  'status.searching': 'Поиск',
  'status.searchingDetail':
    'Поиск на Twitch стрима, подходящего под этот шаблон...',
  'status.waiting': 'Ожидание',
  'status.waitingDetail':
    'Сейчас нет подходящего стрима. Луркер проверит снова через минуту.',
  'status.error': 'Ошибка',
  'status.errorDetail': 'Не удалось связаться с Twitch.',
  'status.idle': 'Простой',
  'status.idleDetail': 'Луркер готов.',
  'status.off': 'Выкл.',

  'row.presetLabel': 'Шаблон: {name}',
  'row.presetRemoved': 'Шаблон удалён',
  'row.couldNotCheck': 'Не удалось проверить Twitch',
  'row.searchingMatch': 'Поиск подходящего стрима',
  'row.waitingMatch': 'Ожидание подходящего стрима',
  'row.lurkerPaused': 'Луркер на паузе',
  'row.goTo': 'Перейти',
  'row.goToTitle': 'Перейти к вкладке в луркере',
  'row.mute': 'Выключить звук',
  'row.unmute': 'Включить звук',
  'row.muteTitle': 'Выключить звук этой вкладки',
  'row.unmuteTitle': 'Включить звук этой вкладки',
  'row.turnOn': 'Включить',
  'row.turnOff': 'Выключить',
  'row.turnOnTitle': 'Включить луркер на этой вкладке',
  'row.turnOffTitle': 'Выключить луркер на этой вкладке',
  'row.pursueOn': 'Следить вкл',
  'row.pursueOff': 'Следить выкл',
  'row.pursueOnTitle': 'Следить за самой популярной трансляцией',
  'row.pursueOffTitle': 'Оставлять текущую трансляцию, пока она действительна',
  'row.close': 'Закрыть',
  'row.closeConfirm': 'Закрыть эту вкладку? Луркер будет выключен.',
  'row.closeTitle': 'Закрыть эту вкладку и выключить её луркер',
  'row.edit': 'Изменить',

  'presets.saved': 'Сохранённые шаблоны',
  'presets.total': 'Всего: {count}',
  'presets.emptyTitle': 'Шаблонов пока нет',
  'presets.emptyHint':
    'Шаблон задаёт категорию Twitch, заголовок, избранные и заблокированные каналы для луркера.',
  'presets.edit': 'Изменить шаблон',
  'presets.delete': 'Удалить шаблон',
  'presets.titleContains': 'заголовок содержит «{filter}»',
  'presets.anyTitle': 'любой заголовок',
  'presets.favoritesCount': 'Избранные: {count}',
  'presets.blockedCount': 'Заблокировано: {count}',
  'presets.inUseCount': 'Используется: {count}',
  'presets.deleteConfirm': 'Удалить {name}?',
  'presets.deleteInUse':
    'Вкладки, которые его используют, будут приостановлены. Это нельзя отменить.',
  'presets.deleteUnused': 'Это нельзя отменить.',
  'presets.deleting': 'Удаление...',
  'presets.tip':
    'Сначала проверяются избранные; чёрный список всегда важнее. Используйте следование на вкладке, чтобы гнаться за самым популярным стримом.',

  'form.name': 'Название',
  'form.namePlaceholder': 'напр. Дропы во время работы',
  'form.nameHint':
    'Короткое название, чтобы узнавать этот шаблон.',
  'form.nameRequired': 'Дайте этому шаблону название.',
  'form.category': 'Категория Twitch',
  'form.categoryHint':
    'Найдите в Twitch или введите категорию вручную. Оставьте пустым, чтобы разрешить любую категорию.',
  'form.titleFilter': 'Фильтр заголовка',
  'form.titleFilterPlaceholder': 'напр. drops, ranked, без комментариев',
  'form.titleFilterHint':
    'Подходят только стримы, в заголовке которых есть этот текст. Без учёта регистра.',
  'form.favorites': 'Избранные',
  'form.favoritesPlaceholder': 'Введите или вставьте слаги каналов...',
  'form.favoritesHint':
    'Избранные имеют приоритет. На каждой вкладке опция следования решает, может ли самый популярный подходящий канал заменить текущий стрим.',
  'form.blacklist': 'Чёрный список',
  'form.blacklistPlaceholder':
    'Введите или вставьте слаги каналов для игнорирования...',
  'form.blacklistHint':
    'Эти каналы никогда не выбираются, даже если они избранные.',
  'form.save': 'Сохранить шаблон',
  'form.saveLurker': 'Сохранить луркера',
  'form.newTab': 'Новая вкладка',
  'form.newTabHint': 'Открыть новую вкладку и запустить луркера в ней.',
  'form.saving': 'Сохранение...',

  'category.searchPlaceholder': 'Поиск категорий Twitch...',
  'category.searching': 'Поиск на Twitch...',
  'category.none':
    'Категории не найдены. Введите название, чтобы использовать его вручную.',
  'category.use': 'Использовать «{name}»',
  'category.footer':
    'Категории берутся из Twitch. Пользовательские названия разрешены.',

  'multi.defaultPlaceholder': 'Введите слаг канала Twitch',
  'multi.searchPlaceholder': 'Найдите или введите слаг канала...',
  'multi.priorityOrder': 'Порядок приоритета',
  'multi.selected': 'Выбрано',
  'multi.remove': 'Удалить {channel}',
  'multi.moveUp': 'Переместить {channel} вверх',
  'multi.moveDown': 'Переместить {channel} вниз',
  'multi.alreadyAdded': '@{channel} уже добавлен',
  'multi.add': 'Добавить @{channel}',
  'multi.footerReorder':
    'Избранные имеют приоритет. Порядок используется при выключенном следовании или для разрешения ничьей по зрителям.',
  'multi.footerAdd':
    'Используйте запятые, чтобы добавить несколько каналов сразу.',
  'multi.typeOrPaste':
    'Введите слаг канала или вставьте ссылку Twitch.',

  'combo.selectOption': 'Выберите вариант',
  'combo.search': 'Поиск...',
  'combo.noResults': 'Ничего не найдено.',

  'error.choosePreset':
    'Выберите шаблон перед запуском луркера.',
  'error.tabNotManaged':
    'Эта вкладка не управляется Lurker Drops.',
  'error.presetMissing': 'Этот шаблон больше не существует.',
  'error.unknownRequest': 'Неизвестный запрос: {request}',
  'error.unauthorized': 'Неавторизованный отправитель.',
  'error.couldNotOpenChannel':
    'Не удалось открыть {channel}: {error}',
  'error.presetNoLongerExists': 'Шаблон больше не существует.',
  'error.presetRemoved':
    'Шаблон, используемый этой вкладкой, был удалён.',

  'twitch.timeout': 'Twitch слишком долго не отвечал.',
  'twitch.unreachable':
    'Не удалось связаться с Twitch. Проверьте подключение.',
  'twitch.rateLimited':
    'Twitch ограничивает запросы. Повторите через минуту.',
  'twitch.httpError': 'API Twitch вернул HTTP {status}.',
  'twitch.empty': 'API Twitch вернул пустой ответ.',
} satisfies Record<MessageKey, string>;

export default messages;
