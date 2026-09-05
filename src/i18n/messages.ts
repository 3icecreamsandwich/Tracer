import type { AppLanguage } from '../composables/db/types'

export const languageOptions: Array<{
  code: AppLanguage
  englishName: string
  nativeName: string
}> = [
    { code: 'en', englishName: 'English', nativeName: 'English' },
    { code: 'es', englishName: 'Spanish', nativeName: 'Español' },
    { code: 'fr', englishName: 'French', nativeName: 'Français' },
    { code: 'zh-CN', englishName: 'Chinese (Simplified)', nativeName: '简体中文' },
    { code: 'hi', englishName: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ar', englishName: 'Arabic', nativeName: 'العربية' },
    { code: 'de', englishName: 'German', nativeName: 'Deutsch' },
    { code: 'ru', englishName: 'Russian', nativeName: 'Русский' },
    { code: 'ja', englishName: 'Japanese', nativeName: '日本語' },
    { code: 'ko', englishName: 'Korean', nativeName: '한국어' },
  ]

type Messages = Record<string, string>

const en: Messages = {
  'app.name': 'Tracer',
  'common.back': 'Back',
  'common.cancel': 'Cancel',
  'common.change': 'Change',
  'common.close': 'Close',
  'common.create': 'Create',
  'common.current': 'Current:',
  'common.delete': 'Delete',
  'common.dismiss': 'Dismiss',
  'common.edit': 'Edit',
  'common.export': 'Export',
  'common.import': 'Import',
  'common.loading': 'Loading…',
  'common.none': 'None',
  'common.off': 'Off',
  'common.on': 'On',
  'common.remove': 'Remove',
  'common.restart': 'Restart',
  'common.save': 'Save',
  'common.set': 'Set',
  'common.update': 'Update',
  'common.user': 'User',
  'nav.home': 'Home',
  'nav.search': 'Search',
  'nav.searchPlaceholder': 'Search sets and study guides…',
  'nav.searchResults': 'Search results',
  'nav.noResults': 'No results.',
  'nav.settings': 'Settings',
  'settings.title': 'Settings',
  'settings.actionRequired': 'Action required',
  'settings.profile': 'Profile',
  'settings.theme': 'Theme',
  'settings.darkMode': 'Dark mode',
  'settings.darkModeDescription': 'Affects the whole app and persists on restart.',
  'settings.language': 'Language',
  'settings.languageDescription': 'Changes Tracer system text. Your study content is not translated.',
  'settings.chooseLanguage': 'Choose language',
  'settings.defaultModel': 'Default AI Model',
  'settings.defaultModelDescription': 'Required for Synthesize, Generate, and Chat.',
  'settings.learnHybrid': 'Practice · Hybrid (AI-augmented)',
  'settings.learnHybridDescription': 'Adds AI-generated questions in addition to the deterministic baseline.',
  'settings.smartReview': 'Flashcards · Smart Review',
  'settings.smartReviewDescription': 'Use spaced review scheduling by default for every flashcard set. Individual sets can override this setting.',
  'settings.chooseModelFirst': 'Add an AI model to enable this.',
  'settings.providers': 'Providers',
  'settings.providersDescription': 'Provider keys and tokens are stored in the vault.',
  'settings.apiKey': 'API key',
  'settings.startupLock': 'Require password on startup',
  'settings.startupLockDescription': 'When disabled, Tracer will auto-unlock using your OS keychain.',
  'settings.dangerZone': 'Danger zone',
  'settings.resetDescription': 'Reset removes your vault and local database.',
  'settings.resetTracer': 'Reset Tracer',
  'home.sets': 'Sets',
  'home.subtitle': 'Your flashcard sets and study guides',
  'home.create': 'Create',
  'set.reviewReady': 'Review now',
  'set.reviewReadyNow': 'Ready now',
  'set.nothingReady': 'Nothing ready',
  'set.nextReview': 'Next',
  'home.chooseMode': 'Choose a mode',
  'home.noItems': 'No sets or study guides yet; use Create to get started',
  'home.basic': 'Basic',
  'home.basicHint': 'Start from scratch',
  'home.synthesize': 'Synthesize',
  'home.synthesizeHint': 'Combine sets',
  'home.generate': 'Generate',
  'home.generateHint': 'Create from a prompt',
  'home.studyGuide': 'Study guide',
  'home.setKind': 'Set',
  'create.title': 'Title',
  'create.description': 'Description',
  'create.cards': 'Cards',
  'create.card': 'Card {number}',
  'create.term': 'Term',
  'create.definition': 'Definition',
  'create.addImage': 'Add Image',
  'create.basicTitle': 'Create · Basic',
  'create.basicDescription': 'Add cards manually. Use Tab to move between fields; Ctrl/⌘ + Enter adds a new card.',
  'create.synthesizeTitle': 'Create · Synthesize',
  'create.synthesizeDescription': 'Combine existing sets into a new set.',
  'create.generateTitle': 'Create · Generate',
  'create.generateDescription': 'Generate a study guide and flashcards from your sources.',
  'set.studyModes': 'Study modes',
  'set.flashcards': 'Flashcards',
  'set.flashcardsHint': 'Quick review',
  'set.learn': 'Practice',
  'set.learnHint': 'Quiz yourself',
  'set.match': 'Match',
  'set.matchHint': 'Find pairs under pressure',
  'set.chat': 'Chat',
  'set.chatHint': 'Chat with Tracer',
  'set.studyGuide': 'Study guide',
  'set.studyGuideHint': 'Markdown',
  'set.terms': 'Terms',
  'set.learning': 'Learning',
  'set.mastered': 'Mastered',
  'set.resumeIncorrect': 'Resume missed cards',
  'set.shuffle': 'Shuffle',
  'set.fullscreen': 'Fullscreen',
  'set.starredOnly': 'Starred only',
  'set.previous': 'Prev',
  'set.next': 'Next',
  'set.missed': 'Missed it',
  'set.gotIt': 'Got it',
  'set.ready': 'Ready',
  'set.start': 'Start',
  'set.memory': 'Memory',
  'set.backToSet': 'Back to set',
  'studyGuide.title': 'Study guide',
  'studyGuide.linkedTo': 'Linked to set {title}',
  'studyGuide.goToSet': 'Go to set',
  'auth.unlockTitle': 'Unlock Tracer',
  'auth.password': 'Password',
  'auth.unlock': 'Unlock',
  'auth.firstRunTitle': 'Setup Tracer',
  'auth.name': 'Name',
  'auth.email': 'Email',
  'auth.confirmPassword': 'Confirm password',
}

const es: Messages = {
  'common.back': 'Atrás', 'common.cancel': 'Cancelar', 'common.change': 'Cambiar', 'common.close': 'Cerrar', 'common.create': 'Crear', 'common.current': 'Actual:', 'common.delete': 'Eliminar', 'common.dismiss': 'Descartar', 'common.edit': 'Editar', 'common.export': 'Exportar', 'common.import': 'Importar', 'common.loading': 'Cargando…', 'common.none': 'Ninguno', 'common.off': 'Desactivado', 'common.on': 'Activado', 'common.remove': 'Quitar', 'common.restart': 'Reiniciar', 'common.save': 'Guardar', 'common.set': 'Establecer', 'common.update': 'Actualizar', 'common.user': 'Usuario',
  'nav.home': 'Inicio', 'nav.search': 'Buscar', 'nav.searchPlaceholder': 'Buscar conjuntos y guías de estudio…', 'nav.searchResults': 'Resultados de búsqueda', 'nav.noResults': 'Sin resultados.', 'nav.settings': 'Configuración',
  'settings.title': 'Configuración', 'settings.actionRequired': 'Acción necesaria', 'settings.profile': 'Perfil', 'settings.theme': 'Tema', 'settings.darkMode': 'Modo oscuro', 'settings.darkModeDescription': 'Afecta a toda la aplicación y se conserva al reiniciar.', 'settings.language': 'Idioma', 'settings.languageDescription': 'Cambia el texto del sistema de Tracer. Tu contenido de estudio no se traduce.', 'settings.chooseLanguage': 'Elegir idioma', 'settings.defaultModel': 'Modelo de IA predeterminado', 'settings.defaultModelDescription': 'Necesario para Sintetizar, Generar y Chat.', 'settings.learnHybrid': 'Aprender · Híbrido (con IA)', 'settings.learnHybridDescription': 'Añade preguntas generadas por IA a la base determinista.', 'settings.chooseModelFirst': 'Elige un modelo de IA predeterminado para activarlo.', 'settings.providers': 'Proveedores', 'settings.providersDescription': 'Las claves y tokens se guardan en la bóveda.', 'settings.apiKey': 'Clave API', 'settings.startupLock': 'Solicitar contraseña al iniciar', 'settings.startupLockDescription': 'Si se desactiva, Tracer se desbloqueará con el llavero del sistema.', 'settings.dangerZone': 'Zona de peligro', 'settings.resetDescription': 'Restablecer elimina la bóveda y la base de datos local.', 'settings.resetTracer': 'Restablecer Tracer',
  'home.sets': 'Conjuntos', 'home.subtitle': 'Tus conjuntos de tarjetas y guías de estudio.', 'home.create': 'Crear', 'home.chooseMode': 'Elige un modo', 'home.noItems': 'Aún no hay conjuntos ni guías; usa Crear para empezar', 'home.basic': 'Básico', 'home.basicHint': 'Empezar desde cero', 'home.synthesize': 'Sintetizar', 'home.synthesizeHint': 'Combinar conjuntos', 'home.generate': 'Generar', 'home.generateHint': 'Crear desde una indicación', 'home.studyGuide': 'Guía de estudio', 'home.setKind': 'Conjunto',
  'create.title': 'Título', 'create.description': 'Descripción', 'create.cards': 'Tarjetas', 'create.card': 'Tarjeta {number}', 'create.term': 'Término', 'create.definition': 'Definición', 'create.addImage': 'Añadir imagen', 'create.basicTitle': 'Crear · Básico', 'create.basicDescription': 'Añade tarjetas manualmente. Usa Tab para moverte y Ctrl/⌘ + Enter para añadir una tarjeta.', 'create.synthesizeTitle': 'Crear · Sintetizar', 'create.synthesizeDescription': 'Combina conjuntos existentes en uno nuevo.', 'create.generateTitle': 'Crear · Generar', 'create.generateDescription': 'Genera una guía de estudio y tarjetas desde tus fuentes.',
  'set.studyModes': 'Modos de estudio', 'set.flashcards': 'Tarjetas', 'set.flashcardsHint': 'Repaso rápido', 'set.learn': 'Aprender', 'set.learnHint': 'Ponte a prueba', 'set.match': 'Emparejar', 'set.matchHint': 'Encuentra parejas contrarreloj', 'set.chat': 'Chat', 'set.chatHint': 'Basado en este conjunto', 'set.studyGuide': 'Guía de estudio', 'set.studyGuideHint': 'Markdown', 'set.terms': 'Términos', 'set.shuffle': 'Mezclar', 'set.fullscreen': 'Pantalla completa', 'set.starredOnly': 'Solo favoritos', 'set.previous': 'Anterior', 'set.next': 'Siguiente', 'set.missed': 'No lo sabía', 'set.gotIt': 'Lo sabía', 'set.ready': 'Listo', 'set.start': 'Iniciar', 'set.memory': 'Memoria', 'set.backToSet': 'Volver al conjunto',
  'studyGuide.title': 'Guía de estudio', 'studyGuide.linkedTo': 'Vinculada al conjunto {title}.', 'studyGuide.goToSet': 'Ir al conjunto', 'auth.unlockTitle': 'Desbloquear Tracer', 'auth.password': 'Contraseña', 'auth.unlock': 'Desbloquear', 'auth.firstRunTitle': 'Configurar Tracer', 'auth.name': 'Nombre', 'auth.email': 'Correo', 'auth.confirmPassword': 'Confirmar contraseña',
}

const fr: Messages = {
  'common.back': 'Retour', 'common.cancel': 'Annuler', 'common.change': 'Modifier', 'common.close': 'Fermer', 'common.create': 'Créer', 'common.current': 'Actuel :', 'common.delete': 'Supprimer', 'common.dismiss': 'Ignorer', 'common.edit': 'Modifier', 'common.export': 'Exporter', 'common.import': 'Importer', 'common.loading': 'Chargement…', 'common.none': 'Aucun', 'common.off': 'Désactivé', 'common.on': 'Activé', 'common.remove': 'Retirer', 'common.restart': 'Recommencer', 'common.save': 'Enregistrer', 'common.set': 'Définir', 'common.update': 'Mettre à jour', 'common.user': 'Utilisateur',
  'nav.home': 'Accueil', 'nav.search': 'Rechercher', 'nav.searchPlaceholder': 'Rechercher des ensembles et des guides d’étude…', 'nav.searchResults': 'Résultats de recherche', 'nav.noResults': 'Aucun résultat.', 'nav.settings': 'Paramètres',
  'settings.title': 'Paramètres', 'settings.actionRequired': 'Action requise', 'settings.profile': 'Profil', 'settings.theme': 'Thème', 'settings.darkMode': 'Mode sombre', 'settings.darkModeDescription': 'S’applique à toute l’application et persiste après redémarrage.', 'settings.language': 'Langue', 'settings.languageDescription': 'Modifie le texte système de Tracer. Votre contenu d’étude n’est pas traduit.', 'settings.chooseLanguage': 'Choisir la langue', 'settings.defaultModel': 'Modèle IA par défaut', 'settings.defaultModelDescription': 'Requis pour Synthétiser, Générer et Chat.', 'settings.learnHybrid': 'Apprendre · Hybride (IA)', 'settings.learnHybridDescription': 'Ajoute des questions générées par IA à la base déterministe.', 'settings.chooseModelFirst': 'Choisissez un modèle IA par défaut pour activer ceci.', 'settings.providers': 'Fournisseurs', 'settings.providersDescription': 'Les clés et jetons sont stockés dans le coffre.', 'settings.apiKey': 'Clé API', 'settings.startupLock': 'Exiger un mot de passe au démarrage', 'settings.startupLockDescription': 'Si désactivé, Tracer se déverrouille avec le trousseau du système.', 'settings.dangerZone': 'Zone dangereuse', 'settings.resetDescription': 'La réinitialisation supprime le coffre et la base locale.', 'settings.resetTracer': 'Réinitialiser Tracer',
  'home.sets': 'Ensembles', 'home.subtitle': 'Vos ensembles de cartes et guides d’étude.', 'home.create': 'Créer', 'home.chooseMode': 'Choisissez un mode', 'home.noItems': 'Aucun ensemble ou guide. Utilisez Créer pour commencer.', 'home.basic': 'Basique', 'home.basicHint': 'Partir de zéro', 'home.synthesize': 'Synthétiser', 'home.synthesizeHint': 'Combiner des ensembles', 'home.generate': 'Générer', 'home.generateHint': 'Créer depuis une consigne', 'home.studyGuide': 'Guide d’étude', 'home.setKind': 'Ensemble',
  'create.title': 'Titre', 'create.description': 'Description', 'create.cards': 'Cartes', 'create.card': 'Carte {number}', 'create.term': 'Terme', 'create.definition': 'Définition', 'create.addImage': 'Ajouter une image', 'create.basicTitle': 'Créer · Basique', 'create.basicDescription': 'Ajoutez les cartes manuellement. Tab pour naviguer, Ctrl/⌘ + Entrée pour ajouter.', 'create.synthesizeTitle': 'Créer · Synthétiser', 'create.synthesizeDescription': 'Combinez des ensembles existants en un nouvel ensemble.', 'create.generateTitle': 'Créer · Générer', 'create.generateDescription': 'Générez un guide et des cartes à partir de vos sources.',
  'set.studyModes': 'Modes d’étude', 'set.flashcards': 'Cartes', 'set.flashcardsHint': 'Révision rapide', 'set.learn': 'Apprendre', 'set.learnHint': 'Testez-vous', 'set.match': 'Associer', 'set.matchHint': 'Trouvez les paires rapidement', 'set.chat': 'Chat', 'set.chatHint': 'Basé sur cet ensemble', 'set.studyGuide': 'Guide d’étude', 'set.studyGuideHint': 'Markdown', 'set.terms': 'Termes', 'set.shuffle': 'Mélanger', 'set.fullscreen': 'Plein écran', 'set.starredOnly': 'Favoris uniquement', 'set.previous': 'Précédent', 'set.next': 'Suivant', 'set.missed': 'Raté', 'set.gotIt': 'Trouvé', 'set.ready': 'Prêt', 'set.start': 'Démarrer', 'set.memory': 'Mémoire', 'set.backToSet': 'Retour à l’ensemble',
  'studyGuide.title': 'Guide d’étude', 'studyGuide.linkedTo': 'Lié à l’ensemble {title}.', 'studyGuide.goToSet': 'Aller à l’ensemble', 'auth.unlockTitle': 'Déverrouiller Tracer', 'auth.password': 'Mot de passe', 'auth.unlock': 'Déverrouiller', 'auth.firstRunTitle': 'Configurer Tracer', 'auth.name': 'Nom', 'auth.email': 'E-mail', 'auth.confirmPassword': 'Confirmer le mot de passe',
}

const zhCN: Messages = {
  'common.back': '返回', 'common.cancel': '取消', 'common.change': '更改', 'common.close': '关闭', 'common.create': '创建', 'common.current': '当前：', 'common.delete': '删除', 'common.dismiss': '忽略', 'common.edit': '编辑', 'common.export': '导出', 'common.import': '导入', 'common.loading': '正在加载…', 'common.none': '无', 'common.off': '关闭', 'common.on': '开启', 'common.remove': '移除', 'common.restart': '重新开始', 'common.save': '保存', 'common.set': '设置', 'common.update': '更新', 'common.user': '用户',
  'nav.home': '主页', 'nav.search': '搜索', 'nav.searchPlaceholder': '搜索卡片集和学习指南…', 'nav.searchResults': '搜索结果', 'nav.noResults': '没有结果。', 'nav.settings': '设置',
  'settings.title': '设置', 'settings.actionRequired': '需要操作', 'settings.profile': '个人资料', 'settings.theme': '主题', 'settings.darkMode': '深色模式', 'settings.darkModeDescription': '应用于整个应用，并在重启后保留。', 'settings.language': '语言', 'settings.languageDescription': '更改 Tracer 的系统文字，不会翻译学习内容。', 'settings.chooseLanguage': '选择语言', 'settings.defaultModel': '默认 AI 模型', 'settings.defaultModelDescription': '“综合”、“生成”和“聊天”功能需要此项。', 'settings.learnHybrid': '学习 · 混合（AI 增强）', 'settings.learnHybridDescription': '在确定性基础题之外添加 AI 生成的问题。', 'settings.chooseModelFirst': '请先选择默认 AI 模型。', 'settings.providers': '服务提供商', 'settings.providersDescription': '密钥和令牌保存在保险库中。', 'settings.apiKey': 'API 密钥', 'settings.startupLock': '启动时要求密码', 'settings.startupLockDescription': '关闭后，Tracer 将使用系统钥匙串自动解锁。', 'settings.dangerZone': '危险区域', 'settings.resetDescription': '重置会删除保险库和本地数据库。', 'settings.resetTracer': '重置 Tracer',
  'home.sets': '卡片集', 'home.subtitle': '你的卡片集和学习指南。', 'home.create': '创建', 'home.chooseMode': '选择一种模式', 'home.noItems': '还没有卡片集或学习指南。请使用“创建”开始。', 'home.basic': '基础', 'home.basicHint': '从头开始', 'home.synthesize': '综合', 'home.synthesizeHint': '合并卡片集', 'home.generate': '生成', 'home.generateHint': '根据提示创建', 'home.studyGuide': '学习指南', 'home.setKind': '卡片集',
  'create.title': '标题', 'create.description': '描述', 'create.cards': '卡片', 'create.card': '卡片 {number}', 'create.term': '术语', 'create.definition': '定义', 'create.addImage': '添加图片', 'create.basicTitle': '创建 · 基础', 'create.basicDescription': '手动添加卡片。使用 Tab 切换字段，Ctrl/⌘ + Enter 添加新卡片。', 'create.synthesizeTitle': '创建 · 综合', 'create.synthesizeDescription': '将现有卡片集合并为一个新集合。', 'create.generateTitle': '创建 · 生成', 'create.generateDescription': '根据你的资料生成学习指南和卡片。',
  'set.studyModes': '学习模式', 'set.flashcards': '闪卡', 'set.flashcardsHint': '快速复习', 'set.learn': '学习', 'set.learnHint': '自我测验', 'set.match': '配对', 'set.matchHint': '限时寻找配对', 'set.chat': '聊天', 'set.chatHint': '基于此卡片集', 'set.studyGuide': '学习指南', 'set.studyGuideHint': 'Markdown', 'set.terms': '术语', 'set.shuffle': '随机排序', 'set.fullscreen': '全屏', 'set.starredOnly': '仅收藏', 'set.previous': '上一张', 'set.next': '下一张', 'set.missed': '没记住', 'set.gotIt': '记住了', 'set.ready': '准备就绪', 'set.start': '开始', 'set.memory': '记忆模式', 'set.backToSet': '返回卡片集',
  'studyGuide.title': '学习指南', 'studyGuide.linkedTo': '已关联卡片集 {title}。', 'studyGuide.goToSet': '前往卡片集', 'auth.unlockTitle': '解锁 Tracer', 'auth.password': '密码', 'auth.unlock': '解锁', 'auth.firstRunTitle': '设置 Tracer', 'auth.name': '姓名', 'auth.email': '电子邮件', 'auth.confirmPassword': '确认密码',
}

const hi: Messages = {
  'common.back': 'वापस', 'common.cancel': 'रद्द करें', 'common.change': 'बदलें', 'common.close': 'बंद करें', 'common.create': 'बनाएँ', 'common.current': 'वर्तमान:', 'common.delete': 'हटाएँ', 'common.dismiss': 'हटाएँ', 'common.edit': 'संपादित करें', 'common.export': 'निर्यात', 'common.import': 'आयात', 'common.loading': 'लोड हो रहा है…', 'common.none': 'कोई नहीं', 'common.off': 'बंद', 'common.on': 'चालू', 'common.remove': 'हटाएँ', 'common.restart': 'फिर शुरू करें', 'common.save': 'सहेजें', 'common.set': 'सेट करें', 'common.update': 'अपडेट करें', 'common.user': 'उपयोगकर्ता',
  'nav.home': 'होम', 'nav.search': 'खोजें', 'nav.searchPlaceholder': 'सेट और अध्ययन गाइड खोजें…', 'nav.searchResults': 'खोज परिणाम', 'nav.noResults': 'कोई परिणाम नहीं।', 'nav.settings': 'सेटिंग्स',
  'settings.title': 'सेटिंग्स', 'settings.actionRequired': 'कार्रवाई आवश्यक', 'settings.profile': 'प्रोफ़ाइल', 'settings.theme': 'थीम', 'settings.darkMode': 'डार्क मोड', 'settings.darkModeDescription': 'पूरे ऐप पर लागू होता है और रीस्टार्ट के बाद बना रहता है।', 'settings.language': 'भाषा', 'settings.languageDescription': 'Tracer के सिस्टम टेक्स्ट को बदलता है। अध्ययन सामग्री का अनुवाद नहीं होता।', 'settings.chooseLanguage': 'भाषा चुनें', 'settings.defaultModel': 'डिफ़ॉल्ट AI मॉडल', 'settings.defaultModelDescription': 'सिंथेसाइज़, जेनरेट और चैट के लिए आवश्यक।', 'settings.learnHybrid': 'सीखें · हाइब्रिड (AI-सहायित)', 'settings.learnHybridDescription': 'मूल प्रश्नों के साथ AI से बने प्रश्न जोड़ता है।', 'settings.chooseModelFirst': 'इसे चालू करने के लिए डिफ़ॉल्ट AI मॉडल चुनें।', 'settings.providers': 'प्रदाता', 'settings.providersDescription': 'कुंजियाँ और टोकन वॉल्ट में रखे जाते हैं।', 'settings.apiKey': 'API कुंजी', 'settings.startupLock': 'शुरू होने पर पासवर्ड माँगें', 'settings.startupLockDescription': 'बंद होने पर Tracer सिस्टम कीचेन से अपने आप अनलॉक होगा।', 'settings.dangerZone': 'खतरे का क्षेत्र', 'settings.resetDescription': 'रीसेट करने से वॉल्ट और स्थानीय डेटाबेस मिट जाता है।', 'settings.resetTracer': 'Tracer रीसेट करें',
  'home.sets': 'सेट', 'home.subtitle': 'आपके फ्लैशकार्ड सेट और अध्ययन गाइड।', 'home.create': 'बनाएँ', 'home.chooseMode': 'मोड चुनें', 'home.noItems': 'अभी कोई सेट या गाइड नहीं है। शुरू करने के लिए बनाएँ चुनें।', 'home.basic': 'बेसिक', 'home.basicHint': 'शुरू से बनाएँ', 'home.synthesize': 'सिंथेसाइज़', 'home.synthesizeHint': 'सेट मिलाएँ', 'home.generate': 'जेनरेट', 'home.generateHint': 'प्रॉम्प्ट से बनाएँ', 'home.studyGuide': 'अध्ययन गाइड', 'home.setKind': 'सेट',
  'create.title': 'शीर्षक', 'create.description': 'विवरण', 'create.cards': 'कार्ड', 'create.card': 'कार्ड {number}', 'create.term': 'शब्द', 'create.definition': 'परिभाषा', 'create.addImage': 'चित्र जोड़ें', 'create.basicTitle': 'बनाएँ · बेसिक', 'create.basicDescription': 'कार्ड हाथ से जोड़ें। फ़ील्ड बदलने के लिए Tab और नया कार्ड जोड़ने के लिए Ctrl/⌘ + Enter दबाएँ।', 'create.synthesizeTitle': 'बनाएँ · सिंथेसाइज़', 'create.synthesizeDescription': 'मौजूदा सेटों को नए सेट में मिलाएँ।', 'create.generateTitle': 'बनाएँ · जेनरेट', 'create.generateDescription': 'अपने स्रोतों से अध्ययन गाइड और फ्लैशकार्ड बनाएँ।',
  'set.studyModes': 'अध्ययन मोड', 'set.flashcards': 'फ्लैशकार्ड', 'set.flashcardsHint': 'त्वरित अभ्यास', 'set.learn': 'सीखें', 'set.learnHint': 'खुद को जाँचें', 'set.match': 'मिलान', 'set.matchHint': 'समय में जोड़ियाँ खोजें', 'set.chat': 'चैट', 'set.chatHint': 'इस सेट पर आधारित', 'set.studyGuide': 'अध्ययन गाइड', 'set.studyGuideHint': 'Markdown', 'set.terms': 'शब्द', 'set.shuffle': 'फेंटें', 'set.fullscreen': 'पूर्ण स्क्रीन', 'set.starredOnly': 'केवल पसंदीदा', 'set.previous': 'पिछला', 'set.next': 'अगला', 'set.missed': 'नहीं आया', 'set.gotIt': 'आ गया', 'set.ready': 'तैयार', 'set.start': 'शुरू करें', 'set.memory': 'मेमोरी', 'set.backToSet': 'सेट पर वापस',
  'studyGuide.title': 'अध्ययन गाइड', 'studyGuide.linkedTo': 'सेट {title} से जुड़ा है।', 'studyGuide.goToSet': 'सेट पर जाएँ', 'auth.unlockTitle': 'Tracer अनलॉक करें', 'auth.password': 'पासवर्ड', 'auth.unlock': 'अनलॉक', 'auth.firstRunTitle': 'Tracer सेट करें', 'auth.name': 'नाम', 'auth.email': 'ईमेल', 'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
}

const ar: Messages = {
  'common.back': 'رجوع', 'common.cancel': 'إلغاء', 'common.change': 'تغيير', 'common.close': 'إغلاق', 'common.create': 'إنشاء', 'common.current': 'الحالي:', 'common.delete': 'حذف', 'common.dismiss': 'تجاهل', 'common.edit': 'تعديل', 'common.export': 'تصدير', 'common.import': 'استيراد', 'common.loading': 'جارٍ التحميل…', 'common.none': 'لا شيء', 'common.off': 'إيقاف', 'common.on': 'تشغيل', 'common.remove': 'إزالة', 'common.restart': 'إعادة البدء', 'common.save': 'حفظ', 'common.set': 'تعيين', 'common.update': 'تحديث', 'common.user': 'مستخدم',
  'nav.home': 'الرئيسية', 'nav.search': 'بحث', 'nav.searchPlaceholder': 'البحث في المجموعات وأدلة الدراسة…', 'nav.searchResults': 'نتائج البحث', 'nav.noResults': 'لا توجد نتائج.', 'nav.settings': 'الإعدادات',
  'settings.title': 'الإعدادات', 'settings.actionRequired': 'إجراء مطلوب', 'settings.profile': 'الملف الشخصي', 'settings.theme': 'المظهر', 'settings.darkMode': 'الوضع الداكن', 'settings.darkModeDescription': 'يؤثر في التطبيق كله ويستمر بعد إعادة التشغيل.', 'settings.language': 'اللغة', 'settings.languageDescription': 'يغيّر نصوص نظام Tracer فقط، ولا يترجم محتوى الدراسة.', 'settings.chooseLanguage': 'اختيار اللغة', 'settings.defaultModel': 'نموذج الذكاء الاصطناعي الافتراضي', 'settings.defaultModelDescription': 'مطلوب للتوليف والتوليد والدردشة.', 'settings.learnHybrid': 'التعلّم · هجين (معزز بالذكاء الاصطناعي)', 'settings.learnHybridDescription': 'يضيف أسئلة مولّدة بالذكاء الاصطناعي إلى الأسئلة الأساسية.', 'settings.chooseModelFirst': 'اختر نموذجًا افتراضيًا لتفعيل هذا الخيار.', 'settings.providers': 'المزوّدون', 'settings.providersDescription': 'تُحفظ المفاتيح والرموز في الخزنة.', 'settings.apiKey': 'مفتاح API', 'settings.startupLock': 'طلب كلمة المرور عند بدء التشغيل', 'settings.startupLockDescription': 'عند تعطيله، يُفتح Tracer تلقائيًا بسلسلة مفاتيح النظام.', 'settings.dangerZone': 'منطقة الخطر', 'settings.resetDescription': 'إعادة الضبط تحذف الخزنة وقاعدة البيانات المحلية.', 'settings.resetTracer': 'إعادة ضبط Tracer',
  'home.sets': 'المجموعات', 'home.subtitle': 'مجموعات بطاقاتك وأدلة الدراسة.', 'home.create': 'إنشاء', 'home.chooseMode': 'اختر وضعًا', 'home.noItems': 'لا توجد مجموعات أو أدلة بعد. استخدم إنشاء للبدء.', 'home.basic': 'أساسي', 'home.basicHint': 'البدء من الصفر', 'home.synthesize': 'توليف', 'home.synthesizeHint': 'دمج المجموعات', 'home.generate': 'توليد', 'home.generateHint': 'الإنشاء من مطالبة', 'home.studyGuide': 'دليل الدراسة', 'home.setKind': 'مجموعة',
  'create.title': 'العنوان', 'create.description': 'الوصف', 'create.cards': 'البطاقات', 'create.card': 'البطاقة {number}', 'create.term': 'المصطلح', 'create.definition': 'التعريف', 'create.addImage': 'إضافة صورة', 'create.basicTitle': 'إنشاء · أساسي', 'create.basicDescription': 'أضف البطاقات يدويًا. استخدم Tab للتنقل وCtrl/⌘ + Enter لإضافة بطاقة.', 'create.synthesizeTitle': 'إنشاء · توليف', 'create.synthesizeDescription': 'ادمج المجموعات الحالية في مجموعة جديدة.', 'create.generateTitle': 'إنشاء · توليد', 'create.generateDescription': 'أنشئ دليل دراسة وبطاقات من مصادرك.',
  'set.studyModes': 'أوضاع الدراسة', 'set.flashcards': 'البطاقات التعليمية', 'set.flashcardsHint': 'مراجعة سريعة', 'set.learn': 'تعلّم', 'set.learnHint': 'اختبر نفسك', 'set.match': 'مطابقة', 'set.matchHint': 'اعثر على الأزواج بسرعة', 'set.chat': 'دردشة', 'set.chatHint': 'مرتكزة على هذه المجموعة', 'set.studyGuide': 'دليل الدراسة', 'set.studyGuideHint': 'Markdown', 'set.terms': 'المصطلحات', 'set.shuffle': 'خلط', 'set.fullscreen': 'ملء الشاشة', 'set.starredOnly': 'المفضلة فقط', 'set.previous': 'السابق', 'set.next': 'التالي', 'set.missed': 'لم أعرفها', 'set.gotIt': 'عرفتها', 'set.ready': 'جاهز', 'set.start': 'بدء', 'set.memory': 'الذاكرة', 'set.backToSet': 'العودة إلى المجموعة',
  'studyGuide.title': 'دليل الدراسة', 'studyGuide.linkedTo': 'مرتبط بالمجموعة {title}.', 'studyGuide.goToSet': 'الانتقال إلى المجموعة', 'auth.unlockTitle': 'فتح Tracer', 'auth.password': 'كلمة المرور', 'auth.unlock': 'فتح', 'auth.firstRunTitle': 'إعداد Tracer', 'auth.name': 'الاسم', 'auth.email': 'البريد الإلكتروني', 'auth.confirmPassword': 'تأكيد كلمة المرور',
}

const de: Messages = {
  'common.back': 'Zurück', 'common.cancel': 'Abbrechen', 'common.change': 'Ändern', 'common.close': 'Schließen', 'common.create': 'Erstellen', 'common.current': 'Aktuell:', 'common.delete': 'Löschen', 'common.dismiss': 'Ausblenden', 'common.edit': 'Bearbeiten', 'common.export': 'Exportieren', 'common.import': 'Importieren', 'common.loading': 'Lädt…', 'common.none': 'Keine', 'common.off': 'Aus', 'common.on': 'Ein', 'common.remove': 'Entfernen', 'common.restart': 'Neu starten', 'common.save': 'Speichern', 'common.set': 'Festlegen', 'common.update': 'Aktualisieren', 'common.user': 'Benutzer',
  'nav.home': 'Start', 'nav.search': 'Suchen', 'nav.searchPlaceholder': 'Sets und Lernleitfäden durchsuchen…', 'nav.searchResults': 'Suchergebnisse', 'nav.noResults': 'Keine Ergebnisse.', 'nav.settings': 'Einstellungen',
  'settings.title': 'Einstellungen', 'settings.actionRequired': 'Aktion erforderlich', 'settings.profile': 'Profil', 'settings.theme': 'Design', 'settings.darkMode': 'Dunkelmodus', 'settings.darkModeDescription': 'Gilt für die gesamte App und bleibt nach einem Neustart erhalten.', 'settings.language': 'Sprache', 'settings.languageDescription': 'Ändert den Systemtext von Tracer. Lerninhalte werden nicht übersetzt.', 'settings.chooseLanguage': 'Sprache auswählen', 'settings.defaultModel': 'Standard-KI-Modell', 'settings.defaultModelDescription': 'Erforderlich für Synthetisieren, Generieren und Chat.', 'settings.learnHybrid': 'Lernen · Hybrid (KI-gestützt)', 'settings.learnHybridDescription': 'Ergänzt die Basis um KI-generierte Fragen.', 'settings.chooseModelFirst': 'Wähle zuerst ein Standard-KI-Modell.', 'settings.providers': 'Anbieter', 'settings.providersDescription': 'Schlüssel und Tokens werden im Tresor gespeichert.', 'settings.apiKey': 'API-Schlüssel', 'settings.startupLock': 'Passwort beim Start verlangen', 'settings.startupLockDescription': 'Wenn deaktiviert, entsperrt sich Tracer über den System-Schlüsselbund.', 'settings.dangerZone': 'Gefahrenbereich', 'settings.resetDescription': 'Zurücksetzen löscht Tresor und lokale Datenbank.', 'settings.resetTracer': 'Tracer zurücksetzen',
  'home.sets': 'Sets', 'home.subtitle': 'Deine Karteikarten-Sets und Lernleitfäden.', 'home.create': 'Erstellen', 'home.chooseMode': 'Modus auswählen', 'home.noItems': 'Noch keine Sets oder Lernleitfäden. Nutze Erstellen.', 'home.basic': 'Basis', 'home.basicHint': 'Neu beginnen', 'home.synthesize': 'Synthetisieren', 'home.synthesizeHint': 'Sets kombinieren', 'home.generate': 'Generieren', 'home.generateHint': 'Aus einer Eingabe erstellen', 'home.studyGuide': 'Lernleitfaden', 'home.setKind': 'Set',
  'create.title': 'Titel', 'create.description': 'Beschreibung', 'create.cards': 'Karten', 'create.card': 'Karte {number}', 'create.term': 'Begriff', 'create.definition': 'Definition', 'create.addImage': 'Bild hinzufügen', 'create.basicTitle': 'Erstellen · Basis', 'create.basicDescription': 'Karten manuell hinzufügen. Tab wechselt Felder, Strg/⌘ + Enter fügt eine Karte hinzu.', 'create.synthesizeTitle': 'Erstellen · Synthetisieren', 'create.synthesizeDescription': 'Vorhandene Sets zu einem neuen Set kombinieren.', 'create.generateTitle': 'Erstellen · Generieren', 'create.generateDescription': 'Lernleitfaden und Karten aus Quellen generieren.',
  'set.studyModes': 'Lernmodi', 'set.flashcards': 'Karteikarten', 'set.flashcardsHint': 'Schnelle Wiederholung', 'set.learn': 'Lernen', 'set.learnHint': 'Teste dich', 'set.match': 'Zuordnen', 'set.matchHint': 'Paare unter Zeitdruck finden', 'set.chat': 'Chat', 'set.chatHint': 'Auf diesem Set basierend', 'set.studyGuide': 'Lernleitfaden', 'set.studyGuideHint': 'Markdown', 'set.terms': 'Begriffe', 'set.shuffle': 'Mischen', 'set.fullscreen': 'Vollbild', 'set.starredOnly': 'Nur Favoriten', 'set.previous': 'Zurück', 'set.next': 'Weiter', 'set.missed': 'Nicht gewusst', 'set.gotIt': 'Gewusst', 'set.ready': 'Bereit', 'set.start': 'Start', 'set.memory': 'Memory', 'set.backToSet': 'Zurück zum Set',
  'studyGuide.title': 'Lernleitfaden', 'studyGuide.linkedTo': 'Mit Set {title} verknüpft.', 'studyGuide.goToSet': 'Zum Set', 'auth.unlockTitle': 'Tracer entsperren', 'auth.password': 'Passwort', 'auth.unlock': 'Entsperren', 'auth.firstRunTitle': 'Tracer einrichten', 'auth.name': 'Name', 'auth.email': 'E-Mail', 'auth.confirmPassword': 'Passwort bestätigen',
}

const ru: Messages = {
  'common.back': 'Назад', 'common.cancel': 'Отмена', 'common.change': 'Изменить', 'common.close': 'Закрыть', 'common.create': 'Создать', 'common.current': 'Текущая:', 'common.delete': 'Удалить', 'common.dismiss': 'Скрыть', 'common.edit': 'Изменить', 'common.export': 'Экспорт', 'common.import': 'Импорт', 'common.loading': 'Загрузка…', 'common.none': 'Нет', 'common.off': 'Выкл.', 'common.on': 'Вкл.', 'common.remove': 'Убрать', 'common.restart': 'Начать заново', 'common.save': 'Сохранить', 'common.set': 'Задать', 'common.update': 'Обновить', 'common.user': 'Пользователь',
  'nav.home': 'Главная', 'nav.search': 'Поиск', 'nav.searchPlaceholder': 'Поиск наборов и учебных руководств…', 'nav.searchResults': 'Результаты поиска', 'nav.noResults': 'Нет результатов.', 'nav.settings': 'Настройки',
  'settings.title': 'Настройки', 'settings.actionRequired': 'Требуется действие', 'settings.profile': 'Профиль', 'settings.theme': 'Тема', 'settings.darkMode': 'Тёмная тема', 'settings.darkModeDescription': 'Применяется ко всему приложению и сохраняется после перезапуска.', 'settings.language': 'Язык', 'settings.languageDescription': 'Меняет системный текст Tracer. Учебные материалы не переводятся.', 'settings.chooseLanguage': 'Выбрать язык', 'settings.defaultModel': 'Модель ИИ по умолчанию', 'settings.defaultModelDescription': 'Нужна для синтеза, генерации и чата.', 'settings.learnHybrid': 'Обучение · Гибридное (с ИИ)', 'settings.learnHybridDescription': 'Добавляет вопросы, созданные ИИ, к базовым.', 'settings.chooseModelFirst': 'Сначала выберите модель ИИ по умолчанию.', 'settings.providers': 'Провайдеры', 'settings.providersDescription': 'Ключи и токены хранятся в хранилище.', 'settings.apiKey': 'Ключ API', 'settings.startupLock': 'Запрашивать пароль при запуске', 'settings.startupLockDescription': 'Если выключено, Tracer разблокируется через системную связку ключей.', 'settings.dangerZone': 'Опасная зона', 'settings.resetDescription': 'Сброс удаляет хранилище и локальную базу данных.', 'settings.resetTracer': 'Сбросить Tracer',
  'home.sets': 'Наборы', 'home.subtitle': 'Ваши наборы карточек и учебные руководства.', 'home.create': 'Создать', 'home.chooseMode': 'Выберите режим', 'home.noItems': 'Наборов и руководств пока нет. Нажмите «Создать».', 'home.basic': 'Базовый', 'home.basicHint': 'Начать с нуля', 'home.synthesize': 'Синтез', 'home.synthesizeHint': 'Объединить наборы', 'home.generate': 'Генерация', 'home.generateHint': 'Создать по запросу', 'home.studyGuide': 'Учебное руководство', 'home.setKind': 'Набор',
  'create.title': 'Название', 'create.description': 'Описание', 'create.cards': 'Карточки', 'create.card': 'Карточка {number}', 'create.term': 'Термин', 'create.definition': 'Определение', 'create.addImage': 'Добавить изображение', 'create.basicTitle': 'Создать · Базовый', 'create.basicDescription': 'Добавляйте карточки вручную. Tab переключает поля, Ctrl/⌘ + Enter добавляет карточку.', 'create.synthesizeTitle': 'Создать · Синтез', 'create.synthesizeDescription': 'Объедините существующие наборы в новый.', 'create.generateTitle': 'Создать · Генерация', 'create.generateDescription': 'Создайте руководство и карточки из источников.',
  'set.studyModes': 'Режимы обучения', 'set.flashcards': 'Карточки', 'set.flashcardsHint': 'Быстрое повторение', 'set.learn': 'Обучение', 'set.learnHint': 'Проверьте себя', 'set.match': 'Соответствия', 'set.matchHint': 'Найдите пары на время', 'set.chat': 'Чат', 'set.chatHint': 'На основе этого набора', 'set.studyGuide': 'Учебное руководство', 'set.studyGuideHint': 'Markdown', 'set.terms': 'Термины', 'set.shuffle': 'Перемешать', 'set.fullscreen': 'Полный экран', 'set.starredOnly': 'Только избранные', 'set.previous': 'Назад', 'set.next': 'Далее', 'set.missed': 'Не знал', 'set.gotIt': 'Знал', 'set.ready': 'Готово', 'set.start': 'Начать', 'set.memory': 'Память', 'set.backToSet': 'К набору',
  'studyGuide.title': 'Учебное руководство', 'studyGuide.linkedTo': 'Связано с набором {title}.', 'studyGuide.goToSet': 'Перейти к набору', 'auth.unlockTitle': 'Разблокировать Tracer', 'auth.password': 'Пароль', 'auth.unlock': 'Разблокировать', 'auth.firstRunTitle': 'Настроить Tracer', 'auth.name': 'Имя', 'auth.email': 'Эл. почта', 'auth.confirmPassword': 'Подтвердите пароль',
}

const ja: Messages = {
  'common.back': '戻る', 'common.cancel': 'キャンセル', 'common.change': '変更', 'common.close': '閉じる', 'common.create': '作成', 'common.current': '現在：', 'common.delete': '削除', 'common.dismiss': '閉じる', 'common.edit': '編集', 'common.export': 'エクスポート', 'common.import': 'インポート', 'common.loading': '読み込み中…', 'common.none': 'なし', 'common.off': 'オフ', 'common.on': 'オン', 'common.remove': '削除', 'common.restart': 'やり直す', 'common.save': '保存', 'common.set': '設定', 'common.update': '更新', 'common.user': 'ユーザー',
  'nav.home': 'ホーム', 'nav.search': '検索', 'nav.searchPlaceholder': 'セットと学習ガイドを検索…', 'nav.searchResults': '検索結果', 'nav.noResults': '結果がありません。', 'nav.settings': '設定',
  'settings.title': '設定', 'settings.actionRequired': '操作が必要です', 'settings.profile': 'プロフィール', 'settings.theme': 'テーマ', 'settings.darkMode': 'ダークモード', 'settings.darkModeDescription': 'アプリ全体に適用され、再起動後も保持されます。', 'settings.language': '言語', 'settings.languageDescription': 'Tracer のシステム表示だけを変更します。学習内容は翻訳されません。', 'settings.chooseLanguage': '言語を選択', 'settings.defaultModel': '既定の AI モデル', 'settings.defaultModelDescription': '統合、生成、チャットに必要です。', 'settings.learnHybrid': '学習 · ハイブリッド（AI 強化）', 'settings.learnHybridDescription': '基本問題に AI 生成問題を追加します。', 'settings.chooseModelFirst': '先に既定の AI モデルを選択してください。', 'settings.providers': 'プロバイダー', 'settings.providersDescription': 'キーとトークンは保管庫に保存されます。', 'settings.apiKey': 'API キー', 'settings.startupLock': '起動時にパスワードを要求', 'settings.startupLockDescription': 'オフの場合、Tracer はシステムキーチェーンで自動解除されます。', 'settings.dangerZone': '危険な操作', 'settings.resetDescription': 'リセットすると保管庫とローカルデータベースが削除されます。', 'settings.resetTracer': 'Tracer をリセット',
  'home.sets': 'セット', 'home.subtitle': 'フラッシュカードセットと学習ガイド。', 'home.create': '作成', 'home.chooseMode': 'モードを選択', 'home.noItems': 'セットやガイドはまだありません。「作成」から始めてください。', 'home.basic': '基本', 'home.basicHint': '一から作成', 'home.synthesize': '統合', 'home.synthesizeHint': 'セットを結合', 'home.generate': '生成', 'home.generateHint': 'プロンプトから作成', 'home.studyGuide': '学習ガイド', 'home.setKind': 'セット',
  'create.title': 'タイトル', 'create.description': '説明', 'create.cards': 'カード', 'create.card': 'カード {number}', 'create.term': '用語', 'create.definition': '定義', 'create.addImage': '画像を追加', 'create.basicTitle': '作成 · 基本', 'create.basicDescription': 'カードを手動で追加します。Tab で移動し、Ctrl/⌘ + Enter でカードを追加します。', 'create.synthesizeTitle': '作成 · 統合', 'create.synthesizeDescription': '既存のセットを新しいセットにまとめます。', 'create.generateTitle': '作成 · 生成', 'create.generateDescription': '資料から学習ガイドとカードを生成します。',
  'set.studyModes': '学習モード', 'set.flashcards': 'フラッシュカード', 'set.flashcardsHint': 'クイック復習', 'set.learn': '学習', 'set.learnHint': '理解度を確認', 'set.match': 'マッチ', 'set.matchHint': '時間内にペアを探す', 'set.chat': 'チャット', 'set.chatHint': 'このセットに基づく', 'set.studyGuide': '学習ガイド', 'set.studyGuideHint': 'Markdown', 'set.terms': '用語', 'set.shuffle': 'シャッフル', 'set.fullscreen': '全画面', 'set.starredOnly': 'お気に入りのみ', 'set.previous': '前へ', 'set.next': '次へ', 'set.missed': '不正解', 'set.gotIt': '正解', 'set.ready': '準備完了', 'set.start': '開始', 'set.memory': 'メモリー', 'set.backToSet': 'セットに戻る',
  'studyGuide.title': '学習ガイド', 'studyGuide.linkedTo': 'セット {title} にリンクされています。', 'studyGuide.goToSet': 'セットへ移動', 'auth.unlockTitle': 'Tracer をロック解除', 'auth.password': 'パスワード', 'auth.unlock': 'ロック解除', 'auth.firstRunTitle': 'Tracer を設定', 'auth.name': '名前', 'auth.email': 'メール', 'auth.confirmPassword': 'パスワードを確認',
}

const ko: Messages = {
  'common.back': '뒤로', 'common.cancel': '취소', 'common.change': '변경', 'common.close': '닫기', 'common.create': '만들기', 'common.current': '현재:', 'common.delete': '삭제', 'common.dismiss': '닫기', 'common.edit': '편집', 'common.export': '내보내기', 'common.import': '가져오기', 'common.loading': '불러오는 중…', 'common.none': '없음', 'common.off': '끔', 'common.on': '켬', 'common.remove': '제거', 'common.restart': '다시 시작', 'common.save': '저장', 'common.set': '설정', 'common.update': '업데이트', 'common.user': '사용자',
  'nav.home': '홈', 'nav.search': '검색', 'nav.searchPlaceholder': '세트 및 학습 가이드 검색…', 'nav.searchResults': '검색 결과', 'nav.noResults': '결과가 없습니다.', 'nav.settings': '설정',
  'settings.title': '설정', 'settings.actionRequired': '조치 필요', 'settings.profile': '프로필', 'settings.theme': '테마', 'settings.darkMode': '다크 모드', 'settings.darkModeDescription': '앱 전체에 적용되며 다시 시작해도 유지됩니다.', 'settings.language': '언어', 'settings.languageDescription': 'Tracer 시스템 텍스트만 변경합니다. 학습 콘텐츠는 번역하지 않습니다.', 'settings.chooseLanguage': '언어 선택', 'settings.defaultModel': '기본 AI 모델', 'settings.defaultModelDescription': '합성, 생성, 채팅에 필요합니다.', 'settings.learnHybrid': '학습 · 하이브리드(AI 보강)', 'settings.learnHybridDescription': '기본 문제에 AI 생성 문제를 추가합니다.', 'settings.chooseModelFirst': '먼저 기본 AI 모델을 선택하세요.', 'settings.providers': '제공업체', 'settings.providersDescription': '키와 토큰은 보관함에 저장됩니다.', 'settings.apiKey': 'API 키', 'settings.startupLock': '시작할 때 비밀번호 요구', 'settings.startupLockDescription': '끄면 Tracer가 시스템 키체인으로 자동 잠금 해제됩니다.', 'settings.dangerZone': '위험 구역', 'settings.resetDescription': '초기화하면 보관함과 로컬 데이터베이스가 삭제됩니다.', 'settings.resetTracer': 'Tracer 초기화',
  'home.sets': '세트', 'home.subtitle': '플래시카드 세트와 학습 가이드.', 'home.create': '만들기', 'home.chooseMode': '모드 선택', 'home.noItems': '아직 세트나 가이드가 없습니다. 만들기로 시작하세요.', 'home.basic': '기본', 'home.basicHint': '처음부터 시작', 'home.synthesize': '합성', 'home.synthesizeHint': '세트 결합', 'home.generate': '생성', 'home.generateHint': '프롬프트로 만들기', 'home.studyGuide': '학습 가이드', 'home.setKind': '세트',
  'create.title': '제목', 'create.description': '설명', 'create.cards': '카드', 'create.card': '카드 {number}', 'create.term': '용어', 'create.definition': '정의', 'create.addImage': '이미지 추가', 'create.basicTitle': '만들기 · 기본', 'create.basicDescription': '카드를 직접 추가합니다. Tab으로 이동하고 Ctrl/⌘ + Enter로 카드를 추가합니다.', 'create.synthesizeTitle': '만들기 · 합성', 'create.synthesizeDescription': '기존 세트를 새 세트로 결합합니다.', 'create.generateTitle': '만들기 · 생성', 'create.generateDescription': '자료에서 학습 가이드와 카드를 생성합니다.',
  'set.studyModes': '학습 모드', 'set.flashcards': '플래시카드', 'set.flashcardsHint': '빠른 복습', 'set.learn': '학습', 'set.learnHint': '스스로 테스트', 'set.match': '맞추기', 'set.matchHint': '시간 안에 짝 찾기', 'set.chat': '채팅', 'set.chatHint': '이 세트를 기반으로 함', 'set.studyGuide': '학습 가이드', 'set.studyGuideHint': 'Markdown', 'set.terms': '용어', 'set.shuffle': '섞기', 'set.fullscreen': '전체 화면', 'set.starredOnly': '즐겨찾기만', 'set.previous': '이전', 'set.next': '다음', 'set.missed': '틀림', 'set.gotIt': '맞음', 'set.ready': '준비', 'set.start': '시작', 'set.memory': '메모리', 'set.backToSet': '세트로 돌아가기',
  'studyGuide.title': '학습 가이드', 'studyGuide.linkedTo': '세트 {title}에 연결됨.', 'studyGuide.goToSet': '세트로 이동', 'auth.unlockTitle': 'Tracer 잠금 해제', 'auth.password': '비밀번호', 'auth.unlock': '잠금 해제', 'auth.firstRunTitle': 'Tracer 설정', 'auth.name': '이름', 'auth.email': '이메일', 'auth.confirmPassword': '비밀번호 확인',
}

const supplementalMessages: Record<AppLanguage, Messages> = {
  en: {
    'common.add': 'Add', 'common.results': 'Results', 'common.optional': 'optional', 'common.status': 'Status:', 'common.authenticated': 'Authenticated', 'common.notAuthenticated': 'Not authenticated', 'common.invalid': 'Token invalid', 'common.locked': 'Vault locked', 'common.retry': 'Retry', 'common.continue': 'Continue', 'common.true': 'True', 'common.false': 'False',
    'common.clear': 'Clear', 'common.copy': 'Copy', 'common.download': 'Download', 'common.selectAll': 'Select all', 'common.confirm': 'Confirm', 'common.authenticate': 'Authenticate', 'common.signOut': 'Sign out', 'set.noStarred': 'No starred cards', 'set.comingSoon': 'Coming soon', 'set.notImplemented': 'This mode is not implemented yet.', 'set.noCards': 'No cards.', 'auth.firstRunDescription': 'Create your profile and set an app password.',
    'create.sourceSets': 'Source sets', 'create.searchSetsPlaceholder': 'Search sets…', 'create.searchAndSelect': 'Search and select one or more sets to merge.', 'create.selected': 'Selected', 'create.theme': 'Theme', 'create.aiOutput': 'AI output', 'create.rawOutput': 'Raw output', 'create.sources': 'Sources', 'create.instructions': 'Instructions', 'create.pdfPages': 'PDF pages', 'create.images': 'Images', 'create.files': 'Files',
    'set.flashcardInstructions': 'Space to flip · ←/→ to browse · Mark correct/incorrect to progress', 'set.learnInstructions': 'Answer questions · Results tracked per run', 'set.matchInstructions': 'Match the pairs', 'set.accuracy': 'Accuracy:', 'set.correct': 'Correct:', 'set.attempted': 'Attempted:', 'set.matched': 'Matched:', 'set.attempts': 'Attempts:', 'set.time': 'Time:', 'set.playAgain': 'Play again', 'set.noQuestions': 'No questions available.', 'set.question': 'Question', 'set.tile': 'Tile',
    'settings.githubAuthenticate': 'Authenticate to use GitHub Models.', 'settings.clearApiKey': 'Clear API key?', 'settings.deviceCode': 'Device code', 'edit.deleteSet': 'Delete set?',
  },
  es: {
    'set.learning': 'Aprendiendo', 'set.mastered': 'Dominadas', 'set.resumeIncorrect': 'Reanudar tarjetas falladas',
    'common.add': 'Añadir', 'common.results': 'Resultados', 'common.optional': 'opcional', 'common.status': 'Estado:', 'common.authenticated': 'Autenticado', 'common.notAuthenticated': 'Sin autenticar', 'common.invalid': 'Token no válido', 'common.locked': 'Bóveda bloqueada', 'common.retry': 'Reintentar', 'common.continue': 'Continuar', 'common.true': 'Verdadero', 'common.false': 'Falso',
    'common.clear': 'Limpiar', 'common.copy': 'Copiar', 'common.download': 'Descargar', 'common.selectAll': 'Seleccionar todo', 'common.confirm': 'Confirmar', 'common.authenticate': 'Autenticar', 'common.signOut': 'Cerrar sesión', 'set.noStarred': 'No hay tarjetas favoritas', 'set.comingSoon': 'Próximamente', 'set.notImplemented': 'Este modo aún no está implementado.', 'set.noCards': 'No hay tarjetas.', 'auth.firstRunDescription': 'Crea tu perfil y establece una contraseña para la aplicación.',
    'create.sourceSets': 'Conjuntos de origen', 'create.searchSetsPlaceholder': 'Buscar conjuntos…', 'create.searchAndSelect': 'Busca y selecciona uno o más conjuntos para combinar.', 'create.selected': 'Seleccionados', 'create.theme': 'Tema', 'create.aiOutput': 'Salida de IA', 'create.rawOutput': 'Salida sin procesar', 'create.sources': 'Fuentes', 'create.instructions': 'Instrucciones', 'create.pdfPages': 'Páginas PDF', 'create.images': 'Imágenes', 'create.files': 'Archivos',
    'set.flashcardInstructions': 'Espacio para girar · ←/→ para navegar · Marca correcto o incorrecto', 'set.learnInstructions': 'Responde preguntas · Resultados por sesión', 'set.matchInstructions': 'Empareja las parejas', 'set.accuracy': 'Precisión:', 'set.correct': 'Correctas:', 'set.attempted': 'Intentos:', 'set.matched': 'Emparejadas:', 'set.attempts': 'Intentos:', 'set.time': 'Tiempo:', 'set.playAgain': 'Jugar de nuevo', 'set.noQuestions': 'No hay preguntas disponibles.', 'set.question': 'Pregunta', 'set.tile': 'Ficha',
    'settings.githubAuthenticate': 'Autentícate para usar GitHub Models.', 'settings.clearApiKey': '¿Borrar la clave API?', 'settings.deviceCode': 'Código del dispositivo', 'edit.deleteSet': '¿Eliminar el conjunto?',
  },
  fr: {
    'set.learning': 'En apprentissage', 'set.mastered': 'Maîtrisées', 'set.resumeIncorrect': 'Reprendre les cartes manquées',
    'common.add': 'Ajouter', 'common.results': 'Résultats', 'common.optional': 'facultatif', 'common.status': 'État :', 'common.authenticated': 'Authentifié', 'common.notAuthenticated': 'Non authentifié', 'common.invalid': 'Jeton invalide', 'common.locked': 'Coffre verrouillé', 'common.retry': 'Réessayer', 'common.continue': 'Continuer', 'common.true': 'Vrai', 'common.false': 'Faux',
    'common.clear': 'Effacer', 'common.copy': 'Copier', 'common.download': 'Télécharger', 'common.selectAll': 'Tout sélectionner', 'common.confirm': 'Confirmer', 'common.authenticate': 'S’authentifier', 'common.signOut': 'Se déconnecter', 'set.noStarred': 'Aucune carte favorite', 'set.comingSoon': 'Bientôt disponible', 'set.notImplemented': 'Ce mode n’est pas encore disponible.', 'set.noCards': 'Aucune carte.', 'auth.firstRunDescription': 'Créez votre profil et définissez un mot de passe.',
    'create.sourceSets': 'Ensembles sources', 'create.searchSetsPlaceholder': 'Rechercher des ensembles…', 'create.searchAndSelect': 'Recherchez et sélectionnez les ensembles à fusionner.', 'create.selected': 'Sélectionnés', 'create.theme': 'Thème', 'create.aiOutput': 'Sortie IA', 'create.rawOutput': 'Sortie brute', 'create.sources': 'Sources', 'create.instructions': 'Instructions', 'create.pdfPages': 'Pages PDF', 'create.images': 'Images', 'create.files': 'Fichiers',
    'set.flashcardInstructions': 'Espace pour retourner · ←/→ pour naviguer · Marquez juste ou faux', 'set.learnInstructions': 'Répondez aux questions · Résultats par session', 'set.matchInstructions': 'Associez les paires', 'set.accuracy': 'Précision :', 'set.correct': 'Correct :', 'set.attempted': 'Tentatives :', 'set.matched': 'Associées :', 'set.attempts': 'Tentatives :', 'set.time': 'Temps :', 'set.playAgain': 'Rejouer', 'set.noQuestions': 'Aucune question disponible.', 'set.question': 'Question', 'set.tile': 'Tuile',
    'settings.githubAuthenticate': 'Authentifiez-vous pour utiliser GitHub Models.', 'settings.clearApiKey': 'Effacer la clé API ?', 'settings.deviceCode': 'Code appareil', 'edit.deleteSet': 'Supprimer l’ensemble ?',
  },
  'zh-CN': {
    'set.learning': '学习中', 'set.mastered': '已掌握', 'set.resumeIncorrect': '继续复习错题',
    'common.add': '添加', 'common.results': '结果', 'common.optional': '可选', 'common.status': '状态：', 'common.authenticated': '已认证', 'common.notAuthenticated': '未认证', 'common.invalid': '令牌无效', 'common.locked': '保险库已锁定', 'common.retry': '重试', 'common.continue': '继续', 'common.true': '正确', 'common.false': '错误',
    'common.clear': '清除', 'common.copy': '复制', 'common.download': '下载', 'common.selectAll': '全选', 'common.confirm': '确认', 'common.authenticate': '认证', 'common.signOut': '退出登录', 'set.noStarred': '没有收藏的卡片', 'set.comingSoon': '即将推出', 'set.notImplemented': '此模式尚未实现。', 'set.noCards': '没有卡片。', 'auth.firstRunDescription': '创建个人资料并设置应用密码。',
    'create.sourceSets': '来源卡片集', 'create.searchSetsPlaceholder': '搜索卡片集…', 'create.searchAndSelect': '搜索并选择一个或多个要合并的卡片集。', 'create.selected': '已选择', 'create.theme': '主题', 'create.aiOutput': 'AI 输出', 'create.rawOutput': '原始输出', 'create.sources': '资料来源', 'create.instructions': '说明', 'create.pdfPages': 'PDF 页数', 'create.images': '图片', 'create.files': '文件',
    'set.flashcardInstructions': '空格翻面 · ←/→ 浏览 · 标记正确或错误', 'set.learnInstructions': '回答问题 · 每轮记录结果', 'set.matchInstructions': '匹配成对内容 · 使用记忆模式切换', 'set.accuracy': '正确率：', 'set.correct': '正确：', 'set.attempted': '已答：', 'set.matched': '已匹配：', 'set.attempts': '尝试：', 'set.time': '时间：', 'set.playAgain': '再玩一次', 'set.noQuestions': '没有可用问题。', 'set.question': '问题', 'set.tile': '方块',
    'settings.githubAuthenticate': '认证后使用 GitHub Models。', 'settings.clearApiKey': '清除 API 密钥？', 'settings.deviceCode': '设备代码', 'edit.deleteSet': '删除卡片集？',
  },
  hi: {
    'set.learning': 'सीख रहे हैं', 'set.mastered': 'महारत हासिल', 'set.resumeIncorrect': 'छूटे कार्ड फिर से देखें',
    'common.add': 'जोड़ें', 'common.results': 'परिणाम', 'common.optional': 'वैकल्पिक', 'common.status': 'स्थिति:', 'common.authenticated': 'प्रमाणित', 'common.notAuthenticated': 'प्रमाणित नहीं', 'common.invalid': 'टोकन अमान्य', 'common.locked': 'वॉल्ट लॉक है', 'common.retry': 'फिर प्रयास करें', 'common.continue': 'जारी रखें', 'common.true': 'सही', 'common.false': 'गलत',
    'common.clear': 'साफ़ करें', 'common.copy': 'कॉपी करें', 'common.download': 'डाउनलोड', 'common.selectAll': 'सभी चुनें', 'common.confirm': 'पुष्टि करें', 'common.authenticate': 'प्रमाणित करें', 'common.signOut': 'साइन आउट', 'set.noStarred': 'कोई पसंदीदा कार्ड नहीं', 'set.comingSoon': 'जल्द आ रहा है', 'set.notImplemented': 'यह मोड अभी उपलब्ध नहीं है।', 'set.noCards': 'कोई कार्ड नहीं।', 'auth.firstRunDescription': 'अपनी प्रोफ़ाइल बनाएँ और ऐप पासवर्ड सेट करें।',
    'create.sourceSets': 'स्रोत सेट', 'create.searchSetsPlaceholder': 'सेट खोजें…', 'create.searchAndSelect': 'मिलाने के लिए एक या अधिक सेट चुनें।', 'create.selected': 'चुने गए', 'create.theme': 'विषय', 'create.aiOutput': 'AI आउटपुट', 'create.rawOutput': 'मूल आउटपुट', 'create.sources': 'स्रोत', 'create.instructions': 'निर्देश', 'create.pdfPages': 'PDF पृष्ठ', 'create.images': 'चित्र', 'create.files': 'फ़ाइलें',
    'set.flashcardInstructions': 'पलटने के लिए Space · देखने के लिए ←/→ · सही या गलत चिह्नित करें', 'set.learnInstructions': 'प्रश्नों के उत्तर दें · हर दौर के परिणाम', 'set.matchInstructions': 'जोड़ियाँ मिलाएँ', 'set.accuracy': 'सटीकता:', 'set.correct': 'सही:', 'set.attempted': 'प्रयास:', 'set.matched': 'मिले:', 'set.attempts': 'प्रयास:', 'set.time': 'समय:', 'set.playAgain': 'फिर खेलें', 'set.noQuestions': 'कोई प्रश्न उपलब्ध नहीं।', 'set.question': 'प्रश्न', 'set.tile': 'टाइल',
    'settings.githubAuthenticate': 'GitHub Models के लिए प्रमाणित करें।', 'settings.clearApiKey': 'API कुंजी साफ़ करें?', 'settings.deviceCode': 'डिवाइस कोड', 'edit.deleteSet': 'सेट हटाएँ?',
  },
  ar: {
    'set.learning': 'قيد التعلم', 'set.mastered': 'تم إتقانها', 'set.resumeIncorrect': 'متابعة البطاقات الخاطئة',
    'common.add': 'إضافة', 'common.results': 'النتائج', 'common.optional': 'اختياري', 'common.status': 'الحالة:', 'common.authenticated': 'تمت المصادقة', 'common.notAuthenticated': 'غير مصادق', 'common.invalid': 'الرمز غير صالح', 'common.locked': 'الخزنة مقفلة', 'common.retry': 'إعادة المحاولة', 'common.continue': 'متابعة', 'common.true': 'صحيح', 'common.false': 'خطأ',
    'common.clear': 'مسح', 'common.copy': 'نسخ', 'common.download': 'تنزيل', 'common.selectAll': 'تحديد الكل', 'common.confirm': 'تأكيد', 'common.authenticate': 'مصادقة', 'common.signOut': 'تسجيل الخروج', 'set.noStarred': 'لا توجد بطاقات مفضلة', 'set.comingSoon': 'قريبًا', 'set.notImplemented': 'هذا الوضع غير متاح بعد.', 'set.noCards': 'لا توجد بطاقات.', 'auth.firstRunDescription': 'أنشئ ملفك الشخصي وعيّن كلمة مرور للتطبيق.',
    'create.sourceSets': 'المجموعات المصدر', 'create.searchSetsPlaceholder': 'البحث في المجموعات…', 'create.searchAndSelect': 'ابحث وحدد مجموعة أو أكثر لدمجها.', 'create.selected': 'المحدد', 'create.theme': 'الموضوع', 'create.aiOutput': 'مخرجات الذكاء الاصطناعي', 'create.rawOutput': 'المخرجات الخام', 'create.sources': 'المصادر', 'create.instructions': 'التعليمات', 'create.pdfPages': 'صفحات PDF', 'create.images': 'الصور', 'create.files': 'الملفات',
    'set.flashcardInstructions': 'مسافة للقلب · ←/→ للتصفح · حدّد صحيح أو خطأ', 'set.learnInstructions': 'أجب عن الأسئلة · تُتبع النتائج لكل جولة', 'set.matchInstructions': 'طابق الأزواج', 'set.accuracy': 'الدقة:', 'set.correct': 'صحيح:', 'set.attempted': 'المحاولات:', 'set.matched': 'المطابق:', 'set.attempts': 'المحاولات:', 'set.time': 'الوقت:', 'set.playAgain': 'اللعب مجددًا', 'set.noQuestions': 'لا توجد أسئلة.', 'set.question': 'السؤال', 'set.tile': 'بطاقة',
    'settings.githubAuthenticate': 'صادق لاستخدام GitHub Models.', 'settings.clearApiKey': 'مسح مفتاح API؟', 'settings.deviceCode': 'رمز الجهاز', 'edit.deleteSet': 'حذف المجموعة؟',
  },
  de: {
    'set.learning': 'Lernen', 'set.mastered': 'Gemeistert', 'set.resumeIncorrect': 'Fehlerhafte Karten fortsetzen',
    'common.add': 'Hinzufügen', 'common.results': 'Ergebnisse', 'common.optional': 'optional', 'common.status': 'Status:', 'common.authenticated': 'Authentifiziert', 'common.notAuthenticated': 'Nicht authentifiziert', 'common.invalid': 'Token ungültig', 'common.locked': 'Tresor gesperrt', 'common.retry': 'Erneut versuchen', 'common.continue': 'Weiter', 'common.true': 'Wahr', 'common.false': 'Falsch',
    'common.clear': 'Leeren', 'common.copy': 'Kopieren', 'common.download': 'Herunterladen', 'common.selectAll': 'Alles auswählen', 'common.confirm': 'Bestätigen', 'common.authenticate': 'Authentifizieren', 'common.signOut': 'Abmelden', 'set.noStarred': 'Keine Favoriten', 'set.comingSoon': 'Demnächst', 'set.notImplemented': 'Dieser Modus ist noch nicht verfügbar.', 'set.noCards': 'Keine Karten.', 'auth.firstRunDescription': 'Erstelle dein Profil und lege ein App-Passwort fest.',
    'create.sourceSets': 'Quell-Sets', 'create.searchSetsPlaceholder': 'Sets durchsuchen…', 'create.searchAndSelect': 'Sets zum Zusammenführen suchen und auswählen.', 'create.selected': 'Ausgewählt', 'create.theme': 'Thema', 'create.aiOutput': 'KI-Ausgabe', 'create.rawOutput': 'Rohausgabe', 'create.sources': 'Quellen', 'create.instructions': 'Anweisungen', 'create.pdfPages': 'PDF-Seiten', 'create.images': 'Bilder', 'create.files': 'Dateien',
    'set.flashcardInstructions': 'Leertaste zum Wenden · ←/→ zum Blättern · Richtig oder falsch markieren', 'set.learnInstructions': 'Fragen beantworten · Ergebnisse pro Runde', 'set.matchInstructions': 'Paare zuordnen', 'set.accuracy': 'Genauigkeit:', 'set.correct': 'Richtig:', 'set.attempted': 'Versucht:', 'set.matched': 'Zugeordnet:', 'set.attempts': 'Versuche:', 'set.time': 'Zeit:', 'set.playAgain': 'Noch einmal', 'set.noQuestions': 'Keine Fragen verfügbar.', 'set.question': 'Frage', 'set.tile': 'Kachel',
    'settings.githubAuthenticate': 'Für GitHub Models authentifizieren.', 'settings.clearApiKey': 'API-Schlüssel löschen?', 'settings.deviceCode': 'Gerätecode', 'edit.deleteSet': 'Set löschen?',
  },
  ru: {
    'set.learning': 'Изучаются', 'set.mastered': 'Освоены', 'set.resumeIncorrect': 'Продолжить пропущенные карточки',
    'common.add': 'Добавить', 'common.results': 'Результаты', 'common.optional': 'необязательно', 'common.status': 'Статус:', 'common.authenticated': 'Выполнен вход', 'common.notAuthenticated': 'Вход не выполнен', 'common.invalid': 'Токен недействителен', 'common.locked': 'Хранилище заблокировано', 'common.retry': 'Повторить', 'common.continue': 'Продолжить', 'common.true': 'Верно', 'common.false': 'Неверно',
    'common.clear': 'Очистить', 'common.copy': 'Копировать', 'common.download': 'Скачать', 'common.selectAll': 'Выбрать всё', 'common.confirm': 'Подтвердить', 'common.authenticate': 'Войти', 'common.signOut': 'Выйти', 'set.noStarred': 'Нет избранных карточек', 'set.comingSoon': 'Скоро', 'set.notImplemented': 'Этот режим ещё не реализован.', 'set.noCards': 'Нет карточек.', 'auth.firstRunDescription': 'Создайте профиль и задайте пароль приложения.',
    'create.sourceSets': 'Исходные наборы', 'create.searchSetsPlaceholder': 'Поиск наборов…', 'create.searchAndSelect': 'Найдите и выберите наборы для объединения.', 'create.selected': 'Выбрано', 'create.theme': 'Тема', 'create.aiOutput': 'Ответ ИИ', 'create.rawOutput': 'Исходный ответ', 'create.sources': 'Источники', 'create.instructions': 'Инструкции', 'create.pdfPages': 'Страницы PDF', 'create.images': 'Изображения', 'create.files': 'Файлы',
    'set.flashcardInstructions': 'Пробел — перевернуть · ←/→ — листать · Отметьте результат', 'set.learnInstructions': 'Отвечайте на вопросы · Результаты каждой сессии', 'set.matchInstructions': 'Найдите пары', 'set.accuracy': 'Точность:', 'set.correct': 'Верно:', 'set.attempted': 'Попытки:', 'set.matched': 'Найдено:', 'set.attempts': 'Попытки:', 'set.time': 'Время:', 'set.playAgain': 'Играть снова', 'set.noQuestions': 'Нет доступных вопросов.', 'set.question': 'Вопрос', 'set.tile': 'Плитка',
    'settings.githubAuthenticate': 'Войдите для использования GitHub Models.', 'settings.clearApiKey': 'Удалить ключ API?', 'settings.deviceCode': 'Код устройства', 'edit.deleteSet': 'Удалить набор?',
  },
  ja: {
    'set.learning': '学習中', 'set.mastered': '習得済み', 'set.resumeIncorrect': '間違えたカードを続ける',
    'common.add': '追加', 'common.results': '結果', 'common.optional': '任意', 'common.status': '状態：', 'common.authenticated': '認証済み', 'common.notAuthenticated': '未認証', 'common.invalid': 'トークンが無効', 'common.locked': '保管庫はロック中', 'common.retry': '再試行', 'common.continue': '続行', 'common.true': '正しい', 'common.false': '誤り',
    'common.clear': 'クリア', 'common.copy': 'コピー', 'common.download': 'ダウンロード', 'common.selectAll': 'すべて選択', 'common.confirm': '確認', 'common.authenticate': '認証', 'common.signOut': 'サインアウト', 'set.noStarred': 'お気に入りのカードはありません', 'set.comingSoon': '近日公開', 'set.notImplemented': 'このモードはまだ実装されていません。', 'set.noCards': 'カードがありません。', 'auth.firstRunDescription': 'プロフィールを作成し、アプリのパスワードを設定します。',
    'create.sourceSets': '元のセット', 'create.searchSetsPlaceholder': 'セットを検索…', 'create.searchAndSelect': '結合するセットを検索して選択します。', 'create.selected': '選択済み', 'create.theme': 'テーマ', 'create.aiOutput': 'AI 出力', 'create.rawOutput': '生の出力', 'create.sources': '資料', 'create.instructions': '指示', 'create.pdfPages': 'PDF ページ', 'create.images': '画像', 'create.files': 'ファイル',
    'set.flashcardInstructions': 'Space で反転 · ←/→ で移動 · 正誤を記録', 'set.learnInstructions': '質問に回答 · セッションごとに結果を記録', 'set.matchInstructions': 'ペアを合わせる', 'set.accuracy': '正答率：', 'set.correct': '正解：', 'set.attempted': '回答済み：', 'set.matched': '一致：', 'set.attempts': '試行：', 'set.time': '時間：', 'set.playAgain': 'もう一度', 'set.noQuestions': '利用できる質問がありません。', 'set.question': '質問', 'set.tile': 'タイル',
    'settings.githubAuthenticate': 'GitHub Models を使用するには認証してください。', 'settings.clearApiKey': 'API キーを消去しますか？', 'settings.deviceCode': 'デバイスコード', 'edit.deleteSet': 'セットを削除しますか？',
  },
  ko: {
    'set.learning': '학습 중', 'set.mastered': '마스터함', 'set.resumeIncorrect': '틀린 카드 계속하기',
    'common.add': '추가', 'common.results': '결과', 'common.optional': '선택 사항', 'common.status': '상태:', 'common.authenticated': '인증됨', 'common.notAuthenticated': '인증되지 않음', 'common.invalid': '토큰이 유효하지 않음', 'common.locked': '보관함 잠김', 'common.retry': '다시 시도', 'common.continue': '계속', 'common.true': '참', 'common.false': '거짓',
    'common.clear': '지우기', 'common.copy': '복사', 'common.download': '다운로드', 'common.selectAll': '모두 선택', 'common.confirm': '확인', 'common.authenticate': '인증', 'common.signOut': '로그아웃', 'set.noStarred': '즐겨찾기 카드가 없습니다', 'set.comingSoon': '출시 예정', 'set.notImplemented': '이 모드는 아직 구현되지 않았습니다.', 'set.noCards': '카드가 없습니다.', 'auth.firstRunDescription': '프로필을 만들고 앱 비밀번호를 설정하세요.',
    'create.sourceSets': '원본 세트', 'create.searchSetsPlaceholder': '세트 검색…', 'create.searchAndSelect': '결합할 세트를 검색하고 선택하세요.', 'create.selected': '선택됨', 'create.theme': '주제', 'create.aiOutput': 'AI 출력', 'create.rawOutput': '원본 출력', 'create.sources': '자료', 'create.instructions': '지침', 'create.pdfPages': 'PDF 페이지', 'create.images': '이미지', 'create.files': '파일',
    'set.flashcardInstructions': 'Space로 뒤집기 · ←/→로 이동 · 정답 여부 표시', 'set.learnInstructions': '질문에 답하기 · 실행별 결과 기록', 'set.matchInstructions': '짝 맞추기', 'set.accuracy': '정확도:', 'set.correct': '정답:', 'set.attempted': '시도:', 'set.matched': '맞춘 수:', 'set.attempts': '시도:', 'set.time': '시간:', 'set.playAgain': '다시 하기', 'set.noQuestions': '사용 가능한 질문이 없습니다.', 'set.question': '질문', 'set.tile': '타일',
    'settings.githubAuthenticate': 'GitHub Models를 사용하려면 인증하세요.', 'settings.clearApiKey': 'API 키를 지울까요?', 'settings.deviceCode': '기기 코드', 'edit.deleteSet': '세트를 삭제할까요?',
  },
}

const detailMessages: Record<AppLanguage, Messages> = {
  en: {
    'common.choose': 'Choose', 'common.select': 'Select', 'common.enter': 'Enter',
    'create.themeHint': 'A hint for the synthesis focus (for example: exam 2, core concepts, definitions only).', 'create.themePlaceholder': 'Theme…', 'create.generatedSetPlaceholder': 'Generated set…', 'create.instructionsPlaceholder': 'For example: focus on key definitions and common exam questions', 'create.sourceLimits': 'Limits: up to {pages} PDF pages total and {images} images.', 'create.chooseFiles': 'Choose files', 'create.checking': 'Checking…', 'create.parsing': 'Parsing…', 'create.generating': 'Generating…',
    'set.synthesizedFrom': 'Synthesized from:', 'set.termLabel': 'Term:', 'set.definitionLabel': 'Definition:', 'set.filterTerms': 'Filter terms', 'set.filterAll': 'All', 'set.filterStarred': 'Starred', 'set.filterUnstarred': 'Unstarred', 'set.flashcardSettings': 'Flashcard settings', 'set.definitionAtFront': 'Definition at front', 'set.termAtFront': 'Term at front',
    'settings.compatible': 'Compatible', 'settings.advanced': 'Advanced', 'settings.baseUrl': 'Base URL', 'settings.configured': 'configured', 'settings.apiKeySet': 'API key set', 'settings.models': 'Models', 'settings.backToProviders': 'Back to providers',
  },
  es: {
    'common.choose': 'Elegir', 'common.select': 'Seleccionar', 'common.enter': 'Entrar',
    'create.themeHint': 'Una pista para orientar la síntesis (por ejemplo: examen 2, conceptos clave, solo definiciones).', 'create.themePlaceholder': 'Tema…', 'create.generatedSetPlaceholder': 'Conjunto generado…', 'create.instructionsPlaceholder': 'Por ejemplo: centrarse en definiciones clave y preguntas frecuentes de examen', 'create.sourceLimits': 'Límites: hasta {pages} páginas PDF en total y {images} imágenes.', 'create.chooseFiles': 'Elegir archivos', 'create.checking': 'Comprobando…', 'create.parsing': 'Analizando…', 'create.generating': 'Generando…',
    'set.synthesizedFrom': 'Sintetizado a partir de:', 'set.termLabel': 'Término:', 'set.definitionLabel': 'Definición:', 'set.filterTerms': 'Filtrar términos', 'set.filterAll': 'Todos', 'set.filterStarred': 'Favoritos', 'set.filterUnstarred': 'No favoritos', 'set.flashcardSettings': 'Configuración de tarjetas', 'set.definitionAtFront': 'Definición al frente', 'set.termAtFront': 'Término al frente',
    'settings.compatible': 'Compatible', 'settings.advanced': 'Avanzado', 'settings.baseUrl': 'URL base', 'settings.configured': 'configurado', 'settings.apiKeySet': 'Clave API configurada', 'settings.models': 'Modelos', 'settings.backToProviders': 'Volver a proveedores',
  },
  fr: {
    'common.choose': 'Choisir', 'common.select': 'Sélectionner', 'common.enter': 'Entrer',
    'create.themeHint': 'Une indication pour orienter la synthèse (par exemple : examen 2, concepts clés, définitions uniquement).', 'create.themePlaceholder': 'Thème…', 'create.generatedSetPlaceholder': 'Ensemble généré…', 'create.instructionsPlaceholder': 'Par exemple : se concentrer sur les définitions clés et les questions d’examen courantes', 'create.sourceLimits': 'Limites : jusqu’à {pages} pages PDF au total et {images} images.', 'create.chooseFiles': 'Choisir des fichiers', 'create.checking': 'Vérification…', 'create.parsing': 'Analyse…', 'create.generating': 'Génération…',
    'set.synthesizedFrom': 'Synthétisé à partir de :', 'set.termLabel': 'Terme :', 'set.definitionLabel': 'Définition :', 'set.filterTerms': 'Filtrer les termes', 'set.filterAll': 'Tous', 'set.filterStarred': 'Favoris', 'set.filterUnstarred': 'Non favoris', 'set.flashcardSettings': 'Paramètres des cartes', 'set.definitionAtFront': 'Définition au recto', 'set.termAtFront': 'Terme au recto',
    'settings.compatible': 'Compatible', 'settings.advanced': 'Avancé', 'settings.baseUrl': 'URL de base', 'settings.configured': 'configuré', 'settings.apiKeySet': 'Clé API configurée', 'settings.models': 'Modèles', 'settings.backToProviders': 'Retour aux fournisseurs',
  },
  'zh-CN': {
    'common.choose': '选择', 'common.select': '选择', 'common.enter': '进入',
    'create.themeHint': '用于指定综合重点的提示（例如：第二次考试、核心概念、仅定义）。', 'create.themePlaceholder': '主题…', 'create.generatedSetPlaceholder': '生成的卡片集…', 'create.instructionsPlaceholder': '例如：重点关注关键定义和常见考试题', 'create.sourceLimits': '限制：PDF 总计最多 {pages} 页，图片最多 {images} 张。', 'create.chooseFiles': '选择文件', 'create.checking': '正在检查…', 'create.parsing': '正在解析…', 'create.generating': '正在生成…',
    'set.synthesizedFrom': '综合自：', 'set.termLabel': '术语：', 'set.definitionLabel': '定义：', 'set.filterTerms': '筛选术语', 'set.filterAll': '全部', 'set.filterStarred': '已收藏', 'set.filterUnstarred': '未收藏', 'set.flashcardSettings': '闪卡设置', 'set.definitionAtFront': '定义在正面', 'set.termAtFront': '术语在正面',
    'settings.compatible': '兼容', 'settings.advanced': '高级', 'settings.baseUrl': '基础 URL', 'settings.configured': '已配置', 'settings.apiKeySet': '已设置 API 密钥', 'settings.models': '模型', 'settings.backToProviders': '返回服务提供商',
  },
  hi: {
    'common.choose': 'चुनें', 'common.select': 'चुनें', 'common.enter': 'दर्ज करें',
    'create.themeHint': 'सिंथेसिस के केंद्र के लिए संकेत (जैसे: परीक्षा 2, मुख्य अवधारणाएँ, केवल परिभाषाएँ)।', 'create.themePlaceholder': 'विषय…', 'create.generatedSetPlaceholder': 'जनरेट किया गया सेट…', 'create.instructionsPlaceholder': 'जैसे: मुख्य परिभाषाओं और सामान्य परीक्षा प्रश्नों पर ध्यान दें', 'create.sourceLimits': 'सीमा: कुल {pages} PDF पृष्ठ और {images} चित्र तक।', 'create.chooseFiles': 'फ़ाइलें चुनें', 'create.checking': 'जाँच हो रही है…', 'create.parsing': 'पार्स हो रहा है…', 'create.generating': 'जनरेट हो रहा है…',
    'set.synthesizedFrom': 'इनसे सिंथेसाइज़ किया गया:', 'set.termLabel': 'शब्द:', 'set.definitionLabel': 'परिभाषा:', 'set.filterTerms': 'शब्द फ़िल्टर करें', 'set.filterAll': 'सभी', 'set.filterStarred': 'पसंदीदा', 'set.filterUnstarred': 'गैर-पसंदीदा', 'set.flashcardSettings': 'फ्लैशकार्ड सेटिंग्स', 'set.definitionAtFront': 'परिभाषा सामने', 'set.termAtFront': 'शब्द सामने',
    'settings.compatible': 'संगत', 'settings.advanced': 'उन्नत', 'settings.baseUrl': 'बेस URL', 'settings.configured': 'कॉन्फ़िगर किया गया', 'settings.apiKeySet': 'API कुंजी सेट है', 'settings.models': 'मॉडल', 'settings.backToProviders': 'प्रदाताओं पर वापस जाएँ',
  },
  ar: {
    'common.choose': 'اختيار', 'common.select': 'تحديد', 'common.enter': 'إدخال',
    'create.themeHint': 'تلميح لتحديد محور التوليف (مثل: الاختبار 2، المفاهيم الأساسية، التعريفات فقط).', 'create.themePlaceholder': 'الموضوع…', 'create.generatedSetPlaceholder': 'مجموعة مولّدة…', 'create.instructionsPlaceholder': 'مثال: ركّز على التعريفات الأساسية وأسئلة الاختبارات الشائعة', 'create.sourceLimits': 'الحدود: حتى {pages} صفحة PDF إجمالًا و{images} صور.', 'create.chooseFiles': 'اختيار الملفات', 'create.checking': 'جارٍ التحقق…', 'create.parsing': 'جارٍ التحليل…', 'create.generating': 'جارٍ التوليد…',
    'set.synthesizedFrom': 'مُولّف من:', 'set.termLabel': 'المصطلح:', 'set.definitionLabel': 'التعريف:', 'set.filterTerms': 'تصفية المصطلحات', 'set.filterAll': 'الكل', 'set.filterStarred': 'المفضلة', 'set.filterUnstarred': 'غير المفضلة', 'set.flashcardSettings': 'إعدادات البطاقات', 'set.definitionAtFront': 'التعريف في الأمام', 'set.termAtFront': 'المصطلح في الأمام',
    'settings.compatible': 'متوافق', 'settings.advanced': 'متقدم', 'settings.baseUrl': 'عنوان URL الأساسي', 'settings.configured': 'مُعدّ', 'settings.apiKeySet': 'تم إعداد مفتاح API', 'settings.models': 'النماذج', 'settings.backToProviders': 'العودة إلى المزوّدين',
  },
  de: {
    'common.choose': 'Auswählen', 'common.select': 'Auswählen', 'common.enter': 'Eingeben',
    'create.themeHint': 'Ein Hinweis zum Schwerpunkt der Synthese (zum Beispiel: Prüfung 2, Kernkonzepte, nur Definitionen).', 'create.themePlaceholder': 'Thema…', 'create.generatedSetPlaceholder': 'Generiertes Set…', 'create.instructionsPlaceholder': 'Zum Beispiel: wichtige Definitionen und häufige Prüfungsfragen hervorheben', 'create.sourceLimits': 'Limits: insgesamt bis zu {pages} PDF-Seiten und {images} Bilder.', 'create.chooseFiles': 'Dateien auswählen', 'create.checking': 'Wird geprüft…', 'create.parsing': 'Wird analysiert…', 'create.generating': 'Wird generiert…',
    'set.synthesizedFrom': 'Synthetisiert aus:', 'set.termLabel': 'Begriff:', 'set.definitionLabel': 'Definition:', 'set.filterTerms': 'Begriffe filtern', 'set.filterAll': 'Alle', 'set.filterStarred': 'Favoriten', 'set.filterUnstarred': 'Nicht favorisiert', 'set.flashcardSettings': 'Karteikarten-Einstellungen', 'set.definitionAtFront': 'Definition vorne', 'set.termAtFront': 'Begriff vorne',
    'settings.compatible': 'Kompatibel', 'settings.advanced': 'Erweitert', 'settings.baseUrl': 'Basis-URL', 'settings.configured': 'konfiguriert', 'settings.apiKeySet': 'API-Schlüssel gesetzt', 'settings.models': 'Modelle', 'settings.backToProviders': 'Zurück zu Anbietern',
  },
  ru: {
    'common.choose': 'Выбрать', 'common.select': 'Выбрать', 'common.enter': 'Ввести',
    'create.themeHint': 'Подсказка для направления синтеза (например: экзамен 2, ключевые понятия, только определения).', 'create.themePlaceholder': 'Тема…', 'create.generatedSetPlaceholder': 'Созданный набор…', 'create.instructionsPlaceholder': 'Например: сосредоточьтесь на ключевых определениях и типовых вопросах экзамена', 'create.sourceLimits': 'Ограничения: до {pages} страниц PDF и {images} изображений.', 'create.chooseFiles': 'Выбрать файлы', 'create.checking': 'Проверка…', 'create.parsing': 'Обработка…', 'create.generating': 'Создание…',
    'set.synthesizedFrom': 'Синтезировано из:', 'set.termLabel': 'Термин:', 'set.definitionLabel': 'Определение:', 'set.filterTerms': 'Фильтровать термины', 'set.filterAll': 'Все', 'set.filterStarred': 'Избранные', 'set.filterUnstarred': 'Неизбранные', 'set.flashcardSettings': 'Настройки карточек', 'set.definitionAtFront': 'Определение на лицевой стороне', 'set.termAtFront': 'Термин на лицевой стороне',
    'settings.compatible': 'Совместимый', 'settings.advanced': 'Расширенный', 'settings.baseUrl': 'Базовый URL', 'settings.configured': 'настроено', 'settings.apiKeySet': 'Ключ API задан', 'settings.models': 'Модели', 'settings.backToProviders': 'Назад к провайдерам',
  },
  ja: {
    'common.choose': '選択', 'common.select': '選択', 'common.enter': '決定',
    'create.themeHint': '統合の重点を示すヒント（例：試験2、重要概念、定義のみ）。', 'create.themePlaceholder': 'テーマ…', 'create.generatedSetPlaceholder': '生成されたセット…', 'create.instructionsPlaceholder': '例：重要な定義とよく出る試験問題に重点を置く', 'create.sourceLimits': '上限：PDF は合計 {pages} ページ、画像は {images} 枚まで。', 'create.chooseFiles': 'ファイルを選択', 'create.checking': '確認中…', 'create.parsing': '解析中…', 'create.generating': '生成中…',
    'set.synthesizedFrom': '統合元：', 'set.termLabel': '用語：', 'set.definitionLabel': '定義：', 'set.filterTerms': '用語を絞り込む', 'set.filterAll': 'すべて', 'set.filterStarred': 'お気に入り', 'set.filterUnstarred': 'お気に入り以外', 'set.flashcardSettings': 'フラッシュカード設定', 'set.definitionAtFront': '定義を表面に', 'set.termAtFront': '用語を表面に',
    'settings.compatible': '互換', 'settings.advanced': '詳細', 'settings.baseUrl': 'ベース URL', 'settings.configured': '設定済み', 'settings.apiKeySet': 'API キー設定済み', 'settings.models': 'モデル', 'settings.backToProviders': 'プロバイダーに戻る',
  },
  ko: {
    'common.choose': '선택', 'common.select': '선택', 'common.enter': '입력',
    'create.themeHint': '통합 초점을 정하는 힌트(예: 시험 2, 핵심 개념, 정의만).', 'create.themePlaceholder': '주제…', 'create.generatedSetPlaceholder': '생성된 세트…', 'create.instructionsPlaceholder': '예: 핵심 정의와 자주 나오는 시험 문제에 집중', 'create.sourceLimits': '제한: PDF는 총 {pages}페이지, 이미지는 {images}개까지.', 'create.chooseFiles': '파일 선택', 'create.checking': '확인 중…', 'create.parsing': '분석 중…', 'create.generating': '생성 중…',
    'set.synthesizedFrom': '통합 출처:', 'set.termLabel': '용어:', 'set.definitionLabel': '정의:', 'set.filterTerms': '용어 필터', 'set.filterAll': '전체', 'set.filterStarred': '즐겨찾기', 'set.filterUnstarred': '즐겨찾기 아님', 'set.flashcardSettings': '플래시카드 설정', 'set.definitionAtFront': '정의를 앞면에', 'set.termAtFront': '용어를 앞면에',
    'settings.compatible': '호환', 'settings.advanced': '고급', 'settings.baseUrl': '기본 URL', 'settings.configured': '설정됨', 'settings.apiKeySet': 'API 키 설정됨', 'settings.models': '모델', 'settings.backToProviders': '제공업체로 돌아가기',
  },
}

for (const language of Object.keys(supplementalMessages) as AppLanguage[]) {
  Object.assign(
    language === 'en' ? en : language === 'es' ? es : language === 'fr' ? fr :
      language === 'zh-CN' ? zhCN : language === 'hi' ? hi : language === 'ar' ? ar :
        language === 'de' ? de : language === 'ru' ? ru : language === 'ja' ? ja : ko,
    supplementalMessages[language],
    detailMessages[language],
  )
}

Object.assign(en, {
  'set.tryAgain': 'Try again',
  'studyGuide.webPreviewNotice': 'Study guides require the desktop app (Tauri) for database access.',
  'studyGuide.demoTitle': 'Demo study guide',
  'studyGuide.demoIntro': 'This paragraph includes **bold Markdown** and _italic text_.',
  'studyGuide.demoList': 'Lists render in the study guide view.',
  'studyGuide.demoCode': 'Code blocks render without executing HTML.',
  'studyGuide.demoTopic': 'Topic',
  'studyGuide.demoStatus': 'Status',
  'studyGuide.demoTables': 'Tables',
  'studyGuide.demoRenderCorrectly': 'Render correctly',
})

Object.assign(es, {
  'set.tryAgain': 'Intentar otra vez',
  'studyGuide.webPreviewNotice': 'Las guias de estudio requieren la app de escritorio (Tauri) para acceder a la base de datos.',
  'studyGuide.demoTitle': 'Guia de estudio de demostracion',
  'studyGuide.demoIntro': 'Este parrafo incluye **Markdown en negrita** y _texto en cursiva_.',
  'studyGuide.demoList': 'Las listas se muestran en la vista de guia de estudio.',
  'studyGuide.demoCode': 'Los bloques de codigo se muestran sin ejecutar HTML.',
  'studyGuide.demoTopic': 'Tema',
  'studyGuide.demoStatus': 'Estado',
  'studyGuide.demoTables': 'Tablas',
  'studyGuide.demoRenderCorrectly': 'Se muestran correctamente',
})

const messageTargets: Record<AppLanguage, Messages> = {
  en,
  es,
  fr,
  'zh-CN': zhCN,
  hi,
  ar,
  de,
  ru,
  ja,
  ko,
}

const localizedDemoMessages: Record<AppLanguage, Messages> = {
  en: {
    'set.tryAgain': 'Try again',
    'demo.webPreviewNotice': 'This is a web preview. Showing demo items; your full set list requires the desktop app (Tauri).',
    'demo.setTitle': 'Demo set',
    'demo.setDescription': 'Web preview fallback. Full list requires desktop.',
    'demo.editDescription': 'Web preview fallback. Editing requires the desktop app.',
    'demo.term': 'Term {number}',
    'demo.definition': 'Definition {number}',
    'studyGuide.webPreviewNotice': 'Study guides require the desktop app (Tauri) for database access.',
    'studyGuide.demoTitle': 'Demo study guide',
    'studyGuide.demoIntro': 'This paragraph includes **bold Markdown** and _italic text_.',
    'studyGuide.demoList': 'Lists render in the study guide view.',
    'studyGuide.demoCode': 'Code blocks render without executing HTML.',
    'studyGuide.demoTopic': 'Topic',
    'studyGuide.demoStatus': 'Status',
    'studyGuide.demoTables': 'Tables',
    'studyGuide.demoRenderCorrectly': 'Render correctly',
    'duplicates.title': 'Possible duplicate cards',
    'duplicates.description': 'Review duplicate terms and definitions before continuing.',
    'duplicates.cardLabel': 'Card {number}',
    'duplicates.matchesCards': 'Matches cards: {cards}',
    'duplicates.keepCard': 'Keep card {number}',
    'duplicates.removeCard': 'Remove card {number}',
    'duplicates.removeHint': 'Check keeps the flashcard. X removes that flashcard from this draft/import.',
    'duplicates.continue': 'Continue',
  },
  es: {
    'set.tryAgain': 'Intentar otra vez',
    'demo.webPreviewNotice': 'Esta es una vista previa web. Se muestran elementos de demostracion; la lista completa requiere la app de escritorio (Tauri).',
    'demo.setTitle': 'Conjunto de demostracion',
    'demo.setDescription': 'Vista previa web. La lista completa requiere la app de escritorio.',
    'demo.editDescription': 'Vista previa web. Para editar se requiere la app de escritorio.',
    'demo.term': 'Termino {number}',
    'demo.definition': 'Definicion {number}',
    'studyGuide.webPreviewNotice': 'Las guias de estudio requieren la app de escritorio (Tauri) para acceder a la base de datos.',
    'studyGuide.demoTitle': 'Guia de estudio de demostracion',
    'studyGuide.demoIntro': 'Este parrafo incluye **Markdown en negrita** y _texto en cursiva_.',
    'studyGuide.demoList': 'Las listas se muestran en la vista de guia de estudio.',
    'studyGuide.demoCode': 'Los bloques de codigo se muestran sin ejecutar HTML.',
    'studyGuide.demoTopic': 'Tema',
    'studyGuide.demoStatus': 'Estado',
    'studyGuide.demoTables': 'Tablas',
    'studyGuide.demoRenderCorrectly': 'Se muestran correctamente',
  },
  fr: {
    'set.tryAgain': 'Reessayer',
    'demo.webPreviewNotice': 'Ceci est un apercu web. Les elements de demonstration sont affiches; la liste complete requiert l application de bureau (Tauri).',
    'demo.setTitle': 'Ensemble de demonstration',
    'demo.setDescription': 'Apercu web. La liste complete requiert l application de bureau.',
    'demo.editDescription': 'Apercu web. La modification requiert l application de bureau.',
    'demo.term': 'Terme {number}',
    'demo.definition': 'Definition {number}',
    'studyGuide.webPreviewNotice': 'Les guides d etude requierent l application de bureau (Tauri) pour acceder a la base de donnees.',
    'studyGuide.demoTitle': 'Guide d etude de demonstration',
    'studyGuide.demoIntro': 'Ce paragraphe inclut du **Markdown en gras** et du _texte en italique_.',
    'studyGuide.demoList': 'Les listes s affichent dans la vue du guide d etude.',
    'studyGuide.demoCode': 'Les blocs de code s affichent sans executer le HTML.',
    'studyGuide.demoTopic': 'Sujet',
    'studyGuide.demoStatus': 'Statut',
    'studyGuide.demoTables': 'Tableaux',
    'studyGuide.demoRenderCorrectly': 'S affichent correctement',
  },
  'zh-CN': {
    'set.tryAgain': '再试一次',
    'demo.webPreviewNotice': '这是网页预览。正在显示演示内容；完整列表需要桌面应用（Tauri）。',
    'demo.setTitle': '演示卡片集',
    'demo.setDescription': '网页预览占位内容。完整列表需要桌面应用。',
    'demo.editDescription': '网页预览占位内容。编辑需要桌面应用。',
    'demo.term': '术语 {number}',
    'demo.definition': '定义 {number}',
    'studyGuide.webPreviewNotice': '学习指南需要桌面应用（Tauri）才能访问数据库。',
    'studyGuide.demoTitle': '演示学习指南',
    'studyGuide.demoIntro': '这段文字包含**粗体 Markdown** 和_斜体文本_。',
    'studyGuide.demoList': '列表会显示在学习指南视图中。',
    'studyGuide.demoCode': '代码块会显示出来，但不会执行 HTML。',
    'studyGuide.demoTopic': '主题',
    'studyGuide.demoStatus': '状态',
    'studyGuide.demoTables': '表格',
    'studyGuide.demoRenderCorrectly': '正确显示',
  },
  hi: {
    'set.tryAgain': 'फिर कोशिश करें',
    'demo.webPreviewNotice': 'यह वेब पूर्वावलोकन है। डेमो आइटम दिखाए जा रहे हैं; पूरी सूची के लिए डेस्कटॉप ऐप (Tauri) चाहिए।',
    'demo.setTitle': 'डेमो सेट',
    'demo.setDescription': 'वेब पूर्वावलोकन fallback. पूरी सूची के लिए डेस्कटॉप ऐप चाहिए।',
    'demo.editDescription': 'वेब पूर्वावलोकन fallback. संपादन के लिए डेस्कटॉप ऐप चाहिए।',
    'demo.term': 'शब्द {number}',
    'demo.definition': 'परिभाषा {number}',
    'studyGuide.webPreviewNotice': 'अध्ययन गाइड के लिए डेटाबेस पहुंच हेतु डेस्कटॉप ऐप (Tauri) चाहिए।',
    'studyGuide.demoTitle': 'डेमो अध्ययन गाइड',
    'studyGuide.demoIntro': 'इस पैराग्राफ में **बोल्ड Markdown** और _इटैलिक टेक्स्ट_ है।',
    'studyGuide.demoList': 'सूचियां अध्ययन गाइड दृश्य में दिखती हैं।',
    'studyGuide.demoCode': 'कोड ब्लॉक HTML चलाए बिना दिखते हैं।',
    'studyGuide.demoTopic': 'विषय',
    'studyGuide.demoStatus': 'स्थिति',
    'studyGuide.demoTables': 'तालिकाएं',
    'studyGuide.demoRenderCorrectly': 'सही दिखती हैं',
  },
  ar: {
    'set.tryAgain': 'حاول مرة أخرى',
    'demo.webPreviewNotice': 'هذه معاينة ويب. يتم عرض عناصر تجريبية؛ القائمة الكاملة تتطلب تطبيق سطح المكتب (Tauri).',
    'demo.setTitle': 'مجموعة تجريبية',
    'demo.setDescription': 'محتوى احتياطي لمعاينة الويب. القائمة الكاملة تتطلب تطبيق سطح المكتب.',
    'demo.editDescription': 'محتوى احتياطي لمعاينة الويب. التعديل يتطلب تطبيق سطح المكتب.',
    'demo.term': 'مصطلح {number}',
    'demo.definition': 'تعريف {number}',
    'studyGuide.webPreviewNotice': 'تتطلب أدلة الدراسة تطبيق سطح المكتب (Tauri) للوصول إلى قاعدة البيانات.',
    'studyGuide.demoTitle': 'دليل دراسة تجريبي',
    'studyGuide.demoIntro': 'تتضمن هذه الفقرة **Markdown عريض** و_نصا مائلا_.',
    'studyGuide.demoList': 'تظهر القوائم في عرض دليل الدراسة.',
    'studyGuide.demoCode': 'تظهر كتل التعليمات البرمجية دون تنفيذ HTML.',
    'studyGuide.demoTopic': 'الموضوع',
    'studyGuide.demoStatus': 'الحالة',
    'studyGuide.demoTables': 'الجداول',
    'studyGuide.demoRenderCorrectly': 'تظهر بشكل صحيح',
  },
  de: {
    'set.tryAgain': 'Erneut versuchen',
    'demo.webPreviewNotice': 'Dies ist eine Webvorschau. Demo-Elemente werden angezeigt; die vollstandige Liste erfordert die Desktop-App (Tauri).',
    'demo.setTitle': 'Demo-Set',
    'demo.setDescription': 'Webvorschau-Fallback. Die vollstandige Liste erfordert die Desktop-App.',
    'demo.editDescription': 'Webvorschau-Fallback. Bearbeiten erfordert die Desktop-App.',
    'demo.term': 'Begriff {number}',
    'demo.definition': 'Definition {number}',
    'studyGuide.webPreviewNotice': 'Studienfuhrer erfordern die Desktop-App (Tauri), um auf die Datenbank zuzugreifen.',
    'studyGuide.demoTitle': 'Demo-Studienfuhrer',
    'studyGuide.demoIntro': 'Dieser Absatz enthalt **fettes Markdown** und _kursiven Text_.',
    'studyGuide.demoList': 'Listen werden in der Studienfuhrer-Ansicht angezeigt.',
    'studyGuide.demoCode': 'Codeblocke werden angezeigt, ohne HTML auszufuhren.',
    'studyGuide.demoTopic': 'Thema',
    'studyGuide.demoStatus': 'Status',
    'studyGuide.demoTables': 'Tabellen',
    'studyGuide.demoRenderCorrectly': 'Korrekt angezeigt',
  },
  ru: {
    'set.tryAgain': 'Попробовать снова',
    'demo.webPreviewNotice': 'Это веб-предпросмотр. Показаны демо-элементы; полный список требует настольного приложения (Tauri).',
    'demo.setTitle': 'Демо-набор',
    'demo.setDescription': 'Запасной контент веб-предпросмотра. Полный список требует настольного приложения.',
    'demo.editDescription': 'Запасной контент веб-предпросмотра. Для редактирования требуется настольное приложение.',
    'demo.term': 'Термин {number}',
    'demo.definition': 'Определение {number}',
    'studyGuide.webPreviewNotice': 'Учебные руководства требуют настольного приложения (Tauri) для доступа к базе данных.',
    'studyGuide.demoTitle': 'Демо-учебное руководство',
    'studyGuide.demoIntro': 'Этот абзац включает **жирный Markdown** и _курсивный текст_.',
    'studyGuide.demoList': 'Списки отображаются в учебном руководстве.',
    'studyGuide.demoCode': 'Блоки кода отображаются без выполнения HTML.',
    'studyGuide.demoTopic': 'Тема',
    'studyGuide.demoStatus': 'Статус',
    'studyGuide.demoTables': 'Таблицы',
    'studyGuide.demoRenderCorrectly': 'Отображаются правильно',
  },
  ja: {
    'set.tryAgain': 'もう一度',
    'demo.webPreviewNotice': 'これは Web プレビューです。デモ項目を表示しています。完全な一覧にはデスクトップアプリ（Tauri）が必要です。',
    'demo.setTitle': 'デモセット',
    'demo.setDescription': 'Web プレビュー用の代替表示です。完全な一覧にはデスクトップアプリが必要です。',
    'demo.editDescription': 'Web プレビュー用の代替表示です。編集にはデスクトップアプリが必要です。',
    'demo.term': '用語 {number}',
    'demo.definition': '定義 {number}',
    'studyGuide.webPreviewNotice': '学習ガイドでデータベースにアクセスするにはデスクトップアプリ（Tauri）が必要です。',
    'studyGuide.demoTitle': 'デモ学習ガイド',
    'studyGuide.demoIntro': 'この段落には **太字の Markdown** と _斜体テキスト_ が含まれます。',
    'studyGuide.demoList': 'リストは学習ガイド画面に表示されます。',
    'studyGuide.demoCode': 'コードブロックは HTML を実行せずに表示されます。',
    'studyGuide.demoTopic': 'トピック',
    'studyGuide.demoStatus': '状態',
    'studyGuide.demoTables': '表',
    'studyGuide.demoRenderCorrectly': '正しく表示',
  },
  ko: {
    'set.tryAgain': '다시 시도',
    'demo.webPreviewNotice': '웹 미리보기입니다. 데모 항목을 표시합니다. 전체 목록은 데스크톱 앱(Tauri)이 필요합니다.',
    'demo.setTitle': '데모 세트',
    'demo.setDescription': '웹 미리보기 대체 콘텐츠입니다. 전체 목록은 데스크톱 앱이 필요합니다.',
    'demo.editDescription': '웹 미리보기 대체 콘텐츠입니다. 편집하려면 데스크톱 앱이 필요합니다.',
    'demo.term': '용어 {number}',
    'demo.definition': '정의 {number}',
    'studyGuide.webPreviewNotice': '학습 가이드는 데이터베이스 접근을 위해 데스크톱 앱(Tauri)이 필요합니다.',
    'studyGuide.demoTitle': '데모 학습 가이드',
    'studyGuide.demoIntro': '이 문단에는 **굵은 Markdown** 과 _기울임 텍스트_가 포함됩니다.',
    'studyGuide.demoList': '목록은 학습 가이드 화면에 표시됩니다.',
    'studyGuide.demoCode': '코드 블록은 HTML을 실행하지 않고 표시됩니다.',
    'studyGuide.demoTopic': '주제',
    'studyGuide.demoStatus': '상태',
    'studyGuide.demoTables': '표',
    'studyGuide.demoRenderCorrectly': '올바르게 표시',
  },
}

for (const language of Object.keys(localizedDemoMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], localizedDemoMessages[language])
}

