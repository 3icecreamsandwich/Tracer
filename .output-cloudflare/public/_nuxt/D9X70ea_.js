function e(e){return Number(e)===1}function t(e){if(typeof e!=`string`)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t.filter(e=>typeof e==`string`&&e.trim().length>0):[]}catch{return[]}}function n(e){return e===`en`||e===`es`||e===`fr`||e===`zh-CN`||e===`hi`||e===`ar`||e===`de`||e===`ru`||e===`ja`||e===`ko`?e:`en`}function r(r){return{async get(){let i=(await r.select(`SELECT startup_lock_enabled, default_model_id, fallback_model_ids, dark_mode, learn_hybrid_enabled,
                smart_review_enabled, flashcards_definition_first, floating_chat_enabled, language, text_scale
         FROM app_settings WHERE id = 1 LIMIT 1;`))[0];return i?{startupLockEnabled:e(i.startup_lock_enabled),defaultModelId:i.default_model_id??null,fallbackModelIds:t(i.fallback_model_ids),darkMode:e(i.dark_mode),learnHybridEnabled:e(i.learn_hybrid_enabled),smartReviewEnabled:e(i.smart_review_enabled),flashcardsDefinitionFirst:e(i.flashcards_definition_first),floatingChatEnabled:e(i.floating_chat_enabled),language:n(i.language),textScale:Math.min(4,Math.max(0,Math.round(Number(i.text_scale)||0)))}:{startupLockEnabled:!0,defaultModelId:null,fallbackModelIds:[],darkMode:!1,learnHybridEnabled:!1,smartReviewEnabled:!1,flashcardsDefinitionFirst:!1,floatingChatEnabled:!0,language:`en`,textScale:0}},async set(e){let t=await this.get(),n={startupLockEnabled:e.startupLockEnabled??t.startupLockEnabled,defaultModelId:e.defaultModelId===void 0?t.defaultModelId:e.defaultModelId,fallbackModelIds:e.fallbackModelIds===void 0?t.fallbackModelIds:e.fallbackModelIds,darkMode:e.darkMode??t.darkMode,learnHybridEnabled:e.learnHybridEnabled??t.learnHybridEnabled,smartReviewEnabled:e.smartReviewEnabled??t.smartReviewEnabled,flashcardsDefinitionFirst:e.flashcardsDefinitionFirst??t.flashcardsDefinitionFirst,floatingChatEnabled:e.floatingChatEnabled??t.floatingChatEnabled,language:e.language??t.language,textScale:e.textScale??t.textScale};return await r.execute(`UPDATE app_settings
         SET startup_lock_enabled = ?,
             default_model_id = ?,
             fallback_model_ids = ?,
             dark_mode = ?,
             learn_hybrid_enabled = ?,
             flashcards_definition_first = ?,
             smart_review_enabled = ?,
             floating_chat_enabled = ?,
             language = ?,
             text_scale = ?
         WHERE id = 1;`,[+!!n.startupLockEnabled,n.defaultModelId,JSON.stringify(n.fallbackModelIds),+!!n.darkMode,+!!n.learnHybridEnabled,+!!n.flashcardsDefinitionFirst,+!!n.smartReviewEnabled,+!!n.floatingChatEnabled,n.language,n.textScale]),n}}}export{r as t};