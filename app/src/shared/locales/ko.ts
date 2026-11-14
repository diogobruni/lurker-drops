import type { MessageKey } from './en';

const messages = {
  'app.name': 'Lurker Drops',
  'app.loadErrorTitle': 'Lurker Drops를 불러올 수 없습니다',
  'app.loading': '러커를 불러오는 중...',
  'app.backgroundUnavailable':
    'Lurker Drops 백그라운드 서비스가 응답하지 않았습니다.',
  'app.genericError': '문제가 발생했습니다.',

  'common.cancel': '취소',
  'common.optional': '선택 사항',
  'common.anyCategory': '모든 카테고리',
  'common.twitch': 'Twitch',
  'common.on': '켜짐',
  'common.off': '꺼짐',
  'common.expand': '펼치기',
  'common.collapse': '접기',
  'common.goBack': '뒤로',
  'common.popOut': '창으로 열기',
  'common.browserTab': '브라우저 탭',
  'common.currentTab': '현재 탭',
  'common.viewers': '시청자 {count}명',

  'nav.tagline': 'Twitch 자동 러커',
  'nav.presets': '프리셋',
  'nav.presetsSubtitle': '필터 관리',
  'nav.editPreset': '프리셋 편집',
  'nav.newPreset': '새 프리셋',
  'nav.formSubtitle': '러커 필터',
  'nav.newLurker': '새 러커',
  'nav.editLurker': '러커 편집',
  'nav.lurkerSubtitle': '러커 설정',
  'nav.about': '정보',
  'nav.aboutSubtitle': '앱 정보',
  'about.madeBy': '제작',
  'about.version': '버전',
  'nav.activeBadge': '활성: {count}',
  'nav.activeTooltip': '러커 탭: {count}',
  'nav.idleTooltip': 'Lurker Drops가 대기 중입니다',

  'main.lurkingTabs': '러커 탭',
  'main.addLurker': '추가',
  'main.livePreview': '라이브 미리보기',
  'main.noLivePreview': '지금은 조건에 맞는 라이브가 없습니다.',
  'main.pausedCount': '일시 중지: {count}',
  'main.noTabsTitle': '아직 러커 중인 탭이 없습니다',
  'main.noTabsHint':
    '아래에서 프리셋을 선택하고 이 탭의 러커를 켜세요.',
  'main.status': '상태',
  'main.preset': '프리셋',
  'main.noPresets': '프리셋이 없습니다',
  'main.selectPreset': '프리셋 선택',
  'main.createPresetFirst': '먼저 프리셋을 만드세요',
  'main.searchPresets': '프리셋 검색...',
  'main.noPresetMatches': '일치하는 프리셋이 없습니다.',
  'main.managePresets': '프리셋 관리',
  'main.createFirstPreset': '첫 프리셋 만들기',
  'main.muted': '음소거',
  'main.mutedHint':
    'Twitch 플레이어만이 아니라 브라우저 탭 자체를 음소거합니다.',
  'main.pursue': '따라가기',
  'main.pursueHint':
    '이 프리셋에 맞는 가장 많이 시청하는 라이브를 따라갑니다. 끄면 현재 라이브가 유효한 동안 유지합니다.',
  'main.turnOffLurker': '러커 끄기',
  'main.turnOnLurker': '러커 켜기',
  'main.footer':
    '러커 탭이 하나라도 켜져 있으면 Lurker Drops가 1분마다 Twitch를 확인합니다.',

  'status.paused': '일시 중지',
  'overlay.title': '러커 모드',
  'overlay.subtitle': '이 탭은 Lurker Drops가 관리합니다.',
  'overlay.disable': '러커 끄기',
  'overlay.turningOff': '끄는 중...',
  'overlay.dialogTitle': '러커 모드에서 나갈까요?',
  'overlay.dialogMessage': '이 탭은 러커 모드입니다. 계속하면 이 탭의 러커가 꺼집니다.',
  'overlay.confirm': '끄고 계속',
  'status.pausedDetail': '이 탭의 러커가 꺼져 있습니다.',
  'status.live': '라이브',
  'status.watchingStream': '{channel} 시청 중 · {title}',
  'status.watchingLive': '라이브를 시청 중입니다.',
  'status.searching': '검색 중',
  'status.searchingDetail':
    '이 프리셋에 맞는 라이브를 Twitch에서 검색 중...',
  'status.waiting': '대기 중',
  'status.waitingDetail':
    '지금은 일치하는 라이브가 없습니다. 러커가 1분마다 다시 확인합니다.',
  'status.error': '오류',
  'status.errorDetail': 'Twitch에 연결할 수 없습니다.',
  'status.idle': '대기 중',
  'status.idleDetail': '러커가 준비되었습니다.',
  'status.off': '꺼짐',

  'row.presetLabel': '프리셋: {name}',
  'row.presetRemoved': '프리셋 삭제됨',
  'row.couldNotCheck': 'Twitch를 확인할 수 없습니다',
  'row.searchingMatch': '일치하는 라이브 검색 중',
  'row.waitingMatch': '일치하는 라이브 대기 중',
  'row.lurkerPaused': '러커 일시 중지됨',
  'row.goTo': '이동',
  'row.goToTitle': '러커 탭으로 이동',
  'row.mute': '음소거',
  'row.unmute': '음소거 해제',
  'row.muteTitle': '이 탭 음소거',
  'row.unmuteTitle': '이 탭 음소거 해제',
  'row.turnOn': '켜기',
  'row.turnOff': '끄기',
  'row.turnOnTitle': '이 탭의 러커 켜기',
  'row.turnOffTitle': '이 탭의 러커 끄기',
  'row.pursueOn': '따라가기 켬',
  'row.pursueOff': '따라가기 끔',
  'row.pursueOnTitle': '가장 많이 시청된 라이브 따라가기',
  'row.pursueOffTitle': '유효한 동안 현재 라이브 유지',
  'row.close': '닫기',
  'row.delete': '삭제',
  'row.closeConfirm': '이 탭을 닫을까요? 러커도 꺼집니다.',
  'row.closeTitle': '이 탭을 닫고 러커 끄기',
  'row.edit': '편집',

  'presets.saved': '저장된 프리셋',
  'presets.total': '전체: {count}',
  'presets.emptyTitle': '프리셋이 없습니다',
  'presets.emptyHint':
    '프리셋은 러커가 사용할 Twitch 카테고리, 제목, 즐겨찾기 채널, 차단 채널을 지정합니다.',
  'presets.edit': '프리셋 편집',
  'presets.select': '프리셋 선택',
  'presets.delete': '프리셋 삭제',
  'presets.titleContains': '제목에 “{filter}” 포함',
  'presets.anyTitle': '모든 제목',
  'presets.favoritesCount': '즐겨찾기: {count}',
  'presets.blockedCount': '차단됨: {count}',
  'presets.inUseCount': '사용 중: {count}',
  'presets.deleteConfirm': '{name}을(를) 삭제할까요?',
  'presets.deleteInUse':
    '사용 중인 탭은 일시 중지됩니다. 이 작업은 되돌릴 수 없습니다.',
  'presets.deleteUnused': '이 작업은 되돌릴 수 없습니다.',
  'presets.deleting': '삭제 중...',
  'presets.tip':
    '즐겨찾기를 먼저 확인하며 차단 목록이 항상 우선합니다. 탭별 따라가기로 가장 많이 시청하는 라이브를 추적하세요.',

  'form.name': '이름',
  'form.namePlaceholder': '예: 작업 중 드롭',
  'form.nameHint': '이 프리셋을 알아보기 쉬운 짧은 이름.',
  'form.nameRequired': '이 프리셋에 이름을 지정하세요.',
  'form.category': 'Twitch 카테고리',
  'form.categoryHint':
    'Twitch에서 검색하거나 카테고리 이름을 직접 입력하세요. 비워 두면 모든 카테고리를 허용합니다.',
  'form.titleFilter': '제목 필터',
  'form.titleFilterPlaceholder': '예: drops, ranked, 해설 없음',
  'form.titleFilterHint':
    '제목에 이 텍스트가 포함된 라이브만 대상입니다. 대소문자를 구분하지 않습니다.',
  'form.favorites': '즐겨찾기',
  'form.favoritesPlaceholder': '채널 슬러그를 입력하거나 붙여넣으세요...',
  'form.favoritesHint':
    '즐겨찾기가 우선입니다. 각 탭에서 따라가기를 켜면 가장 많이 시청하는 대상 채널이 현재 라이브를 대체할 수 있습니다.',
  'form.blacklist': '차단 목록',
  'form.blacklistPlaceholder':
    '무시할 채널 슬러그를 입력하거나 붙여넣으세요...',
  'form.blacklistHint':
    '이 채널은 즐겨찾기여도 절대 선택되지 않습니다.',
  'form.save': '프리셋 저장',
  'form.saveLurker': '러커 저장',
  'form.newTab': '새 탭',
  'form.newTabHint': '새 탭을 열고 그곳에서 러커를 시작합니다.',
  'form.saving': '저장 중...',

  'category.searchPlaceholder': 'Twitch 카테고리 검색...',
  'category.searching': 'Twitch 검색 중...',
  'category.none':
    '카테고리를 찾지 못했습니다. 이름을 입력하면 직접 사용할 수 있습니다.',
  'category.use': '“{name}” 사용',
  'category.footer':
    '카테고리는 Twitch에서 가져옵니다. 사용자 지정 이름도 사용할 수 있습니다.',

  'multi.defaultPlaceholder': 'Twitch 채널 슬러그 입력',
  'multi.searchPlaceholder': '채널 슬러그 검색 또는 입력...',
  'multi.priorityOrder': '우선순위',
  'multi.selected': '선택됨',
  'multi.remove': '{channel} 제거',
  'multi.moveUp': '{channel} 위로 이동',
  'multi.moveDown': '{channel} 아래로 이동',
  'multi.alreadyAdded': '@{channel}은(는) 이미 추가되었습니다',
  'multi.add': '@{channel} 추가',
  'multi.footerReorder':
    '즐겨찾기가 우선입니다. 따라가기가 꺼져 있을 때나 시청자 수 동점을 가릴 때 순서를 사용합니다.',
  'multi.footerAdd':
    '쉼표를 사용하면 여러 채널을 한 번에 추가할 수 있습니다.',
  'multi.typeOrPaste':
    '채널 슬러그를 입력하거나 Twitch URL을 붙여넣으세요.',

  'combo.selectOption': '옵션 선택',
  'combo.search': '검색...',
  'combo.noResults': '결과가 없습니다.',

  'error.choosePreset':
    '러커를 시작하기 전에 프리셋을 선택하세요.',
  'error.tabNotManaged': '이 탭은 Lurker Drops가 관리하지 않습니다.',
  'error.presetMissing': '해당 프리셋이 더 이상 존재하지 않습니다.',
  'error.unknownRequest': '알 수 없는 요청: {request}',
  'error.unauthorized': '권한이 없는 발신자입니다.',
  'error.couldNotOpenChannel':
    '{channel}을(를) 열 수 없습니다: {error}',
  'error.presetNoLongerExists': '프리셋이 더 이상 존재하지 않습니다.',
  'error.presetRemoved':
    '이 탭에서 사용하던 프리셋이 삭제되었습니다.',

  'twitch.timeout': 'Twitch 응답 시간이 초과되었습니다.',
  'twitch.unreachable':
    'Twitch에 연결할 수 없습니다. 연결을 확인하세요.',
  'twitch.rateLimited':
    'Twitch가 요청을 제한하고 있습니다. 1분 후 다시 시도하세요.',
  'twitch.httpError': 'Twitch API가 HTTP {status}를 반환했습니다.',
  'twitch.empty': 'Twitch API가 빈 응답을 반환했습니다.',
} satisfies Record<MessageKey, string>;

export default messages;
