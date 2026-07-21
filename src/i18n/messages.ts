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
  'nav.searchPlaceholder': 'Search sets…',
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
  'settings.chooseModelFirst': 'Choose a Default AI Model to enable this.',
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
  'set.chatHint': 'Chat with TracerAI',
  'set.studyGuide': 'Study guide',
  'set.studyGuideHint': 'Markdown',
  'set.terms': 'Terms',
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
  'auth.firstRunTitle': 'Set up Tracer',
  'auth.name': 'Name',
  'auth.email': 'Email',
  'auth.confirmPassword': 'Confirm password',
}

const es: Messages = {
  'common.back': 'Atrás', 'common.cancel': 'Cancelar', 'common.change': 'Cambiar', 'common.close': 'Cerrar', 'common.create': 'Crear', 'common.current': 'Actual:', 'common.delete': 'Eliminar', 'common.dismiss': 'Descartar', 'common.edit': 'Editar', 'common.export': 'Exportar', 'common.import': 'Importar', 'common.loading': 'Cargando…', 'common.none': 'Ninguno', 'common.off': 'Desactivado', 'common.on': 'Activado', 'common.remove': 'Quitar', 'common.restart': 'Reiniciar', 'common.save': 'Guardar', 'common.set': 'Establecer', 'common.update': 'Actualizar', 'common.user': 'Usuario',
  'nav.home': 'Inicio', 'nav.search': 'Buscar', 'nav.searchPlaceholder': 'Buscar conjuntos…', 'nav.searchResults': 'Resultados de búsqueda', 'nav.noResults': 'Sin resultados.', 'nav.settings': 'Configuración',
  'settings.title': 'Configuración', 'settings.actionRequired': 'Acción necesaria', 'settings.profile': 'Perfil', 'settings.theme': 'Tema', 'settings.darkMode': 'Modo oscuro', 'settings.darkModeDescription': 'Afecta a toda la aplicación y se conserva al reiniciar.', 'settings.language': 'Idioma', 'settings.languageDescription': 'Cambia el texto del sistema de Tracer. Tu contenido de estudio no se traduce.', 'settings.chooseLanguage': 'Elegir idioma', 'settings.defaultModel': 'Modelo de IA predeterminado', 'settings.defaultModelDescription': 'Necesario para Sintetizar, Generar y Chat.', 'settings.learnHybrid': 'Aprender · Híbrido (con IA)', 'settings.learnHybridDescription': 'Añade preguntas generadas por IA a la base determinista.', 'settings.chooseModelFirst': 'Elige un modelo de IA predeterminado para activarlo.', 'settings.providers': 'Proveedores', 'settings.providersDescription': 'Las claves y tokens se guardan en la bóveda.', 'settings.apiKey': 'Clave API', 'settings.startupLock': 'Solicitar contraseña al iniciar', 'settings.startupLockDescription': 'Si se desactiva, Tracer se desbloqueará con el llavero del sistema.', 'settings.dangerZone': 'Zona de peligro', 'settings.resetDescription': 'Restablecer elimina la bóveda y la base de datos local.', 'settings.resetTracer': 'Restablecer Tracer',
  'home.sets': 'Conjuntos', 'home.subtitle': 'Tus conjuntos de tarjetas y guías de estudio.', 'home.create': 'Crear', 'home.chooseMode': 'Elige un modo', 'home.noItems': 'Aún no hay conjuntos ni guías; usa Crear para empezar', 'home.basic': 'Básico', 'home.basicHint': 'Empezar desde cero', 'home.synthesize': 'Sintetizar', 'home.synthesizeHint': 'Combinar conjuntos', 'home.generate': 'Generar', 'home.generateHint': 'Crear desde una indicación', 'home.studyGuide': 'Guía de estudio', 'home.setKind': 'Conjunto',
  'create.title': 'Título', 'create.description': 'Descripción', 'create.cards': 'Tarjetas', 'create.card': 'Tarjeta {number}', 'create.term': 'Término', 'create.definition': 'Definición', 'create.addImage': 'Añadir imagen', 'create.basicTitle': 'Crear · Básico', 'create.basicDescription': 'Añade tarjetas manualmente. Usa Tab para moverte y Ctrl/⌘ + Enter para añadir una tarjeta.', 'create.synthesizeTitle': 'Crear · Sintetizar', 'create.synthesizeDescription': 'Combina conjuntos existentes en uno nuevo.', 'create.generateTitle': 'Crear · Generar', 'create.generateDescription': 'Genera una guía de estudio y tarjetas desde tus fuentes.',
  'set.studyModes': 'Modos de estudio', 'set.flashcards': 'Tarjetas', 'set.flashcardsHint': 'Repaso rápido', 'set.learn': 'Aprender', 'set.learnHint': 'Ponte a prueba', 'set.match': 'Emparejar', 'set.matchHint': 'Encuentra parejas contrarreloj', 'set.chat': 'Chat', 'set.chatHint': 'Basado en este conjunto', 'set.studyGuide': 'Guía de estudio', 'set.studyGuideHint': 'Markdown', 'set.terms': 'Términos', 'set.shuffle': 'Mezclar', 'set.fullscreen': 'Pantalla completa', 'set.starredOnly': 'Solo favoritos', 'set.previous': 'Anterior', 'set.next': 'Siguiente', 'set.missed': 'No lo sabía', 'set.gotIt': 'Lo sabía', 'set.ready': 'Listo', 'set.start': 'Iniciar', 'set.memory': 'Memoria', 'set.backToSet': 'Volver al conjunto',
  'studyGuide.title': 'Guía de estudio', 'studyGuide.linkedTo': 'Vinculada al conjunto {title}.', 'studyGuide.goToSet': 'Ir al conjunto', 'auth.unlockTitle': 'Desbloquear Tracer', 'auth.password': 'Contraseña', 'auth.unlock': 'Desbloquear', 'auth.firstRunTitle': 'Configurar Tracer', 'auth.name': 'Nombre', 'auth.email': 'Correo', 'auth.confirmPassword': 'Confirmar contraseña',
}

const fr: Messages = {
  'common.back': 'Retour', 'common.cancel': 'Annuler', 'common.change': 'Modifier', 'common.close': 'Fermer', 'common.create': 'Créer', 'common.current': 'Actuel :', 'common.delete': 'Supprimer', 'common.dismiss': 'Ignorer', 'common.edit': 'Modifier', 'common.export': 'Exporter', 'common.import': 'Importer', 'common.loading': 'Chargement…', 'common.none': 'Aucun', 'common.off': 'Désactivé', 'common.on': 'Activé', 'common.remove': 'Retirer', 'common.restart': 'Recommencer', 'common.save': 'Enregistrer', 'common.set': 'Définir', 'common.update': 'Mettre à jour', 'common.user': 'Utilisateur',
  'nav.home': 'Accueil', 'nav.search': 'Rechercher', 'nav.searchPlaceholder': 'Rechercher des ensembles…', 'nav.searchResults': 'Résultats de recherche', 'nav.noResults': 'Aucun résultat.', 'nav.settings': 'Paramètres',
  'settings.title': 'Paramètres', 'settings.actionRequired': 'Action requise', 'settings.profile': 'Profil', 'settings.theme': 'Thème', 'settings.darkMode': 'Mode sombre', 'settings.darkModeDescription': 'S’applique à toute l’application et persiste après redémarrage.', 'settings.language': 'Langue', 'settings.languageDescription': 'Modifie le texte système de Tracer. Votre contenu d’étude n’est pas traduit.', 'settings.chooseLanguage': 'Choisir la langue', 'settings.defaultModel': 'Modèle IA par défaut', 'settings.defaultModelDescription': 'Requis pour Synthétiser, Générer et Chat.', 'settings.learnHybrid': 'Apprendre · Hybride (IA)', 'settings.learnHybridDescription': 'Ajoute des questions générées par IA à la base déterministe.', 'settings.chooseModelFirst': 'Choisissez un modèle IA par défaut pour activer ceci.', 'settings.providers': 'Fournisseurs', 'settings.providersDescription': 'Les clés et jetons sont stockés dans le coffre.', 'settings.apiKey': 'Clé API', 'settings.startupLock': 'Exiger un mot de passe au démarrage', 'settings.startupLockDescription': 'Si désactivé, Tracer se déverrouille avec le trousseau du système.', 'settings.dangerZone': 'Zone dangereuse', 'settings.resetDescription': 'La réinitialisation supprime le coffre et la base locale.', 'settings.resetTracer': 'Réinitialiser Tracer',
  'home.sets': 'Ensembles', 'home.subtitle': 'Vos ensembles de cartes et guides d’étude.', 'home.create': 'Créer', 'home.chooseMode': 'Choisissez un mode', 'home.noItems': 'Aucun ensemble ou guide. Utilisez Créer pour commencer.', 'home.basic': 'Basique', 'home.basicHint': 'Partir de zéro', 'home.synthesize': 'Synthétiser', 'home.synthesizeHint': 'Combiner des ensembles', 'home.generate': 'Générer', 'home.generateHint': 'Créer depuis une consigne', 'home.studyGuide': 'Guide d’étude', 'home.setKind': 'Ensemble',
  'create.title': 'Titre', 'create.description': 'Description', 'create.cards': 'Cartes', 'create.card': 'Carte {number}', 'create.term': 'Terme', 'create.definition': 'Définition', 'create.addImage': 'Ajouter une image', 'create.basicTitle': 'Créer · Basique', 'create.basicDescription': 'Ajoutez les cartes manuellement. Tab pour naviguer, Ctrl/⌘ + Entrée pour ajouter.', 'create.synthesizeTitle': 'Créer · Synthétiser', 'create.synthesizeDescription': 'Combinez des ensembles existants en un nouvel ensemble.', 'create.generateTitle': 'Créer · Générer', 'create.generateDescription': 'Générez un guide et des cartes à partir de vos sources.',
  'set.studyModes': 'Modes d’étude', 'set.flashcards': 'Cartes', 'set.flashcardsHint': 'Révision rapide', 'set.learn': 'Apprendre', 'set.learnHint': 'Testez-vous', 'set.match': 'Associer', 'set.matchHint': 'Trouvez les paires rapidement', 'set.chat': 'Chat', 'set.chatHint': 'Basé sur cet ensemble', 'set.studyGuide': 'Guide d’étude', 'set.studyGuideHint': 'Markdown', 'set.terms': 'Termes', 'set.shuffle': 'Mélanger', 'set.fullscreen': 'Plein écran', 'set.starredOnly': 'Favoris uniquement', 'set.previous': 'Précédent', 'set.next': 'Suivant', 'set.missed': 'Raté', 'set.gotIt': 'Trouvé', 'set.ready': 'Prêt', 'set.start': 'Démarrer', 'set.memory': 'Mémoire', 'set.backToSet': 'Retour à l’ensemble',
  'studyGuide.title': 'Guide d’étude', 'studyGuide.linkedTo': 'Lié à l’ensemble {title}.', 'studyGuide.goToSet': 'Aller à l’ensemble', 'auth.unlockTitle': 'Déverrouiller Tracer', 'auth.password': 'Mot de passe', 'auth.unlock': 'Déverrouiller', 'auth.firstRunTitle': 'Configurer Tracer', 'auth.name': 'Nom', 'auth.email': 'E-mail', 'auth.confirmPassword': 'Confirmer le mot de passe',
}