const duplicateMessages: Record<AppLanguage, Messages> = {
  en: {
    'duplicates.title': 'Possible duplicate cards',
    'duplicates.description': 'Review duplicate terms and definitions before continuing.',
    'duplicates.cardLabel': 'Card {number}',
    'duplicates.matchesCards': 'Matches cards: {cards}',
    'duplicates.keepCard': 'Keep card {number}',
    'duplicates.removeCard': 'Remove card {number}',
    'duplicates.removeHint': 'Check keeps the flashcard. X removes that flashcard from this draft/import.',
    'duplicates.continue': 'Continue',
  },
  es: {
    'duplicates.title': 'Posibles tarjetas duplicadas',
    'duplicates.description': 'Revisa terminos y definiciones duplicados antes de continuar.',
    'duplicates.cardLabel': 'Tarjeta {number}',
    'duplicates.matchesCards': 'Coincide con tarjetas: {cards}',
    'duplicates.keepCard': 'Mantener tarjeta {number}',
    'duplicates.removeCard': 'Quitar tarjeta {number}',
    'duplicates.removeHint': 'La marca mantiene la tarjeta. La X quita esa tarjeta de este borrador/importacion.',
    'duplicates.continue': 'Continuar',
  },
  fr: {
    'duplicates.title': 'Cartes possiblement dupliquees',
    'duplicates.description': 'Verifiez les termes et definitions en double avant de continuer.',
    'duplicates.cardLabel': 'Carte {number}',
    'duplicates.matchesCards': 'Correspond aux cartes : {cards}',
    'duplicates.keepCard': 'Garder la carte {number}',
    'duplicates.removeCard': 'Retirer la carte {number}',
    'duplicates.removeHint': 'La coche garde la carte. Le X retire cette carte du brouillon/import.',
    'duplicates.continue': 'Continuer',
  },
  'zh-CN': {
    'duplicates.title': 'Possible duplicate cards',
    'duplicates.description': 'Review duplicate terms and definitions before continuing.',
    'duplicates.cardLabel': 'Card {number}',
    'duplicates.matchesCards': 'Matches cards: {cards}',
    'duplicates.keepCard': 'Keep card {number}',
    'duplicates.removeCard': 'Remove card {number}',
    'duplicates.removeHint': 'Check keeps the flashcard. X removes that flashcard from this draft/import.',
    'duplicates.continue': 'Continue',
  },
  hi: {
    'duplicates.title': 'Possible duplicate cards',
    'duplicates.description': 'Review duplicate terms and definitions before continuing.',
    'duplicates.cardLabel': 'Card {number}',
    'duplicates.matchesCards': 'Matches cards: {cards}',
    'duplicates.keepCard': 'Keep card {number}',
    'duplicates.removeCard': 'Remove card {number}',
    'duplicates.removeHint': 'Check keeps the flashcard. X removes that flashcard from this draft/import.',
    'duplicates.continue': 'Continue',
  },
  ar: {
    'duplicates.title': 'Possible duplicate cards',
    'duplicates.description': 'Review duplicate terms and definitions before continuing.',
    'duplicates.cardLabel': 'Card {number}',
    'duplicates.matchesCards': 'Matches cards: {cards}',
    'duplicates.keepCard': 'Keep card {number}',
    'duplicates.removeCard': 'Remove card {number}',
    'duplicates.removeHint': 'Check keeps the flashcard. X removes that flashcard from this draft/import.',
    'duplicates.continue': 'Continue',
  },
  de: {
    'duplicates.title': 'Moegliche doppelte Karten',
    'duplicates.description': 'Pruefe doppelte Begriffe und Definitionen, bevor du fortfaehrst.',
    'duplicates.cardLabel': 'Karte {number}',
    'duplicates.matchesCards': 'Stimmt mit Karten ueberein: {cards}',
    'duplicates.keepCard': 'Karte {number} behalten',
    'duplicates.removeCard': 'Karte {number} entfernen',
    'duplicates.removeHint': 'Der Haken behaelt die Karte. X entfernt diese Karte aus diesem Entwurf/Import.',
    'duplicates.continue': 'Weiter',
  },
  ru: {
    'duplicates.title': 'Possible duplicate cards',
    'duplicates.description': 'Review duplicate terms and definitions before continuing.',
    'duplicates.cardLabel': 'Card {number}',
    'duplicates.matchesCards': 'Matches cards: {cards}',
    'duplicates.keepCard': 'Keep card {number}',
    'duplicates.removeCard': 'Remove card {number}',
    'duplicates.removeHint': 'Check keeps the flashcard. X removes that flashcard from this draft/import.',
    'duplicates.continue': 'Continue',
  },
  ja: {
    'duplicates.title': 'Possible duplicate cards',
    'duplicates.description': 'Review duplicate terms and definitions before continuing.',
    'duplicates.cardLabel': 'Card {number}',
    'duplicates.matchesCards': 'Matches cards: {cards}',
    'duplicates.keepCard': 'Keep card {number}',
    'duplicates.removeCard': 'Remove card {number}',
    'duplicates.removeHint': 'Check keeps the flashcard. X removes that flashcard from this draft/import.',
    'duplicates.continue': 'Continue',
  },
  ko: {
    'duplicates.title': 'Possible duplicate cards',
    'duplicates.description': 'Review duplicate terms and definitions before continuing.',
    'duplicates.cardLabel': 'Card {number}',
    'duplicates.matchesCards': 'Matches cards: {cards}',
    'duplicates.keepCard': 'Keep card {number}',
    'duplicates.removeCard': 'Remove card {number}',
    'duplicates.removeHint': 'Check keeps the flashcard. X removes that flashcard from this draft/import.',
    'duplicates.continue': 'Continue',
  },
}

