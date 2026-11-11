import type { MessageKey } from './en';

const messages = {
  'app.name': 'Lurker Drops',
  'app.loadErrorTitle': 'Lurker Drops yüklenemedi',
  'app.loading': "Lurker'larınız yükleniyor...",
  'app.backgroundUnavailable':
    'Lurker Drops arka plan hizmeti yanıt vermedi.',
  'app.genericError': 'Bir şeyler ters gitti.',

  'common.cancel': 'İptal',
  'common.optional': 'İsteğe bağlı',
  'common.anyCategory': 'Herhangi bir kategori',
  'common.twitch': 'Twitch',
  'common.on': 'Açık',
  'common.off': 'Kapalı',
  'common.expand': 'Genişlet',
  'common.collapse': 'Daralt',
  'common.goBack': 'Geri',
  'common.popOut': 'Pencerede aç',
  'common.browserTab': 'Tarayıcı sekmesi',
  'common.currentTab': 'Geçerli sekme',
  'common.viewers': '{count} izleyici',

  'nav.tagline': 'Twitch otomatik lurker',
  'nav.presets': 'Ön ayarlar',
  'nav.presetsSubtitle': 'Filtrelerinizi yönetin',
  'nav.editPreset': 'Ön ayarı düzenle',
  'nav.newPreset': 'Yeni ön ayar',
  'nav.formSubtitle': 'Lurker filtreleri',
  'nav.newLurker': 'Yeni lurker',
  'nav.editLurker': 'Lurker düzenle',
  'nav.lurkerSubtitle': 'Lurker ayarları',
  'nav.activeBadge': 'Etkin: {count}',
  'nav.activeTooltip': "Lurker sekmeleri: {count}",
  'nav.idleTooltip': 'Lurker Drops boşta',

  'main.lurkingTabs': "Lurker sekmeleri",
  'main.addLurker': 'Ekle',
  'main.livePreview': 'Canlı önizleme',
  'main.noLivePreview': 'Şu anda uygun canlı yayın yok.',
  'main.pausedCount': 'Duraklatıldı: {count}',
  'main.noTabsTitle': "Henüz lurker'da sekme yok",
  'main.noTabsHint':
    "Aşağıdan bir ön ayar seçin ve bu sekme için lurker'ı açın.",
  'main.status': 'Durum',
  'main.preset': 'Ön ayar',
  'main.noPresets': 'Henüz ön ayar yok',
  'main.selectPreset': 'Bir ön ayar seçin',
  'main.createPresetFirst': 'Önce bir ön ayar oluşturun',
  'main.searchPresets': 'Ön ayarlarda ara...',
  'main.noPresetMatches': 'Eşleşen ön ayar yok.',
  'main.managePresets': 'Ön ayarları yönet',
  'main.createFirstPreset': 'İlk ön ayarınızı oluşturun',
  'main.muted': 'Sessiz',
  'main.mutedHint':
    'Yalnızca Twitch oynatıcısını değil, tarayıcı sekmesini sessize alın.',
  'main.pursue': 'Takip et',
  'main.pursueHint':
    'Bu ön ayara uyan en çok izlenen canlı yayını takip edin. Kapalıyken mevcut yayın geçerli olduğu sürece korunur.',
  'main.turnOffLurker': "Lurker'ı kapat",
  'main.turnOnLurker': "Lurker'ı aç",
  'main.footer':
    "Lurker'da açık bir sekme olduğu sürece Lurker Drops Twitch'i her dakika kontrol eder.",

  'status.paused': 'Duraklatıldı',
  'overlay.title': 'Lurker modu',
  'overlay.subtitle': 'Bu sekme Lurker Drops tarafından yönetiliyor.',
  'overlay.disable': 'Lurker\'ı kapat',
  'overlay.turningOff': 'Kapatılıyor...',
  'overlay.dialogTitle': 'Lurker modundan çıkılsın mı?',
  'overlay.dialogMessage': 'Bu sekme lurker modunda. Devam ederseniz bu sekmedeki lurker kapatılır.',
  'overlay.confirm': 'Kapat ve devam et',
  'status.pausedDetail': 'Bu sekme için lurker kapalı.',
  'status.live': 'Canlı',
  'status.watchingStream': '{channel} izleniyor · {title}',
  'status.watchingLive': 'Bir canlı yayın izleniyor.',
  'status.searching': 'Aranıyor',
  'status.searchingDetail':
    "Bu ön ayara uyan bir canlı yayın Twitch'te aranıyor...",
  'status.waiting': 'Bekleniyor',
  'status.waitingDetail':
    'Şu anda uygun canlı yayın yok. Lurker her dakika tekrar kontrol edecek.',
  'status.error': 'Hata',
  'status.errorDetail': "Twitch'e ulaşılamadı.",
  'status.idle': 'Boşta',
  'status.idleDetail': 'Lurker hazır.',
  'status.off': 'Kapalı',

  'row.presetLabel': 'Ön ayar: {name}',
  'row.presetRemoved': 'Ön ayar kaldırıldı',
  'row.couldNotCheck': 'Twitch kontrol edilemedi',
  'row.searchingMatch': 'Uygun canlı yayın aranıyor',
  'row.waitingMatch': 'Uygun canlı yayın bekleniyor',
  'row.lurkerPaused': 'Lurker duraklatıldı',
  'row.goTo': 'Git',
  'row.goToTitle': "Lurker'daki sekmeye git",
  'row.mute': 'Sessize al',
  'row.unmute': 'Sesi aç',
  'row.muteTitle': 'Bu sekmeyi sessize al',
  'row.unmuteTitle': 'Bu sekmenin sesini aç',
  'row.turnOn': 'Aç',
  'row.turnOff': 'Kapat',
  'row.turnOnTitle': "Bu sekmede lurker'ı aç",
  'row.turnOffTitle': "Bu sekmede lurker'ı kapat",
  'row.pursueOn': 'Takip açık',
  'row.pursueOff': 'Takip kapalı',
  'row.pursueOnTitle': 'En çok izlenen yayını takip et',
  'row.pursueOffTitle': 'Geçerli olduğu sürece mevcut yayını koru',
  'row.close': 'Kapat',
  'row.closeConfirm': 'Bu sekme kapatılsın mı? Lurker da kapatılır.',
  'row.closeTitle': "Bu sekmeyi kapat ve lurker'ını kapat",
  'row.edit': 'Düzenle',

  'presets.saved': 'Kayıtlı ön ayarlar',
  'presets.total': 'Toplam: {count}',
  'presets.emptyTitle': 'Henüz ön ayar yok',
  'presets.emptyHint':
    "Ön ayar, lurker'ın hangi Twitch kategorisini, başlığı, favori kanalları ve engellenen kanalları kullanacağını belirler.",
  'presets.edit': 'Ön ayarı düzenle',
  'presets.delete': 'Ön ayarı sil',
  'presets.titleContains': 'başlık “{filter}” içeriyor',
  'presets.anyTitle': 'herhangi bir başlık',
  'presets.favoritesCount': 'Favoriler: {count}',
  'presets.blockedCount': 'Engellenen: {count}',
  'presets.inUseCount': 'Kullanımda: {count}',
  'presets.deleteConfirm': '{name} silinsin mi?',
  'presets.deleteInUse':
    'Kullanan sekmeler duraklatılacak. Bu işlem geri alınamaz.',
  'presets.deleteUnused': 'Bu işlem geri alınamaz.',
  'presets.deleting': 'Siliniyor...',
  'presets.tip':
    "Önce favoriler kontrol edilir; kara liste her zaman kazanır. En çok izlenen yayını takip etmek için sekme başına Takip et'i kullanın.",

  'form.name': 'Ad',
  'form.namePlaceholder': 'örn. Çalışırken drops',
  'form.nameHint': 'Bu ön ayarı tanımak için kısa bir ad.',
  'form.nameRequired': 'Bu ön ayara bir ad verin.',
  'form.category': 'Twitch kategorisi',
  'form.categoryHint':
    "Twitch'te arayın veya kategori adını elle yazın. Herhangi bir kategoriye izin vermek için boş bırakın.",
  'form.titleFilter': 'Başlık filtresi',
  'form.titleFilterPlaceholder': 'örn. drops, ranked, yorumsuz',
  'form.titleFilterHint':
    'Yalnızca başlığı bu metni içeren yayınlar uygundur. Büyük/küçük harf duyarsız.',
  'form.favorites': 'Favoriler',
  'form.favoritesPlaceholder': "Kanal slug'larını yazın veya yapıştırın...",
  'form.favoritesHint':
    'Favoriler önceliklidir. Her sekmede Takip et seçeneği, en çok izlenen uygun kanalın mevcut yayının yerini alıp alamayacağını belirler.',
  'form.blacklist': 'Kara liste',
  'form.blacklistPlaceholder':
    "Yok sayılacak kanal slug'larını yazın veya yapıştırın...",
  'form.blacklistHint':
    'Bu kanallar favori olsalar bile asla seçilmez.',
  'form.save': 'Ön ayarı kaydet',
  'form.saveLurker': 'Lurker kaydet',
  'form.newTab': 'Yeni sekme',
  'form.newTabHint': 'Yeni bir sekme aç ve lurker\'ı orada başlat.',
  'form.saving': 'Kaydediliyor...',

  'category.searchPlaceholder': "Twitch kategorilerinde ara...",
  'category.searching': "Twitch'te aranıyor...",
  'category.none':
    'Kategori bulunamadı. Elle kullanmak için bir ad yazın.',
  'category.use': '“{name}” kullan',
  'category.footer':
    "Kategoriler Twitch'ten gelir. Özel adlara izin verilir.",

  'multi.defaultPlaceholder': "Twitch kanal slug'ı yazın",
  'multi.searchPlaceholder': "Kanal slug'ı arayın veya yazın...",
  'multi.priorityOrder': 'Öncelik sırası',
  'multi.selected': 'Seçilenler',
  'multi.remove': '{channel} kaldır',
  'multi.moveUp': '{channel} yukarı taşı',
  'multi.moveDown': '{channel} aşağı taşı',
  'multi.alreadyAdded': '@{channel} zaten ekli',
  'multi.add': '@{channel} ekle',
  'multi.footerReorder':
    'Favoriler önceliklidir. Sıra, Takip et kapalıyken veya izleyici eşitliğini bozmak için kullanılır.',
  'multi.footerAdd':
    'Birden fazla kanal eklemek için virgül kullanın.',
  'multi.typeOrPaste':
    "Bir kanal slug'ı yazın veya Twitch URL'si yapıştırın.",

  'combo.selectOption': 'Bir seçenek seçin',
  'combo.search': 'Ara...',
  'combo.noResults': 'Sonuç bulunamadı.',

  'error.choosePreset':
    "Lurker'ı başlatmadan önce bir ön ayar seçin.",
  'error.tabNotManaged':
    'Bu sekme Lurker Drops tarafından yönetilmiyor.',
  'error.presetMissing': 'Bu ön ayar artık mevcut değil.',
  'error.unknownRequest': 'Bilinmeyen istek: {request}',
  'error.unauthorized': 'Yetkisiz gönderen.',
  'error.couldNotOpenChannel': '{channel} açılamadı: {error}',
  'error.presetNoLongerExists': 'Ön ayar artık mevcut değil.',
  'error.presetRemoved':
    'Bu sekmenin kullandığı ön ayar kaldırıldı.',

  'twitch.timeout': 'Twitch yanıt vermekte çok yavaş kaldı.',
  'twitch.unreachable':
    "Twitch'e ulaşılamadı. Bağlantınızı kontrol edin.",
  'twitch.rateLimited':
    'Twitch istekleri sınırlıyor. Bir dakika sonra tekrar deneyin.',
  'twitch.httpError': "Twitch API'si HTTP {status} döndürdü.",
  'twitch.empty': "Twitch API'si boş bir yanıt döndürdü.",
} satisfies Record<MessageKey, string>;

export default messages;