const zhCN: Messages = {
  'common.back': '返回', 'common.cancel': '取消', 'common.change': '更改', 'common.close': '关闭', 'common.create': '创建', 'common.current': '当前：', 'common.delete': '删除', 'common.dismiss': '忽略', 'common.edit': '编辑', 'common.export': '导出', 'common.import': '导入', 'common.loading': '正在加载…', 'common.none': '无', 'common.off': '关闭', 'common.on': '开启', 'common.remove': '移除', 'common.restart': '重新开始', 'common.save': '保存', 'common.set': '设置', 'common.update': '更新', 'common.user': '用户',
  'nav.home': '主页', 'nav.search': '搜索', 'nav.searchPlaceholder': '搜索卡片集…', 'nav.searchResults': '搜索结果', 'nav.noResults': '没有结果。', 'nav.settings': '设置',
  'settings.title': '设置', 'settings.actionRequired': '需要操作', 'settings.profile': '个人资料', 'settings.theme': '主题', 'settings.darkMode': '深色模式', 'settings.darkModeDescription': '应用于整个应用，并在重启后保留。', 'settings.language': '语言', 'settings.languageDescription': '更改 Tracer 的系统文字，不会翻译学习内容。', 'settings.chooseLanguage': '选择语言', 'settings.defaultModel': '默认 AI 模型', 'settings.defaultModelDescription': '“综合”、“生成”和“聊天”功能需要此项。', 'settings.learnHybrid': '学习 · 混合（AI 增强）', 'settings.learnHybridDescription': '在确定性基础题之外添加 AI 生成的问题。', 'settings.chooseModelFirst': '请先选择默认 AI 模型。', 'settings.providers': '服务提供商', 'settings.providersDescription': '密钥和令牌保存在保险库中。', 'settings.apiKey': 'API 密钥', 'settings.startupLock': '启动时要求密码', 'settings.startupLockDescription': '关闭后，Tracer 将使用系统钥匙串自动解锁。', 'settings.dangerZone': '危险区域', 'settings.resetDescription': '重置会删除保险库和本地数据库。', 'settings.resetTracer': '重置 Tracer',
  'home.sets': '卡片集', 'home.subtitle': '你的卡片集和学习指南。', 'home.create': '创建', 'home.chooseMode': '选择一种模式', 'home.noItems': '还没有卡片集或学习指南。请使用“创建”开始。', 'home.basic': '基础', 'home.basicHint': '从头开始', 'home.synthesize': '综合', 'home.synthesizeHint': '合并卡片集', 'home.generate': '生成', 'home.generateHint': '根据提示创建', 'home.studyGuide': '学习指南', 'home.setKind': '卡片集',
  'create.title': '标题', 'create.description': '描述', 'create.cards': '卡片', 'create.card': '卡片 {number}', 'create.term': '术语', 'create.definition': '定义', 'create.addImage': '添加图片', 'create.basicTitle': '创建 · 基础', 'create.basicDescription': '手动添加卡片。使用 Tab 切换字段，Ctrl/⌘ + Enter 添加新卡片。', 'create.synthesizeTitle': '创建 · 综合', 'create.synthesizeDescription': '将现有卡片集合并为一个新集合。', 'create.generateTitle': '创建 · 生成', 'create.generateDescription': '根据你的资料生成学习指南和卡片。',
  'set.studyModes': '学习模式', 'set.flashcards': '闪卡', 'set.flashcardsHint': '快速复习', 'set.learn': '学习', 'set.learnHint': '自我测验', 'set.match': '配对', 'set.matchHint': '限时寻找配对', 'set.chat': '聊天', 'set.chatHint': '基于此卡片集', 'set.studyGuide': '学习指南', 'set.studyGuideHint': 'Markdown', 'set.terms': '术语', 'set.shuffle': '随机排序', 'set.fullscreen': '全屏', 'set.starredOnly': '仅收藏', 'set.previous': '上一张', 'set.next': '下一张', 'set.missed': '没记住', 'set.gotIt': '记住了', 'set.ready': '准备就绪', 'set.start': '开始', 'set.memory': '记忆模式', 'set.backToSet': '返回卡片集',
  'studyGuide.title': '学习指南', 'studyGuide.linkedTo': '已关联卡片集 {title}。', 'studyGuide.goToSet': '前往卡片集', 'auth.unlockTitle': '解锁 Tracer', 'auth.password': '密码', 'auth.unlock': '解锁', 'auth.firstRunTitle': '设置 Tracer', 'auth.name': '姓名', 'auth.email': '电子邮件', 'auth.confirmPassword': '确认密码',
}

const hi: Messages = {
  'common.back': 'वापस', 'common.cancel': 'रद्द करें', 'common.change': 'बदलें', 'common.close': 'बंद करें', 'common.create': 'बनाएँ', 'common.current': 'वर्तमान:', 'common.delete': 'हटाएँ', 'common.dismiss': 'हटाएँ', 'common.edit': 'संपादित करें', 'common.export': 'निर्यात', 'common.import': 'आयात', 'common.loading': 'लोड हो रहा है…', 'common.none': 'कोई नहीं', 'common.off': 'बंद', 'common.on': 'चालू', 'common.remove': 'हटाएँ', 'common.restart': 'फिर शुरू करें', 'common.save': 'सहेजें', 'common.set': 'सेट करें', 'common.update': 'अपडेट करें', 'common.user': 'उपयोगकर्ता',
  'nav.home': 'होम', 'nav.search': 'खोजें', 'nav.searchPlaceholder': 'सेट खोजें…', 'nav.searchResults': 'खोज परिणाम', 'nav.noResults': 'कोई परिणाम नहीं।', 'nav.settings': 'सेटिंग्स',
  'settings.title': 'सेटिंग्स', 'settings.actionRequired': 'कार्रवाई आवश्यक', 'settings.profile': 'प्रोफ़ाइल', 'settings.theme': 'थीम', 'settings.darkMode': 'डार्क मोड', 'settings.darkModeDescription': 'पूरे ऐप पर लागू होता है और रीस्टार्ट के बाद बना रहता है।', 'settings.language': 'भाषा', 'settings.languageDescription': 'Tracer के सिस्टम टेक्स्ट को बदलता है। अध्ययन सामग्री का अनुवाद नहीं होता।', 'settings.chooseLanguage': 'भाषा चुनें', 'settings.defaultModel': 'डिफ़ॉल्ट AI मॉडल', 'settings.defaultModelDescription': 'सिंथेसाइज़, जेनरेट और चैट के लिए आवश्यक।', 'settings.learnHybrid': 'सीखें · हाइब्रिड (AI-सहायित)', 'settings.learnHybridDescription': 'मूल प्रश्नों के साथ AI से बने प्रश्न जोड़ता है।', 'settings.chooseModelFirst': 'इसे चालू करने के लिए डिफ़ॉल्ट AI मॉडल चुनें।', 'settings.providers': 'प्रदाता', 'settings.providersDescription': 'कुंजियाँ और टोकन वॉल्ट में रखे जाते हैं।', 'settings.apiKey': 'API कुंजी', 'settings.startupLock': 'शुरू होने पर पासवर्ड माँगें', 'settings.startupLockDescription': 'बंद होने पर Tracer सिस्टम कीचेन से अपने आप अनलॉक होगा।', 'settings.dangerZone': 'खतरे का क्षेत्र', 'settings.resetDescription': 'रीसेट करने से वॉल्ट और स्थानीय डेटाबेस मिट जाता है।', 'settings.resetTracer': 'Tracer रीसेट करें',
  'home.sets': 'सेट', 'home.subtitle': 'आपके फ्लैशकार्ड सेट और अध्ययन गाइड।', 'home.create': 'बनाएँ', 'home.chooseMode': 'मोड चुनें', 'home.noItems': 'अभी कोई सेट या गाइड नहीं है। शुरू करने के लिए बनाएँ चुनें।', 'home.basic': 'बेसिक', 'home.basicHint': 'शुरू से बनाएँ', 'home.synthesize': 'सिंथेसाइज़', 'home.synthesizeHint': 'सेट मिलाएँ', 'home.generate': 'जेनरेट', 'home.generateHint': 'प्रॉम्प्ट से बनाएँ', 'home.studyGuide': 'अध्ययन गाइड', 'home.setKind': 'सेट',
  'create.title': 'शीर्षक', 'create.description': 'विवरण', 'create.cards': 'कार्ड', 'create.card': 'कार्ड {number}', 'create.term': 'शब्द', 'create.definition': 'परिभाषा', 'create.addImage': 'चित्र जोड़ें', 'create.basicTitle': 'बनाएँ · बेसिक', 'create.basicDescription': 'कार्ड हाथ से जोड़ें। फ़ील्ड बदलने के लिए Tab और नया कार्ड जोड़ने के लिए Ctrl/⌘ + Enter दबाएँ।', 'create.synthesizeTitle': 'बनाएँ · सिंथेसाइज़', 'create.synthesizeDescription': 'मौजूदा सेटों को नए सेट में मिलाएँ।', 'create.generateTitle': 'बनाएँ · जेनरेट', 'create.generateDescription': 'अपने स्रोतों से अध्ययन गाइड और फ्लैशकार्ड बनाएँ।',
  'set.studyModes': 'अध्ययन मोड', 'set.flashcards': 'फ्लैशकार्ड', 'set.flashcardsHint': 'त्वरित अभ्यास', 'set.learn': 'सीखें', 'set.learnHint': 'खुद को जाँचें', 'set.match': 'मिलान', 'set.matchHint': 'समय में जोड़ियाँ खोजें', 'set.chat': 'चैट', 'set.chatHint': 'इस सेट पर आधारित', 'set.studyGuide': 'अध्ययन गाइड', 'set.studyGuideHint': 'Markdown', 'set.terms': 'शब्द', 'set.shuffle': 'फेंटें', 'set.fullscreen': 'पूर्ण स्क्रीन', 'set.starredOnly': 'केवल पसंदीदा', 'set.previous': 'पिछला', 'set.next': 'अगला', 'set.missed': 'नहीं आया', 'set.gotIt': 'आ गया', 'set.ready': 'तैयार', 'set.start': 'शुरू करें', 'set.memory': 'मेमोरी', 'set.backToSet': 'सेट पर वापस',
  'studyGuide.title': 'अध्ययन गाइड', 'studyGuide.linkedTo': 'सेट {title} से जुड़ा है।', 'studyGuide.goToSet': 'सेट पर जाएँ', 'auth.unlockTitle': 'Tracer अनलॉक करें', 'auth.password': 'पासवर्ड', 'auth.unlock': 'अनलॉक', 'auth.firstRunTitle': 'Tracer सेट करें', 'auth.name': 'नाम', 'auth.email': 'ईमेल', 'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
}