for (const language of Object.keys(duplicateMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], duplicateMessages[language])
}

const chatHistoryMessages: Record<AppLanguage, Messages> = {
  en: {
    'chat.history': 'History',
    'chat.new': 'New chat',
    'chat.saving': 'Saving…',
    'chat.saved': 'Chat saved',
    'chat.noHistory': 'No saved chats for this set.',
    'chat.deleteNamed': 'Delete {title}',
    'chat.deleteTitle': 'Delete saved chat?',
    'chat.deleteDescription': 'This permanently deletes “{title}”.',
    'chat.saveFailed': 'Failed to save chat.',
    'chat.historyFailed': 'Failed to load chat history.',
    'chat.openFailed': 'Failed to open saved chat.',
    'chat.deleteFailed': 'Failed to delete saved chat.'
  },
  es: {
    'chat.history': 'Historial',
    'chat.new': 'Nuevo chat',
    'chat.saving': 'Guardando…',
    'chat.saved': 'Chat guardado',
    'chat.noHistory': 'No hay chats guardados para este conjunto.',
    'chat.deleteNamed': 'Eliminar {title}',
    'chat.deleteTitle': '¿Eliminar el chat guardado?',
    'chat.deleteDescription': 'Esto eliminará permanentemente “{title}”.',
    'chat.saveFailed': 'No se pudo guardar el chat.',
    'chat.historyFailed': 'No se pudo cargar el historial de chats.',
    'chat.openFailed': 'No se pudo abrir el chat guardado.',
    'chat.deleteFailed': 'No se pudo eliminar el chat guardado.'
  },
  fr: {
    'chat.history': 'Historique',
    'chat.new': 'Nouveau chat',
    'chat.saving': 'Enregistrement…',
    'chat.saved': 'Chat enregistré',
    'chat.noHistory': 'Aucun chat enregistré pour cet ensemble.',
    'chat.deleteNamed': 'Supprimer {title}',
    'chat.deleteTitle': 'Supprimer le chat enregistré ?',
    'chat.deleteDescription': 'Cette action supprimera définitivement « {title} ».',
    'chat.saveFailed': 'Impossible d’enregistrer le chat.',
    'chat.historyFailed': 'Impossible de charger l’historique des chats.',
    'chat.openFailed': 'Impossible d’ouvrir le chat enregistré.',
    'chat.deleteFailed': 'Impossible de supprimer le chat enregistré.'
  },
  'zh-CN': {
    'chat.history': '历史记录',
    'chat.new': '新建聊天',
    'chat.saving': '正在保存…',
    'chat.saved': '聊天已保存',
    'chat.noHistory': '此卡片集没有已保存的聊天。',
    'chat.deleteNamed': '删除 {title}',
    'chat.deleteTitle': '删除已保存的聊天？',
    'chat.deleteDescription': '这将永久删除“{title}”。',
    'chat.saveFailed': '无法保存聊天。',
    'chat.historyFailed': '无法加载聊天历史记录。',
    'chat.openFailed': '无法打开已保存的聊天。',
    'chat.deleteFailed': '无法删除已保存的聊天。'
  },
  hi: {
    'chat.history': 'इतिहास',
    'chat.new': 'नई चैट',
    'chat.saving': 'सहेजा जा रहा है…',
    'chat.saved': 'चैट सहेजी गई',
    'chat.noHistory': 'इस सेट के लिए कोई सहेजी गई चैट नहीं है।',
    'chat.deleteNamed': '{title} हटाएँ',
    'chat.deleteTitle': 'सहेजी गई चैट हटाएँ?',
    'chat.deleteDescription': 'यह “{title}” को स्थायी रूप से हटा देगा।',
    'chat.saveFailed': 'चैट सहेजी नहीं जा सकी।',
    'chat.historyFailed': 'चैट इतिहास लोड नहीं हो सका।',
    'chat.openFailed': 'सहेजी गई चैट खोली नहीं जा सकी।',
    'chat.deleteFailed': 'सहेजी गई चैट हटाई नहीं जा सकी।'
  },
  ar: {
    'chat.history': 'السجل',
    'chat.new': 'دردشة جديدة',
    'chat.saving': 'جارٍ الحفظ…',
    'chat.saved': 'تم حفظ الدردشة',
    'chat.noHistory': 'لا توجد دردشات محفوظة لهذه المجموعة.',
    'chat.deleteNamed': 'حذف {title}',
    'chat.deleteTitle': 'حذف الدردشة المحفوظة؟',
    'chat.deleteDescription': 'سيؤدي هذا إلى حذف “{title}” نهائيًا.',
    'chat.saveFailed': 'تعذر حفظ الدردشة.',
    'chat.historyFailed': 'تعذر تحميل سجل الدردشات.',
    'chat.openFailed': 'تعذر فتح الدردشة المحفوظة.',
    'chat.deleteFailed': 'تعذر حذف الدردشة المحفوظة.'
  },
  de: {
    'chat.history': 'Verlauf',
    'chat.new': 'Neuer Chat',
    'chat.saving': 'Wird gespeichert…',
    'chat.saved': 'Chat gespeichert',
    'chat.noHistory': 'Keine gespeicherten Chats für dieses Set.',
    'chat.deleteNamed': '{title} löschen',
    'chat.deleteTitle': 'Gespeicherten Chat löschen?',
    'chat.deleteDescription': '„{title}“ wird dadurch dauerhaft gelöscht.',
    'chat.saveFailed': 'Chat konnte nicht gespeichert werden.',
    'chat.historyFailed': 'Chatverlauf konnte nicht geladen werden.',
    'chat.openFailed': 'Gespeicherter Chat konnte nicht geöffnet werden.',
    'chat.deleteFailed': 'Gespeicherter Chat konnte nicht gelöscht werden.'
  },
  ru: {
    'chat.history': 'История',
    'chat.new': 'Новый чат',
    'chat.saving': 'Сохранение…',
    'chat.saved': 'Чат сохранён',
    'chat.noHistory': 'Для этого набора нет сохранённых чатов.',
    'chat.deleteNamed': 'Удалить {title}',
    'chat.deleteTitle': 'Удалить сохранённый чат?',
    'chat.deleteDescription': 'Чат «{title}» будет удалён навсегда.',
    'chat.saveFailed': 'Не удалось сохранить чат.',
    'chat.historyFailed': 'Не удалось загрузить историю чатов.',
    'chat.openFailed': 'Не удалось открыть сохранённый чат.',
    'chat.deleteFailed': 'Не удалось удалить сохранённый чат.'
  },
  ja: {
    'chat.history': '履歴',
    'chat.new': '新しいチャット',
    'chat.saving': '保存中…',
    'chat.saved': 'チャットを保存しました',
    'chat.noHistory': 'このセットに保存済みのチャットはありません。',
    'chat.deleteNamed': '{title} を削除',
    'chat.deleteTitle': '保存済みチャットを削除しますか？',
    'chat.deleteDescription': '「{title}」は完全に削除されます。',
    'chat.saveFailed': 'チャットを保存できませんでした。',
    'chat.historyFailed': 'チャット履歴を読み込めませんでした。',
    'chat.openFailed': '保存済みチャットを開けませんでした。',
    'chat.deleteFailed': '保存済みチャットを削除できませんでした。'
  },
  ko: {
    'chat.history': '기록',
    'chat.new': '새 채팅',
    'chat.saving': '저장 중…',
    'chat.saved': '채팅 저장됨',
    'chat.noHistory': '이 세트에 저장된 채팅이 없습니다.',
    'chat.deleteNamed': '{title} 삭제',
    'chat.deleteTitle': '저장된 채팅을 삭제할까요?',
    'chat.deleteDescription': '“{title}” 채팅이 영구적으로 삭제됩니다.',
    'chat.saveFailed': '채팅을 저장하지 못했습니다.',
    'chat.historyFailed': '채팅 기록을 불러오지 못했습니다.',
    'chat.openFailed': '저장된 채팅을 열지 못했습니다.',
    'chat.deleteFailed': '저장된 채팅을 삭제하지 못했습니다.'
  }
}

