import type { MessageKey } from './en';

const messages = {
  'app.name': 'Lurker Drops',
  'app.loadErrorTitle': 'Lurker Drops を読み込めませんでした',
  'app.loading': 'ラーカーを読み込み中...',
  'app.backgroundUnavailable':
    'Lurker Drops のバックグラウンドサービスが応答しませんでした。',
  'app.genericError': '問題が発生しました。',

  'common.cancel': 'キャンセル',
  'common.optional': '任意',
  'common.anyCategory': 'すべてのカテゴリ',
  'common.twitch': 'Twitch',
  'common.on': 'オン',
  'common.off': 'オフ',
  'common.expand': '展開',
  'common.collapse': '折りたたむ',
  'common.goBack': '戻る',
  'common.popOut': 'ウィンドウで開く',
  'common.browserTab': 'ブラウザのタブ',
  'common.currentTab': '現在のタブ',
  'common.viewers': '{count} 視聴者',

  'nav.tagline': 'Twitch 自動ラーカー',
  'nav.presets': 'プリセット',
  'nav.presetsSubtitle': 'フィルターを管理',
  'nav.editPreset': 'プリセットを編集',
  'nav.newPreset': '新しいプリセット',
  'nav.formSubtitle': 'ラーカーのフィルター',
  'nav.newLurker': '新しいラーカー',
  'nav.editLurker': 'ラーカーを編集',
  'nav.lurkerSubtitle': 'ラーカー設定',
  'nav.activeBadge': '稼働中: {count}',
  'nav.activeTooltip': 'ラーカー中のタブ: {count}',
  'nav.idleTooltip': 'Lurker Drops は待機中です',

  'main.lurkingTabs': 'ラーカー中のタブ',
  'main.addLurker': '追加',
  'main.livePreview': 'ライブプレビュー',
  'main.noLivePreview': '現在、条件に合うライブはありません。',
  'main.pausedCount': '一時停止: {count}',
  'main.noTabsTitle': 'まだラーカー中のタブはありません',
  'main.noTabsHint':
    '下でプリセットを選び、このタブのラーカーをオンにしてください。',
  'main.status': 'ステータス',
  'main.preset': 'プリセット',
  'main.noPresets': 'プリセットがありません',
  'main.selectPreset': 'プリセットを選択',
  'main.createPresetFirst': '先にプリセットを作成してください',
  'main.searchPresets': 'プリセットを検索...',
  'main.noPresetMatches': '一致するプリセットがありません。',
  'main.managePresets': 'プリセットを管理',
  'main.createFirstPreset': '最初のプリセットを作成',
  'main.muted': 'ミュート',
  'main.mutedHint':
    'Twitch プレーヤーだけでなく、ブラウザのタブ自体をミュートします。',
  'main.pursue': '追従',
  'main.pursueHint':
    'このプリセットに一致する最も視聴者の多いライブを追います。オフの場合、現在のライブが有効な間は維持します。',
  'main.turnOffLurker': 'ラーカーをオフ',
  'main.turnOnLurker': 'ラーカーをオン',
  'main.footer':
    'ラーカー中のタブがオンの間、Lurker Drops は毎分 Twitch を確認します。',

  'status.paused': '一時停止',
  'overlay.title': 'ラーカーモード',
  'overlay.subtitle': 'このタブは Lurker Drops によって管理されています。',
  'overlay.disable': 'ラーカーをオフ',
  'overlay.turningOff': 'オフにしています...',
  'overlay.dialogTitle': 'ラーカーモードを終了しますか？',
  'overlay.dialogMessage': 'このタブはラーカーモードです。続行すると、このタブのラーカーがオフになります。',
  'overlay.confirm': 'オフにして続行',
  'status.pausedDetail': 'このタブのラーカーはオフです。',
  'status.live': 'ライブ',
  'status.watchingStream': '{channel} を視聴中 · {title}',
  'status.watchingLive': 'ライブを視聴中。',
  'status.searching': '検索中',
  'status.searchingDetail':
    'このプリセットに一致するライブを Twitch で検索中...',
  'status.waiting': '待機中',
  'status.waitingDetail':
    '現在一致するライブはありません。ラーカーは毎分再確認します。',
  'status.error': 'エラー',
  'status.errorDetail': 'Twitch に接続できません。',
  'status.idle': '待機中',
  'status.idleDetail': 'ラーカーの準備ができています。',
  'status.off': 'オフ',

  'row.presetLabel': 'プリセット: {name}',
  'row.presetRemoved': 'プリセットが削除されました',
  'row.couldNotCheck': 'Twitch を確認できません',
  'row.searchingMatch': '一致するライブを検索中',
  'row.waitingMatch': '一致するライブを待機中',
  'row.lurkerPaused': 'ラーカーは一時停止中',
  'row.goTo': '移動',
  'row.goToTitle': 'ラーカー中のタブへ移動',
  'row.mute': 'ミュート',
  'row.unmute': 'ミュート解除',
  'row.muteTitle': 'このタブをミュート',
  'row.unmuteTitle': 'このタブのミュートを解除',
  'row.turnOn': 'オン',
  'row.turnOff': 'オフ',
  'row.turnOnTitle': 'このタブのラーカーをオン',
  'row.turnOffTitle': 'このタブのラーカーをオフ',
  'row.pursueOn': '追従オン',
  'row.pursueOff': '追従オフ',
  'row.pursueOnTitle': '最も視聴されているライブを追従',
  'row.pursueOffTitle': '有効な間は現在のライブを維持',
  'row.close': '閉じる',
  'row.closeConfirm': 'このタブを閉じますか？ラーカーもオフになります。',
  'row.closeTitle': 'このタブを閉じてラーカーをオフ',
  'row.edit': '編集',

  'presets.saved': '保存済みのプリセット',
  'presets.total': '合計: {count}',
  'presets.emptyTitle': 'プリセットがありません',
  'presets.emptyHint':
    'プリセットは、ラーカーが使う Twitch カテゴリ、タイトル、お気に入りチャンネル、ブロックするチャンネルを指定します。',
  'presets.edit': 'プリセットを編集',
  'presets.delete': 'プリセットを削除',
  'presets.titleContains': 'タイトルに「{filter}」を含む',
  'presets.anyTitle': 'すべてのタイトル',
  'presets.favoritesCount': 'お気に入り: {count}',
  'presets.blockedCount': 'ブロック: {count}',
  'presets.inUseCount': '使用中: {count}',
  'presets.deleteConfirm': '{name} を削除しますか？',
  'presets.deleteInUse':
    '使用中のタブは一時停止します。この操作は元に戻せません。',
  'presets.deleteUnused': 'この操作は元に戻せません。',
  'presets.deleting': '削除中...',
  'presets.tip':
    'お気に入りが先に確認され、ブラックリストが常に優先されます。タブごとの追従で最も視聴者の多いライブを狙えます。',

  'form.name': '名前',
  'form.namePlaceholder': '例: 作業中のドロップ',
  'form.nameHint': 'このプリセットを識別する短い名前。',
  'form.nameRequired': 'このプリセットに名前を付けてください。',
  'form.category': 'Twitch カテゴリ',
  'form.categoryHint':
    'Twitch で検索するか、カテゴリ名を手動で入力します。空欄ならすべてのカテゴリを許可します。',
  'form.titleFilter': 'タイトルフィルター',
  'form.titleFilterPlaceholder': '例: drops、ranked、実況なし',
  'form.titleFilterHint':
    'タイトルにこのテキストを含むライブのみ対象です。大文字と小文字は区別しません。',
  'form.favorites': 'お気に入り',
  'form.favoritesPlaceholder':
    'チャンネルのスラッグを入力または貼り付け...',
  'form.favoritesHint':
    'お気に入りが優先されます。各タブで追従をオンにすると、最も視聴者の多い対象チャンネルが現在のライブを置き換えられます。',
  'form.blacklist': 'ブロックリスト',
  'form.blacklistPlaceholder':
    '無視するチャンネルのスラッグを入力または貼り付け...',
  'form.blacklistHint':
    'これらのチャンネルはお気に入りでも選択されません。',
  'form.save': 'プリセットを保存',
  'form.saveLurker': 'ラーカーを保存',
  'form.newTab': '新しいタブ',
  'form.newTabHint': '新しいタブを開いてそこでラーカーを開始します。',
  'form.saving': '保存中...',

  'category.searchPlaceholder': 'Twitch カテゴリを検索...',
  'category.searching': 'Twitch を検索中...',
  'category.none':
    'カテゴリが見つかりません。名前を入力すると手動で使用できます。',
  'category.use': '「{name}」を使用',
  'category.footer':
    'カテゴリは Twitch から取得します。カスタム名も使用できます。',

  'multi.defaultPlaceholder': 'Twitch チャンネルのスラッグを入力',
  'multi.searchPlaceholder': 'チャンネルのスラッグを検索または入力...',
  'multi.priorityOrder': '優先順位',
  'multi.selected': '選択済み',
  'multi.remove': '{channel} を削除',
  'multi.moveUp': '{channel} を上へ',
  'multi.moveDown': '{channel} を下へ',
  'multi.alreadyAdded': '@{channel} は追加済みです',
  'multi.add': '@{channel} を追加',
  'multi.footerReorder':
    'お気に入りが優先されます。追従オフ時の順序や視聴者数の同点時に使われます。',
  'multi.footerAdd':
    'カンマを使うと複数のチャンネルを一度に追加できます。',
  'multi.typeOrPaste':
    'チャンネルのスラッグを入力するか Twitch URL を貼り付けてください。',

  'combo.selectOption': 'オプションを選択',
  'combo.search': '検索...',
  'combo.noResults': '結果がありません。',

  'error.choosePreset':
    'ラーカーを開始する前にプリセットを選んでください。',
  'error.tabNotManaged':
    'このタブは Lurker Drops の管理対象ではありません。',
  'error.presetMissing': 'そのプリセットはもう存在しません。',
  'error.unknownRequest': '不明なリクエスト: {request}',
  'error.unauthorized': '許可されていない送信元です。',
  'error.couldNotOpenChannel':
    '{channel} を開けませんでした: {error}',
  'error.presetNoLongerExists': 'プリセットはもう存在しません。',
  'error.presetRemoved':
    'このタブが使っていたプリセットが削除されました。',

  'twitch.timeout': 'Twitch の応答がタイムアウトしました。',
  'twitch.unreachable':
    'Twitch に接続できません。接続を確認してください。',
  'twitch.rateLimited':
    'Twitch がリクエストを制限しています。1 分後に再試行してください。',
  'twitch.httpError': 'Twitch API が HTTP {status} を返しました。',
  'twitch.empty': 'Twitch API が空の応答を返しました。',
} satisfies Record<MessageKey, string>;

export default messages;