const ar: Messages = {
  'common.back': 'رجوع', 'common.cancel': 'إلغاء', 'common.change': 'تغيير', 'common.close': 'إغلاق', 'common.create': 'إنشاء', 'common.current': 'الحالي:', 'common.delete': 'حذف', 'common.dismiss': 'تجاهل', 'common.edit': 'تعديل', 'common.export': 'تصدير', 'common.import': 'استيراد', 'common.loading': 'جارٍ التحميل…', 'common.none': 'لا شيء', 'common.off': 'إيقاف', 'common.on': 'تشغيل', 'common.remove': 'إزالة', 'common.restart': 'إعادة البدء', 'common.save': 'حفظ', 'common.set': 'تعيين', 'common.update': 'تحديث', 'common.user': 'مستخدم',
  'nav.home': 'الرئيسية', 'nav.search': 'بحث', 'nav.searchPlaceholder': 'البحث في المجموعات…', 'nav.searchResults': 'نتائج البحث', 'nav.noResults': 'لا توجد نتائج.', 'nav.settings': 'الإعدادات',
  'settings.title': 'الإعدادات', 'settings.actionRequired': 'إجراء مطلوب', 'settings.profile': 'الملف الشخصي', 'settings.theme': 'المظهر', 'settings.darkMode': 'الوضع الداكن', 'settings.darkModeDescription': 'يؤثر في التطبيق كله ويستمر بعد إعادة التشغيل.', 'settings.language': 'اللغة', 'settings.languageDescription': 'يغيّر نصوص نظام Tracer فقط، ولا يترجم محتوى الدراسة.', 'settings.chooseLanguage': 'اختيار اللغة', 'settings.defaultModel': 'نموذج الذكاء الاصطناعي الافتراضي', 'settings.defaultModelDescription': 'مطلوب للتوليف والتوليد والدردشة.', 'settings.learnHybrid': 'التعلّم · هجين (معزز بالذكاء الاصطناعي)', 'settings.learnHybridDescription': 'يضيف أسئلة مولّدة بالذكاء الاصطناعي إلى الأسئلة الأساسية.', 'settings.chooseModelFirst': 'اختر نموذجًا افتراضيًا لتفعيل هذا الخيار.', 'settings.providers': 'المزوّدون', 'settings.providersDescription': 'تُحفظ المفاتيح والرموز في الخزنة.', 'settings.apiKey': 'مفتاح API', 'settings.startupLock': 'طلب كلمة المرور عند بدء التشغيل', 'settings.startupLockDescription': 'عند تعطيله، يُفتح Tracer تلقائيًا بسلسلة مفاتيح النظام.', 'settings.dangerZone': 'منطقة الخطر', 'settings.resetDescription': 'إعادة الضبط تحذف الخزنة وقاعدة البيانات المحلية.', 'settings.resetTracer': 'إعادة ضبط Tracer',
  'home.sets': 'المجموعات', 'home.subtitle': 'مجموعات بطاقاتك وأدلة الدراسة.', 'home.create': 'إنشاء', 'home.chooseMode': 'اختر وضعًا', 'home.noItems': 'لا توجد مجموعات أو أدلة بعد. استخدم إنشاء للبدء.', 'home.basic': 'أساسي', 'home.basicHint': 'البدء من الصفر', 'home.synthesize': 'توليف', 'home.synthesizeHint': 'دمج المجموعات', 'home.generate': 'توليد', 'home.generateHint': 'الإنشاء من مطالبة', 'home.studyGuide': 'دليل الدراسة', 'home.setKind': 'مجموعة',
  'create.title': 'العنوان', 'create.description': 'الوصف', 'create.cards': 'البطاقات', 'create.card': 'البطاقة {number}', 'create.term': 'المصطلح', 'create.definition': 'التعريف', 'create.addImage': 'إضافة صورة', 'create.basicTitle': 'إنشاء · أساسي', 'create.basicDescription': 'أضف البطاقات يدويًا. استخدم Tab للتنقل وCtrl/⌘ + Enter لإضافة بطاقة.', 'create.synthesizeTitle': 'إنشاء · توليف', 'create.synthesizeDescription': 'ادمج المجموعات الحالية في مجموعة جديدة.', 'create.generateTitle': 'إنشاء · توليد', 'create.generateDescription': 'أنشئ دليل دراسة وبطاقات من مصادرك.',
  'set.studyModes': 'أوضاع الدراسة', 'set.flashcards': 'البطاقات التعليمية', 'set.flashcardsHint': 'مراجعة سريعة', 'set.learn': 'تعلّم', 'set.learnHint': 'اختبر نفسك', 'set.match': 'مطابقة', 'set.matchHint': 'اعثر على الأزواج بسرعة', 'set.chat': 'دردشة', 'set.chatHint': 'مرتكزة على هذه المجموعة', 'set.studyGuide': 'دليل الدراسة', 'set.studyGuideHint': 'Markdown', 'set.terms': 'المصطلحات', 'set.shuffle': 'خلط', 'set.fullscreen': 'ملء الشاشة', 'set.starredOnly': 'المفضلة فقط', 'set.previous': 'السابق', 'set.next': 'التالي', 'set.missed': 'لم أعرفها', 'set.gotIt': 'عرفتها', 'set.ready': 'جاهز', 'set.start': 'بدء', 'set.memory': 'الذاكرة', 'set.backToSet': 'العودة إلى المجموعة',
  'studyGuide.title': 'دليل الدراسة', 'studyGuide.linkedTo': 'مرتبط بالمجموعة {title}.', 'studyGuide.goToSet': 'الانتقال إلى المجموعة', 'auth.unlockTitle': 'فتح Tracer', 'auth.password': 'كلمة المرور', 'auth.unlock': 'فتح', 'auth.firstRunTitle': 'إعداد Tracer', 'auth.name': 'الاسم', 'auth.email': 'البريد الإلكتروني', 'auth.confirmPassword': 'تأكيد كلمة المرور',
}