for (const language of Object.keys(chatHistoryMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], chatHistoryMessages[language])
}

const folderMessages: Record<AppLanguage, Messages> = {
  en: {
    'home.addFolder': 'Add Folder',
    'home.untitledFolder': 'Untitled Folder',
    'home.folderName': 'Folder name',
    'home.emptyFolder': 'This folder is empty.',
    'home.rootDropArea': 'Move sets out of folders',
    'home.setsSelected': '{count} set(s)',
    'home.folderCreateFailed': 'Failed to create folder.',
    'home.folderRenameFailed': 'Failed to rename folder.',
    'home.folderMoveFailed': 'Failed to move sets.'
  },
  es: {
    'home.addFolder': 'Añadir carpeta',
    'home.untitledFolder': 'Carpeta sin título',
    'home.folderName': 'Nombre de la carpeta',
    'home.emptyFolder': 'Esta carpeta está vacía.',
    'home.rootDropArea': 'Mover conjuntos fuera de las carpetas',
    'home.setsSelected': '{count} conjunto(s)',
    'home.folderCreateFailed': 'No se pudo crear la carpeta.',
    'home.folderRenameFailed': 'No se pudo cambiar el nombre de la carpeta.',
    'home.folderMoveFailed': 'No se pudieron mover los conjuntos.'
  },
  fr: {
    'home.addFolder': 'Ajouter un dossier',
    'home.untitledFolder': 'Dossier sans titre',
    'home.folderName': 'Nom du dossier',
    'home.emptyFolder': 'Ce dossier est vide.',
    'home.rootDropArea': 'Déplacer les ensembles hors des dossiers',
    'home.setsSelected': '{count} ensemble(s)',
    'home.folderCreateFailed': 'Impossible de créer le dossier.',
    'home.folderRenameFailed': 'Impossible de renommer le dossier.',
    'home.folderMoveFailed': 'Impossible de déplacer les ensembles.'
  },
  'zh-CN': {
    'home.addFolder': '添加文件夹',
    'home.untitledFolder': '未命名文件夹',
    'home.folderName': '文件夹名称',
    'home.emptyFolder': '此文件夹为空。',
    'home.rootDropArea': '将卡片集移出文件夹',
    'home.setsSelected': '{count} 个卡片集',
    'home.folderCreateFailed': '无法创建文件夹。',
    'home.folderRenameFailed': '无法重命名文件夹。',
    'home.folderMoveFailed': '无法移动卡片集。'
  },
  hi: {
    'home.addFolder': 'फ़ोल्डर जोड़ें',
    'home.untitledFolder': 'शीर्षकहीन फ़ोल्डर',
    'home.folderName': 'फ़ोल्डर का नाम',
    'home.emptyFolder': 'यह फ़ोल्डर खाली है।',
    'home.rootDropArea': 'सेट को फ़ोल्डर से बाहर ले जाएँ',
    'home.setsSelected': '{count} सेट',
    'home.folderCreateFailed': 'फ़ोल्डर नहीं बनाया जा सका।',
    'home.folderRenameFailed': 'फ़ोल्डर का नाम नहीं बदला जा सका।',
    'home.folderMoveFailed': 'सेट नहीं ले जाए जा सके।'
  },
  ar: {
    'home.addFolder': 'إضافة مجلد',
    'home.untitledFolder': 'مجلد بلا عنوان',
    'home.folderName': 'اسم المجلد',
    'home.emptyFolder': 'هذا المجلد فارغ.',
    'home.rootDropArea': 'نقل المجموعات خارج المجلدات',
    'home.setsSelected': '{count} مجموعة',
    'home.folderCreateFailed': 'تعذر إنشاء المجلد.',
    'home.folderRenameFailed': 'تعذر تغيير اسم المجلد.',
    'home.folderMoveFailed': 'تعذر نقل المجموعات.'
  },
  de: {
    'home.addFolder': 'Ordner hinzufügen',
    'home.untitledFolder': 'Unbenannter Ordner',
    'home.folderName': 'Ordnername',
    'home.emptyFolder': 'Dieser Ordner ist leer.',
    'home.rootDropArea': 'Sets aus Ordnern verschieben',
    'home.setsSelected': '{count} Set(s)',
    'home.folderCreateFailed': 'Ordner konnte nicht erstellt werden.',
    'home.folderRenameFailed': 'Ordner konnte nicht umbenannt werden.',
    'home.folderMoveFailed': 'Sets konnten nicht verschoben werden.'
  },
  ru: {
    'home.addFolder': 'Добавить папку',
    'home.untitledFolder': 'Папка без названия',
    'home.folderName': 'Название папки',
    'home.emptyFolder': 'Эта папка пуста.',
    'home.rootDropArea': 'Переместить наборы из папок',
    'home.setsSelected': '{count} набор(а)',
    'home.folderCreateFailed': 'Не удалось создать папку.',
    'home.folderRenameFailed': 'Не удалось переименовать папку.',
    'home.folderMoveFailed': 'Не удалось переместить наборы.'
  },
  ja: {
    'home.addFolder': 'フォルダーを追加',
    'home.untitledFolder': '名称未設定フォルダー',
    'home.folderName': 'フォルダー名',
    'home.emptyFolder': 'このフォルダーは空です。',
    'home.rootDropArea': 'セットをフォルダーの外へ移動',
    'home.setsSelected': '{count} 件のセット',
    'home.folderCreateFailed': 'フォルダーを作成できませんでした。',
    'home.folderRenameFailed': 'フォルダー名を変更できませんでした。',
    'home.folderMoveFailed': 'セットを移動できませんでした。'
  },
  ko: {
    'home.addFolder': '폴더 추가',
    'home.untitledFolder': '제목 없는 폴더',
    'home.folderName': '폴더 이름',
    'home.emptyFolder': '이 폴더는 비어 있습니다.',
    'home.rootDropArea': '세트를 폴더 밖으로 이동',
    'home.setsSelected': '세트 {count}개',
    'home.folderCreateFailed': '폴더를 만들지 못했습니다.',
    'home.folderRenameFailed': '폴더 이름을 바꾸지 못했습니다.',
    'home.folderMoveFailed': '세트를 이동하지 못했습니다.'
  }
}

for (const language of Object.keys(folderMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], folderMessages[language])
}

const factCheckMessages: Record<AppLanguage, Messages> = {
  en: {
    'factCheck.title': 'Fact Check',
    'factCheck.hint': 'Suggestions for factual corrections and important nuances.',
    'factCheck.loading': 'Loading fact-check response'
  },
  es: {
    'factCheck.title': 'Verificar hechos',
    'factCheck.hint': 'Sugerencias de correcciones factuales y matices importantes.',
    'factCheck.loading': 'Cargando la respuesta de verificación'
  },
  fr: {
    'factCheck.title': 'Vérifier les faits',
    'factCheck.hint': 'Suggestions de corrections factuelles et de nuances importantes.',
    'factCheck.loading': 'Chargement de la vérification'
  },
  'zh-CN': {
    'factCheck.title': '事实核查',
    'factCheck.hint': '针对事实错误和重要细微差别的建议。',
    'factCheck.loading': '正在加载事实核查结果'
  },
  hi: {
    'factCheck.title': 'तथ्य जाँच',
    'factCheck.hint': 'तथ्यात्मक सुधारों और महत्वपूर्ण बारीकियों के सुझाव।',
    'factCheck.loading': 'तथ्य-जाँच प्रतिक्रिया लोड हो रही है'
  },
  ar: {
    'factCheck.title': 'التحقق من الحقائق',
    'factCheck.hint': 'اقتراحات لتصحيح الحقائق وتوضيح الفروق المهمة.',
    'factCheck.loading': 'جارٍ تحميل نتيجة التحقق من الحقائق'
  },
  de: {
    'factCheck.title': 'Fakten prüfen',
    'factCheck.hint': 'Vorschläge für sachliche Korrekturen und wichtige Nuancen.',
    'factCheck.loading': 'Faktenprüfung wird geladen'
  },
  ru: {
    'factCheck.title': 'Проверить факты',
    'factCheck.hint': 'Предложения по исправлению фактов и важным уточнениям.',
    'factCheck.loading': 'Загрузка результата проверки фактов'
  },
  ja: {
    'factCheck.title': 'ファクトチェック',
    'factCheck.hint': '事実の訂正と重要なニュアンスに関する提案。',
    'factCheck.loading': 'ファクトチェックの結果を読み込み中'
  },
  ko: {
    'factCheck.title': '사실 확인',
    'factCheck.hint': '사실 수정 및 중요한 뉘앙스에 대한 제안입니다.',
    'factCheck.loading': '사실 확인 응답 불러오는 중'
  }
}

for (const language of Object.keys(factCheckMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], factCheckMessages[language])
}

const linkedFolderMessages: Record<AppLanguage, Messages> = {
  en: {
    'create.linkFolder': 'Link Folder',
    'create.linkingFolder': 'Linking…',
    'linkedFolder.status.synced': 'Synced',
    'linkedFolder.status.pending': 'Pending',
    'linkedFolder.status.syncing': 'Syncing…',
    'linkedFolder.status.error': 'Error',
    'linkedFolder.syncNow': 'Sync now',
    'linkedFolder.unlink': 'Unlink'
  },
  es: {
    'create.linkFolder': 'Vincular carpeta',
    'create.linkingFolder': 'Vinculando…',
    'linkedFolder.status.synced': 'Sincronizada', 'linkedFolder.status.pending': 'Pendiente', 'linkedFolder.status.syncing': 'Sincronizando…', 'linkedFolder.status.error': 'Error', 'linkedFolder.syncNow': 'Sincronizar ahora', 'linkedFolder.unlink': 'Desvincular'
  },
  fr: {
    'create.linkFolder': 'Lier un dossier',
    'create.linkingFolder': 'Liaison…',
    'linkedFolder.status.synced': 'Synchronisé', 'linkedFolder.status.pending': 'En attente', 'linkedFolder.status.syncing': 'Synchronisation…', 'linkedFolder.status.error': 'Erreur', 'linkedFolder.syncNow': 'Synchroniser', 'linkedFolder.unlink': 'Dissocier'
  },
  'zh-CN': {
    'create.linkFolder': '链接文件夹',
    'create.linkingFolder': '正在链接…',
    'linkedFolder.status.synced': '已同步', 'linkedFolder.status.pending': '待处理', 'linkedFolder.status.syncing': '正在同步…', 'linkedFolder.status.error': '错误', 'linkedFolder.syncNow': '立即同步', 'linkedFolder.unlink': '取消链接'
  },
  hi: {
    'create.linkFolder': 'फ़ोल्डर लिंक करें',
    'create.linkingFolder': 'लिंक हो रहा है…',
    'linkedFolder.status.synced': 'सिंक किया गया', 'linkedFolder.status.pending': 'लंबित', 'linkedFolder.status.syncing': 'सिंक हो रहा है…', 'linkedFolder.status.error': 'त्रुटि', 'linkedFolder.syncNow': 'अभी सिंक करें', 'linkedFolder.unlink': 'लिंक हटाएँ'
  },
  ar: {
    'create.linkFolder': 'ربط مجلد',
    'create.linkingFolder': 'جارٍ الربط…',
    'linkedFolder.status.synced': 'متزامن', 'linkedFolder.status.pending': 'قيد الانتظار', 'linkedFolder.status.syncing': 'جارٍ التزامن…', 'linkedFolder.status.error': 'خطأ', 'linkedFolder.syncNow': 'زامن الآن', 'linkedFolder.unlink': 'إلغاء الربط'
  },
  de: {
    'create.linkFolder': 'Ordner verknüpfen',
    'create.linkingFolder': 'Wird verknüpft…',
    'linkedFolder.status.synced': 'Synchronisiert', 'linkedFolder.status.pending': 'Ausstehend', 'linkedFolder.status.syncing': 'Synchronisierung…', 'linkedFolder.status.error': 'Fehler', 'linkedFolder.syncNow': 'Jetzt synchronisieren', 'linkedFolder.unlink': 'Verknüpfung lösen'
  },
  ru: {
    'create.linkFolder': 'Связать папку',
    'create.linkingFolder': 'Связывание…',
    'linkedFolder.status.synced': 'Синхронизировано', 'linkedFolder.status.pending': 'Ожидание', 'linkedFolder.status.syncing': 'Синхронизация…', 'linkedFolder.status.error': 'Ошибка', 'linkedFolder.syncNow': 'Синхронизировать', 'linkedFolder.unlink': 'Отвязать'
  },
  ja: {
    'create.linkFolder': 'フォルダーをリンク',
    'create.linkingFolder': 'リンク中…',
    'linkedFolder.status.synced': '同期済み', 'linkedFolder.status.pending': '保留中', 'linkedFolder.status.syncing': '同期中…', 'linkedFolder.status.error': 'エラー', 'linkedFolder.syncNow': '今すぐ同期', 'linkedFolder.unlink': 'リンク解除'
  },
  ko: {
    'create.linkFolder': '폴더 연결',
    'create.linkingFolder': '연결 중…',
    'linkedFolder.status.synced': '동기화됨', 'linkedFolder.status.pending': '대기 중', 'linkedFolder.status.syncing': '동기화 중…', 'linkedFolder.status.error': '오류', 'linkedFolder.syncNow': '지금 동기화', 'linkedFolder.unlink': '연결 해제'
  }
}

for (const language of Object.keys(linkedFolderMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], linkedFolderMessages[language])
}