const de: Messages = {
  'common.back': 'Zurück', 'common.cancel': 'Abbrechen', 'common.change': 'Ändern', 'common.close': 'Schließen', 'common.create': 'Erstellen', 'common.current': 'Aktuell:', 'common.delete': 'Löschen', 'common.dismiss': 'Ausblenden', 'common.edit': 'Bearbeiten', 'common.export': 'Exportieren', 'common.import': 'Importieren', 'common.loading': 'Lädt…', 'common.none': 'Keine', 'common.off': 'Aus', 'common.on': 'Ein', 'common.remove': 'Entfernen', 'common.restart': 'Neu starten', 'common.save': 'Speichern', 'common.set': 'Festlegen', 'common.update': 'Aktualisieren', 'common.user': 'Benutzer',
  'nav.home': 'Start', 'nav.search': 'Suchen', 'nav.searchPlaceholder': 'Sets durchsuchen…', 'nav.searchResults': 'Suchergebnisse', 'nav.noResults': 'Keine Ergebnisse.', 'nav.settings': 'Einstellungen',
  'settings.title': 'Einstellungen', 'settings.actionRequired': 'Aktion erforderlich', 'settings.profile': 'Profil', 'settings.theme': 'Design', 'settings.darkMode': 'Dunkelmodus', 'settings.darkModeDescription': 'Gilt für die gesamte App und bleibt nach einem Neustart erhalten.', 'settings.language': 'Sprache', 'settings.languageDescription': 'Ändert den Systemtext von Tracer. Lerninhalte werden nicht übersetzt.', 'settings.chooseLanguage': 'Sprache auswählen', 'settings.defaultModel': 'Standard-KI-Modell', 'settings.defaultModelDescription': 'Erforderlich für Synthetisieren, Generieren und Chat.', 'settings.learnHybrid': 'Lernen · Hybrid (KI-gestützt)', 'settings.learnHybridDescription': 'Ergänzt die Basis um KI-generierte Fragen.', 'settings.chooseModelFirst': 'Wähle zuerst ein Standard-KI-Modell.', 'settings.providers': 'Anbieter', 'settings.providersDescription': 'Schlüssel und Tokens werden im Tresor gespeichert.', 'settings.apiKey': 'API-Schlüssel', 'settings.startupLock': 'Passwort beim Start verlangen', 'settings.startupLockDescription': 'Wenn deaktiviert, entsperrt sich Tracer über den System-Schlüsselbund.', 'settings.dangerZone': 'Gefahrenbereich', 'settings.resetDescription': 'Zurücksetzen löscht Tresor und lokale Datenbank.', 'settings.resetTracer': 'Tracer zurücksetzen',
  'home.sets': 'Sets', 'home.subtitle': 'Deine Karteikarten-Sets und Lernleitfäden.', 'home.create': 'Erstellen', 'home.chooseMode': 'Modus auswählen', 'home.noItems': 'Noch keine Sets oder Lernleitfäden. Nutze Erstellen.', 'home.basic': 'Basis', 'home.basicHint': 'Neu beginnen', 'home.synthesize': 'Synthetisieren', 'home.synthesizeHint': 'Sets kombinieren', 'home.generate': 'Generieren', 'home.generateHint': 'Aus einer Eingabe erstellen', 'home.studyGuide': 'Lernleitfaden', 'home.setKind': 'Set',
  'create.title': 'Titel', 'create.description': 'Beschreibung', 'create.cards': 'Karten', 'create.card': 'Karte {number}', 'create.term': 'Begriff', 'create.definition': 'Definition', 'create.addImage': 'Bild hinzufügen', 'create.basicTitle': 'Erstellen · Basis', 'create.basicDescription': 'Karten manuell hinzufügen. Tab wechselt Felder, Strg/⌘ + Enter fügt eine Karte hinzu.', 'create.synthesizeTitle': 'Erstellen · Synthetisieren', 'create.synthesizeDescription': 'Vorhandene Sets zu einem neuen Set kombinieren.', 'create.generateTitle': 'Erstellen · Generieren', 'create.generateDescription': 'Lernleitfaden und Karten aus Quellen generieren.',
  'set.studyModes': 'Lernmodi', 'set.flashcards': 'Karteikarten', 'set.flashcardsHint': 'Schnelle Wiederholung', 'set.learn': 'Lernen', 'set.learnHint': 'Teste dich', 'set.match': 'Zuordnen', 'set.matchHint': 'Paare unter Zeitdruck finden', 'set.chat': 'Chat', 'set.chatHint': 'Auf diesem Set basierend', 'set.studyGuide': 'Lernleitfaden', 'set.studyGuideHint': 'Markdown', 'set.terms': 'Begriffe', 'set.shuffle': 'Mischen', 'set.fullscreen': 'Vollbild', 'set.starredOnly': 'Nur Favoriten', 'set.previous': 'Zurück', 'set.next': 'Weiter', 'set.missed': 'Nicht gewusst', 'set.gotIt': 'Gewusst', 'set.ready': 'Bereit', 'set.start': 'Start', 'set.memory': 'Memory', 'set.backToSet': 'Zurück zum Set',
  'studyGuide.title': 'Lernleitfaden', 'studyGuide.linkedTo': 'Mit Set {title} verknüpft.', 'studyGuide.goToSet': 'Zum Set', 'auth.unlockTitle': 'Tracer entsperren', 'auth.password': 'Passwort', 'auth.unlock': 'Entsperren', 'auth.firstRunTitle': 'Tracer einrichten', 'auth.name': 'Name', 'auth.email': 'E-Mail', 'auth.confirmPassword': 'Passwort bestätigen',
}

const ru: Messages = {
  'common.back': 'Назад', 'common.cancel': 'Отмена', 'common.change': 'Изменить', 'common.close': 'Закрыть', 'common.create': 'Создать', 'common.current': 'Текущая:', 'common.delete': 'Удалить', 'common.dismiss': 'Скрыть', 'common.edit': 'Изменить', 'common.export': 'Экспорт', 'common.import': 'Импорт', 'common.loading': 'Загрузка…', 'common.none': 'Нет', 'common.off': 'Выкл.', 'common.on': 'Вкл.', 'common.remove': 'Убрать', 'common.restart': 'Начать заново', 'common.save': 'Сохранить', 'common.set': 'Задать', 'common.update': 'Обновить', 'common.user': 'Пользователь',
  'nav.home': 'Главная', 'nav.search': 'Поиск', 'nav.searchPlaceholder': 'Поиск наборов…', 'nav.searchResults': 'Результаты поиска', 'nav.noResults': 'Нет результатов.', 'nav.settings': 'Настройки',
  'settings.title': 'Настройки', 'settings.actionRequired': 'Требуется действие', 'settings.profile': 'Профиль', 'settings.theme': 'Тема', 'settings.darkMode': 'Тёмная тема', 'settings.darkModeDescription': 'Применяется ко всему приложению и сохраняется после перезапуска.', 'settings.language': 'Язык', 'settings.languageDescription': 'Меняет системный текст Tracer. Учебные материалы не переводятся.', 'settings.chooseLanguage': 'Выбрать язык', 'settings.defaultModel': 'Модель ИИ по умолчанию', 'settings.defaultModelDescription': 'Нужна для синтеза, генерации и чата.', 'settings.learnHybrid': 'Обучение · Гибридное (с ИИ)', 'settings.learnHybridDescription': 'Добавляет вопросы, созданные ИИ, к базовым.', 'settings.chooseModelFirst': 'Сначала выберите модель ИИ по умолчанию.', 'settings.providers': 'Провайдеры', 'settings.providersDescription': 'Ключи и токены хранятся в хранилище.', 'settings.apiKey': 'Ключ API', 'settings.startupLock': 'Запрашивать пароль при запуске', 'settings.startupLockDescription': 'Если выключено, Tracer разблокируется через системную связку ключей.', 'settings.dangerZone': 'Опасная зона', 'settings.resetDescription': 'Сброс удаляет хранилище и локальную базу данных.', 'settings.resetTracer': 'Сбросить Tracer',
  'home.sets': 'Наборы', 'home.subtitle': 'Ваши наборы карточек и учебные руководства.', 'home.create': 'Создать', 'home.chooseMode': 'Выберите режим', 'home.noItems': 'Наборов и руководств пока нет. Нажмите «Создать».', 'home.basic': 'Базовый', 'home.basicHint': 'Начать с нуля', 'home.synthesize': 'Синтез', 'home.synthesizeHint': 'Объединить наборы', 'home.generate': 'Генерация', 'home.generateHint': 'Создать по запросу', 'home.studyGuide': 'Учебное руководство', 'home.setKind': 'Набор',
  'create.title': 'Название', 'create.description': 'Описание', 'create.cards': 'Карточки', 'create.card': 'Карточка {number}', 'create.term': 'Термин', 'create.definition': 'Определение', 'create.addImage': 'Добавить изображение', 'create.basicTitle': 'Создать · Базовый', 'create.basicDescription': 'Добавляйте карточки вручную. Tab переключает поля, Ctrl/⌘ + Enter добавляет карточку.', 'create.synthesizeTitle': 'Создать · Синтез', 'create.synthesizeDescription': 'Объедините существующие наборы в новый.', 'create.generateTitle': 'Создать · Генерация', 'create.generateDescription': 'Создайте руководство и карточки из источников.',
  'set.studyModes': 'Режимы обучения', 'set.flashcards': 'Карточки', 'set.flashcardsHint': 'Быстрое повторение', 'set.learn': 'Обучение', 'set.learnHint': 'Проверьте себя', 'set.match': 'Соответствия', 'set.matchHint': 'Найдите пары на время', 'set.chat': 'Чат', 'set.chatHint': 'На основе этого набора', 'set.studyGuide': 'Учебное руководство', 'set.studyGuideHint': 'Markdown', 'set.terms': 'Термины', 'set.shuffle': 'Перемешать', 'set.fullscreen': 'Полный экран', 'set.starredOnly': 'Только избранные', 'set.previous': 'Назад', 'set.next': 'Далее', 'set.missed': 'Не знал', 'set.gotIt': 'Знал', 'set.ready': 'Готово', 'set.start': 'Начать', 'set.memory': 'Память', 'set.backToSet': 'К набору',
  'studyGuide.title': 'Учебное руководство', 'studyGuide.linkedTo': 'Связано с набором {title}.', 'studyGuide.goToSet': 'Перейти к набору', 'auth.unlockTitle': 'Разблокировать Tracer', 'auth.password': 'Пароль', 'auth.unlock': 'Разблокировать', 'auth.firstRunTitle': 'Настроить Tracer', 'auth.name': 'Имя', 'auth.email': 'Эл. почта', 'auth.confirmPassword': 'Подтвердите пароль',
}