const authAccountMessages: Record<AppLanguage, Messages> = {
  en: {
    'auth.accountDescription': 'Create or access your Tracer account, then protect this device with a separate app password.', 'auth.notConfigured': 'Account signup is not configured on this build.', 'auth.google': 'Sign up with Google', 'auth.openingBrowser': 'Opening Google…', 'auth.orEmail': 'or use email', 'auth.accountPassword': 'Password', 'auth.signUpEmail': 'Sign up with email', 'auth.signInEmail': 'Sign in with email', 'auth.haveAccount': 'Already have an account? Sign in', 'auth.needAccount': 'Need an account? Sign up', 'auth.copyBrowserLink': 'The browser could not be opened. Copy the secure authorization link and open it manually.', 'auth.checkEmail': 'We sent a verification link to {email}.', 'auth.waitingVerification': 'Waiting for email verification. This page will continue automatically when you return.', 'auth.resend': 'Resend verification email', 'auth.resendIn': 'Resend in {seconds}s', 'auth.returnToSignIn': 'Return to sign in', 'auth.localPasswordDescription': 'Your account is connected. Now create a separate password that encrypts secrets stored on this device.', 'auth.accountConnected': 'Google account connected', 'auth.localPassword': 'Local app password', 'auth.finishSetup': 'Finish setup', 'auth.errorName': 'Enter your name.', 'auth.errorEmailPassword': 'Enter a valid email and an account password of at least 8 characters.', 'auth.errorLocalPassword': 'The local app password must be at least 8 characters.', 'auth.errorPasswordsMatch': 'Passwords do not match.', 'auth.errorAccountMismatch': 'This installation belongs to a different account. Reset Tracer before switching accounts.', 'auth.errorBrowser': 'Tracer could not open your browser.', 'auth.errorTimeout': 'The authentication callback timed out. Try again.', 'auth.errorUnverified': 'Verify your email before signing in.', 'auth.errorMissingEmail': 'The provider did not return an email address.', 'auth.errorNetwork': 'Tracer could not reach the account service. Check your connection and retry.', 'auth.errorCancelled': 'Authentication was cancelled.', 'auth.errorProfile': 'Your account connected, but Tracer could not finish creating the cloud profile. Retry setup.', 'auth.errorUnknown': 'Authentication failed. Try again.', 'settings.account': 'Account', 'settings.accountOffline': 'Offline · local access available', 'settings.accountOnline': 'Connected', 'settings.reconnect': 'Reconnect', 'settings.accountSignedOut': 'Signed out · local data preserved'
  },
  es: {
    'auth.accountDescription': 'Crea o accede a tu cuenta de Tracer y protege este dispositivo con una contraseña independiente.', 'auth.notConfigured': 'El registro de cuentas no está configurado en esta versión.', 'auth.google': 'Registrarse con Google', 'auth.openingBrowser': 'Abriendo Google…', 'auth.orEmail': 'o usa el correo', 'auth.accountPassword': 'Contraseña', 'auth.signUpEmail': 'Registrarse con correo', 'auth.signInEmail': 'Iniciar sesión con correo', 'auth.haveAccount': '¿Ya tienes cuenta? Inicia sesión', 'auth.needAccount': '¿Necesitas una cuenta? Regístrate', 'auth.copyBrowserLink': 'No se pudo abrir el navegador. Copia el enlace seguro y ábrelo manualmente.', 'auth.checkEmail': 'Enviamos un enlace de verificación a {email}.', 'auth.waitingVerification': 'Esperando la verificación del correo. Esta página continuará automáticamente.', 'auth.resend': 'Reenviar correo de verificación', 'auth.resendIn': 'Reenviar en {seconds}s', 'auth.returnToSignIn': 'Volver a iniciar sesión', 'auth.localPasswordDescription': 'Tu cuenta está conectada. Crea una contraseña independiente para cifrar los secretos de este dispositivo.', 'auth.accountConnected': 'Cuenta de Google conectada', 'auth.localPassword': 'Contraseña local de la aplicación', 'auth.finishSetup': 'Finalizar configuración', 'auth.errorName': 'Introduce tu nombre.', 'auth.errorEmailPassword': 'Introduce un correo válido y una contraseña de al menos 8 caracteres.', 'auth.errorLocalPassword': 'La contraseña local debe tener al menos 8 caracteres.', 'auth.errorPasswordsMatch': 'Las contraseñas no coinciden.', 'auth.errorAccountMismatch': 'Esta instalación pertenece a otra cuenta. Restablece Tracer para cambiar.', 'auth.errorBrowser': 'Tracer no pudo abrir el navegador.', 'auth.errorTimeout': 'La autenticación agotó el tiempo. Inténtalo de nuevo.', 'auth.errorUnverified': 'Verifica tu correo antes de iniciar sesión.', 'auth.errorMissingEmail': 'El proveedor no devolvió un correo.', 'auth.errorNetwork': 'No se pudo acceder al servicio de cuentas. Revisa tu conexión.', 'auth.errorCancelled': 'Se canceló la autenticación.', 'auth.errorProfile': 'La cuenta se conectó, pero no se pudo crear el perfil. Reintenta.', 'auth.errorUnknown': 'Falló la autenticación. Inténtalo de nuevo.', 'settings.account': 'Cuenta', 'settings.accountOffline': 'Sin conexión · acceso local disponible', 'settings.accountOnline': 'Conectada', 'settings.reconnect': 'Reconectar', 'settings.accountSignedOut': 'Sesión cerrada · datos locales conservados'
  },
  fr: {
    'auth.accountDescription': 'Créez ou ouvrez votre compte Tracer, puis protégez cet appareil avec un mot de passe distinct.', 'auth.notConfigured': 'La création de compte n’est pas configurée dans cette version.', 'auth.google': 'S’inscrire avec Google', 'auth.openingBrowser': 'Ouverture de Google…', 'auth.orEmail': 'ou utiliser l’e-mail', 'auth.accountPassword': 'Mot de passe', 'auth.signUpEmail': 'S’inscrire par e-mail', 'auth.signInEmail': 'Se connecter par e-mail', 'auth.haveAccount': 'Déjà un compte ? Se connecter', 'auth.needAccount': 'Besoin d’un compte ? S’inscrire', 'auth.copyBrowserLink': 'Le navigateur n’a pas pu s’ouvrir. Copiez le lien sécurisé et ouvrez-le manuellement.', 'auth.checkEmail': 'Un lien de vérification a été envoyé à {email}.', 'auth.waitingVerification': 'En attente de la vérification. Cette page continuera automatiquement.', 'auth.resend': 'Renvoyer l’e-mail', 'auth.resendIn': 'Renvoyer dans {seconds}s', 'auth.returnToSignIn': 'Retour à la connexion', 'auth.localPasswordDescription': 'Votre compte est connecté. Créez un mot de passe distinct pour chiffrer les secrets de cet appareil.', 'auth.accountConnected': 'Compte Google connecté', 'auth.localPassword': 'Mot de passe local', 'auth.finishSetup': 'Terminer la configuration', 'auth.errorName': 'Saisissez votre nom.', 'auth.errorEmailPassword': 'Saisissez un e-mail valide et un mot de passe d’au moins 8 caractères.', 'auth.errorLocalPassword': 'Le mot de passe local doit contenir au moins 8 caractères.', 'auth.errorPasswordsMatch': 'Les mots de passe ne correspondent pas.', 'auth.errorAccountMismatch': 'Cette installation appartient à un autre compte. Réinitialisez Tracer pour changer.', 'auth.errorBrowser': 'Tracer n’a pas pu ouvrir le navigateur.', 'auth.errorTimeout': 'L’authentification a expiré. Réessayez.', 'auth.errorUnverified': 'Vérifiez votre e-mail avant de vous connecter.', 'auth.errorMissingEmail': 'Le fournisseur n’a pas renvoyé d’adresse e-mail.', 'auth.errorNetwork': 'Impossible de joindre le service de comptes. Vérifiez votre connexion.', 'auth.errorCancelled': 'Authentification annulée.', 'auth.errorProfile': 'Compte connecté, mais création du profil impossible. Réessayez.', 'auth.errorUnknown': 'Échec de l’authentification. Réessayez.', 'settings.account': 'Compte', 'settings.accountOffline': 'Hors ligne · accès local disponible', 'settings.accountOnline': 'Connecté', 'settings.reconnect': 'Reconnecter', 'settings.accountSignedOut': 'Déconnecté · données locales conservées'
  },
  'zh-CN': {
    'auth.accountDescription': '创建或登录 Tracer 帐户，然后使用单独的应用密码保护此设备。', 'auth.notConfigured': '此版本未配置帐户注册。', 'auth.google': '使用 Google 注册', 'auth.openingBrowser': '正在打开 Google…', 'auth.orEmail': '或使用电子邮件', 'auth.accountPassword': '密码', 'auth.signUpEmail': '使用电子邮件注册', 'auth.signInEmail': '使用电子邮件登录', 'auth.haveAccount': '已有帐户？登录', 'auth.needAccount': '需要帐户？注册', 'auth.copyBrowserLink': '无法打开浏览器。请复制安全授权链接并手动打开。', 'auth.checkEmail': '验证链接已发送至 {email}。', 'auth.waitingVerification': '正在等待电子邮件验证。返回后此页面会自动继续。', 'auth.resend': '重新发送验证邮件', 'auth.resendIn': '{seconds} 秒后重发', 'auth.returnToSignIn': '返回登录', 'auth.localPasswordDescription': '帐户已连接。现在创建一个单独的密码来加密此设备上的密钥。', 'auth.accountConnected': 'Google 帐户已连接', 'auth.localPassword': '本地应用密码', 'auth.finishSetup': '完成设置', 'auth.errorName': '请输入姓名。', 'auth.errorEmailPassword': '请输入有效电子邮件和至少 8 个字符的帐户密码。', 'auth.errorLocalPassword': '本地应用密码至少需要 8 个字符。', 'auth.errorPasswordsMatch': '密码不匹配。', 'auth.errorAccountMismatch': '此安装属于其他帐户。切换帐户前请重置 Tracer。', 'auth.errorBrowser': 'Tracer 无法打开浏览器。', 'auth.errorTimeout': '身份验证超时，请重试。', 'auth.errorUnverified': '登录前请验证电子邮件。', 'auth.errorMissingEmail': '提供商未返回电子邮件地址。', 'auth.errorNetwork': '无法连接帐户服务，请检查网络。', 'auth.errorCancelled': '身份验证已取消。', 'auth.errorProfile': '帐户已连接，但无法创建云端个人资料。请重试。', 'auth.errorUnknown': '身份验证失败，请重试。', 'settings.account': '帐户', 'settings.accountOffline': '离线 · 可使用本地功能', 'settings.accountOnline': '已连接', 'settings.reconnect': '重新连接', 'settings.accountSignedOut': '已退出 · 本地数据已保留'
  },
  hi: {
    'auth.accountDescription': 'Tracer खाता बनाएँ या खोलें, फिर अलग ऐप पासवर्ड से इस डिवाइस को सुरक्षित करें।', 'auth.notConfigured': 'इस बिल्ड में खाता साइनअप कॉन्फ़िगर नहीं है।', 'auth.google': 'Google से साइन अप करें', 'auth.openingBrowser': 'Google खुल रहा है…', 'auth.orEmail': 'या ईमेल का उपयोग करें', 'auth.accountPassword': 'पासवर्ड', 'auth.signUpEmail': 'ईमेल से साइन अप करें', 'auth.signInEmail': 'ईमेल से साइन इन करें', 'auth.haveAccount': 'पहले से खाता है? साइन इन करें', 'auth.needAccount': 'खाता चाहिए? साइन अप करें', 'auth.copyBrowserLink': 'ब्राउज़र नहीं खुला। सुरक्षित लिंक कॉपी करके स्वयं खोलें।', 'auth.checkEmail': '{email} पर सत्यापन लिंक भेजा गया है।', 'auth.waitingVerification': 'ईमेल सत्यापन की प्रतीक्षा है। लौटने पर यह पृष्ठ अपने आप आगे बढ़ेगा।', 'auth.resend': 'सत्यापन ईमेल फिर भेजें', 'auth.resendIn': '{seconds}से. में फिर भेजें', 'auth.returnToSignIn': 'साइन इन पर लौटें', 'auth.localPasswordDescription': 'खाता जुड़ गया है। इस डिवाइस के रहस्यों के लिए अलग पासवर्ड बनाएँ।', 'auth.accountConnected': 'Google खाता जुड़ा', 'auth.localPassword': 'स्थानीय ऐप पासवर्ड', 'auth.finishSetup': 'सेटअप पूरा करें', 'auth.errorName': 'अपना नाम दर्ज करें।', 'auth.errorEmailPassword': 'मान्य ईमेल और कम से कम 8 अक्षरों का पासवर्ड दर्ज करें।', 'auth.errorLocalPassword': 'स्थानीय पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।', 'auth.errorPasswordsMatch': 'पासवर्ड मेल नहीं खाते।', 'auth.errorAccountMismatch': 'यह इंस्टॉलेशन दूसरे खाते का है। बदलने से पहले Tracer रीसेट करें।', 'auth.errorBrowser': 'Tracer ब्राउज़र नहीं खोल सका।', 'auth.errorTimeout': 'प्रमाणीकरण का समय समाप्त हुआ। फिर प्रयास करें।', 'auth.errorUnverified': 'साइन इन से पहले ईमेल सत्यापित करें।', 'auth.errorMissingEmail': 'प्रदाता ने ईमेल नहीं दिया।', 'auth.errorNetwork': 'खाता सेवा तक नहीं पहुँच सके। कनेक्शन जाँचें।', 'auth.errorCancelled': 'प्रमाणीकरण रद्द हुआ।', 'auth.errorProfile': 'खाता जुड़ा, पर प्रोफ़ाइल नहीं बन सकी। फिर प्रयास करें।', 'auth.errorUnknown': 'प्रमाणीकरण विफल। फिर प्रयास करें।', 'settings.account': 'खाता', 'settings.accountOffline': 'ऑफ़लाइन · स्थानीय पहुँच उपलब्ध', 'settings.accountOnline': 'जुड़ा हुआ', 'settings.reconnect': 'फिर जोड़ें', 'settings.accountSignedOut': 'साइन आउट · स्थानीय डेटा सुरक्षित'
  },
  ar: {
    'auth.accountDescription': 'أنشئ حساب Tracer أو افتحه، ثم احمِ هذا الجهاز بكلمة مرور منفصلة.', 'auth.notConfigured': 'إنشاء الحساب غير مهيأ في هذا الإصدار.', 'auth.google': 'التسجيل باستخدام Google', 'auth.openingBrowser': 'جارٍ فتح Google…', 'auth.orEmail': 'أو استخدم البريد', 'auth.accountPassword': 'كلمة المرور', 'auth.signUpEmail': 'التسجيل بالبريد', 'auth.signInEmail': 'الدخول بالبريد', 'auth.haveAccount': 'لديك حساب؟ سجّل الدخول', 'auth.needAccount': 'تحتاج حسابًا؟ سجّل', 'auth.copyBrowserLink': 'تعذر فتح المتصفح. انسخ رابط التفويض الآمن وافتحه يدويًا.', 'auth.checkEmail': 'أرسلنا رابط تحقق إلى {email}.', 'auth.waitingVerification': 'بانتظار تحقق البريد. ستتابع الصفحة تلقائيًا عند عودتك.', 'auth.resend': 'إعادة إرسال رسالة التحقق', 'auth.resendIn': 'إعادة الإرسال خلال {seconds}ث', 'auth.returnToSignIn': 'العودة لتسجيل الدخول', 'auth.localPasswordDescription': 'تم ربط الحساب. أنشئ كلمة مرور منفصلة لتشفير أسرار هذا الجهاز.', 'auth.accountConnected': 'حساب Supabase متصل', 'auth.localPassword': 'كلمة مرور التطبيق المحلية', 'auth.finishSetup': 'إنهاء الإعداد', 'auth.errorName': 'أدخل اسمك.', 'auth.errorEmailPassword': 'أدخل بريدًا صالحًا وكلمة مرور من 8 أحرف على الأقل.', 'auth.errorLocalPassword': 'يجب أن تتكون كلمة المرور المحلية من 8 أحرف على الأقل.', 'auth.errorPasswordsMatch': 'كلمتا المرور غير متطابقتين.', 'auth.errorAccountMismatch': 'هذا التثبيت مرتبط بحساب آخر. أعد ضبط Tracer قبل التبديل.', 'auth.errorBrowser': 'تعذر على Tracer فتح المتصفح.', 'auth.errorTimeout': 'انتهت مهلة المصادقة. حاول مجددًا.', 'auth.errorUnverified': 'تحقق من بريدك قبل تسجيل الدخول.', 'auth.errorMissingEmail': 'لم يوفر المزوّد بريدًا إلكترونيًا.', 'auth.errorNetwork': 'تعذر الوصول إلى خدمة الحساب. تحقق من الاتصال.', 'auth.errorCancelled': 'أُلغيت المصادقة.', 'auth.errorProfile': 'تم ربط الحساب لكن تعذر إنشاء الملف السحابي. حاول مجددًا.', 'auth.errorUnknown': 'فشلت المصادقة. حاول مجددًا.', 'settings.account': 'الحساب', 'settings.accountOffline': 'غير متصل · الوصول المحلي متاح', 'settings.accountOnline': 'متصل', 'settings.reconnect': 'إعادة الاتصال', 'settings.accountSignedOut': 'تم تسجيل الخروج · البيانات المحلية محفوظة'
  },
  de: {
    'auth.accountDescription': 'Erstelle oder öffne dein Tracer-Konto und schütze dieses Gerät mit einem separaten App-Passwort.', 'auth.notConfigured': 'Die Kontoanmeldung ist in diesem Build nicht konfiguriert.', 'auth.google': 'Mit Google registrieren', 'auth.openingBrowser': 'Google wird geöffnet…', 'auth.orEmail': 'oder E-Mail verwenden', 'auth.accountPassword': 'Passwort', 'auth.signUpEmail': 'Mit E-Mail registrieren', 'auth.signInEmail': 'Mit E-Mail anmelden', 'auth.haveAccount': 'Schon ein Konto? Anmelden', 'auth.needAccount': 'Konto benötigt? Registrieren', 'auth.copyBrowserLink': 'Der Browser konnte nicht geöffnet werden. Kopiere den sicheren Link und öffne ihn manuell.', 'auth.checkEmail': 'Ein Bestätigungslink wurde an {email} gesendet.', 'auth.waitingVerification': 'E-Mail-Bestätigung ausstehend. Diese Seite fährt danach automatisch fort.', 'auth.resend': 'Bestätigungs-E-Mail erneut senden', 'auth.resendIn': 'Erneut senden in {seconds}s', 'auth.returnToSignIn': 'Zurück zur Anmeldung', 'auth.localPasswordDescription': 'Dein Konto ist verbunden. Erstelle ein separates Passwort für die Geheimnisse auf diesem Gerät.', 'auth.accountConnected': 'Google-Konto verbunden', 'auth.localPassword': 'Lokales App-Passwort', 'auth.finishSetup': 'Einrichtung abschließen', 'auth.errorName': 'Gib deinen Namen ein.', 'auth.errorEmailPassword': 'Gib eine gültige E-Mail und ein Kontopasswort mit mindestens 8 Zeichen ein.', 'auth.errorLocalPassword': 'Das lokale Passwort muss mindestens 8 Zeichen haben.', 'auth.errorPasswordsMatch': 'Die Passwörter stimmen nicht überein.', 'auth.errorAccountMismatch': 'Diese Installation gehört zu einem anderen Konto. Setze Tracer vor dem Wechsel zurück.', 'auth.errorBrowser': 'Tracer konnte den Browser nicht öffnen.', 'auth.errorTimeout': 'Zeitüberschreitung bei der Anmeldung. Versuche es erneut.', 'auth.errorUnverified': 'Bestätige vor der Anmeldung deine E-Mail.', 'auth.errorMissingEmail': 'Der Anbieter hat keine E-Mail-Adresse geliefert.', 'auth.errorNetwork': 'Der Kontodienst ist nicht erreichbar. Prüfe die Verbindung.', 'auth.errorCancelled': 'Anmeldung abgebrochen.', 'auth.errorProfile': 'Konto verbunden, Cloud-Profil konnte aber nicht erstellt werden. Versuche es erneut.', 'auth.errorUnknown': 'Anmeldung fehlgeschlagen. Versuche es erneut.', 'settings.account': 'Konto', 'settings.accountOffline': 'Offline · lokaler Zugriff verfügbar', 'settings.accountOnline': 'Verbunden', 'settings.reconnect': 'Neu verbinden', 'settings.accountSignedOut': 'Abgemeldet · lokale Daten erhalten'
  },
  ru: {
    'auth.accountDescription': 'Создайте или откройте аккаунт Tracer, затем защитите устройство отдельным паролем.', 'auth.notConfigured': 'Регистрация аккаунта не настроена в этой сборке.', 'auth.google': 'Регистрация через Google', 'auth.openingBrowser': 'Открывается Google…', 'auth.orEmail': 'или используйте почту', 'auth.accountPassword': 'Пароль', 'auth.signUpEmail': 'Регистрация по почте', 'auth.signInEmail': 'Войти по почте', 'auth.haveAccount': 'Уже есть аккаунт? Войти', 'auth.needAccount': 'Нужен аккаунт? Зарегистрироваться', 'auth.copyBrowserLink': 'Не удалось открыть браузер. Скопируйте безопасную ссылку и откройте вручную.', 'auth.checkEmail': 'Ссылка для подтверждения отправлена на {email}.', 'auth.waitingVerification': 'Ожидается подтверждение почты. После возврата страница продолжит автоматически.', 'auth.resend': 'Отправить письмо повторно', 'auth.resendIn': 'Повторить через {seconds}с', 'auth.returnToSignIn': 'Вернуться ко входу', 'auth.localPasswordDescription': 'Аккаунт подключён. Создайте отдельный пароль для шифрования секретов устройства.', 'auth.accountConnected': 'Аккаунт Google подключён', 'auth.localPassword': 'Локальный пароль приложения', 'auth.finishSetup': 'Завершить настройку', 'auth.errorName': 'Введите имя.', 'auth.errorEmailPassword': 'Введите корректную почту и пароль не короче 8 символов.', 'auth.errorLocalPassword': 'Локальный пароль должен содержать не менее 8 символов.', 'auth.errorPasswordsMatch': 'Пароли не совпадают.', 'auth.errorAccountMismatch': 'Эта установка связана с другим аккаунтом. Перед сменой сбросьте Tracer.', 'auth.errorBrowser': 'Tracer не смог открыть браузер.', 'auth.errorTimeout': 'Время ожидания истекло. Повторите попытку.', 'auth.errorUnverified': 'Подтвердите почту перед входом.', 'auth.errorMissingEmail': 'Провайдер не вернул адрес почты.', 'auth.errorNetwork': 'Сервис аккаунта недоступен. Проверьте подключение.', 'auth.errorCancelled': 'Аутентификация отменена.', 'auth.errorProfile': 'Аккаунт подключён, но профиль не создан. Повторите попытку.', 'auth.errorUnknown': 'Ошибка аутентификации. Повторите попытку.', 'settings.account': 'Аккаунт', 'settings.accountOffline': 'Офлайн · локальный доступ доступен', 'settings.accountOnline': 'Подключён', 'settings.reconnect': 'Переподключить', 'settings.accountSignedOut': 'Выход выполнен · локальные данные сохранены'
  },
  ja: {
    'auth.accountDescription': 'Tracer アカウントを作成または開き、別のアプリパスワードでこの端末を保護します。', 'auth.notConfigured': 'このビルドではアカウント登録が設定されていません。', 'auth.google': 'Google で登録', 'auth.openingBrowser': 'Google を開いています…', 'auth.orEmail': 'またはメールを使用', 'auth.accountPassword': 'パスワード', 'auth.signUpEmail': 'メールで登録', 'auth.signInEmail': 'メールでサインイン', 'auth.haveAccount': 'アカウントをお持ちですか？ サインイン', 'auth.needAccount': 'アカウントが必要ですか？ 登録', 'auth.copyBrowserLink': 'ブラウザーを開けませんでした。安全なリンクをコピーして手動で開いてください。', 'auth.checkEmail': '{email} に確認リンクを送信しました。', 'auth.waitingVerification': 'メール確認を待っています。戻ると自動的に続行します。', 'auth.resend': '確認メールを再送', 'auth.resendIn': '{seconds}秒後に再送', 'auth.returnToSignIn': 'サインインに戻る', 'auth.localPasswordDescription': 'アカウントが接続されました。この端末の秘密を暗号化する別のパスワードを作成します。', 'auth.accountConnected': 'Google アカウント接続済み', 'auth.localPassword': 'ローカルアプリパスワード', 'auth.finishSetup': '設定を完了', 'auth.errorName': '名前を入力してください。', 'auth.errorEmailPassword': '有効なメールと8文字以上のパスワードを入力してください。', 'auth.errorLocalPassword': 'ローカルパスワードは8文字以上必要です。', 'auth.errorPasswordsMatch': 'パスワードが一致しません。', 'auth.errorAccountMismatch': 'このインストールは別のアカウントに属します。切り替える前に Tracer をリセットしてください。', 'auth.errorBrowser': 'ブラウザーを開けませんでした。', 'auth.errorTimeout': '認証がタイムアウトしました。再試行してください。', 'auth.errorUnverified': 'サインイン前にメールを確認してください。', 'auth.errorMissingEmail': 'プロバイダーからメールアドレスが返されませんでした。', 'auth.errorNetwork': 'アカウントサービスに接続できません。接続を確認してください。', 'auth.errorCancelled': '認証がキャンセルされました。', 'auth.errorProfile': 'アカウントは接続されましたが、プロフィールを作成できませんでした。再試行してください。', 'auth.errorUnknown': '認証に失敗しました。再試行してください。', 'settings.account': 'アカウント', 'settings.accountOffline': 'オフライン · ローカルアクセス可能', 'settings.accountOnline': '接続済み', 'settings.reconnect': '再接続', 'settings.accountSignedOut': 'サインアウト済み · ローカルデータ保持'
  },
  ko: {
    'auth.accountDescription': 'Tracer 계정을 만들거나 연 다음 별도의 앱 비밀번호로 이 기기를 보호하세요.', 'auth.notConfigured': '이 빌드에는 계정 가입이 구성되지 않았습니다.', 'auth.google': 'Google로 가입', 'auth.openingBrowser': 'Google 여는 중…', 'auth.orEmail': '또는 이메일 사용', 'auth.accountPassword': '비밀번호', 'auth.signUpEmail': '이메일로 가입', 'auth.signInEmail': '이메일로 로그인', 'auth.haveAccount': '계정이 있나요? 로그인', 'auth.needAccount': '계정이 필요한가요? 가입', 'auth.copyBrowserLink': '브라우저를 열 수 없습니다. 안전한 링크를 복사해 직접 여세요.', 'auth.checkEmail': '{email}로 확인 링크를 보냈습니다.', 'auth.waitingVerification': '이메일 확인을 기다리는 중입니다. 돌아오면 자동으로 계속됩니다.', 'auth.resend': '확인 이메일 다시 보내기', 'auth.resendIn': '{seconds}초 후 다시 보내기', 'auth.returnToSignIn': '로그인으로 돌아가기', 'auth.localPasswordDescription': '계정이 연결되었습니다. 이 기기의 비밀을 암호화할 별도 비밀번호를 만드세요.', 'auth.accountConnected': 'Supabase 계정 연결됨', 'auth.localPassword': '로컬 앱 비밀번호', 'auth.finishSetup': '설정 완료', 'auth.errorName': '이름을 입력하세요.', 'auth.errorEmailPassword': '올바른 이메일과 8자 이상의 비밀번호를 입력하세요.', 'auth.errorLocalPassword': '로컬 비밀번호는 8자 이상이어야 합니다.', 'auth.errorPasswordsMatch': '비밀번호가 일치하지 않습니다.', 'auth.errorAccountMismatch': '이 설치는 다른 계정에 연결되어 있습니다. 전환 전에 Tracer를 초기화하세요.', 'auth.errorBrowser': 'Tracer가 브라우저를 열 수 없습니다.', 'auth.errorTimeout': '인증 시간이 초과되었습니다. 다시 시도하세요.', 'auth.errorUnverified': '로그인 전에 이메일을 확인하세요.', 'auth.errorMissingEmail': '공급자가 이메일 주소를 반환하지 않았습니다.', 'auth.errorNetwork': '계정 서비스에 연결할 수 없습니다. 연결을 확인하세요.', 'auth.errorCancelled': '인증이 취소되었습니다.', 'auth.errorProfile': '계정은 연결되었지만 프로필을 만들 수 없습니다. 다시 시도하세요.', 'auth.errorUnknown': '인증에 실패했습니다. 다시 시도하세요.', 'settings.account': '계정', 'settings.accountOffline': '오프라인 · 로컬 사용 가능', 'settings.accountOnline': '연결됨', 'settings.reconnect': '다시 연결', 'settings.accountSignedOut': '로그아웃됨 · 로컬 데이터 유지'
  }
}

for (const language of Object.keys(authAccountMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], authAccountMessages[language])
}

const signupRoleMessages: Record<AppLanguage, Messages> = {
  en: {
    'auth.accountType': 'Account type', 'auth.students': 'Students', 'auth.teachers': 'Teachers', 'auth.googleSignIn': 'Sign in with Google', 'auth.or': 'OR', 'auth.agreePrefix': 'I have read and agreed to Tracer’s', 'auth.termsOfService': 'Terms of Service', 'auth.and': 'and', 'auth.privacyPolicy': 'Privacy Policy', 'auth.letsGo': 'Let’s go!', 'auth.errorTerms': 'Agree to the Terms of Service and Privacy Policy to continue.'
  },
  es: {
    'auth.accountType': 'Tipo de cuenta', 'auth.students': 'Estudiantes', 'auth.teachers': 'Docentes', 'auth.googleSignIn': 'Iniciar sesión con Google', 'auth.or': 'O', 'auth.agreePrefix': 'He leído y acepto los', 'auth.termsOfService': 'Términos del servicio', 'auth.and': 'y la', 'auth.privacyPolicy': 'Política de privacidad', 'auth.letsGo': '¡Vamos!', 'auth.errorTerms': 'Acepta los Términos del servicio y la Política de privacidad para continuar.'
  },
  fr: {
    'auth.accountType': 'Type de compte', 'auth.students': 'Élèves', 'auth.teachers': 'Enseignants', 'auth.googleSignIn': 'Se connecter avec Google', 'auth.or': 'OU', 'auth.agreePrefix': 'J’ai lu et accepté les', 'auth.termsOfService': 'Conditions d’utilisation', 'auth.and': 'et la', 'auth.privacyPolicy': 'Politique de confidentialité', 'auth.letsGo': 'C’est parti !', 'auth.errorTerms': 'Acceptez les Conditions d’utilisation et la Politique de confidentialité pour continuer.'
  },
  'zh-CN': {
    'auth.accountType': '帐户类型', 'auth.students': '学生', 'auth.teachers': '教师', 'auth.googleSignIn': '使用 Google 登录', 'auth.or': '或', 'auth.agreePrefix': '我已阅读并同意 Tracer 的', 'auth.termsOfService': '服务条款', 'auth.and': '和', 'auth.privacyPolicy': '隐私政策', 'auth.letsGo': '开始吧！', 'auth.errorTerms': '请同意服务条款和隐私政策后继续。'
  },
  hi: {
    'auth.accountType': 'खाता प्रकार', 'auth.students': 'विद्यार्थी', 'auth.teachers': 'शिक्षक', 'auth.googleSignIn': 'Google से साइन इन करें', 'auth.or': 'या', 'auth.agreePrefix': 'मैंने Tracer की', 'auth.termsOfService': 'सेवा की शर्तें', 'auth.and': 'और', 'auth.privacyPolicy': 'गोपनीयता नीति', 'auth.letsGo': 'चलिए!', 'auth.errorTerms': 'जारी रखने के लिए सेवा की शर्तों और गोपनीयता नीति से सहमत हों।'
  },
  ar: {
    'auth.accountType': 'نوع الحساب', 'auth.students': 'الطلاب', 'auth.teachers': 'المعلمون', 'auth.googleSignIn': 'تسجيل الدخول باستخدام Google', 'auth.or': 'أو', 'auth.agreePrefix': 'لقد قرأت ووافقت على', 'auth.termsOfService': 'شروط الخدمة', 'auth.and': 'و', 'auth.privacyPolicy': 'سياسة الخصوصية', 'auth.letsGo': 'هيا بنا!', 'auth.errorTerms': 'وافق على شروط الخدمة وسياسة الخصوصية للمتابعة.'
  },
  de: {
    'auth.accountType': 'Kontotyp', 'auth.students': 'Lernende', 'auth.teachers': 'Lehrkräfte', 'auth.googleSignIn': 'Mit Google anmelden', 'auth.or': 'ODER', 'auth.agreePrefix': 'Ich habe Tracers', 'auth.termsOfService': 'Nutzungsbedingungen', 'auth.and': 'und', 'auth.privacyPolicy': 'Datenschutzerklärung', 'auth.letsGo': 'Los geht’s!', 'auth.errorTerms': 'Stimme den Nutzungsbedingungen und der Datenschutzerklärung zu, um fortzufahren.'
  },
  ru: {
    'auth.accountType': 'Тип аккаунта', 'auth.students': 'Ученики', 'auth.teachers': 'Учителя', 'auth.googleSignIn': 'Войти через Google', 'auth.or': 'ИЛИ', 'auth.agreePrefix': 'Я прочитал(-а) и принимаю', 'auth.termsOfService': 'Условия использования', 'auth.and': 'и', 'auth.privacyPolicy': 'Политику конфиденциальности', 'auth.letsGo': 'Начнём!', 'auth.errorTerms': 'Примите Условия использования и Политику конфиденциальности, чтобы продолжить.'
  },
  ja: {
    'auth.accountType': 'アカウントの種類', 'auth.students': '生徒', 'auth.teachers': '教師', 'auth.googleSignIn': 'Google でサインイン', 'auth.or': 'または', 'auth.agreePrefix': 'Tracer の', 'auth.termsOfService': '利用規約', 'auth.and': 'と', 'auth.privacyPolicy': 'プライバシーポリシー', 'auth.letsGo': '始めましょう！', 'auth.errorTerms': '続行するには利用規約とプライバシーポリシーに同意してください。'
  },
  ko: {
    'auth.accountType': '계정 유형', 'auth.students': '학생', 'auth.teachers': '교사', 'auth.googleSignIn': 'Google로 로그인', 'auth.or': '또는', 'auth.agreePrefix': 'Tracer의', 'auth.termsOfService': '서비스 약관', 'auth.and': '및', 'auth.privacyPolicy': '개인정보 처리방침', 'auth.letsGo': '시작해요!', 'auth.errorTerms': '계속하려면 서비스 약관과 개인정보 처리방침에 동의하세요.'
  }
}

for (const language of Object.keys(signupRoleMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], signupRoleMessages[language])
}

const roleSetupErrorMessages: Record<AppLanguage, Messages> = {
  en: { 'auth.errorRole': 'Your account and profile are connected, but Tracer could not assign the selected role. Retry setup.' },
  es: { 'auth.errorRole': 'Tu cuenta y tu perfil están conectados, pero Tracer no pudo asignar el rol seleccionado. Reintenta la configuración.' },
  fr: { 'auth.errorRole': 'Votre compte et votre profil sont connectés, mais Tracer n’a pas pu attribuer le rôle sélectionné. Réessayez la configuration.' },
  'zh-CN': { 'auth.errorRole': '你的帐户和个人资料已连接，但 Tracer 无法分配所选角色。请重试设置。' },
  hi: { 'auth.errorRole': 'आपका खाता और प्रोफ़ाइल जुड़ गए हैं, लेकिन Tracer चुनी गई भूमिका असाइन नहीं कर सका। सेटअप फिर से आज़माएँ।' },
  ar: { 'auth.errorRole': 'تم ربط الحساب والملف الشخصي، لكن تعذر على Tracer تعيين الدور المحدد. أعد محاولة الإعداد.' },
  de: { 'auth.errorRole': 'Dein Konto und Profil sind verbunden, aber Tracer konnte die ausgewählte Rolle nicht zuweisen. Versuche die Einrichtung erneut.' },
  ru: { 'auth.errorRole': 'Аккаунт и профиль подключены, но Tracer не удалось назначить выбранную роль. Повторите настройку.' },
  ja: { 'auth.errorRole': 'アカウントとプロフィールは接続されましたが、Tracer は選択した役割を割り当てられませんでした。設定を再試行してください。' },
  ko: { 'auth.errorRole': '계정과 프로필은 연결되었지만 Tracer가 선택한 역할을 할당하지 못했습니다. 설정을 다시 시도하세요.' },
}

for (const language of Object.keys(roleSetupErrorMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], roleSetupErrorMessages[language])
}

const homeLibraryMessages: Record<AppLanguage, Messages> = {
  en: { 'home.libraryType': 'Library type', 'home.flashcards': 'Flashcards', 'home.studyGuides': 'Study guides', 'home.classes': 'Classes', 'home.noClasses': 'No classes yet.' },
  es: { 'home.libraryType': 'Tipo de biblioteca', 'home.flashcards': 'Tarjetas', 'home.studyGuides': 'Guías de estudio', 'home.classes': 'Clases', 'home.noClasses': 'Aún no hay clases.' },
  fr: { 'home.libraryType': 'Type de bibliothèque', 'home.flashcards': 'Cartes mémoire', 'home.studyGuides': 'Guides d’étude', 'home.classes': 'Classes', 'home.noClasses': 'Aucune classe pour le moment.' },
  'zh-CN': { 'home.libraryType': '资料库类型', 'home.flashcards': '闪卡', 'home.studyGuides': '学习指南', 'home.classes': '班级', 'home.noClasses': '还没有班级。' },
  hi: { 'home.libraryType': 'लाइब्रेरी प्रकार', 'home.flashcards': 'फ़्लैशकार्ड', 'home.studyGuides': 'अध्ययन गाइड', 'home.classes': 'कक्षाएँ', 'home.noClasses': 'अभी कोई कक्षा नहीं है।' },
  ar: { 'home.libraryType': 'نوع المكتبة', 'home.flashcards': 'البطاقات التعليمية', 'home.studyGuides': 'أدلة الدراسة', 'home.classes': 'الفصول', 'home.noClasses': 'لا توجد فصول بعد.' },
  de: { 'home.libraryType': 'Bibliothekstyp', 'home.flashcards': 'Karteikarten', 'home.studyGuides': 'Lernhilfen', 'home.classes': 'Klassen', 'home.noClasses': 'Noch keine Klassen.' },
  ru: { 'home.libraryType': 'Тип библиотеки', 'home.flashcards': 'Карточки', 'home.studyGuides': 'Учебные руководства', 'home.classes': 'Классы', 'home.noClasses': 'Классов пока нет.' },
  ja: { 'home.libraryType': 'ライブラリの種類', 'home.flashcards': 'フラッシュカード', 'home.studyGuides': '学習ガイド', 'home.classes': 'クラス', 'home.noClasses': 'クラスはまだありません。' },
  ko: { 'home.libraryType': '라이브러리 유형', 'home.flashcards': '플래시카드', 'home.studyGuides': '학습 가이드', 'home.classes': '수업', 'home.noClasses': '아직 수업이 없습니다.' },
}

for (const language of Object.keys(homeLibraryMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], homeLibraryMessages[language])
}

const deviceKeyVaultMessages: Record<AppLanguage, Messages> = {
  en: {
    'auth.googleAccountConnected': 'Google account connected', 'auth.emailAccountConnected': 'Email account connected', 'auth.deviceKeyTitle': 'No local password required', 'auth.deviceKeyDescription': 'Tracer will generate a unique encryption key and protect it with this device’s system keychain. The vault can unlock seamlessly, including while offline.', 'auth.deviceKeyTradeoff': 'Security tradeoff: anyone who can access your signed-in computer account may be able to open Tracer. If the system keychain entry is lost, there is no password recovery for this device-local vault and Tracer must be reset.', 'auth.continueWithoutPassword': 'Continue without a password', 'auth.errorDeviceKey': 'Tracer could not securely save the device key. Check system keychain access and retry.', 'settings.deviceKeyVaultDescription': 'This Google-linked vault unlocks with a device key protected by the system keychain. Password-required startup locking is unavailable.', 'settings.deviceKeychain': 'Keychain'
  },
  es: {
    'auth.googleAccountConnected': 'Cuenta de Google conectada', 'auth.emailAccountConnected': 'Cuenta de correo conectada', 'auth.deviceKeyTitle': 'No se requiere contraseña local', 'auth.deviceKeyDescription': 'Tracer generará una clave de cifrado única y la protegerá con el llavero del sistema de este dispositivo. La bóveda podrá abrirse sin interrupciones, incluso sin conexión.', 'auth.deviceKeyTradeoff': 'Riesgo de seguridad: quien acceda a tu cuenta del ordenador podría abrir Tracer. Si se pierde la entrada del llavero, esta bóveda local no se puede recuperar con contraseña y habrá que restablecer Tracer.', 'auth.continueWithoutPassword': 'Continuar sin contraseña', 'auth.errorDeviceKey': 'Tracer no pudo guardar la clave del dispositivo de forma segura. Revisa el acceso al llavero e inténtalo de nuevo.', 'settings.deviceKeyVaultDescription': 'Esta bóveda vinculada a Google usa una clave protegida por el llavero del sistema. No admite contraseña al iniciar.', 'settings.deviceKeychain': 'Llavero'
  },
  fr: {
    'auth.googleAccountConnected': 'Compte Google connecté', 'auth.emailAccountConnected': 'Compte e-mail connecté', 'auth.deviceKeyTitle': 'Aucun mot de passe local requis', 'auth.deviceKeyDescription': 'Tracer génère une clé de chiffrement unique protégée par le trousseau système de cet appareil. Le coffre se déverrouille sans saisie, même hors ligne.', 'auth.deviceKeyTradeoff': 'Compromis de sécurité : toute personne ayant accès à votre session ordinateur pourrait ouvrir Tracer. Si l’entrée du trousseau est perdue, aucun mot de passe ne peut récupérer ce coffre local et Tracer doit être réinitialisé.', 'auth.continueWithoutPassword': 'Continuer sans mot de passe', 'auth.errorDeviceKey': 'Tracer n’a pas pu enregistrer la clé de l’appareil. Vérifiez l’accès au trousseau et réessayez.', 'settings.deviceKeyVaultDescription': 'Ce coffre lié à Google utilise une clé protégée par le trousseau système. Le verrouillage par mot de passe au démarrage est indisponible.', 'settings.deviceKeychain': 'Trousseau'
  },
  'zh-CN': {
    'auth.googleAccountConnected': 'Google 帐户已连接', 'auth.emailAccountConnected': '电子邮件帐户已连接', 'auth.deviceKeyTitle': '无需本地密码', 'auth.deviceKeyDescription': 'Tracer 会生成唯一加密密钥，并由此设备的系统钥匙串保护。保险库可无缝解锁，也可离线使用。', 'auth.deviceKeyTradeoff': '安全权衡：能访问你已登录的电脑帐户的人可能也能打开 Tracer。如果系统钥匙串条目丢失，此设备上的本地保险库无法通过密码恢复，必须重置 Tracer。', 'auth.continueWithoutPassword': '无密码继续', 'auth.errorDeviceKey': 'Tracer 无法安全保存设备密钥。请检查系统钥匙串权限后重试。', 'settings.deviceKeyVaultDescription': '此 Google 关联保险库使用系统钥匙串保护的设备密钥，无法启用启动密码锁。', 'settings.deviceKeychain': '系统钥匙串'
  },
  hi: {
    'auth.googleAccountConnected': 'Google खाता जुड़ा', 'auth.emailAccountConnected': 'ईमेल खाता जुड़ा', 'auth.deviceKeyTitle': 'स्थानीय पासवर्ड की आवश्यकता नहीं', 'auth.deviceKeyDescription': 'Tracer एक अनूठी एन्क्रिप्शन कुंजी बनाएगा और उसे इस डिवाइस की सिस्टम कीचेन से सुरक्षित रखेगा। वॉल्ट ऑफ़लाइन भी बिना पासवर्ड खुल सकेगा।', 'auth.deviceKeyTradeoff': 'सुरक्षा समझौता: आपके साइन-इन कंप्यूटर खाते तक पहुँच रखने वाला व्यक्ति Tracer खोल सकता है। कीचेन प्रविष्टि खोने पर इस स्थानीय वॉल्ट को पासवर्ड से वापस नहीं पाया जा सकता और Tracer रीसेट करना होगा।', 'auth.continueWithoutPassword': 'बिना पासवर्ड जारी रखें', 'auth.errorDeviceKey': 'Tracer डिवाइस कुंजी सुरक्षित रूप से सहेज नहीं सका। सिस्टम कीचेन पहुँच जाँचकर फिर प्रयास करें।', 'settings.deviceKeyVaultDescription': 'यह Google-संबद्ध वॉल्ट सिस्टम कीचेन से सुरक्षित डिवाइस कुंजी से खुलता है। स्टार्टअप पासवर्ड लॉक उपलब्ध नहीं है।', 'settings.deviceKeychain': 'कीचेन'
  },
  ar: {
    'auth.googleAccountConnected': 'تم ربط حساب Google', 'auth.emailAccountConnected': 'تم ربط حساب البريد', 'auth.deviceKeyTitle': 'لا حاجة إلى كلمة مرور محلية', 'auth.deviceKeyDescription': 'سينشئ Tracer مفتاح تشفير فريدًا ويحميه بسلسلة مفاتيح النظام على هذا الجهاز. يمكن فتح الخزنة بسلاسة حتى دون اتصال.', 'auth.deviceKeyTradeoff': 'المقايضة الأمنية: قد يتمكن من يصل إلى حساب الكمبيوتر المفتوح من فتح Tracer. إذا فُقد إدخال سلسلة المفاتيح فلا توجد استعادة بكلمة مرور لهذه الخزنة المحلية ويجب إعادة ضبط Tracer.', 'auth.continueWithoutPassword': 'المتابعة بلا كلمة مرور', 'auth.errorDeviceKey': 'تعذر حفظ مفتاح الجهاز بأمان. تحقق من الوصول إلى سلسلة مفاتيح النظام وأعد المحاولة.', 'settings.deviceKeyVaultDescription': 'تستخدم هذه الخزنة المرتبطة بـ Google مفتاح جهاز تحميه سلسلة مفاتيح النظام. قفل بدء التشغيل بكلمة مرور غير متاح.', 'settings.deviceKeychain': 'سلسلة المفاتيح'
  },
  de: {
    'auth.googleAccountConnected': 'Google-Konto verbunden', 'auth.emailAccountConnected': 'E-Mail-Konto verbunden', 'auth.deviceKeyTitle': 'Kein lokales Passwort erforderlich', 'auth.deviceKeyDescription': 'Tracer erzeugt einen eindeutigen Verschlüsselungsschlüssel und schützt ihn im Systemschlüsselbund dieses Geräts. Der Tresor lässt sich auch offline nahtlos entsperren.', 'auth.deviceKeyTradeoff': 'Sicherheitsabwägung: Wer auf dein angemeldetes Computerkonto zugreifen kann, kann möglicherweise Tracer öffnen. Geht der Schlüsselbundeintrag verloren, gibt es keine Passwortwiederherstellung und Tracer muss zurückgesetzt werden.', 'auth.continueWithoutPassword': 'Ohne Passwort fortfahren', 'auth.errorDeviceKey': 'Tracer konnte den Geräteschlüssel nicht sicher speichern. Prüfe den Schlüsselbundzugriff und versuche es erneut.', 'settings.deviceKeyVaultDescription': 'Dieser Google-verknüpfte Tresor wird mit einem im Systemschlüsselbund geschützten Geräteschlüssel entsperrt. Ein Startpasswort ist nicht verfügbar.', 'settings.deviceKeychain': 'Schlüsselbund'
  },
  ru: {
    'auth.googleAccountConnected': 'Аккаунт Google подключён', 'auth.emailAccountConnected': 'Аккаунт электронной почты подключён', 'auth.deviceKeyTitle': 'Локальный пароль не требуется', 'auth.deviceKeyDescription': 'Tracer создаст уникальный ключ шифрования и защитит его системным хранилищем ключей устройства. Хранилище будет открываться без пароля, в том числе офлайн.', 'auth.deviceKeyTradeoff': 'Компромисс безопасности: пользователь с доступом к вашей активной учётной записи компьютера может открыть Tracer. При утрате записи системного хранилища парольного восстановления нет — потребуется сброс Tracer.', 'auth.continueWithoutPassword': 'Продолжить без пароля', 'auth.errorDeviceKey': 'Tracer не удалось безопасно сохранить ключ устройства. Проверьте доступ к системному хранилищу ключей и повторите попытку.', 'settings.deviceKeyVaultDescription': 'Это связанное с Google хранилище открывается ключом устройства из системного хранилища ключей. Пароль при запуске недоступен.', 'settings.deviceKeychain': 'Хранилище ключей'
  },
  ja: {
    'auth.googleAccountConnected': 'Google アカウント接続済み', 'auth.emailAccountConnected': 'メールアカウント接続済み', 'auth.deviceKeyTitle': 'ローカルパスワードは不要です', 'auth.deviceKeyDescription': 'Tracer は固有の暗号化キーを生成し、この端末のシステムキーチェーンで保護します。オフラインでもパスワードなしで保管庫を解除できます。', 'auth.deviceKeyTradeoff': 'セキュリティ上の注意：ログイン中のコンピューターアカウントを使用できる人は Tracer を開ける可能性があります。キーチェーン項目を失うとパスワードでは復元できず、Tracer のリセットが必要です。', 'auth.continueWithoutPassword': 'パスワードなしで続行', 'auth.errorDeviceKey': '端末キーを安全に保存できませんでした。システムキーチェーンへのアクセスを確認して再試行してください。', 'settings.deviceKeyVaultDescription': 'この Google 連携保管庫はシステムキーチェーン内の端末キーで解除します。起動時パスワードは利用できません。', 'settings.deviceKeychain': 'キーチェーン'
  },
  ko: {
    'auth.googleAccountConnected': 'Google 계정 연결됨', 'auth.emailAccountConnected': '이메일 계정 연결됨', 'auth.deviceKeyTitle': '로컬 비밀번호가 필요하지 않습니다', 'auth.deviceKeyDescription': 'Tracer가 고유한 암호화 키를 생성하고 이 기기의 시스템 키체인으로 보호합니다. 오프라인에서도 비밀번호 없이 보관함을 열 수 있습니다.', 'auth.deviceKeyTradeoff': '보안상 주의: 로그인된 컴퓨터 계정에 접근할 수 있는 사람은 Tracer를 열 수도 있습니다. 키체인 항목을 잃으면 비밀번호로 복구할 수 없으며 Tracer를 재설정해야 합니다.', 'auth.continueWithoutPassword': '비밀번호 없이 계속', 'auth.errorDeviceKey': '기기 키를 안전하게 저장하지 못했습니다. 시스템 키체인 접근을 확인하고 다시 시도하세요.', 'settings.deviceKeyVaultDescription': '이 Google 연결 보관함은 시스템 키체인이 보호하는 기기 키로 열립니다. 시작 비밀번호 잠금은 사용할 수 없습니다.', 'settings.deviceKeychain': '키체인'
  }
}

for (const language of Object.keys(deviceKeyVaultMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], deviceKeyVaultMessages[language])
}

const emailPasswordSetupMessages: Record<AppLanguage, Messages> = {
  en: { 'auth.emailPasswordReuse': 'Your email account password will also encrypt and unlock Tracer on this device.', 'auth.errorLocalData': 'Tracer could not access its local data. Reset Tracer to repair this installation, then sign in again.' },
  es: { 'auth.emailPasswordReuse': 'La contraseña de tu cuenta de correo también cifrará y desbloqueará Tracer en este dispositivo.', 'auth.errorLocalData': 'Tracer no pudo acceder a sus datos locales. Restablece Tracer para reparar esta instalación y vuelve a iniciar sesión.' },
  fr: { 'auth.emailPasswordReuse': 'Le mot de passe de votre compte e-mail chiffrera et déverrouillera aussi Tracer sur cet appareil.', 'auth.errorLocalData': 'Tracer n’a pas pu accéder à ses données locales. Réinitialisez Tracer pour réparer cette installation, puis reconnectez-vous.' },
  'zh-CN': { 'auth.emailPasswordReuse': '你的电子邮件帐户密码也将用于加密和解锁此设备上的 Tracer。', 'auth.errorLocalData': 'Tracer 无法访问本地数据。请重置 Tracer 以修复此安装，然后重新登录。' },
  hi: { 'auth.emailPasswordReuse': 'आपके ईमेल खाते का पासवर्ड इस डिवाइस पर Tracer को एन्क्रिप्ट और अनलॉक भी करेगा।', 'auth.errorLocalData': 'Tracer अपने स्थानीय डेटा तक नहीं पहुँच सका। इस इंस्टॉलेशन को ठीक करने के लिए Tracer रीसेट करें, फिर दोबारा साइन इन करें।' },
  ar: { 'auth.emailPasswordReuse': 'ستُتُستخدم كلمة مرور حساب البريد الإلكتروني أيضاً لتشفير Tracer وإلغاء قفله على هذا الجهاز.', 'auth.errorLocalData': 'تعذر على Tracer الوصول إلى بياناته المحلية. أعد ضبط Tracer لإصلاح هذا التثبيت، ثم سجل الدخول مجددًا.' },
  de: { 'auth.emailPasswordReuse': 'Das Passwort deines E-Mail-Kontos verschlüsselt und entsperrt Tracer auch auf diesem Gerät.', 'auth.errorLocalData': 'Tracer konnte nicht auf die lokalen Daten zugreifen. Setze Tracer zurück, um diese Installation zu reparieren, und melde dich erneut an.' },
  ru: { 'auth.emailPasswordReuse': 'Пароль учётной записи электронной почты также будет шифровать и открывать Tracer на этом устройстве.', 'auth.errorLocalData': 'Tracer не удалось получить доступ к локальным данным. Сбросьте Tracer, чтобы исправить установку, затем войдите снова.' },
  ja: { 'auth.emailPasswordReuse': 'メールアカウントのパスワードは、この端末の Tracer の暗号化と解除にも使用されます。', 'auth.errorLocalData': 'Tracer はローカルデータにアクセスできませんでした。Tracer をリセットしてこのインストールを修復し、もう一度サインインしてください。' },
  ko: { 'auth.emailPasswordReuse': '이메일 계정 비밀번호가 이 기기의 Tracer를 암호화하고 잠금 해제하는 데도 사용됩니다.', 'auth.errorLocalData': 'Tracer가 로컬 데이터에 접근하지 못했습니다. Tracer를 초기화해 이 설치를 복구한 다음 다시 로그인하세요.' },
}

for (const language of Object.keys(emailPasswordSetupMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], emailPasswordSetupMessages[language])
}

const authFailureMessages: Record<AppLanguage, Messages> = {
  en: { 'auth.errorEmailRateLimit': 'Too many verification emails were requested. Wait before trying again, or configure custom SMTP and a higher email rate limit in Supabase.', 'auth.errorInvalidCredentials': 'The email or password is incorrect.' },
  es: { 'auth.errorEmailRateLimit': 'Se solicitaron demasiados correos de verificación. Espera antes de intentarlo de nuevo o configura SMTP personalizado y un límite mayor en Supabase.', 'auth.errorInvalidCredentials': 'El correo o la contraseña son incorrectos.' },
  fr: { 'auth.errorEmailRateLimit': 'Trop d’e-mails de vérification ont été demandés. Attendez avant de réessayer ou configurez un SMTP personnalisé et une limite supérieure dans Supabase.', 'auth.errorInvalidCredentials': 'L’adresse e-mail ou le mot de passe est incorrect.' },
  'zh-CN': { 'auth.errorEmailRateLimit': '请求的验证邮件过多。请稍后重试，或在 Supabase 中配置自定义 SMTP 并提高邮件速率限制。', 'auth.errorInvalidCredentials': '电子邮件或密码不正确。' },
  hi: { 'auth.errorEmailRateLimit': 'बहुत अधिक सत्यापन ईमेल माँगे गए हैं। फिर कोशिश करने से पहले प्रतीक्षा करें, या Supabase में कस्टम SMTP और अधिक ईमेल दर सीमा सेट करें।', 'auth.errorInvalidCredentials': 'ईमेल या पासवर्ड गलत है।' },
  ar: { 'auth.errorEmailRateLimit': 'تم طلب عدد كبير جدًا من رسائل التحقق. انتظر قبل إعادة المحاولة، أو اضبط SMTP مخصصًا وحدًا أعلى للبريد في Supabase.', 'auth.errorInvalidCredentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' },
  de: { 'auth.errorEmailRateLimit': 'Es wurden zu viele Bestätigungs-E-Mails angefordert. Warte vor dem nächsten Versuch oder konfiguriere benutzerdefiniertes SMTP und ein höheres E-Mail-Limit in Supabase.', 'auth.errorInvalidCredentials': 'E-Mail-Adresse oder Passwort ist falsch.' },
  ru: { 'auth.errorEmailRateLimit': 'Запрошено слишком много писем для подтверждения. Подождите перед повторной попыткой или настройте собственный SMTP и более высокий лимит в Supabase.', 'auth.errorInvalidCredentials': 'Неверный адрес электронной почты или пароль.' },
  ja: { 'auth.errorEmailRateLimit': '確認メールの要求回数が多すぎます。しばらく待ってから再試行するか、Supabase でカスタム SMTP とより高いメール上限を設定してください。', 'auth.errorInvalidCredentials': 'メールアドレスまたはパスワードが正しくありません。' },
  ko: { 'auth.errorEmailRateLimit': '인증 이메일 요청이 너무 많습니다. 잠시 후 다시 시도하거나 Supabase에서 사용자 지정 SMTP와 더 높은 이메일 한도를 설정하세요.', 'auth.errorInvalidCredentials': '이메일 또는 비밀번호가 올바르지 않습니다.' },
}

for (const language of Object.keys(authFailureMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], authFailureMessages[language])
}

const passwordVisibilityMessages: Record<AppLanguage, Messages> = {
  en: { 'auth.showPassword': 'Show password', 'auth.hidePassword': 'Hide password' },
  es: { 'auth.showPassword': 'Mostrar contraseña', 'auth.hidePassword': 'Ocultar contraseña' },
  fr: { 'auth.showPassword': 'Afficher le mot de passe', 'auth.hidePassword': 'Masquer le mot de passe' },
  'zh-CN': { 'auth.showPassword': '显示密码', 'auth.hidePassword': '隐藏密码' },
  hi: { 'auth.showPassword': 'पासवर्ड दिखाएँ', 'auth.hidePassword': 'पासवर्ड छिपाएँ' },
  ar: { 'auth.showPassword': 'إظهار كلمة المرور', 'auth.hidePassword': 'إخفاء كلمة المرور' },
  de: { 'auth.showPassword': 'Passwort anzeigen', 'auth.hidePassword': 'Passwort ausblenden' },
  ru: { 'auth.showPassword': 'Показать пароль', 'auth.hidePassword': 'Скрыть пароль' },
  ja: { 'auth.showPassword': 'パスワードを表示', 'auth.hidePassword': 'パスワードを非表示' },
  ko: { 'auth.showPassword': '비밀번호 표시', 'auth.hidePassword': '비밀번호 숨기기' },
}

for (const language of Object.keys(passwordVisibilityMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], passwordVisibilityMessages[language])
}

const classroomEnglish: Messages = {
  'classroom.dashboard': 'Dashboard',
  'classroom.teacherDashboard': 'Teacher dashboard',
  'classroom.dashboardTitle': 'Your Classes',
  'classroom.createClass': 'Create Class',
  'classroom.createDescription': 'Add the class details. Tracer will generate a unique join code.',
  'classroom.className': 'Class name',
  'classroom.classNamePlaceholder': 'Calculus AB',
  'classroom.subject': 'Subject',
  'classroom.subjectPlaceholder': 'Mathematics',
  'classroom.section': 'Section',
  'classroom.sectionPlaceholder': 'Period 2',
  'classroom.schoolYear': 'School year',
  'classroom.schoolYearPlaceholder': '2026–2027',
  'classroom.addStudents': 'Add Students',
  'classroom.shareCodeDescription': 'Share this code with students joining {name}.',
  'classroom.classCode': 'Class code',
  'classroom.codeCopied': 'Class code copied.',
  'classroom.copyFailed': 'Could not copy the code. Select and copy it manually.',
  'classroom.copyCode': 'Copy code',
  'classroom.addClass': 'Add Class',
  'classroom.joinDescription': 'Enter the code your teacher shared with you.',
  'classroom.codePlaceholder': 'ENTER CODE',
  'classroom.joinClass': 'Join class',
  'classroom.retry': 'Retry',
  'classroom.noClassesTitle': 'Create your first class',
  'classroom.noClassesDescription': 'Classes give you one place to invite students and view their learning activity.',
  'classroom.class': 'Class',
  'classroom.students': 'Students',
  'classroom.assignments': 'Assignments',
  'classroom.progress': 'Progress',
  'classroom.comingSoon': 'Coming soon',
  'classroom.recentActivity': 'Recent activity',
  'classroom.noActivity': 'Student activity and progress will appear here in a future update.',
  'classroom.classActions': 'Class actions',
  'classroom.createSets': 'Create Sets',
  'classroom.detailedView': 'Detailed View',
  'classroom.noClassDetails': 'No additional class details',
  'classroom.backToDashboard': 'Back to dashboard',
  'classroom.searchStudents': 'Search students',
  'classroom.sortStudents': 'Sort students',
  'classroom.sortByName': 'Sort by name',
  'classroom.sortByJoined': 'Sort by join date',
  'classroom.studentRoster': 'Student roster',
  'classroom.studentCount': '{count} students',
  'classroom.noMatchingStudents': 'No students match this search.',
  'classroom.noStudents': 'No students have joined this class yet.',
  'classroom.student': 'Student',
  'classroom.joined': 'Joined',
  'classroom.totalScore': 'Total score',
  'classroom.mostRecent': 'Most recent',
  'classroom.consistency': 'Consistency',
  'classroom.progressNotTracked': 'Scores and study progress are not tracked in this first dashboard version.',
  'classroom.errorOffline': 'Classroom features need an internet connection. Your local library is still available.',
  'classroom.errorSignedOut': 'Reconnect your account in Settings to use classroom features.',
  'classroom.errorForbidden': 'This account does not have permission to perform that classroom action.',
  'classroom.errorCodeNotFound': 'That class code is invalid or no longer active.',
  'classroom.errorInvalidInput': 'Check the class details and try again.',
  'classroom.errorUnknown': 'Tracer could not update the classroom. Try again.',
}

function classroomCopy(overrides: Messages): Messages {
  return { ...classroomEnglish, ...overrides }
}