const ja: Messages = {
  'common.back': '戻る', 'common.cancel': 'キャンセル', 'common.change': '変更', 'common.close': '閉じる', 'common.create': '作成', 'common.current': '現在：', 'common.delete': '削除', 'common.dismiss': '閉じる', 'common.edit': '編集', 'common.export': 'エクスポート', 'common.import': 'インポート', 'common.loading': '読み込み中…', 'common.none': 'なし', 'common.off': 'オフ', 'common.on': 'オン', 'common.remove': '削除', 'common.restart': 'やり直す', 'common.save': '保存', 'common.set': '設定', 'common.update': '更新', 'common.user': 'ユーザー',
  'nav.home': 'ホーム', 'nav.search': '検索', 'nav.searchPlaceholder': 'セットを検索…', 'nav.searchResults': '検索結果', 'nav.noResults': '結果がありません。', 'nav.settings': '設定',
  'settings.title': '設定', 'settings.actionRequired': '操作が必要です', 'settings.profile': 'プロフィール', 'settings.theme': 'テーマ', 'settings.darkMode': 'ダークモード', 'settings.darkModeDescription': 'アプリ全体に適用され、再起動後も保持されます。', 'settings.language': '言語', 'settings.languageDescription': 'Tracer のシステム表示だけを変更します。学習内容は翻訳されません。', 'settings.chooseLanguage': '言語を選択', 'settings.defaultModel': '既定の AI モデル', 'settings.defaultModelDescription': '統合、生成、チャットに必要です。', 'settings.learnHybrid': '学習 · ハイブリッド（AI 強化）', 'settings.learnHybridDescription': '基本問題に AI 生成問題を追加します。', 'settings.chooseModelFirst': '先に既定の AI モデルを選択してください。', 'settings.providers': 'プロバイダー', 'settings.providersDescription': 'キーとトークンは保管庫に保存されます。', 'settings.apiKey': 'API キー', 'settings.startupLock': '起動時にパスワードを要求', 'settings.startupLockDescription': 'オフの場合、Tracer はシステムキーチェーンで自動解除されます。', 'settings.dangerZone': '危険な操作', 'settings.resetDescription': 'リセットすると保管庫とローカルデータベースが削除されます。', 'settings.resetTracer': 'Tracer をリセット',
  'home.sets': 'セット', 'home.subtitle': 'フラッシュカードセットと学習ガイド。', 'home.create': '作成', 'home.chooseMode': 'モードを選択', 'home.noItems': 'セットやガイドはまだありません。「作成」から始めてください。', 'home.basic': '基本', 'home.basicHint': '一から作成', 'home.synthesize': '統合', 'home.synthesizeHint': 'セットを結合', 'home.generate': '生成', 'home.generateHint': 'プロンプトから作成', 'home.studyGuide': '学習ガイド', 'home.setKind': 'セット',
  'create.title': 'タイトル', 'create.description': '説明', 'create.cards': 'カード', 'create.card': 'カード {number}', 'create.term': '用語', 'create.definition': '定義', 'create.addImage': '画像を追加', 'create.basicTitle': '作成 · 基本', 'create.basicDescription': 'カードを手動で追加します。Tab で移動し、Ctrl/⌘ + Enter でカードを追加します。', 'create.synthesizeTitle': '作成 · 統合', 'create.synthesizeDescription': '既存のセットを新しいセットにまとめます。', 'create.generateTitle': '作成 · 生成', 'create.generateDescription': '資料から学習ガイドとカードを生成します。',
  'set.studyModes': '学習モード', 'set.flashcards': 'フラッシュカード', 'set.flashcardsHint': 'クイック復習', 'set.learn': '学習', 'set.learnHint': '理解度を確認', 'set.match': 'マッチ', 'set.matchHint': '時間内にペアを探す', 'set.chat': 'チャット', 'set.chatHint': 'このセットに基づく', 'set.studyGuide': '学習ガイド', 'set.studyGuideHint': 'Markdown', 'set.terms': '用語', 'set.shuffle': 'シャッフル', 'set.fullscreen': '全画面', 'set.starredOnly': 'お気に入りのみ', 'set.previous': '前へ', 'set.next': '次へ', 'set.missed': '不正解', 'set.gotIt': '正解', 'set.ready': '準備完了', 'set.start': '開始', 'set.memory': 'メモリー', 'set.backToSet': 'セットに戻る',
  'studyGuide.title': '学習ガイド', 'studyGuide.linkedTo': 'セット {title} にリンクされています。', 'studyGuide.goToSet': 'セットへ移動', 'auth.unlockTitle': 'Tracer をロック解除', 'auth.password': 'パスワード', 'auth.unlock': 'ロック解除', 'auth.firstRunTitle': 'Tracer を設定', 'auth.name': '名前', 'auth.email': 'メール', 'auth.confirmPassword': 'パスワードを確認',
}