const classroomMessages: Record<AppLanguage, Messages> = {
  en: classroomEnglish,
  es: classroomCopy({
    'classroom.dashboard': 'Panel', 'classroom.teacherDashboard': 'Panel docente', 'classroom.dashboardTitle': 'Tus clases', 'classroom.createClass': 'Crear clase', 'classroom.createDescription': 'Añade los datos de la clase. Tracer generará un código único.', 'classroom.className': 'Nombre de la clase', 'classroom.classNamePlaceholder': 'Cálculo AB', 'classroom.subject': 'Asignatura', 'classroom.subjectPlaceholder': 'Matemáticas', 'classroom.section': 'Sección', 'classroom.sectionPlaceholder': 'Periodo 2', 'classroom.schoolYear': 'Curso escolar', 'classroom.schoolYearPlaceholder': '2026–2027', 'classroom.addStudents': 'Añadir estudiantes', 'classroom.shareCodeDescription': 'Comparte este código con quienes se unan a {name}.', 'classroom.classCode': 'Código de clase', 'classroom.codeCopied': 'Código copiado.', 'classroom.copyFailed': 'No se pudo copiar. Selecciona el código y cópialo manualmente.', 'classroom.copyCode': 'Copiar código', 'classroom.addClass': 'Añadir clase', 'classroom.joinDescription': 'Introduce el código que compartió tu docente.', 'classroom.codePlaceholder': 'INTRODUCE EL CÓDIGO', 'classroom.joinClass': 'Unirse a la clase', 'classroom.retry': 'Reintentar', 'classroom.noClassesTitle': 'Crea tu primera clase', 'classroom.noClassesDescription': 'Invita estudiantes y consulta su actividad desde un solo lugar.', 'classroom.class': 'Clase', 'classroom.students': 'Estudiantes', 'classroom.assignments': 'Tareas', 'classroom.progress': 'Progreso', 'classroom.comingSoon': 'Próximamente', 'classroom.recentActivity': 'Actividad reciente', 'classroom.noActivity': 'La actividad y el progreso aparecerán aquí en una futura actualización.', 'classroom.classActions': 'Acciones de clase', 'classroom.createSets': 'Crear conjuntos', 'classroom.detailedView': 'Vista detallada', 'classroom.noClassDetails': 'Sin detalles adicionales', 'classroom.backToDashboard': 'Volver al panel', 'classroom.searchStudents': 'Buscar estudiantes', 'classroom.sortStudents': 'Ordenar estudiantes', 'classroom.sortByName': 'Ordenar por nombre', 'classroom.sortByJoined': 'Ordenar por fecha de ingreso', 'classroom.studentRoster': 'Lista de estudiantes', 'classroom.studentCount': '{count} estudiantes', 'classroom.noMatchingStudents': 'Ningún estudiante coincide.', 'classroom.noStudents': 'Aún no se ha unido ningún estudiante.', 'classroom.student': 'Estudiante', 'classroom.joined': 'Se unió', 'classroom.totalScore': 'Puntuación total', 'classroom.mostRecent': 'Más reciente', 'classroom.consistency': 'Constancia', 'classroom.progressNotTracked': 'Las puntuaciones y el progreso no se registran en esta primera versión.', 'classroom.errorOffline': 'Las clases necesitan internet. Tu biblioteca local sigue disponible.', 'classroom.errorSignedOut': 'Reconecta tu cuenta en Configuración para usar las clases.', 'classroom.errorForbidden': 'Esta cuenta no tiene permiso para esa acción.', 'classroom.errorCodeNotFound': 'El código no es válido o ya no está activo.', 'classroom.errorInvalidInput': 'Revisa los datos de la clase e inténtalo de nuevo.', 'classroom.errorUnknown': 'Tracer no pudo actualizar la clase. Inténtalo de nuevo.'
  }),
  fr: classroomCopy({
    'classroom.dashboard': 'Tableau de bord', 'classroom.teacherDashboard': 'Tableau enseignant', 'classroom.dashboardTitle': 'Vos classes', 'classroom.createClass': 'Créer une classe', 'classroom.createDescription': 'Ajoutez les informations. Tracer générera un code unique.', 'classroom.className': 'Nom de la classe', 'classroom.classNamePlaceholder': 'Calcul AB', 'classroom.subject': 'Matière', 'classroom.subjectPlaceholder': 'Mathématiques', 'classroom.section': 'Section', 'classroom.sectionPlaceholder': 'Période 2', 'classroom.schoolYear': 'Année scolaire', 'classroom.schoolYearPlaceholder': '2026–2027', 'classroom.addStudents': 'Ajouter des élèves', 'classroom.shareCodeDescription': 'Partagez ce code avec les élèves qui rejoignent {name}.', 'classroom.classCode': 'Code de classe', 'classroom.codeCopied': 'Code copié.', 'classroom.copyFailed': 'Impossible de copier le code. Copiez-le manuellement.', 'classroom.copyCode': 'Copier le code', 'classroom.addClass': 'Ajouter une classe', 'classroom.joinDescription': 'Saisissez le code partagé par votre enseignant.', 'classroom.codePlaceholder': 'SAISIR LE CODE', 'classroom.joinClass': 'Rejoindre la classe', 'classroom.retry': 'Réessayer', 'classroom.noClassesTitle': 'Créez votre première classe', 'classroom.noClassesDescription': 'Invitez des élèves et consultez leur activité au même endroit.', 'classroom.class': 'Classe', 'classroom.students': 'Élèves', 'classroom.assignments': 'Devoirs', 'classroom.progress': 'Progression', 'classroom.comingSoon': 'Bientôt disponible', 'classroom.recentActivity': 'Activité récente', 'classroom.noActivity': 'L’activité et la progression apparaîtront ici prochainement.', 'classroom.classActions': 'Actions de classe', 'classroom.createSets': 'Créer des ensembles', 'classroom.detailedView': 'Vue détaillée', 'classroom.noClassDetails': 'Aucun détail supplémentaire', 'classroom.backToDashboard': 'Retour au tableau de bord', 'classroom.searchStudents': 'Rechercher des élèves', 'classroom.sortStudents': 'Trier les élèves', 'classroom.sortByName': 'Trier par nom', 'classroom.sortByJoined': 'Trier par date d’arrivée', 'classroom.studentRoster': 'Liste des élèves', 'classroom.studentCount': '{count} élèves', 'classroom.noMatchingStudents': 'Aucun élève ne correspond.', 'classroom.noStudents': 'Aucun élève n’a encore rejoint cette classe.', 'classroom.student': 'Élève', 'classroom.joined': 'Arrivée', 'classroom.totalScore': 'Score total', 'classroom.mostRecent': 'Plus récent', 'classroom.consistency': 'Régularité', 'classroom.progressNotTracked': 'Les scores et la progression ne sont pas suivis dans cette première version.', 'classroom.errorOffline': 'Les classes nécessitent Internet. Votre bibliothèque locale reste disponible.', 'classroom.errorSignedOut': 'Reconnectez votre compte dans Paramètres.', 'classroom.errorForbidden': 'Ce compte n’est pas autorisé à effectuer cette action.', 'classroom.errorCodeNotFound': 'Ce code est invalide ou n’est plus actif.', 'classroom.errorInvalidInput': 'Vérifiez les informations et réessayez.', 'classroom.errorUnknown': 'Tracer n’a pas pu mettre la classe à jour.'
  }),
  'zh-CN': classroomCopy({
    'classroom.dashboard': '教学面板', 'classroom.teacherDashboard': '教师面板', 'classroom.dashboardTitle': '你的班级', 'classroom.createClass': '创建班级', 'classroom.createDescription': '填写班级信息，Tracer 将生成唯一加入代码。', 'classroom.className': '班级名称', 'classroom.classNamePlaceholder': '微积分 AB', 'classroom.subject': '科目', 'classroom.subjectPlaceholder': '数学', 'classroom.section': '班次', 'classroom.sectionPlaceholder': '第 2 节', 'classroom.schoolYear': '学年', 'classroom.schoolYearPlaceholder': '2026–2027', 'classroom.addStudents': '添加学生', 'classroom.shareCodeDescription': '将此代码分享给要加入 {name} 的学生。', 'classroom.classCode': '班级代码', 'classroom.codeCopied': '班级代码已复制。', 'classroom.copyFailed': '无法复制代码，请手动选择并复制。', 'classroom.copyCode': '复制代码', 'classroom.addClass': '添加班级', 'classroom.joinDescription': '输入教师分享的代码。', 'classroom.codePlaceholder': '输入代码', 'classroom.joinClass': '加入班级', 'classroom.retry': '重试', 'classroom.noClassesTitle': '创建第一个班级', 'classroom.noClassesDescription': '在一个地方邀请学生并查看学习活动。', 'classroom.class': '班级', 'classroom.students': '学生', 'classroom.assignments': '作业', 'classroom.progress': '进度', 'classroom.comingSoon': '即将推出', 'classroom.recentActivity': '最近活动', 'classroom.noActivity': '学生活动和进度将在后续更新中显示。', 'classroom.classActions': '班级操作', 'classroom.createSets': '创建卡片集', 'classroom.detailedView': '详细视图', 'classroom.noClassDetails': '没有其他班级信息', 'classroom.backToDashboard': '返回教学面板', 'classroom.searchStudents': '搜索学生', 'classroom.sortStudents': '排序学生', 'classroom.sortByName': '按姓名排序', 'classroom.sortByJoined': '按加入日期排序', 'classroom.studentRoster': '学生名单', 'classroom.studentCount': '{count} 名学生', 'classroom.noMatchingStudents': '没有匹配的学生。', 'classroom.noStudents': '尚无学生加入此班级。', 'classroom.student': '学生', 'classroom.joined': '加入时间', 'classroom.totalScore': '总分', 'classroom.mostRecent': '最近成绩', 'classroom.consistency': '持续性', 'classroom.progressNotTracked': '此首版面板暂不跟踪分数和学习进度。', 'classroom.errorOffline': '班级功能需要网络连接，本地资料库仍可使用。', 'classroom.errorSignedOut': '请在设置中重新连接帐户。', 'classroom.errorForbidden': '此帐户无权执行该班级操作。', 'classroom.errorCodeNotFound': '班级代码无效或已停用。', 'classroom.errorInvalidInput': '请检查班级信息后重试。', 'classroom.errorUnknown': 'Tracer 无法更新班级，请重试。'
  }),
  hi: classroomCopy({
    'classroom.dashboard': 'डैशबोर्ड', 'classroom.teacherDashboard': 'शिक्षक डैशबोर्ड', 'classroom.dashboardTitle': 'आपकी कक्षाएँ', 'classroom.createClass': 'कक्षा बनाएँ', 'classroom.createDescription': 'कक्षा की जानकारी भरें। Tracer एक अनूठा कोड बनाएगा।', 'classroom.className': 'कक्षा का नाम', 'classroom.classNamePlaceholder': 'कैलकुलस AB', 'classroom.subject': 'विषय', 'classroom.subjectPlaceholder': 'गणित', 'classroom.section': 'सेक्शन', 'classroom.sectionPlaceholder': 'पीरियड 2', 'classroom.schoolYear': 'शैक्षणिक वर्ष', 'classroom.schoolYearPlaceholder': '2026–2027', 'classroom.addStudents': 'विद्यार्थी जोड़ें', 'classroom.shareCodeDescription': '{name} में शामिल होने वाले विद्यार्थियों से यह कोड साझा करें।', 'classroom.classCode': 'कक्षा कोड', 'classroom.codeCopied': 'कक्षा कोड कॉपी हुआ।', 'classroom.copyFailed': 'कोड कॉपी नहीं हुआ। इसे चुनकर मैन्युअल रूप से कॉपी करें।', 'classroom.copyCode': 'कोड कॉपी करें', 'classroom.addClass': 'कक्षा जोड़ें', 'classroom.joinDescription': 'शिक्षक द्वारा साझा किया गया कोड दर्ज करें।', 'classroom.codePlaceholder': 'कोड दर्ज करें', 'classroom.joinClass': 'कक्षा में शामिल हों', 'classroom.retry': 'फिर कोशिश करें', 'classroom.noClassesTitle': 'अपनी पहली कक्षा बनाएँ', 'classroom.noClassesDescription': 'विद्यार्थियों को आमंत्रित करें और उनकी गतिविधि एक जगह देखें।', 'classroom.class': 'कक्षा', 'classroom.students': 'विद्यार्थी', 'classroom.assignments': 'असाइनमेंट', 'classroom.progress': 'प्रगति', 'classroom.comingSoon': 'जल्द उपलब्ध', 'classroom.recentActivity': 'हाल की गतिविधि', 'classroom.noActivity': 'विद्यार्थी गतिविधि और प्रगति भविष्य के अपडेट में यहाँ दिखेगी।', 'classroom.classActions': 'कक्षा कार्रवाइयाँ', 'classroom.createSets': 'सेट बनाएँ', 'classroom.detailedView': 'विस्तृत दृश्य', 'classroom.noClassDetails': 'कोई अतिरिक्त विवरण नहीं', 'classroom.backToDashboard': 'डैशबोर्ड पर वापस', 'classroom.searchStudents': 'विद्यार्थी खोजें', 'classroom.sortStudents': 'विद्यार्थी क्रमित करें', 'classroom.sortByName': 'नाम से क्रमित करें', 'classroom.sortByJoined': 'जुड़ने की तारीख से क्रमित करें', 'classroom.studentRoster': 'विद्यार्थी सूची', 'classroom.studentCount': '{count} विद्यार्थी', 'classroom.noMatchingStudents': 'कोई विद्यार्थी नहीं मिला।', 'classroom.noStudents': 'अभी कोई विद्यार्थी इस कक्षा में नहीं जुड़ा।', 'classroom.student': 'विद्यार्थी', 'classroom.joined': 'जुड़ने की तारीख', 'classroom.totalScore': 'कुल अंक', 'classroom.mostRecent': 'सबसे हाल का', 'classroom.consistency': 'निरंतरता', 'classroom.progressNotTracked': 'इस पहले संस्करण में अंक और प्रगति ट्रैक नहीं होते।', 'classroom.errorOffline': 'कक्षा सुविधाओं के लिए इंटरनेट चाहिए। स्थानीय लाइब्रेरी उपलब्ध है।', 'classroom.errorSignedOut': 'कक्षा सुविधाओं के लिए सेटिंग्स में खाता दोबारा जोड़ें।', 'classroom.errorForbidden': 'इस खाते को यह कार्रवाई करने की अनुमति नहीं है।', 'classroom.errorCodeNotFound': 'कक्षा कोड अमान्य है या सक्रिय नहीं है।', 'classroom.errorInvalidInput': 'कक्षा विवरण जाँचकर फिर कोशिश करें।', 'classroom.errorUnknown': 'Tracer कक्षा अपडेट नहीं कर सका।'
  }),
  ar: classroomCopy({
    'classroom.dashboard': 'لوحة التحكم', 'classroom.teacherDashboard': 'لوحة المعلم', 'classroom.dashboardTitle': 'صفوفك', 'classroom.createClass': 'إنشاء صف', 'classroom.createDescription': 'أضف تفاصيل الصف وسيُنشئ Tracer رمز انضمام فريدًا.', 'classroom.className': 'اسم الصف', 'classroom.classNamePlaceholder': 'التفاضل والتكامل AB', 'classroom.subject': 'المادة', 'classroom.subjectPlaceholder': 'الرياضيات', 'classroom.section': 'الشعبة', 'classroom.sectionPlaceholder': 'الحصة 2', 'classroom.schoolYear': 'العام الدراسي', 'classroom.schoolYearPlaceholder': '2026–2027', 'classroom.addStudents': 'إضافة طلاب', 'classroom.shareCodeDescription': 'شارك هذا الرمز مع الطلاب المنضمين إلى {name}.', 'classroom.classCode': 'رمز الصف', 'classroom.codeCopied': 'تم نسخ رمز الصف.', 'classroom.copyFailed': 'تعذر نسخ الرمز. حدده وانسخه يدويًا.', 'classroom.copyCode': 'نسخ الرمز', 'classroom.addClass': 'إضافة صف', 'classroom.joinDescription': 'أدخل الرمز الذي شاركه معلمك.', 'classroom.codePlaceholder': 'أدخل الرمز', 'classroom.joinClass': 'الانضمام إلى الصف', 'classroom.retry': 'إعادة المحاولة', 'classroom.noClassesTitle': 'أنشئ صفك الأول', 'classroom.noClassesDescription': 'ادعُ الطلاب واعرض نشاطهم التعليمي في مكان واحد.', 'classroom.class': 'الصف', 'classroom.students': 'الطلاب', 'classroom.assignments': 'الواجبات', 'classroom.progress': 'التقدم', 'classroom.comingSoon': 'قريبًا', 'classroom.recentActivity': 'النشاط الأخير', 'classroom.noActivity': 'سيظهر نشاط الطلاب وتقدمهم هنا في تحديث لاحق.', 'classroom.classActions': 'إجراءات الصف', 'classroom.createSets': 'إنشاء مجموعات', 'classroom.detailedView': 'عرض تفصيلي', 'classroom.noClassDetails': 'لا توجد تفاصيل إضافية', 'classroom.backToDashboard': 'العودة إلى لوحة التحكم', 'classroom.searchStudents': 'البحث عن طلاب', 'classroom.sortStudents': 'ترتيب الطلاب', 'classroom.sortByName': 'الترتيب حسب الاسم', 'classroom.sortByJoined': 'الترتيب حسب تاريخ الانضمام', 'classroom.studentRoster': 'قائمة الطلاب', 'classroom.studentCount': '{count} طلاب', 'classroom.noMatchingStudents': 'لا يوجد طلاب مطابقون.', 'classroom.noStudents': 'لم ينضم أي طالب بعد.', 'classroom.student': 'الطالب', 'classroom.joined': 'تاريخ الانضمام', 'classroom.totalScore': 'النتيجة الكلية', 'classroom.mostRecent': 'الأحدث', 'classroom.consistency': 'الاستمرارية', 'classroom.progressNotTracked': 'لا تُتبع النتائج والتقدم في هذا الإصدار الأول.', 'classroom.errorOffline': 'تحتاج ميزات الصف إلى الإنترنت. مكتبتك المحلية متاحة.', 'classroom.errorSignedOut': 'أعد ربط حسابك من الإعدادات لاستخدام الصفوف.', 'classroom.errorForbidden': 'لا يملك هذا الحساب إذن تنفيذ هذا الإجراء.', 'classroom.errorCodeNotFound': 'رمز الصف غير صالح أو لم يعد نشطًا.', 'classroom.errorInvalidInput': 'تحقق من تفاصيل الصف وحاول مجددًا.', 'classroom.errorUnknown': 'تعذر على Tracer تحديث الصف.'
  }),
  de: classroomCopy({
    'classroom.dashboard': 'Dashboard', 'classroom.teacherDashboard': 'Lehrkräfte-Dashboard', 'classroom.dashboardTitle': 'Deine Klassen', 'classroom.createClass': 'Klasse erstellen', 'classroom.createDescription': 'Füge die Klassendetails hinzu. Tracer erstellt einen eindeutigen Beitrittscode.', 'classroom.className': 'Klassenname', 'classroom.classNamePlaceholder': 'Analysis AB', 'classroom.subject': 'Fach', 'classroom.subjectPlaceholder': 'Mathematik', 'classroom.section': 'Kursabschnitt', 'classroom.sectionPlaceholder': '2. Stunde', 'classroom.schoolYear': 'Schuljahr', 'classroom.schoolYearPlaceholder': '2026–2027', 'classroom.addStudents': 'Lernende hinzufügen', 'classroom.shareCodeDescription': 'Teile diesen Code mit den Lernenden, die {name} beitreten.', 'classroom.classCode': 'Klassencode', 'classroom.codeCopied': 'Klassencode kopiert.', 'classroom.copyFailed': 'Der Code konnte nicht kopiert werden. Wähle ihn aus und kopiere ihn manuell.', 'classroom.copyCode': 'Code kopieren', 'classroom.addClass': 'Klasse hinzufügen', 'classroom.joinDescription': 'Gib den Code ein, den deine Lehrkraft geteilt hat.', 'classroom.codePlaceholder': 'CODE EINGEBEN', 'classroom.joinClass': 'Klasse beitreten', 'classroom.retry': 'Erneut versuchen', 'classroom.noClassesTitle': 'Erstelle deine erste Klasse', 'classroom.noClassesDescription': 'Lade Lernende ein und sieh ihre Lernaktivitäten an einem Ort.', 'classroom.class': 'Klasse', 'classroom.students': 'Lernende', 'classroom.assignments': 'Aufgaben', 'classroom.progress': 'Fortschritt', 'classroom.comingSoon': 'Demnächst', 'classroom.recentActivity': 'Letzte Aktivität', 'classroom.noActivity': 'Aktivität und Fortschritt der Lernenden erscheinen in einem späteren Update.', 'classroom.classActions': 'Klassenaktionen', 'classroom.createSets': 'Sets erstellen', 'classroom.detailedView': 'Detailansicht', 'classroom.noClassDetails': 'Keine weiteren Klassendetails', 'classroom.backToDashboard': 'Zurück zum Dashboard', 'classroom.searchStudents': 'Lernende suchen', 'classroom.sortStudents': 'Lernende sortieren', 'classroom.sortByName': 'Nach Name sortieren', 'classroom.sortByJoined': 'Nach Beitrittsdatum sortieren', 'classroom.studentRoster': 'Klassenliste', 'classroom.studentCount': '{count} Lernende', 'classroom.noMatchingStudents': 'Keine Lernenden entsprechen dieser Suche.', 'classroom.noStudents': 'Dieser Klasse sind noch keine Lernenden beigetreten.', 'classroom.student': 'Lernende', 'classroom.joined': 'Beigetreten', 'classroom.totalScore': 'Gesamtpunktzahl', 'classroom.mostRecent': 'Zuletzt', 'classroom.consistency': 'Regelmäßigkeit', 'classroom.progressNotTracked': 'Punktzahlen und Lernfortschritt werden in dieser ersten Dashboard-Version nicht erfasst.', 'classroom.errorOffline': 'Klassenfunktionen benötigen eine Internetverbindung. Deine lokale Bibliothek bleibt verfügbar.', 'classroom.errorSignedOut': 'Verbinde dein Konto in den Einstellungen erneut, um Klassenfunktionen zu nutzen.', 'classroom.errorForbidden': 'Dieses Konto darf diese Klassenaktion nicht ausführen.', 'classroom.errorCodeNotFound': 'Der Klassencode ist ungültig oder nicht mehr aktiv.', 'classroom.errorInvalidInput': 'Prüfe die Klassendetails und versuche es erneut.', 'classroom.errorUnknown': 'Tracer konnte die Klasse nicht aktualisieren. Versuche es erneut.'
  }),
  ru: classroomCopy({
    'classroom.dashboard': 'Панель', 'classroom.teacherDashboard': 'Панель учителя', 'classroom.dashboardTitle': 'Ваши классы', 'classroom.createClass': 'Создать класс', 'classroom.createDescription': 'Добавьте сведения о классе. Tracer создаст уникальный код для входа.', 'classroom.className': 'Название класса', 'classroom.classNamePlaceholder': 'Математический анализ AB', 'classroom.subject': 'Предмет', 'classroom.subjectPlaceholder': 'Математика', 'classroom.section': 'Группа', 'classroom.sectionPlaceholder': 'Урок 2', 'classroom.schoolYear': 'Учебный год', 'classroom.schoolYearPlaceholder': '2026–2027', 'classroom.addStudents': 'Добавить учеников', 'classroom.shareCodeDescription': 'Поделитесь этим кодом с учениками, которые присоединяются к {name}.', 'classroom.classCode': 'Код класса', 'classroom.codeCopied': 'Код класса скопирован.', 'classroom.copyFailed': 'Не удалось скопировать код. Выделите и скопируйте его вручную.', 'classroom.copyCode': 'Копировать код', 'classroom.addClass': 'Добавить класс', 'classroom.joinDescription': 'Введите код, которым поделился учитель.', 'classroom.codePlaceholder': 'ВВЕДИТЕ КОД', 'classroom.joinClass': 'Вступить в класс', 'classroom.retry': 'Повторить', 'classroom.noClassesTitle': 'Создайте первый класс', 'classroom.noClassesDescription': 'Приглашайте учеников и просматривайте их учебную активность в одном месте.', 'classroom.class': 'Класс', 'classroom.students': 'Ученики', 'classroom.assignments': 'Задания', 'classroom.progress': 'Прогресс', 'classroom.comingSoon': 'Скоро', 'classroom.recentActivity': 'Недавняя активность', 'classroom.noActivity': 'Активность и прогресс учеников появятся здесь в одном из следующих обновлений.', 'classroom.classActions': 'Действия класса', 'classroom.createSets': 'Создать наборы', 'classroom.detailedView': 'Подробный вид', 'classroom.noClassDetails': 'Дополнительных сведений нет', 'classroom.backToDashboard': 'Назад к панели', 'classroom.searchStudents': 'Поиск учеников', 'classroom.sortStudents': 'Сортировать учеников', 'classroom.sortByName': 'По имени', 'classroom.sortByJoined': 'По дате вступления', 'classroom.studentRoster': 'Список учеников', 'classroom.studentCount': 'Учеников: {count}', 'classroom.noMatchingStudents': 'Поиск не дал результатов.', 'classroom.noStudents': 'К этому классу пока никто не присоединился.', 'classroom.student': 'Ученик', 'classroom.joined': 'Дата вступления', 'classroom.totalScore': 'Общий балл', 'classroom.mostRecent': 'Последний результат', 'classroom.consistency': 'Регулярность', 'classroom.progressNotTracked': 'В первой версии панели баллы и учебный прогресс не отслеживаются.', 'classroom.errorOffline': 'Для классов требуется интернет. Локальная библиотека остаётся доступной.', 'classroom.errorSignedOut': 'Переподключите аккаунт в настройках, чтобы использовать классы.', 'classroom.errorForbidden': 'У этого аккаунта нет разрешения на это действие.', 'classroom.errorCodeNotFound': 'Код класса недействителен или больше не активен.', 'classroom.errorInvalidInput': 'Проверьте сведения о классе и повторите попытку.', 'classroom.errorUnknown': 'Tracer не удалось обновить класс. Повторите попытку.'
  }),
  ja: classroomCopy({
    'classroom.dashboard': 'ダッシュボード', 'classroom.teacherDashboard': '教師ダッシュボード', 'classroom.dashboardTitle': 'クラス', 'classroom.createClass': 'クラスを作成', 'classroom.createDescription': 'クラス情報を入力してください。Tracer が固有の参加コードを生成します。', 'classroom.className': 'クラス名', 'classroom.classNamePlaceholder': '微積分 AB', 'classroom.subject': '科目', 'classroom.subjectPlaceholder': '数学', 'classroom.section': 'セクション', 'classroom.sectionPlaceholder': '2時限', 'classroom.schoolYear': '年度', 'classroom.schoolYearPlaceholder': '2026–2027', 'classroom.addStudents': '生徒を追加', 'classroom.shareCodeDescription': '{name} に参加する生徒とこのコードを共有してください。', 'classroom.classCode': 'クラスコード', 'classroom.codeCopied': 'クラスコードをコピーしました。', 'classroom.copyFailed': 'コードをコピーできませんでした。選択して手動でコピーしてください。', 'classroom.copyCode': 'コードをコピー', 'classroom.addClass': 'クラスを追加', 'classroom.joinDescription': '教師から共有されたコードを入力してください。', 'classroom.codePlaceholder': 'コードを入力', 'classroom.joinClass': 'クラスに参加', 'classroom.retry': '再試行', 'classroom.noClassesTitle': '最初のクラスを作成', 'classroom.noClassesDescription': '生徒の招待と学習活動の確認を一か所で行えます。', 'classroom.class': 'クラス', 'classroom.students': '生徒', 'classroom.assignments': '課題', 'classroom.progress': '進捗', 'classroom.comingSoon': '近日公開', 'classroom.recentActivity': '最近のアクティビティ', 'classroom.noActivity': '生徒のアクティビティと進捗は今後のアップデートで表示されます。', 'classroom.classActions': 'クラス操作', 'classroom.createSets': 'セットを作成', 'classroom.detailedView': '詳細表示', 'classroom.noClassDetails': '追加のクラス情報はありません', 'classroom.backToDashboard': 'ダッシュボードに戻る', 'classroom.searchStudents': '生徒を検索', 'classroom.sortStudents': '生徒を並べ替え', 'classroom.sortByName': '名前順', 'classroom.sortByJoined': '参加日順', 'classroom.studentRoster': '生徒名簿', 'classroom.studentCount': '{count}人の生徒', 'classroom.noMatchingStudents': '検索に一致する生徒はいません。', 'classroom.noStudents': 'このクラスにはまだ生徒が参加していません。', 'classroom.student': '生徒', 'classroom.joined': '参加日', 'classroom.totalScore': '合計スコア', 'classroom.mostRecent': '直近', 'classroom.consistency': '継続性', 'classroom.progressNotTracked': 'この最初のダッシュボード版では、スコアと学習進捗は記録されません。', 'classroom.errorOffline': 'クラス機能にはインターネット接続が必要です。ローカルライブラリは引き続き利用できます。', 'classroom.errorSignedOut': 'クラス機能を使用するには、設定でアカウントを再接続してください。', 'classroom.errorForbidden': 'このアカウントには、そのクラス操作を行う権限がありません。', 'classroom.errorCodeNotFound': 'クラスコードが無効か、使用できません。', 'classroom.errorInvalidInput': 'クラス情報を確認して、もう一度お試しください。', 'classroom.errorUnknown': 'Tracer はクラスを更新できませんでした。もう一度お試しください。'
  }),
  ko: classroomCopy({
    'classroom.dashboard': '대시보드', 'classroom.teacherDashboard': '교사 대시보드', 'classroom.dashboardTitle': '내 수업', 'classroom.createClass': '수업 만들기', 'classroom.createDescription': '수업 정보를 입력하세요. Tracer가 고유한 참여 코드를 생성합니다.', 'classroom.className': '수업 이름', 'classroom.classNamePlaceholder': '미적분 AB', 'classroom.subject': '과목', 'classroom.subjectPlaceholder': '수학', 'classroom.section': '분반', 'classroom.sectionPlaceholder': '2교시', 'classroom.schoolYear': '학년도', 'classroom.schoolYearPlaceholder': '2026–2027', 'classroom.addStudents': '학생 추가', 'classroom.shareCodeDescription': '{name}에 참여할 학생에게 이 코드를 공유하세요.', 'classroom.classCode': '수업 코드', 'classroom.codeCopied': '수업 코드를 복사했습니다.', 'classroom.copyFailed': '코드를 복사하지 못했습니다. 선택한 뒤 직접 복사하세요.', 'classroom.copyCode': '코드 복사', 'classroom.addClass': '수업 추가', 'classroom.joinDescription': '교사가 공유한 코드를 입력하세요.', 'classroom.codePlaceholder': '코드 입력', 'classroom.joinClass': '수업 참여', 'classroom.retry': '다시 시도', 'classroom.noClassesTitle': '첫 수업 만들기', 'classroom.noClassesDescription': '한곳에서 학생을 초대하고 학습 활동을 확인하세요.', 'classroom.class': '수업', 'classroom.students': '학생', 'classroom.assignments': '과제', 'classroom.progress': '진행도', 'classroom.comingSoon': '곧 제공 예정', 'classroom.recentActivity': '최근 활동', 'classroom.noActivity': '학생 활동과 진행도는 향후 업데이트에서 여기에 표시됩니다.', 'classroom.classActions': '수업 작업', 'classroom.createSets': '세트 만들기', 'classroom.detailedView': '상세 보기', 'classroom.noClassDetails': '추가 수업 정보 없음', 'classroom.backToDashboard': '대시보드로 돌아가기', 'classroom.searchStudents': '학생 검색', 'classroom.sortStudents': '학생 정렬', 'classroom.sortByName': '이름순', 'classroom.sortByJoined': '참여일순', 'classroom.studentRoster': '학생 명단', 'classroom.studentCount': '학생 {count}명', 'classroom.noMatchingStudents': '검색과 일치하는 학생이 없습니다.', 'classroom.noStudents': '아직 이 수업에 참여한 학생이 없습니다.', 'classroom.student': '학생', 'classroom.joined': '참여일', 'classroom.totalScore': '총점', 'classroom.mostRecent': '최근 결과', 'classroom.consistency': '꾸준함', 'classroom.progressNotTracked': '이 첫 대시보드 버전에서는 점수와 학습 진행도를 추적하지 않습니다.', 'classroom.errorOffline': '수업 기능에는 인터넷 연결이 필요합니다. 로컬 라이브러리는 계속 사용할 수 있습니다.', 'classroom.errorSignedOut': '수업 기능을 사용하려면 설정에서 계정을 다시 연결하세요.', 'classroom.errorForbidden': '이 계정에는 해당 수업 작업을 수행할 권한이 없습니다.', 'classroom.errorCodeNotFound': '수업 코드가 잘못되었거나 더 이상 활성화되지 않았습니다.', 'classroom.errorInvalidInput': '수업 정보를 확인하고 다시 시도하세요.', 'classroom.errorUnknown': 'Tracer가 수업을 업데이트하지 못했습니다. 다시 시도하세요.'
  }),
}

for (const language of Object.keys(classroomMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], classroomMessages[language])
}

const classroomManagementEnglish: Messages = {
  'classroom.manageClass': 'Manage Class',
  'classroom.manageDescription': 'Manage students, assigned material, and class deletion.',
  'classroom.manageStudents': 'Students',
  'classroom.manageStudentsDescription': 'Removing a student revokes their class and assignment access.',
  'classroom.assignedMaterials': 'Assigned sets and material',
  'classroom.assignedMaterialsDescription': 'Removing an assignment preserves the reusable source set but deletes class-specific attempts.',
  'classroom.noAssignedMaterials': 'No sets or material are assigned to this class.',
  'classroom.removeStudent': 'Remove student',
  'classroom.removeMaterial': 'Remove material',
  'classroom.deleteClass': 'Delete class',
  'classroom.deleteClassDescription': 'Permanently delete this class, its roster, assignments, and class-specific attempt history. Reusable source sets are preserved.',
  'classroom.removeStudentTitle': 'Remove this student?',
  'classroom.removeMaterialTitle': 'Remove this material?',
  'classroom.removeStudentConfirmation': 'Remove {name} from this class and revoke their assignment access?',
  'classroom.removeMaterialConfirmation': 'Remove {name} and its class-specific attempt history? The source set will remain in your library.',
  'classroom.deleteClassConfirmation': 'This permanently deletes {name}, its roster, assignments, and class-specific attempt history.',
  'classroom.typeClassName': 'Type “{name}” to confirm.',
  'classroom.manageItemNotFound': 'That classroom item no longer exists. Reload the page and try again.',
  'classroom.assignmentStatus.draft': 'Draft',
  'classroom.assignmentStatus.published': 'Published',
  'classroom.assignmentStatus.closed': 'Closed',
}

function classroomManagementCopy(overrides: Messages): Messages {
  return { ...classroomManagementEnglish, ...overrides }
}

const classroomManagementMessages: Record<AppLanguage, Messages> = {
  en: classroomManagementEnglish,
  es: classroomManagementCopy({
    'classroom.manageClass': 'Gestionar clase', 'classroom.manageDescription': 'Gestiona estudiantes, material asignado y la eliminación de la clase.', 'classroom.manageStudents': 'Estudiantes', 'classroom.manageStudentsDescription': 'Quitar a un estudiante revoca su acceso a la clase y a las tareas.', 'classroom.assignedMaterials': 'Conjuntos y material asignado', 'classroom.assignedMaterialsDescription': 'Quitar una tarea conserva el conjunto original, pero elimina los intentos de esta clase.', 'classroom.noAssignedMaterials': 'No hay conjuntos ni material asignado a esta clase.', 'classroom.removeStudent': 'Quitar estudiante', 'classroom.removeMaterial': 'Quitar material', 'classroom.deleteClass': 'Eliminar clase', 'classroom.deleteClassDescription': 'Elimina permanentemente la clase, la lista, las tareas y los intentos de la clase. Los conjuntos originales se conservan.', 'classroom.removeStudentTitle': '¿Quitar a este estudiante?', 'classroom.removeMaterialTitle': '¿Quitar este material?', 'classroom.removeStudentConfirmation': '¿Quitar a {name} de esta clase y revocar su acceso a las tareas?', 'classroom.removeMaterialConfirmation': '¿Quitar {name} y sus intentos de esta clase? El conjunto original seguirá en tu biblioteca.', 'classroom.deleteClassConfirmation': 'Esto elimina permanentemente {name}, su lista, sus tareas y los intentos de la clase.', 'classroom.typeClassName': 'Escribe “{name}” para confirmar.', 'classroom.manageItemNotFound': 'Ese elemento ya no existe. Recarga la página e inténtalo de nuevo.', 'classroom.assignmentStatus.draft': 'Borrador', 'classroom.assignmentStatus.published': 'Publicada', 'classroom.assignmentStatus.closed': 'Cerrada'
  }),
  fr: classroomManagementCopy({
    'classroom.manageClass': 'Gérer la classe', 'classroom.manageDescription': 'Gérez les élèves, le matériel attribué et la suppression de la classe.', 'classroom.manageStudents': 'Élèves', 'classroom.manageStudentsDescription': 'Retirer un élève révoque son accès à la classe et aux devoirs.', 'classroom.assignedMaterials': 'Ensembles et matériel attribués', 'classroom.assignedMaterialsDescription': 'Retirer un devoir conserve l’ensemble source, mais supprime les tentatives propres à la classe.', 'classroom.noAssignedMaterials': 'Aucun ensemble ou matériel n’est attribué à cette classe.', 'classroom.removeStudent': 'Retirer l’élève', 'classroom.removeMaterial': 'Retirer le matériel', 'classroom.deleteClass': 'Supprimer la classe', 'classroom.deleteClassDescription': 'Supprime définitivement la classe, ses élèves, ses devoirs et l’historique des tentatives. Les ensembles sources sont conservés.', 'classroom.removeStudentTitle': 'Retirer cet élève ?', 'classroom.removeMaterialTitle': 'Retirer ce matériel ?', 'classroom.removeStudentConfirmation': 'Retirer {name} de cette classe et révoquer son accès aux devoirs ?', 'classroom.removeMaterialConfirmation': 'Retirer {name} et l’historique de ses tentatives dans la classe ? L’ensemble source restera dans votre bibliothèque.', 'classroom.deleteClassConfirmation': 'Cette action supprime définitivement {name}, ses élèves, ses devoirs et l’historique des tentatives.', 'classroom.typeClassName': 'Saisissez « {name} » pour confirmer.', 'classroom.manageItemNotFound': 'Cet élément n’existe plus. Rechargez la page et réessayez.', 'classroom.assignmentStatus.draft': 'Brouillon', 'classroom.assignmentStatus.published': 'Publié', 'classroom.assignmentStatus.closed': 'Fermé'
  }),
  'zh-CN': classroomManagementCopy({
    'classroom.manageClass': '管理班级', 'classroom.manageDescription': '管理学生、已分配材料和班级删除。', 'classroom.manageStudents': '学生', 'classroom.manageStudentsDescription': '移除学生将撤销其班级和作业访问权限。', 'classroom.assignedMaterials': '已分配的卡片集和材料', 'classroom.assignedMaterialsDescription': '移除作业会保留可重复使用的源卡片集，但会删除该班级的作答记录。', 'classroom.noAssignedMaterials': '此班级尚未分配卡片集或材料。', 'classroom.removeStudent': '移除学生', 'classroom.removeMaterial': '移除材料', 'classroom.deleteClass': '删除班级', 'classroom.deleteClassDescription': '永久删除此班级、学生名单、作业和班级作答记录。可重复使用的源卡片集会保留。', 'classroom.removeStudentTitle': '移除此学生？', 'classroom.removeMaterialTitle': '移除此材料？', 'classroom.removeStudentConfirmation': '将 {name} 移出此班级并撤销其作业访问权限？', 'classroom.removeMaterialConfirmation': '移除 {name} 及其班级作答记录？源卡片集仍会保留在资料库中。', 'classroom.deleteClassConfirmation': '这将永久删除 {name}、学生名单、作业和班级作答记录。', 'classroom.typeClassName': '输入“{name}”以确认。', 'classroom.manageItemNotFound': '该班级项目已不存在。请重新加载页面后重试。', 'classroom.assignmentStatus.draft': '草稿', 'classroom.assignmentStatus.published': '已发布', 'classroom.assignmentStatus.closed': '已关闭'
  }),
  hi: classroomManagementCopy({
    'classroom.manageClass': 'कक्षा प्रबंधित करें', 'classroom.manageDescription': 'विद्यार्थियों, सौंपे गए अध्ययन-सामग्री और कक्षा हटाने का प्रबंधन करें।', 'classroom.manageStudents': 'विद्यार्थी', 'classroom.manageStudentsDescription': 'विद्यार्थी को हटाने पर कक्षा और असाइनमेंट की पहुँच समाप्त हो जाती है।', 'classroom.assignedMaterials': 'सौंपे गए सेट और सामग्री', 'classroom.assignedMaterialsDescription': 'असाइनमेंट हटाने पर मूल सेट सुरक्षित रहता है, लेकिन कक्षा-विशिष्ट प्रयास हट जाते हैं।', 'classroom.noAssignedMaterials': 'इस कक्षा को कोई सेट या सामग्री नहीं सौंपी गई है।', 'classroom.removeStudent': 'विद्यार्थी हटाएँ', 'classroom.removeMaterial': 'सामग्री हटाएँ', 'classroom.deleteClass': 'कक्षा हटाएँ', 'classroom.deleteClassDescription': 'इस कक्षा, विद्यार्थियों, असाइनमेंट और कक्षा-विशिष्ट प्रयासों को स्थायी रूप से हटाएँ। मूल सेट सुरक्षित रहेंगे।', 'classroom.removeStudentTitle': 'इस विद्यार्थी को हटाएँ?', 'classroom.removeMaterialTitle': 'यह सामग्री हटाएँ?', 'classroom.removeStudentConfirmation': '{name} को कक्षा से हटाकर असाइनमेंट की पहुँच रद्द करें?', 'classroom.removeMaterialConfirmation': '{name} और उसके कक्षा-विशिष्ट प्रयास हटाएँ? मूल सेट लाइब्रेरी में रहेगा।', 'classroom.deleteClassConfirmation': 'यह {name}, उसके विद्यार्थी, असाइनमेंट और कक्षा-विशिष्ट प्रयास स्थायी रूप से हटा देगा।', 'classroom.typeClassName': 'पुष्टि के लिए “{name}” लिखें।', 'classroom.manageItemNotFound': 'वह कक्षा आइटम अब मौजूद नहीं है। पेज फिर लोड करके कोशिश करें।', 'classroom.assignmentStatus.draft': 'ड्राफ़्ट', 'classroom.assignmentStatus.published': 'प्रकाशित', 'classroom.assignmentStatus.closed': 'बंद'
  }),
  ar: classroomManagementCopy({
    'classroom.manageClass': 'إدارة الصف', 'classroom.manageDescription': 'أدِر الطلاب والمواد المعيّنة وحذف الصف.', 'classroom.manageStudents': 'الطلاب', 'classroom.manageStudentsDescription': 'تؤدي إزالة الطالب إلى إلغاء وصوله إلى الصف والواجبات.', 'classroom.assignedMaterials': 'المجموعات والمواد المعيّنة', 'classroom.assignedMaterialsDescription': 'تحتفظ إزالة الواجب بالمجموعة الأصلية، لكنها تحذف محاولات هذا الصف.', 'classroom.noAssignedMaterials': 'لا توجد مجموعات أو مواد معيّنة لهذا الصف.', 'classroom.removeStudent': 'إزالة الطالب', 'classroom.removeMaterial': 'إزالة المادة', 'classroom.deleteClass': 'حذف الصف', 'classroom.deleteClassDescription': 'يحذف الصف وطلابه وواجباته وسجل محاولاته نهائيًا. تبقى المجموعات الأصلية محفوظة.', 'classroom.removeStudentTitle': 'إزالة هذا الطالب؟', 'classroom.removeMaterialTitle': 'إزالة هذه المادة؟', 'classroom.removeStudentConfirmation': 'هل تريد إزالة {name} من الصف وإلغاء وصوله إلى الواجبات؟', 'classroom.removeMaterialConfirmation': 'هل تريد إزالة {name} ومحاولاته الخاصة بالصف؟ ستبقى المجموعة الأصلية في مكتبتك.', 'classroom.deleteClassConfirmation': 'سيؤدي هذا إلى حذف {name} وطلابه وواجباته وسجل محاولاته نهائيًا.', 'classroom.typeClassName': 'اكتب «{name}» للتأكيد.', 'classroom.manageItemNotFound': 'لم يعد عنصر الصف هذا موجودًا. أعد تحميل الصفحة وحاول مجددًا.', 'classroom.assignmentStatus.draft': 'مسودة', 'classroom.assignmentStatus.published': 'منشور', 'classroom.assignmentStatus.closed': 'مغلق'
  }),
  de: classroomManagementCopy({
    'classroom.manageClass': 'Klasse verwalten', 'classroom.manageDescription': 'Verwalte Lernende, zugewiesenes Material und das Löschen der Klasse.', 'classroom.manageStudents': 'Lernende', 'classroom.manageStudentsDescription': 'Beim Entfernen wird der Zugriff auf Klasse und Aufgaben widerrufen.', 'classroom.assignedMaterials': 'Zugewiesene Sets und Materialien', 'classroom.assignedMaterialsDescription': 'Beim Entfernen einer Aufgabe bleibt das Quell-Set erhalten; klassenspezifische Versuche werden gelöscht.', 'classroom.noAssignedMaterials': 'Dieser Klasse sind keine Sets oder Materialien zugewiesen.', 'classroom.removeStudent': 'Lernende entfernen', 'classroom.removeMaterial': 'Material entfernen', 'classroom.deleteClass': 'Klasse löschen', 'classroom.deleteClassDescription': 'Löscht die Klasse, ihre Lernenden, Aufgaben und klassenspezifischen Versuche dauerhaft. Quell-Sets bleiben erhalten.', 'classroom.removeStudentTitle': 'Diese Person entfernen?', 'classroom.removeMaterialTitle': 'Dieses Material entfernen?', 'classroom.removeStudentConfirmation': '{name} aus der Klasse entfernen und den Aufgabenzugriff widerrufen?', 'classroom.removeMaterialConfirmation': '{name} und die klassenspezifischen Versuche entfernen? Das Quell-Set bleibt in deiner Bibliothek.', 'classroom.deleteClassConfirmation': 'Dadurch werden {name}, die Lernenden, Aufgaben und klassenspezifischen Versuche dauerhaft gelöscht.', 'classroom.typeClassName': 'Gib zur Bestätigung „{name}“ ein.', 'classroom.manageItemNotFound': 'Dieses Klassenelement existiert nicht mehr. Lade die Seite neu und versuche es erneut.', 'classroom.assignmentStatus.draft': 'Entwurf', 'classroom.assignmentStatus.published': 'Veröffentlicht', 'classroom.assignmentStatus.closed': 'Geschlossen'
  }),
  ru: classroomManagementCopy({
    'classroom.manageClass': 'Управление классом', 'classroom.manageDescription': 'Управляйте учениками, назначенными материалами и удалением класса.', 'classroom.manageStudents': 'Ученики', 'classroom.manageStudentsDescription': 'Удаление ученика отзывает доступ к классу и заданиям.', 'classroom.assignedMaterials': 'Назначенные наборы и материалы', 'classroom.assignedMaterialsDescription': 'При удалении задания исходный набор сохраняется, а попытки этого класса удаляются.', 'classroom.noAssignedMaterials': 'Этому классу не назначены наборы или материалы.', 'classroom.removeStudent': 'Удалить ученика', 'classroom.removeMaterial': 'Удалить материал', 'classroom.deleteClass': 'Удалить класс', 'classroom.deleteClassDescription': 'Навсегда удаляет класс, учеников, задания и историю попыток. Исходные наборы сохраняются.', 'classroom.removeStudentTitle': 'Удалить этого ученика?', 'classroom.removeMaterialTitle': 'Удалить этот материал?', 'classroom.removeStudentConfirmation': 'Удалить {name} из класса и отозвать доступ к заданиям?', 'classroom.removeMaterialConfirmation': 'Удалить {name} и попытки этого класса? Исходный набор останется в библиотеке.', 'classroom.deleteClassConfirmation': 'Это навсегда удалит {name}, учеников, задания и историю попыток класса.', 'classroom.typeClassName': 'Введите «{name}» для подтверждения.', 'classroom.manageItemNotFound': 'Этот элемент класса больше не существует. Перезагрузите страницу и повторите попытку.', 'classroom.assignmentStatus.draft': 'Черновик', 'classroom.assignmentStatus.published': 'Опубликовано', 'classroom.assignmentStatus.closed': 'Закрыто'
  }),
  ja: classroomManagementCopy({
    'classroom.manageClass': 'クラスを管理', 'classroom.manageDescription': '生徒、割り当て済み教材、クラスの削除を管理します。', 'classroom.manageStudents': '生徒', 'classroom.manageStudentsDescription': '生徒を削除すると、クラスと課題へのアクセスが取り消されます。', 'classroom.assignedMaterials': '割り当て済みセットと教材', 'classroom.assignedMaterialsDescription': '課題を削除しても元のセットは残りますが、このクラスの解答履歴は削除されます。', 'classroom.noAssignedMaterials': 'このクラスに割り当てられたセットや教材はありません。', 'classroom.removeStudent': '生徒を削除', 'classroom.removeMaterial': '教材を削除', 'classroom.deleteClass': 'クラスを削除', 'classroom.deleteClassDescription': 'クラス、生徒、課題、クラス固有の解答履歴を完全に削除します。元のセットは保持されます。', 'classroom.removeStudentTitle': 'この生徒を削除しますか？', 'classroom.removeMaterialTitle': 'この教材を削除しますか？', 'classroom.removeStudentConfirmation': '{name} をクラスから削除し、課題へのアクセスを取り消しますか？', 'classroom.removeMaterialConfirmation': '{name} とクラス固有の解答履歴を削除しますか？元のセットはライブラリに残ります。', 'classroom.deleteClassConfirmation': '{name}、生徒、課題、クラス固有の解答履歴を完全に削除します。', 'classroom.typeClassName': '確認のため「{name}」と入力してください。', 'classroom.manageItemNotFound': 'そのクラス項目は存在しません。ページを再読み込みして、もう一度お試しください。', 'classroom.assignmentStatus.draft': '下書き', 'classroom.assignmentStatus.published': '公開済み', 'classroom.assignmentStatus.closed': '終了'
  }),
  ko: classroomManagementCopy({
    'classroom.manageClass': '수업 관리', 'classroom.manageDescription': '학생, 배정된 자료, 수업 삭제를 관리합니다.', 'classroom.manageStudents': '학생', 'classroom.manageStudentsDescription': '학생을 삭제하면 수업과 과제 접근 권한이 해제됩니다.', 'classroom.assignedMaterials': '배정된 세트 및 자료', 'classroom.assignedMaterialsDescription': '과제를 삭제해도 원본 세트는 유지되지만 이 수업의 시도 기록은 삭제됩니다.', 'classroom.noAssignedMaterials': '이 수업에 배정된 세트나 자료가 없습니다.', 'classroom.removeStudent': '학생 삭제', 'classroom.removeMaterial': '자료 삭제', 'classroom.deleteClass': '수업 삭제', 'classroom.deleteClassDescription': '수업, 학생, 과제, 수업별 시도 기록을 영구적으로 삭제합니다. 원본 세트는 유지됩니다.', 'classroom.removeStudentTitle': '이 학생을 삭제할까요?', 'classroom.removeMaterialTitle': '이 자료를 삭제할까요?', 'classroom.removeStudentConfirmation': '{name} 학생을 수업에서 삭제하고 과제 접근 권한을 해제할까요?', 'classroom.removeMaterialConfirmation': '{name} 자료와 수업별 시도 기록을 삭제할까요? 원본 세트는 라이브러리에 남습니다.', 'classroom.deleteClassConfirmation': '{name}, 학생, 과제, 수업별 시도 기록이 영구적으로 삭제됩니다.', 'classroom.typeClassName': '확인하려면 “{name}”을 입력하세요.', 'classroom.manageItemNotFound': '해당 수업 항목이 더 이상 존재하지 않습니다. 페이지를 새로고침한 후 다시 시도하세요.', 'classroom.assignmentStatus.draft': '초안', 'classroom.assignmentStatus.published': '게시됨', 'classroom.assignmentStatus.closed': '종료됨'
  }),
}

for (const language of Object.keys(classroomManagementMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], classroomManagementMessages[language])
}

const classroomRefinementMessages: Record<AppLanguage, Messages> = {
  en: {
    'classroom.dashboardDescription': 'View your classes, invite students, and open detailed progress.',
    'classroom.manageDescription': 'Update class information and manage the student roster.',
    'classroom.classInformation': 'Class information',
    'classroom.classInformationDescription': 'Update the name and details shown to students.',
    'classroom.saveClassChanges': 'Save changes',
    'classroom.classChangesSaved': 'Class information saved.',
  },
  es: {
    'classroom.dashboardDescription': 'Consulta tus clases, invita estudiantes y abre el progreso detallado.',
    'classroom.manageDescription': 'Actualiza la información de la clase y gestiona la lista de estudiantes.',
    'classroom.classInformation': 'Información de la clase',
    'classroom.classInformationDescription': 'Actualiza el nombre y los datos que ven los estudiantes.',
    'classroom.saveClassChanges': 'Guardar cambios',
    'classroom.classChangesSaved': 'Información de la clase guardada.',
  },
  fr: {
    'classroom.dashboardDescription': 'Consultez vos classes, invitez des élèves et ouvrez la progression détaillée.',
    'classroom.manageDescription': 'Modifiez les informations de la classe et gérez la liste des élèves.',
    'classroom.classInformation': 'Informations de la classe',
    'classroom.classInformationDescription': 'Modifiez le nom et les informations affichées aux élèves.',
    'classroom.saveClassChanges': 'Enregistrer les modifications',
    'classroom.classChangesSaved': 'Informations de la classe enregistrées.',
  },
  'zh-CN': {
    'classroom.dashboardDescription': '查看班级、邀请学生并打开详细进度。',
    'classroom.manageDescription': '更新班级信息并管理学生名单。',
    'classroom.classInformation': '班级信息',
    'classroom.classInformationDescription': '更新学生可见的名称和详细信息。',
    'classroom.saveClassChanges': '保存更改',
    'classroom.classChangesSaved': '班级信息已保存。',
  },
  hi: {
    'classroom.dashboardDescription': 'अपनी कक्षाएँ देखें, विद्यार्थियों को आमंत्रित करें और विस्तृत प्रगति खोलें।',
    'classroom.manageDescription': 'कक्षा की जानकारी अपडेट करें और विद्यार्थियों की सूची प्रबंधित करें।',
    'classroom.classInformation': 'कक्षा की जानकारी',
    'classroom.classInformationDescription': 'विद्यार्थियों को दिखने वाला नाम और विवरण अपडेट करें।',
    'classroom.saveClassChanges': 'बदलाव सहेजें',
    'classroom.classChangesSaved': 'कक्षा की जानकारी सहेजी गई।',
  },
  ar: {
    'classroom.dashboardDescription': 'اعرض صفوفك وادعُ الطلاب وافتح التقدم التفصيلي.',
    'classroom.manageDescription': 'حدّث معلومات الصف وأدِر قائمة الطلاب.',
    'classroom.classInformation': 'معلومات الصف',
    'classroom.classInformationDescription': 'حدّث الاسم والتفاصيل التي تظهر للطلاب.',
    'classroom.saveClassChanges': 'حفظ التغييرات',
    'classroom.classChangesSaved': 'تم حفظ معلومات الصف.',
  },
  de: {
    'classroom.dashboardDescription': 'Sieh deine Klassen an, lade Lernende ein und öffne den detaillierten Fortschritt.',
    'classroom.manageDescription': 'Aktualisiere die Klasseninformationen und verwalte die Lernendenliste.',
    'classroom.classInformation': 'Klasseninformationen',
    'classroom.classInformationDescription': 'Aktualisiere den Namen und die Details, die Lernende sehen.',
    'classroom.saveClassChanges': 'Änderungen speichern',
    'classroom.classChangesSaved': 'Klasseninformationen gespeichert.',
  },
  ru: {
    'classroom.dashboardDescription': 'Просматривайте классы, приглашайте учеников и открывайте подробный прогресс.',
    'classroom.manageDescription': 'Обновляйте сведения о классе и управляйте списком учеников.',
    'classroom.classInformation': 'Сведения о классе',
    'classroom.classInformationDescription': 'Измените название и сведения, которые видят ученики.',
    'classroom.saveClassChanges': 'Сохранить изменения',
    'classroom.classChangesSaved': 'Сведения о классе сохранены.',
  },
  ja: {
    'classroom.dashboardDescription': 'クラスを確認し、生徒を招待して、詳細な進捗を開きます。',
    'classroom.manageDescription': 'クラス情報を更新し、生徒名簿を管理します。',
    'classroom.classInformation': 'クラス情報',
    'classroom.classInformationDescription': '生徒に表示される名前と詳細を更新します。',
    'classroom.saveClassChanges': '変更を保存',
    'classroom.classChangesSaved': 'クラス情報を保存しました。',
  },
  ko: {
    'classroom.dashboardDescription': '수업을 확인하고 학생을 초대하며 상세 진행도를 엽니다.',
    'classroom.manageDescription': '수업 정보를 수정하고 학생 명단을 관리합니다.',
    'classroom.classInformation': '수업 정보',
    'classroom.classInformationDescription': '학생에게 표시되는 이름과 정보를 수정합니다.',
    'classroom.saveClassChanges': '변경 사항 저장',
    'classroom.classChangesSaved': '수업 정보를 저장했습니다.',
  },
}

for (const language of Object.keys(classroomRefinementMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], classroomRefinementMessages[language])
}

const classroomAssignmentMessages: Record<AppLanguage, Messages> = {
  en: {
    'classroom.assignSet': 'Assign Set',
    'classroom.assign': 'Assign',
    'classroom.alreadyAssigned': 'Already assigned',
    'classroom.assignSetDescription': 'Choose a local set or study guide to upload and assign to this class.',
    'classroom.chooseAssignment': 'Choose a set or study guide',
    'classroom.chooseAssignmentDescription': 'The assigned snapshot will not change when you edit the local copy later.',
    'classroom.noAssignableItems': 'There are no items in this part of your library yet.',
    'classroom.cardCount': '{count} cards',
    'classroom.assignmentDesktopRequired': 'Assigning sets requires the Tracer desktop app.',
    'classroom.localSetMissing': 'The selected local set is no longer available.',
    'classroom.assignedSuccess': '{name} was assigned to {className}.',
    'classroom.backToHome': 'Back to home',
    'classroom.recentSets': 'Recent Sets',
    'classroom.recentSetsDescription': 'Sets and study guides assigned by your teacher appear here.',
    'classroom.noRecentSets': 'No sets have been assigned to this class yet.',
  },
  es: {
    'classroom.alreadyAssigned': 'Ya asignado',
    'classroom.assignSet': 'Asignar conjunto', 'classroom.assign': 'Asignar', 'classroom.assignSetDescription': 'Elige un conjunto local o una guía de estudio para subirla y asignarla a esta clase.', 'classroom.chooseAssignment': 'Elige un conjunto o una guía de estudio', 'classroom.chooseAssignmentDescription': 'La copia asignada no cambiará cuando edites la copia local más adelante.', 'classroom.noAssignableItems': 'Todavía no hay elementos en esta parte de tu biblioteca.', 'classroom.cardCount': '{count} tarjetas', 'classroom.assignmentDesktopRequired': 'Para asignar conjuntos se necesita la aplicación de escritorio de Tracer.', 'classroom.localSetMissing': 'El conjunto local seleccionado ya no está disponible.', 'classroom.assignedSuccess': 'Se asignó {name} a {className}.', 'classroom.backToHome': 'Volver al inicio', 'classroom.recentSets': 'Conjuntos recientes', 'classroom.recentSetsDescription': 'Aquí aparecen los conjuntos y guías de estudio que asigna tu profesor.', 'classroom.noRecentSets': 'Todavía no se asignaron conjuntos a esta clase.',
  },
  fr: {
    'classroom.alreadyAssigned': 'Déjà attribué',
    'classroom.assignSet': 'Attribuer un ensemble', 'classroom.assign': 'Attribuer', 'classroom.assignSetDescription': 'Choisissez un ensemble local ou un guide d’étude à téléverser et à attribuer à cette classe.', 'classroom.chooseAssignment': 'Choisir un ensemble ou un guide d’étude', 'classroom.chooseAssignmentDescription': 'L’instantané attribué ne changera pas si vous modifiez ensuite la copie locale.', 'classroom.noAssignableItems': 'Cette partie de votre bibliothèque est encore vide.', 'classroom.cardCount': '{count} cartes', 'classroom.assignmentDesktopRequired': 'L’attribution d’ensembles nécessite l’application de bureau Tracer.', 'classroom.localSetMissing': 'L’ensemble local sélectionné n’est plus disponible.', 'classroom.assignedSuccess': '{name} a été attribué à {className}.', 'classroom.backToHome': 'Retour à l’accueil', 'classroom.recentSets': 'Ensembles récents', 'classroom.recentSetsDescription': 'Les ensembles et guides d’étude attribués par votre enseignant apparaissent ici.', 'classroom.noRecentSets': 'Aucun ensemble n’a encore été attribué à cette classe.',
  },
  'zh-CN': {
    'classroom.alreadyAssigned': '已分配',
    'classroom.assignSet': '分配卡片集', 'classroom.assign': '分配', 'classroom.assignSetDescription': '选择本地卡片集或学习指南，上传并分配给此班级。', 'classroom.chooseAssignment': '选择卡片集或学习指南', 'classroom.chooseAssignmentDescription': '以后编辑本地副本不会改变已分配的快照。', 'classroom.noAssignableItems': '资料库的这一部分还没有内容。', 'classroom.cardCount': '{count} 张卡片', 'classroom.assignmentDesktopRequired': '分配卡片集需要 Tracer 桌面应用。', 'classroom.localSetMissing': '所选本地卡片集已不可用。', 'classroom.assignedSuccess': '已将 {name} 分配给 {className}。', 'classroom.backToHome': '返回首页', 'classroom.recentSets': '最近的卡片集', 'classroom.recentSetsDescription': '老师分配的卡片集和学习指南会显示在这里。', 'classroom.noRecentSets': '此班级尚未分配任何卡片集。',
  },
  hi: {
    'classroom.alreadyAssigned': 'पहले से असाइन किया गया',
    'classroom.assignSet': 'सेट असाइन करें', 'classroom.assign': 'असाइन करें', 'classroom.assignSetDescription': 'इस कक्षा में अपलोड और असाइन करने के लिए कोई स्थानीय सेट या अध्ययन गाइड चुनें।', 'classroom.chooseAssignment': 'सेट या अध्ययन गाइड चुनें', 'classroom.chooseAssignmentDescription': 'बाद में स्थानीय कॉपी बदलने पर असाइन किया गया स्नैपशॉट नहीं बदलेगा।', 'classroom.noAssignableItems': 'आपकी लाइब्रेरी के इस हिस्से में अभी कोई आइटम नहीं है।', 'classroom.cardCount': '{count} कार्ड', 'classroom.assignmentDesktopRequired': 'सेट असाइन करने के लिए Tracer डेस्कटॉप ऐप आवश्यक है।', 'classroom.localSetMissing': 'चुना गया स्थानीय सेट अब उपलब्ध नहीं है।', 'classroom.assignedSuccess': '{name} को {className} में असाइन किया गया।', 'classroom.backToHome': 'होम पर वापस जाएँ', 'classroom.recentSets': 'हाल के सेट', 'classroom.recentSetsDescription': 'आपके शिक्षक द्वारा असाइन किए गए सेट और अध्ययन गाइड यहाँ दिखाई देते हैं।', 'classroom.noRecentSets': 'इस कक्षा को अभी कोई सेट असाइन नहीं किया गया है।',
  },
  ar: {
    'classroom.alreadyAssigned': 'تم تعيينها بالفعل',
    'classroom.assignSet': 'تعيين مجموعة', 'classroom.assign': 'تعيين', 'classroom.assignSetDescription': 'اختر مجموعة محلية أو دليل دراسة لرفعه وتعيينه لهذا الصف.', 'classroom.chooseAssignment': 'اختر مجموعة أو دليل دراسة', 'classroom.chooseAssignmentDescription': 'لن تتغير النسخة المعيّنة عند تعديل النسخة المحلية لاحقًا.', 'classroom.noAssignableItems': 'لا توجد عناصر في هذا الجزء من مكتبتك بعد.', 'classroom.cardCount': '{count} بطاقة', 'classroom.assignmentDesktopRequired': 'يتطلب تعيين المجموعات تطبيق Tracer لسطح المكتب.', 'classroom.localSetMissing': 'لم تعد المجموعة المحلية المحددة متاحة.', 'classroom.assignedSuccess': 'تم تعيين {name} إلى {className}.', 'classroom.backToHome': 'العودة إلى الرئيسية', 'classroom.recentSets': 'المجموعات الحديثة', 'classroom.recentSetsDescription': 'تظهر هنا المجموعات وأدلة الدراسة التي يعيّنها معلمك.', 'classroom.noRecentSets': 'لم يتم تعيين أي مجموعات لهذا الصف بعد.',
  },
  de: {
    'classroom.alreadyAssigned': 'Bereits zugewiesen',
    'classroom.assignSet': 'Set zuweisen', 'classroom.assign': 'Zuweisen', 'classroom.assignSetDescription': 'Wähle ein lokales Set oder einen Lernleitfaden zum Hochladen und Zuweisen aus.', 'classroom.chooseAssignment': 'Set oder Lernleitfaden auswählen', 'classroom.chooseAssignmentDescription': 'Der zugewiesene Stand ändert sich nicht, wenn du die lokale Kopie später bearbeitest.', 'classroom.noAssignableItems': 'In diesem Teil deiner Bibliothek gibt es noch keine Elemente.', 'classroom.cardCount': '{count} Karten', 'classroom.assignmentDesktopRequired': 'Zum Zuweisen von Sets ist die Tracer-Desktop-App erforderlich.', 'classroom.localSetMissing': 'Das ausgewählte lokale Set ist nicht mehr verfügbar.', 'classroom.assignedSuccess': '{name} wurde {className} zugewiesen.', 'classroom.backToHome': 'Zur Startseite', 'classroom.recentSets': 'Neueste Sets', 'classroom.recentSetsDescription': 'Von deiner Lehrkraft zugewiesene Sets und Lernleitfäden erscheinen hier.', 'classroom.noRecentSets': 'Dieser Klasse wurden noch keine Sets zugewiesen.',
  },
  ru: {
    'classroom.alreadyAssigned': 'Уже назначено',
    'classroom.assignSet': 'Назначить набор', 'classroom.assign': 'Назначить', 'classroom.assignSetDescription': 'Выберите локальный набор или учебное руководство, чтобы загрузить и назначить его классу.', 'classroom.chooseAssignment': 'Выберите набор или руководство', 'classroom.chooseAssignmentDescription': 'Назначенный снимок не изменится при последующем редактировании локальной копии.', 'classroom.noAssignableItems': 'В этой части библиотеки пока нет материалов.', 'classroom.cardCount': '{count} карточек', 'classroom.assignmentDesktopRequired': 'Для назначения наборов требуется настольное приложение Tracer.', 'classroom.localSetMissing': 'Выбранный локальный набор больше недоступен.', 'classroom.assignedSuccess': '{name} назначен классу {className}.', 'classroom.backToHome': 'На главную', 'classroom.recentSets': 'Недавние наборы', 'classroom.recentSetsDescription': 'Здесь появляются наборы и руководства, назначенные учителем.', 'classroom.noRecentSets': 'Этому классу пока не назначены наборы.',
  },
  ja: {
    'classroom.alreadyAssigned': '割り当て済み',
    'classroom.assignSet': 'セットを割り当てる', 'classroom.assign': '割り当て', 'classroom.assignSetDescription': 'このクラスにアップロードして割り当てるローカルセットまたは学習ガイドを選択します。', 'classroom.chooseAssignment': 'セットまたは学習ガイドを選択', 'classroom.chooseAssignmentDescription': '後でローカルコピーを編集しても、割り当てたスナップショットは変わりません。', 'classroom.noAssignableItems': 'ライブラリのこの部分にはまだ項目がありません。', 'classroom.cardCount': '{count} 枚のカード', 'classroom.assignmentDesktopRequired': 'セットの割り当てには Tracer デスクトップアプリが必要です。', 'classroom.localSetMissing': '選択したローカルセットは利用できなくなりました。', 'classroom.assignedSuccess': '{name} を {className} に割り当てました。', 'classroom.backToHome': 'ホームに戻る', 'classroom.recentSets': '最近のセット', 'classroom.recentSetsDescription': '先生が割り当てたセットと学習ガイドがここに表示されます。', 'classroom.noRecentSets': 'このクラスにはまだセットが割り当てられていません。',
  },
  ko: {
    'classroom.alreadyAssigned': '이미 배정됨',
    'classroom.assignSet': '세트 배정', 'classroom.assign': '배정', 'classroom.assignSetDescription': '이 수업에 업로드하고 배정할 로컬 세트 또는 학습 가이드를 선택하세요.', 'classroom.chooseAssignment': '세트 또는 학습 가이드 선택', 'classroom.chooseAssignmentDescription': '나중에 로컬 복사본을 수정해도 배정된 스냅샷은 변경되지 않습니다.', 'classroom.noAssignableItems': '라이브러리의 이 부분에는 아직 항목이 없습니다.', 'classroom.cardCount': '카드 {count}개', 'classroom.assignmentDesktopRequired': '세트를 배정하려면 Tracer 데스크톱 앱이 필요합니다.', 'classroom.localSetMissing': '선택한 로컬 세트를 더 이상 사용할 수 없습니다.', 'classroom.assignedSuccess': '{name} 자료를 {className}에 배정했습니다.', 'classroom.backToHome': '홈으로 돌아가기', 'classroom.recentSets': '최근 세트', 'classroom.recentSetsDescription': '선생님이 배정한 세트와 학습 가이드가 여기에 표시됩니다.', 'classroom.noRecentSets': '이 수업에는 아직 배정된 세트가 없습니다.',
  },
}

for (const language of Object.keys(classroomAssignmentMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], classroomAssignmentMessages[language])
}

const classroomProgressMessages: Record<AppLanguage, Messages> = {
  en: { 'classroom.meanAccuracy': 'Mean accuracy', 'classroom.medianAccuracy': 'Median accuracy', 'classroom.scoreSpread': 'Score spread', 'classroom.participation': 'Completed sessions', 'classroom.completedAssignments': 'Sets completed', 'classroom.bestScore': 'Best score', 'classroom.points': '{count} pts', 'classroom.testMode': 'Test', 'classroom.noActivity': 'Completed student sessions will appear here.' },
  es: { 'classroom.meanAccuracy': 'Precisión media', 'classroom.medianAccuracy': 'Precisión mediana', 'classroom.scoreSpread': 'Dispersión', 'classroom.participation': 'Sesiones completadas', 'classroom.completedAssignments': 'Conjuntos completados', 'classroom.bestScore': 'Mejor puntuación', 'classroom.points': '{count} ptos.', 'classroom.testMode': 'Prueba', 'classroom.noActivity': 'Las sesiones completadas aparecerán aquí.' },
  fr: { 'classroom.meanAccuracy': 'Précision moyenne', 'classroom.medianAccuracy': 'Précision médiane', 'classroom.scoreSpread': 'Étendue des scores', 'classroom.participation': 'Sessions terminées', 'classroom.completedAssignments': 'Ensembles terminés', 'classroom.bestScore': 'Meilleur score', 'classroom.points': '{count} pts', 'classroom.testMode': 'Test', 'classroom.noActivity': 'Les sessions terminées apparaîtront ici.' },
  'zh-CN': { 'classroom.meanAccuracy': '平均准确率', 'classroom.medianAccuracy': '准确率中位数', 'classroom.scoreSpread': '分数范围', 'classroom.participation': '已完成学习', 'classroom.completedAssignments': '已完成卡片集', 'classroom.bestScore': '最高分', 'classroom.points': '{count} 分', 'classroom.testMode': '测试', 'classroom.noActivity': '学生完成的学习记录会显示在这里。' },
  hi: { 'classroom.meanAccuracy': 'औसत सटीकता', 'classroom.medianAccuracy': 'मध्यिका सटीकता', 'classroom.scoreSpread': 'स्कोर विस्तार', 'classroom.participation': 'पूरे किए सत्र', 'classroom.completedAssignments': 'पूरे किए सेट', 'classroom.bestScore': 'सर्वश्रेष्ठ स्कोर', 'classroom.points': '{count} अंक', 'classroom.testMode': 'टेस्ट', 'classroom.noActivity': 'विद्यार्थियों के पूरे किए सत्र यहाँ दिखेंगे।' },
  ar: { 'classroom.meanAccuracy': 'متوسط الدقة', 'classroom.medianAccuracy': 'وسيط الدقة', 'classroom.scoreSpread': 'نطاق النتائج', 'classroom.participation': 'الجلسات المكتملة', 'classroom.completedAssignments': 'المجموعات المكتملة', 'classroom.bestScore': 'أفضل نتيجة', 'classroom.points': '{count} نقطة', 'classroom.testMode': 'اختبار', 'classroom.noActivity': 'ستظهر جلسات الطلاب المكتملة هنا.' },
  de: { 'classroom.meanAccuracy': 'Mittlere Genauigkeit', 'classroom.medianAccuracy': 'Median-Genauigkeit', 'classroom.scoreSpread': 'Punktespanne', 'classroom.participation': 'Abgeschlossene Sitzungen', 'classroom.completedAssignments': 'Abgeschlossene Sets', 'classroom.bestScore': 'Bestes Ergebnis', 'classroom.points': '{count} Pkt.', 'classroom.testMode': 'Test', 'classroom.noActivity': 'Abgeschlossene Schülersitzungen erscheinen hier.' },
  ru: { 'classroom.meanAccuracy': 'Средняя точность', 'classroom.medianAccuracy': 'Медианная точность', 'classroom.scoreSpread': 'Разброс баллов', 'classroom.participation': 'Завершённые занятия', 'classroom.completedAssignments': 'Завершённые наборы', 'classroom.bestScore': 'Лучший результат', 'classroom.points': '{count} п.', 'classroom.testMode': 'Тест', 'classroom.noActivity': 'Завершённые занятия учеников появятся здесь.' },
  ja: { 'classroom.meanAccuracy': '平均正答率', 'classroom.medianAccuracy': '正答率の中央値', 'classroom.scoreSpread': 'スコア範囲', 'classroom.participation': '完了したセッション', 'classroom.completedAssignments': '完了したセット', 'classroom.bestScore': '最高スコア', 'classroom.points': '{count}点', 'classroom.testMode': 'テスト', 'classroom.noActivity': '生徒が完了したセッションがここに表示されます。' },
  ko: { 'classroom.meanAccuracy': '평균 정확도', 'classroom.medianAccuracy': '정확도 중앙값', 'classroom.scoreSpread': '점수 범위', 'classroom.participation': '완료한 세션', 'classroom.completedAssignments': '완료한 세트', 'classroom.bestScore': '최고 점수', 'classroom.points': '{count}점', 'classroom.testMode': '테스트', 'classroom.noActivity': '학생이 완료한 세션이 여기에 표시됩니다.' },
}

for (const language of Object.keys(classroomProgressMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], classroomProgressMessages[language])
}

const matchLeaderboardMessages: Record<AppLanguage, Messages> = {
  en: { 'matchLeaderboard.title': 'Leaderboard', 'matchLeaderboard.description': 'Fastest completed times', 'matchLeaderboard.loading': 'Loading leaderboard…', 'matchLeaderboard.empty': 'Be the first student on the leaderboard.', 'matchLeaderboard.unavailable': 'The leaderboard is unavailable right now.' },
  es: { 'matchLeaderboard.title': 'Clasificación', 'matchLeaderboard.description': 'Tiempos completados más rápidos', 'matchLeaderboard.loading': 'Cargando clasificación…', 'matchLeaderboard.empty': 'Sé el primer estudiante en la clasificación.', 'matchLeaderboard.unavailable': 'La clasificación no está disponible ahora.' },
  fr: { 'matchLeaderboard.title': 'Classement', 'matchLeaderboard.description': 'Temps terminés les plus rapides', 'matchLeaderboard.loading': 'Chargement du classement…', 'matchLeaderboard.empty': 'Soyez le premier élève du classement.', 'matchLeaderboard.unavailable': 'Le classement est indisponible pour le moment.' },
  'zh-CN': { 'matchLeaderboard.title': '排行榜', 'matchLeaderboard.description': '最快完成时间', 'matchLeaderboard.loading': '正在加载排行榜…', 'matchLeaderboard.empty': '成为排行榜上的第一位学生。', 'matchLeaderboard.unavailable': '排行榜暂时不可用。' },
  hi: { 'matchLeaderboard.title': 'लीडरबोर्ड', 'matchLeaderboard.description': 'सबसे तेज़ पूरे किए गए समय', 'matchLeaderboard.loading': 'लीडरबोर्ड लोड हो रहा है…', 'matchLeaderboard.empty': 'लीडरबोर्ड पर पहले विद्यार्थी बनें।', 'matchLeaderboard.unavailable': 'लीडरबोर्ड अभी उपलब्ध नहीं है।' },
  ar: { 'matchLeaderboard.title': 'لوحة المتصدرين', 'matchLeaderboard.description': 'أسرع أوقات الإكمال', 'matchLeaderboard.loading': 'جارٍ تحميل لوحة المتصدرين…', 'matchLeaderboard.empty': 'كن أول طالب في لوحة المتصدرين.', 'matchLeaderboard.unavailable': 'لوحة المتصدرين غير متاحة الآن.' },
  de: { 'matchLeaderboard.title': 'Bestenliste', 'matchLeaderboard.description': 'Schnellste Abschlusszeiten', 'matchLeaderboard.loading': 'Bestenliste wird geladen…', 'matchLeaderboard.empty': 'Sei die erste Person auf der Bestenliste.', 'matchLeaderboard.unavailable': 'Die Bestenliste ist derzeit nicht verfügbar.' },
  ru: { 'matchLeaderboard.title': 'Таблица лидеров', 'matchLeaderboard.description': 'Самое быстрое прохождение', 'matchLeaderboard.loading': 'Загрузка таблицы лидеров…', 'matchLeaderboard.empty': 'Станьте первым учеником в таблице лидеров.', 'matchLeaderboard.unavailable': 'Таблица лидеров сейчас недоступна.' },
  ja: { 'matchLeaderboard.title': 'リーダーボード', 'matchLeaderboard.description': '最速の完了タイム', 'matchLeaderboard.loading': 'リーダーボードを読み込み中…', 'matchLeaderboard.empty': '最初のランクインを目指しましょう。', 'matchLeaderboard.unavailable': '現在リーダーボードを利用できません。' },
  ko: { 'matchLeaderboard.title': '리더보드', 'matchLeaderboard.description': '가장 빠른 완료 기록', 'matchLeaderboard.loading': '리더보드 불러오는 중…', 'matchLeaderboard.empty': '리더보드의 첫 번째 학생이 되어 보세요.', 'matchLeaderboard.unavailable': '현재 리더보드를 사용할 수 없습니다.' },
}

for (const language of Object.keys(matchLeaderboardMessages) as AppLanguage[]) {
  Object.assign(messageTargets[language], matchLeaderboardMessages[language])
}

export const messages: Record<AppLanguage, Messages> = messageTargets