const ko: Messages = {
  'common.back': '뒤로', 'common.cancel': '취소', 'common.change': '변경', 'common.close': '닫기', 'common.create': '만들기', 'common.current': '현재:', 'common.delete': '삭제', 'common.dismiss': '닫기', 'common.edit': '편집', 'common.export': '내보내기', 'common.import': '가져오기', 'common.loading': '불러오는 중…', 'common.none': '없음', 'common.off': '끔', 'common.on': '켬', 'common.remove': '제거', 'common.restart': '다시 시작', 'common.save': '저장', 'common.set': '설정', 'common.update': '업데이트', 'common.user': '사용자',
  'nav.home': '홈', 'nav.search': '검색', 'nav.searchPlaceholder': '세트 검색…', 'nav.searchResults': '검색 결과', 'nav.noResults': '결과가 없습니다.', 'nav.settings': '설정',
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
    'create.sourceSets': 'Source sets', 'create.searchAndSelect': 'Search and select one or more sets to merge.', 'create.selected': 'Selected', 'create.theme': 'Theme', 'create.aiOutput': 'AI output', 'create.rawOutput': 'Raw output', 'create.sources': 'Sources', 'create.instructions': 'Instructions', 'create.pdfPages': 'PDF pages', 'create.images': 'Images', 'create.files': 'Files',
    'set.flashcardInstructions': 'Space to flip · ←/→ to browse · Mark correct/incorrect to progress', 'set.learnInstructions': 'Answer questions · Results tracked per run', 'set.matchInstructions': 'Match the pairs', 'set.accuracy': 'Accuracy:', 'set.correct': 'Correct:', 'set.attempted': 'Attempted:', 'set.matched': 'Matched:', 'set.attempts': 'Attempts:', 'set.time': 'Time:', 'set.playAgain': 'Play again', 'set.noQuestions': 'No questions available.', 'set.question': 'Question', 'set.tile': 'Tile',
    'settings.githubAuthenticate': 'Authenticate to use GitHub Models.', 'settings.clearApiKey': 'Clear API key?', 'settings.deviceCode': 'Device code', 'edit.deleteSet': 'Delete set?',
  },
  es: {
    'common.add': 'Añadir', 'common.results': 'Resultados', 'common.optional': 'opcional', 'common.status': 'Estado:', 'common.authenticated': 'Autenticado', 'common.notAuthenticated': 'Sin autenticar', 'common.invalid': 'Token no válido', 'common.locked': 'Bóveda bloqueada', 'common.retry': 'Reintentar', 'common.continue': 'Continuar', 'common.true': 'Verdadero', 'common.false': 'Falso',
    'common.clear': 'Limpiar', 'common.copy': 'Copiar', 'common.download': 'Descargar', 'common.selectAll': 'Seleccionar todo', 'common.confirm': 'Confirmar', 'common.authenticate': 'Autenticar', 'common.signOut': 'Cerrar sesión', 'set.noStarred': 'No hay tarjetas favoritas', 'set.comingSoon': 'Próximamente', 'set.notImplemented': 'Este modo aún no está implementado.', 'set.noCards': 'No hay tarjetas.', 'auth.firstRunDescription': 'Crea tu perfil y establece una contraseña para la aplicación.',
    'create.sourceSets': 'Conjuntos de origen', 'create.searchAndSelect': 'Busca y selecciona uno o más conjuntos para combinar.', 'create.selected': 'Seleccionados', 'create.theme': 'Tema', 'create.aiOutput': 'Salida de IA', 'create.rawOutput': 'Salida sin procesar', 'create.sources': 'Fuentes', 'create.instructions': 'Instrucciones', 'create.pdfPages': 'Páginas PDF', 'create.images': 'Imágenes', 'create.files': 'Archivos',
    'set.flashcardInstructions': 'Espacio para girar · ←/→ para navegar · Marca correcto o incorrecto', 'set.learnInstructions': 'Responde preguntas · Resultados por sesión', 'set.matchInstructions': 'Empareja las parejas', 'set.accuracy': 'Precisión:', 'set.correct': 'Correctas:', 'set.attempted': 'Intentos:', 'set.matched': 'Emparejadas:', 'set.attempts': 'Intentos:', 'set.time': 'Tiempo:', 'set.playAgain': 'Jugar de nuevo', 'set.noQuestions': 'No hay preguntas disponibles.', 'set.question': 'Pregunta', 'set.tile': 'Ficha',
    'settings.githubAuthenticate': 'Autentícate para usar GitHub Models.', 'settings.clearApiKey': '¿Borrar la clave API?', 'settings.deviceCode': 'Código del dispositivo', 'edit.deleteSet': '¿Eliminar el conjunto?',
  },
  fr: {
    'common.add': 'Ajouter', 'common.results': 'Résultats', 'common.optional': 'facultatif', 'common.status': 'État :', 'common.authenticated': 'Authentifié', 'common.notAuthenticated': 'Non authentifié', 'common.invalid': 'Jeton invalide', 'common.locked': 'Coffre verrouillé', 'common.retry': 'Réessayer', 'common.continue': 'Continuer', 'common.true': 'Vrai', 'common.false': 'Faux',
    'common.clear': 'Effacer', 'common.copy': 'Copier', 'common.download': 'Télécharger', 'common.selectAll': 'Tout sélectionner', 'common.confirm': 'Confirmer', 'common.authenticate': 'S’authentifier', 'common.signOut': 'Se déconnecter', 'set.noStarred': 'Aucune carte favorite', 'set.comingSoon': 'Bientôt disponible', 'set.notImplemented': 'Ce mode n’est pas encore disponible.', 'set.noCards': 'Aucune carte.', 'auth.firstRunDescription': 'Créez votre profil et définissez un mot de passe.',
    'create.sourceSets': 'Ensembles sources', 'create.searchAndSelect': 'Recherchez et sélectionnez les ensembles à fusionner.', 'create.selected': 'Sélectionnés', 'create.theme': 'Thème', 'create.aiOutput': 'Sortie IA', 'create.rawOutput': 'Sortie brute', 'create.sources': 'Sources', 'create.instructions': 'Instructions', 'create.pdfPages': 'Pages PDF', 'create.images': 'Images', 'create.files': 'Fichiers',
    'set.flashcardInstructions': 'Espace pour retourner · ←/→ pour naviguer · Marquez juste ou faux', 'set.learnInstructions': 'Répondez aux questions · Résultats par session', 'set.matchInstructions': 'Associez les paires', 'set.accuracy': 'Précision :', 'set.correct': 'Correct :', 'set.attempted': 'Tentatives :', 'set.matched': 'Associées :', 'set.attempts': 'Tentatives :', 'set.time': 'Temps :', 'set.playAgain': 'Rejouer', 'set.noQuestions': 'Aucune question disponible.', 'set.question': 'Question', 'set.tile': 'Tuile',
    'settings.githubAuthenticate': 'Authentifiez-vous pour utiliser GitHub Models.', 'settings.clearApiKey': 'Effacer la clé API ?', 'settings.deviceCode': 'Code appareil', 'edit.deleteSet': 'Supprimer l’ensemble ?',
  },
  'zh-CN': {
    'common.add': '添加', 'common.results': '结果', 'common.optional': '可选', 'common.status': '状态：', 'common.authenticated': '已认证', 'common.notAuthenticated': '未认证', 'common.invalid': '令牌无效', 'common.locked': '保险库已锁定', 'common.retry': '重试', 'common.continue': '继续', 'common.true': '正确', 'common.false': '错误',
    'common.clear': '清除', 'common.copy': '复制', 'common.download': '下载', 'common.selectAll': '全选', 'common.confirm': '确认', 'common.authenticate': '认证', 'common.signOut': '退出登录', 'set.noStarred': '没有收藏的卡片', 'set.comingSoon': '即将推出', 'set.notImplemented': '此模式尚未实现。', 'set.noCards': '没有卡片。', 'auth.firstRunDescription': '创建个人资料并设置应用密码。',
    'create.sourceSets': '来源卡片集', 'create.searchAndSelect': '搜索并选择一个或多个要合并的卡片集。', 'create.selected': '已选择', 'create.theme': '主题', 'create.aiOutput': 'AI 输出', 'create.rawOutput': '原始输出', 'create.sources': '资料来源', 'create.instructions': '说明', 'create.pdfPages': 'PDF 页数', 'create.images': '图片', 'create.files': '文件',
    'set.flashcardInstructions': '空格翻面 · ←/→ 浏览 · 标记正确或错误', 'set.learnInstructions': '回答问题 · 每轮记录结果', 'set.matchInstructions': '匹配成对内容 · 使用记忆模式切换', 'set.accuracy': '正确率：', 'set.correct': '正确：', 'set.attempted': '已答：', 'set.matched': '已匹配：', 'set.attempts': '尝试：', 'set.time': '时间：', 'set.playAgain': '再玩一次', 'set.noQuestions': '没有可用问题。', 'set.question': '问题', 'set.tile': '方块',
    'settings.githubAuthenticate': '认证后使用 GitHub Models。', 'settings.clearApiKey': '清除 API 密钥？', 'settings.deviceCode': '设备代码', 'edit.deleteSet': '删除卡片集？',
  },
  hi: {
    'common.add': 'जोड़ें', 'common.results': 'परिणाम', 'common.optional': 'वैकल्पिक', 'common.status': 'स्थिति:', 'common.authenticated': 'प्रमाणित', 'common.notAuthenticated': 'प्रमाणित नहीं', 'common.invalid': 'टोकन अमान्य', 'common.locked': 'वॉल्ट लॉक है', 'common.retry': 'फिर प्रयास करें', 'common.continue': 'जारी रखें', 'common.true': 'सही', 'common.false': 'गलत',
    'common.clear': 'साफ़ करें', 'common.copy': 'कॉपी करें', 'common.download': 'डाउनलोड', 'common.selectAll': 'सभी चुनें', 'common.confirm': 'पुष्टि करें', 'common.authenticate': 'प्रमाणित करें', 'common.signOut': 'साइन आउट', 'set.noStarred': 'कोई पसंदीदा कार्ड नहीं', 'set.comingSoon': 'जल्द आ रहा है', 'set.notImplemented': 'यह मोड अभी उपलब्ध नहीं है।', 'set.noCards': 'कोई कार्ड नहीं।', 'auth.firstRunDescription': 'अपनी प्रोफ़ाइल बनाएँ और ऐप पासवर्ड सेट करें।',
    'create.sourceSets': 'स्रोत सेट', 'create.searchAndSelect': 'मिलाने के लिए एक या अधिक सेट चुनें।', 'create.selected': 'चुने गए', 'create.theme': 'विषय', 'create.aiOutput': 'AI आउटपुट', 'create.rawOutput': 'मूल आउटपुट', 'create.sources': 'स्रोत', 'create.instructions': 'निर्देश', 'create.pdfPages': 'PDF पृष्ठ', 'create.images': 'चित्र', 'create.files': 'फ़ाइलें',
    'set.flashcardInstructions': 'पलटने के लिए Space · देखने के लिए ←/→ · सही या गलत चिह्नित करें', 'set.learnInstructions': 'प्रश्नों के उत्तर दें · हर दौर के परिणाम', 'set.matchInstructions': 'जोड़ियाँ मिलाएँ', 'set.accuracy': 'सटीकता:', 'set.correct': 'सही:', 'set.attempted': 'प्रयास:', 'set.matched': 'मिले:', 'set.attempts': 'प्रयास:', 'set.time': 'समय:', 'set.playAgain': 'फिर खेलें', 'set.noQuestions': 'कोई प्रश्न उपलब्ध नहीं।', 'set.question': 'प्रश्न', 'set.tile': 'टाइल',
    'settings.githubAuthenticate': 'GitHub Models के लिए प्रमाणित करें।', 'settings.clearApiKey': 'API कुंजी साफ़ करें?', 'settings.deviceCode': 'डिवाइस कोड', 'edit.deleteSet': 'सेट हटाएँ?',
  },
  ar: {
    'common.add': 'إضافة', 'common.results': 'النتائج', 'common.optional': 'اختياري', 'common.status': 'الحالة:', 'common.authenticated': 'تمت المصادقة', 'common.notAuthenticated': 'غير مصادق', 'common.invalid': 'الرمز غير صالح', 'common.locked': 'الخزنة مقفلة', 'common.retry': 'إعادة المحاولة', 'common.continue': 'متابعة', 'common.true': 'صحيح', 'common.false': 'خطأ',
    'common.clear': 'مسح', 'common.copy': 'نسخ', 'common.download': 'تنزيل', 'common.selectAll': 'تحديد الكل', 'common.confirm': 'تأكيد', 'common.authenticate': 'مصادقة', 'common.signOut': 'تسجيل الخروج', 'set.noStarred': 'لا توجد بطاقات مفضلة', 'set.comingSoon': 'قريبًا', 'set.notImplemented': 'هذا الوضع غير متاح بعد.', 'set.noCards': 'لا توجد بطاقات.', 'auth.firstRunDescription': 'أنشئ ملفك الشخصي وعيّن كلمة مرور للتطبيق.',
    'create.sourceSets': 'المجموعات المصدر', 'create.searchAndSelect': 'ابحث وحدد مجموعة أو أكثر لدمجها.', 'create.selected': 'المحدد', 'create.theme': 'الموضوع', 'create.aiOutput': 'مخرجات الذكاء الاصطناعي', 'create.rawOutput': 'المخرجات الخام', 'create.sources': 'المصادر', 'create.instructions': 'التعليمات', 'create.pdfPages': 'صفحات PDF', 'create.images': 'الصور', 'create.files': 'الملفات',
    'set.flashcardInstructions': 'مسافة للقلب · ←/→ للتصفح · حدّد صحيح أو خطأ', 'set.learnInstructions': 'أجب عن الأسئلة · تُتبع النتائج لكل جولة', 'set.matchInstructions': 'طابق الأزواج', 'set.accuracy': 'الدقة:', 'set.correct': 'صحيح:', 'set.attempted': 'المحاولات:', 'set.matched': 'المطابق:', 'set.attempts': 'المحاولات:', 'set.time': 'الوقت:', 'set.playAgain': 'اللعب مجددًا', 'set.noQuestions': 'لا توجد أسئلة.', 'set.question': 'السؤال', 'set.tile': 'بطاقة',
    'settings.githubAuthenticate': 'صادق لاستخدام GitHub Models.', 'settings.clearApiKey': 'مسح مفتاح API؟', 'settings.deviceCode': 'رمز الجهاز', 'edit.deleteSet': 'حذف المجموعة؟',
  },
  de: {
    'common.add': 'Hinzufügen', 'common.results': 'Ergebnisse', 'common.optional': 'optional', 'common.status': 'Status:', 'common.authenticated': 'Authentifiziert', 'common.notAuthenticated': 'Nicht authentifiziert', 'common.invalid': 'Token ungültig', 'common.locked': 'Tresor gesperrt', 'common.retry': 'Erneut versuchen', 'common.continue': 'Weiter', 'common.true': 'Wahr', 'common.false': 'Falsch',
    'common.clear': 'Leeren', 'common.copy': 'Kopieren', 'common.download': 'Herunterladen', 'common.selectAll': 'Alles auswählen', 'common.confirm': 'Bestätigen', 'common.authenticate': 'Authentifizieren', 'common.signOut': 'Abmelden', 'set.noStarred': 'Keine Favoriten', 'set.comingSoon': 'Demnächst', 'set.notImplemented': 'Dieser Modus ist noch nicht verfügbar.', 'set.noCards': 'Keine Karten.', 'auth.firstRunDescription': 'Erstelle dein Profil und lege ein App-Passwort fest.',
    'create.sourceSets': 'Quell-Sets', 'create.searchAndSelect': 'Sets zum Zusammenführen suchen und auswählen.', 'create.selected': 'Ausgewählt', 'create.theme': 'Thema', 'create.aiOutput': 'KI-Ausgabe', 'create.rawOutput': 'Rohausgabe', 'create.sources': 'Quellen', 'create.instructions': 'Anweisungen', 'create.pdfPages': 'PDF-Seiten', 'create.images': 'Bilder', 'create.files': 'Dateien',
    'set.flashcardInstructions': 'Leertaste zum Wenden · ←/→ zum Blättern · Richtig oder falsch markieren', 'set.learnInstructions': 'Fragen beantworten · Ergebnisse pro Runde', 'set.matchInstructions': 'Paare zuordnen', 'set.accuracy': 'Genauigkeit:', 'set.correct': 'Richtig:', 'set.attempted': 'Versucht:', 'set.matched': 'Zugeordnet:', 'set.attempts': 'Versuche:', 'set.time': 'Zeit:', 'set.playAgain': 'Noch einmal', 'set.noQuestions': 'Keine Fragen verfügbar.', 'set.question': 'Frage', 'set.tile': 'Kachel',
    'settings.githubAuthenticate': 'Für GitHub Models authentifizieren.', 'settings.clearApiKey': 'API-Schlüssel löschen?', 'settings.deviceCode': 'Gerätecode', 'edit.deleteSet': 'Set löschen?',
  },
  ru: {
    'common.add': 'Добавить', 'common.results': 'Результаты', 'common.optional': 'необязательно', 'common.status': 'Статус:', 'common.authenticated': 'Выполнен вход', 'common.notAuthenticated': 'Вход не выполнен', 'common.invalid': 'Токен недействителен', 'common.locked': 'Хранилище заблокировано', 'common.retry': 'Повторить', 'common.continue': 'Продолжить', 'common.true': 'Верно', 'common.false': 'Неверно',
    'common.clear': 'Очистить', 'common.copy': 'Копировать', 'common.download': 'Скачать', 'common.selectAll': 'Выбрать всё', 'common.confirm': 'Подтвердить', 'common.authenticate': 'Войти', 'common.signOut': 'Выйти', 'set.noStarred': 'Нет избранных карточек', 'set.comingSoon': 'Скоро', 'set.notImplemented': 'Этот режим ещё не реализован.', 'set.noCards': 'Нет карточек.', 'auth.firstRunDescription': 'Создайте профиль и задайте пароль приложения.',
    'create.sourceSets': 'Исходные наборы', 'create.searchAndSelect': 'Найдите и выберите наборы для объединения.', 'create.selected': 'Выбрано', 'create.theme': 'Тема', 'create.aiOutput': 'Ответ ИИ', 'create.rawOutput': 'Исходный ответ', 'create.sources': 'Источники', 'create.instructions': 'Инструкции', 'create.pdfPages': 'Страницы PDF', 'create.images': 'Изображения', 'create.files': 'Файлы',
    'set.flashcardInstructions': 'Пробел — перевернуть · ←/→ — листать · Отметьте результат', 'set.learnInstructions': 'Отвечайте на вопросы · Результаты каждой сессии', 'set.matchInstructions': 'Найдите пары', 'set.accuracy': 'Точность:', 'set.correct': 'Верно:', 'set.attempted': 'Попытки:', 'set.matched': 'Найдено:', 'set.attempts': 'Попытки:', 'set.time': 'Время:', 'set.playAgain': 'Играть снова', 'set.noQuestions': 'Нет доступных вопросов.', 'set.question': 'Вопрос', 'set.tile': 'Плитка',
    'settings.githubAuthenticate': 'Войдите для использования GitHub Models.', 'settings.clearApiKey': 'Удалить ключ API?', 'settings.deviceCode': 'Код устройства', 'edit.deleteSet': 'Удалить набор?',
  },
  ja: {
    'common.add': '追加', 'common.results': '結果', 'common.optional': '任意', 'common.status': '状態：', 'common.authenticated': '認証済み', 'common.notAuthenticated': '未認証', 'common.invalid': 'トークンが無効', 'common.locked': '保管庫はロック中', 'common.retry': '再試行', 'common.continue': '続行', 'common.true': '正しい', 'common.false': '誤り',
    'common.clear': 'クリア', 'common.copy': 'コピー', 'common.download': 'ダウンロード', 'common.selectAll': 'すべて選択', 'common.confirm': '確認', 'common.authenticate': '認証', 'common.signOut': 'サインアウト', 'set.noStarred': 'お気に入りのカードはありません', 'set.comingSoon': '近日公開', 'set.notImplemented': 'このモードはまだ実装されていません。', 'set.noCards': 'カードがありません。', 'auth.firstRunDescription': 'プロフィールを作成し、アプリのパスワードを設定します。',
    'create.sourceSets': '元のセット', 'create.searchAndSelect': '結合するセットを検索して選択します。', 'create.selected': '選択済み', 'create.theme': 'テーマ', 'create.aiOutput': 'AI 出力', 'create.rawOutput': '生の出力', 'create.sources': '資料', 'create.instructions': '指示', 'create.pdfPages': 'PDF ページ', 'create.images': '画像', 'create.files': 'ファイル',
    'set.flashcardInstructions': 'Space で反転 · ←/→ で移動 · 正誤を記録', 'set.learnInstructions': '質問に回答 · セッションごとに結果を記録', 'set.matchInstructions': 'ペアを合わせる', 'set.accuracy': '正答率：', 'set.correct': '正解：', 'set.attempted': '回答済み：', 'set.matched': '一致：', 'set.attempts': '試行：', 'set.time': '時間：', 'set.playAgain': 'もう一度', 'set.noQuestions': '利用できる質問がありません。', 'set.question': '質問', 'set.tile': 'タイル',
    'settings.githubAuthenticate': 'GitHub Models を使用するには認証してください。', 'settings.clearApiKey': 'API キーを消去しますか？', 'settings.deviceCode': 'デバイスコード', 'edit.deleteSet': 'セットを削除しますか？',
  },
  ko: {
    'common.add': '추가', 'common.results': '결과', 'common.optional': '선택 사항', 'common.status': '상태:', 'common.authenticated': '인증됨', 'common.notAuthenticated': '인증되지 않음', 'common.invalid': '토큰이 유효하지 않음', 'common.locked': '보관함 잠김', 'common.retry': '다시 시도', 'common.continue': '계속', 'common.true': '참', 'common.false': '거짓',
    'common.clear': '지우기', 'common.copy': '복사', 'common.download': '다운로드', 'common.selectAll': '모두 선택', 'common.confirm': '확인', 'common.authenticate': '인증', 'common.signOut': '로그아웃', 'set.noStarred': '즐겨찾기 카드가 없습니다', 'set.comingSoon': '출시 예정', 'set.notImplemented': '이 모드는 아직 구현되지 않았습니다.', 'set.noCards': '카드가 없습니다.', 'auth.firstRunDescription': '프로필을 만들고 앱 비밀번호를 설정하세요.',
    'create.sourceSets': '원본 세트', 'create.searchAndSelect': '결합할 세트를 검색하고 선택하세요.', 'create.selected': '선택됨', 'create.theme': '주제', 'create.aiOutput': 'AI 출력', 'create.rawOutput': '원본 출력', 'create.sources': '자료', 'create.instructions': '지침', 'create.pdfPages': 'PDF 페이지', 'create.images': '이미지', 'create.files': '파일',
    'set.flashcardInstructions': 'Space로 뒤집기 · ←/→로 이동 · 정답 여부 표시', 'set.learnInstructions': '질문에 답하기 · 실행별 결과 기록', 'set.matchInstructions': '짝 맞추기', 'set.accuracy': '정확도:', 'set.correct': '정답:', 'set.attempted': '시도:', 'set.matched': '맞춘 수:', 'set.attempts': '시도:', 'set.time': '시간:', 'set.playAgain': '다시 하기', 'set.noQuestions': '사용 가능한 질문이 없습니다.', 'set.question': '질문', 'set.tile': '타일',
    'settings.githubAuthenticate': 'GitHub Models를 사용하려면 인증하세요.', 'settings.clearApiKey': 'API 키를 지울까요?', 'settings.deviceCode': '기기 코드', 'edit.deleteSet': '세트를 삭제할까요?',
  },
}

const detailMessages: Record<AppLanguage, Messages> = {
  en: {
    'common.choose': 'Choose', 'common.select': 'Select', 'common.enter': 'Enter',
    'create.themeHint': 'A hint for the synthesis focus (for example: exam 2, core concepts, definitions only).', 'create.themePlaceholder': 'Theme…', 'create.generatedSetPlaceholder': 'Generated set…', 'create.instructionsPlaceholder': 'For example: focus on key definitions and common exam questions', 'create.sourceLimits': 'Limits: up to {pages} PDF pages total and {images} images.', 'create.chooseFiles': 'Choose files', 'create.checking': 'Checking…', 'create.parsing': 'Parsing…', 'create.generating': 'Generating…',
    'set.synthesizedFrom': 'Synthesized from:', 'set.termLabel': 'Term:', 'set.definitionLabel': 'Definition:',
    'settings.compatible': 'Compatible', 'settings.advanced': 'Advanced', 'settings.baseUrl': 'Base URL', 'settings.configured': 'configured', 'settings.apiKeySet': 'API key set', 'settings.models': 'Models', 'settings.backToProviders': 'Back to providers',
  },
  es: {
    'common.choose': 'Elegir', 'common.select': 'Seleccionar', 'common.enter': 'Entrar',
    'create.themeHint': 'Una pista para orientar la síntesis (por ejemplo: examen 2, conceptos clave, solo definiciones).', 'create.themePlaceholder': 'Tema…', 'create.generatedSetPlaceholder': 'Conjunto generado…', 'create.instructionsPlaceholder': 'Por ejemplo: centrarse en definiciones clave y preguntas frecuentes de examen', 'create.sourceLimits': 'Límites: hasta {pages} páginas PDF en total y {images} imágenes.', 'create.chooseFiles': 'Elegir archivos', 'create.checking': 'Comprobando…', 'create.parsing': 'Analizando…', 'create.generating': 'Generando…',
    'set.synthesizedFrom': 'Sintetizado a partir de:', 'set.termLabel': 'Término:', 'set.definitionLabel': 'Definición:',
    'settings.compatible': 'Compatible', 'settings.advanced': 'Avanzado', 'settings.baseUrl': 'URL base', 'settings.configured': 'configurado', 'settings.apiKeySet': 'Clave API configurada', 'settings.models': 'Modelos', 'settings.backToProviders': 'Volver a proveedores',
  },
  fr: {
    'common.choose': 'Choisir', 'common.select': 'Sélectionner', 'common.enter': 'Entrer',
    'create.themeHint': 'Une indication pour orienter la synthèse (par exemple : examen 2, concepts clés, définitions uniquement).', 'create.themePlaceholder': 'Thème…', 'create.generatedSetPlaceholder': 'Ensemble généré…', 'create.instructionsPlaceholder': 'Par exemple : se concentrer sur les définitions clés et les questions d’examen courantes', 'create.sourceLimits': 'Limites : jusqu’à {pages} pages PDF au total et {images} images.', 'create.chooseFiles': 'Choisir des fichiers', 'create.checking': 'Vérification…', 'create.parsing': 'Analyse…', 'create.generating': 'Génération…',
    'set.synthesizedFrom': 'Synthétisé à partir de :', 'set.termLabel': 'Terme :', 'set.definitionLabel': 'Définition :',
    'settings.compatible': 'Compatible', 'settings.advanced': 'Avancé', 'settings.baseUrl': 'URL de base', 'settings.configured': 'configuré', 'settings.apiKeySet': 'Clé API configurée', 'settings.models': 'Modèles', 'settings.backToProviders': 'Retour aux fournisseurs',
  },
  'zh-CN': {
    'common.choose': '选择', 'common.select': '选择', 'common.enter': '进入',
    'create.themeHint': '用于指定综合重点的提示（例如：第二次考试、核心概念、仅定义）。', 'create.themePlaceholder': '主题…', 'create.generatedSetPlaceholder': '生成的卡片集…', 'create.instructionsPlaceholder': '例如：重点关注关键定义和常见考试题', 'create.sourceLimits': '限制：PDF 总计最多 {pages} 页，图片最多 {images} 张。', 'create.chooseFiles': '选择文件', 'create.checking': '正在检查…', 'create.parsing': '正在解析…', 'create.generating': '正在生成…',
    'set.synthesizedFrom': '综合自：', 'set.termLabel': '术语：', 'set.definitionLabel': '定义：',
    'settings.compatible': '兼容', 'settings.advanced': '高级', 'settings.baseUrl': '基础 URL', 'settings.configured': '已配置', 'settings.apiKeySet': '已设置 API 密钥', 'settings.models': '模型', 'settings.backToProviders': '返回服务提供商',
  },
  hi: {
    'common.choose': 'चुनें', 'common.select': 'चुनें', 'common.enter': 'दर्ज करें',
    'create.themeHint': 'सिंथेसिस के केंद्र के लिए संकेत (जैसे: परीक्षा 2, मुख्य अवधारणाएँ, केवल परिभाषाएँ)।', 'create.themePlaceholder': 'विषय…', 'create.generatedSetPlaceholder': 'जनरेट किया गया सेट…', 'create.instructionsPlaceholder': 'जैसे: मुख्य परिभाषाओं और सामान्य परीक्षा प्रश्नों पर ध्यान दें', 'create.sourceLimits': 'सीमा: कुल {pages} PDF पृष्ठ और {images} चित्र तक।', 'create.chooseFiles': 'फ़ाइलें चुनें', 'create.checking': 'जाँच हो रही है…', 'create.parsing': 'पार्स हो रहा है…', 'create.generating': 'जनरेट हो रहा है…',
    'set.synthesizedFrom': 'इनसे सिंथेसाइज़ किया गया:', 'set.termLabel': 'शब्द:', 'set.definitionLabel': 'परिभाषा:',
    'settings.compatible': 'संगत', 'settings.advanced': 'उन्नत', 'settings.baseUrl': 'बेस URL', 'settings.configured': 'कॉन्फ़िगर किया गया', 'settings.apiKeySet': 'API कुंजी सेट है', 'settings.models': 'मॉडल', 'settings.backToProviders': 'प्रदाताओं पर वापस जाएँ',
  },
  ar: {
    'common.choose': 'اختيار', 'common.select': 'تحديد', 'common.enter': 'إدخال',
    'create.themeHint': 'تلميح لتحديد محور التوليف (مثل: الاختبار 2، المفاهيم الأساسية، التعريفات فقط).', 'create.themePlaceholder': 'الموضوع…', 'create.generatedSetPlaceholder': 'مجموعة مولّدة…', 'create.instructionsPlaceholder': 'مثال: ركّز على التعريفات الأساسية وأسئلة الاختبارات الشائعة', 'create.sourceLimits': 'الحدود: حتى {pages} صفحة PDF إجمالًا و{images} صور.', 'create.chooseFiles': 'اختيار الملفات', 'create.checking': 'جارٍ التحقق…', 'create.parsing': 'جارٍ التحليل…', 'create.generating': 'جارٍ التوليد…',
    'set.synthesizedFrom': 'مُولّف من:', 'set.termLabel': 'المصطلح:', 'set.definitionLabel': 'التعريف:',
    'settings.compatible': 'متوافق', 'settings.advanced': 'متقدم', 'settings.baseUrl': 'عنوان URL الأساسي', 'settings.configured': 'مُعدّ', 'settings.apiKeySet': 'تم إعداد مفتاح API', 'settings.models': 'النماذج', 'settings.backToProviders': 'العودة إلى المزوّدين',
  },
  de: {
    'common.choose': 'Auswählen', 'common.select': 'Auswählen', 'common.enter': 'Eingeben',
    'create.themeHint': 'Ein Hinweis zum Schwerpunkt der Synthese (zum Beispiel: Prüfung 2, Kernkonzepte, nur Definitionen).', 'create.themePlaceholder': 'Thema…', 'create.generatedSetPlaceholder': 'Generiertes Set…', 'create.instructionsPlaceholder': 'Zum Beispiel: wichtige Definitionen und häufige Prüfungsfragen hervorheben', 'create.sourceLimits': 'Limits: insgesamt bis zu {pages} PDF-Seiten und {images} Bilder.', 'create.chooseFiles': 'Dateien auswählen', 'create.checking': 'Wird geprüft…', 'create.parsing': 'Wird analysiert…', 'create.generating': 'Wird generiert…',
    'set.synthesizedFrom': 'Synthetisiert aus:', 'set.termLabel': 'Begriff:', 'set.definitionLabel': 'Definition:',
    'settings.compatible': 'Kompatibel', 'settings.advanced': 'Erweitert', 'settings.baseUrl': 'Basis-URL', 'settings.configured': 'konfiguriert', 'settings.apiKeySet': 'API-Schlüssel gesetzt', 'settings.models': 'Modelle', 'settings.backToProviders': 'Zurück zu Anbietern',
  },
  ru: {
    'common.choose': 'Выбрать', 'common.select': 'Выбрать', 'common.enter': 'Ввести',
    'create.themeHint': 'Подсказка для направления синтеза (например: экзамен 2, ключевые понятия, только определения).', 'create.themePlaceholder': 'Тема…', 'create.generatedSetPlaceholder': 'Созданный набор…', 'create.instructionsPlaceholder': 'Например: сосредоточьтесь на ключевых определениях и типовых вопросах экзамена', 'create.sourceLimits': 'Ограничения: до {pages} страниц PDF и {images} изображений.', 'create.chooseFiles': 'Выбрать файлы', 'create.checking': 'Проверка…', 'create.parsing': 'Обработка…', 'create.generating': 'Создание…',
    'set.synthesizedFrom': 'Синтезировано из:', 'set.termLabel': 'Термин:', 'set.definitionLabel': 'Определение:',
    'settings.compatible': 'Совместимый', 'settings.advanced': 'Расширенный', 'settings.baseUrl': 'Базовый URL', 'settings.configured': 'настроено', 'settings.apiKeySet': 'Ключ API задан', 'settings.models': 'Модели', 'settings.backToProviders': 'Назад к провайдерам',
  },
  ja: {
    'common.choose': '選択', 'common.select': '選択', 'common.enter': '決定',
    'create.themeHint': '統合の重点を示すヒント（例：試験2、重要概念、定義のみ）。', 'create.themePlaceholder': 'テーマ…', 'create.generatedSetPlaceholder': '生成されたセット…', 'create.instructionsPlaceholder': '例：重要な定義とよく出る試験問題に重点を置く', 'create.sourceLimits': '上限：PDF は合計 {pages} ページ、画像は {images} 枚まで。', 'create.chooseFiles': 'ファイルを選択', 'create.checking': '確認中…', 'create.parsing': '解析中…', 'create.generating': '生成中…',
    'set.synthesizedFrom': '統合元：', 'set.termLabel': '用語：', 'set.definitionLabel': '定義：',
    'settings.compatible': '互換', 'settings.advanced': '詳細', 'settings.baseUrl': 'ベース URL', 'settings.configured': '設定済み', 'settings.apiKeySet': 'API キー設定済み', 'settings.models': 'モデル', 'settings.backToProviders': 'プロバイダーに戻る',
  },
  ko: {
    'common.choose': '선택', 'common.select': '선택', 'common.enter': '입력',
    'create.themeHint': '통합 초점을 정하는 힌트(예: 시험 2, 핵심 개념, 정의만).', 'create.themePlaceholder': '주제…', 'create.generatedSetPlaceholder': '생성된 세트…', 'create.instructionsPlaceholder': '예: 핵심 정의와 자주 나오는 시험 문제에 집중', 'create.sourceLimits': '제한: PDF는 총 {pages}페이지, 이미지는 {images}개까지.', 'create.chooseFiles': '파일 선택', 'create.checking': '확인 중…', 'create.parsing': '분석 중…', 'create.generating': '생성 중…',
    'set.synthesizedFrom': '통합 출처:', 'set.termLabel': '용어:', 'set.definitionLabel': '정의:',
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

export const messages: Record<AppLanguage, Messages> = messageTargets
