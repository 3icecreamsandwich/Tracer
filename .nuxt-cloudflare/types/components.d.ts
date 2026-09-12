
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  AiErrorModal: typeof import("../../components/AiErrorModal.vue")['default']
  AppButton: typeof import("../../components/AppButton.vue")['default']
  AppDialog: typeof import("../../components/AppDialog.vue")['default']
  AppIcon: typeof import("../../components/AppIcon.vue")['default']
  AppShell: typeof import("../../components/AppShell.vue")['default']
  AppTopbar: typeof import("../../components/AppTopbar.vue")['default']
  BackButton: typeof import("../../components/BackButton.vue")['default']
  BaseModal: typeof import("../../components/BaseModal.vue")['default']
  ClassCodeDialog: typeof import("../../components/ClassCodeDialog.vue")['default']
  ClassCreateDialog: typeof import("../../components/ClassCreateDialog.vue")['default']
  ClassJoinDialog: typeof import("../../components/ClassJoinDialog.vue")['default']
  CreateChevron: typeof import("../../components/CreateChevron.vue")['default']
  CreateModeIcon: typeof import("../../components/CreateModeIcon.vue")['default']
  DuplicateCardsDialog: typeof import("../../components/DuplicateCardsDialog.vue")['default']
  FactCheckPanel: typeof import("../../components/FactCheckPanel.vue")['default']
  FloatingPageChat: typeof import("../../components/FloatingPageChat.vue")['default']
  HomeDestinationLink: typeof import("../../components/HomeDestinationLink.vue")['default']
  HomeLibraryItem: typeof import("../../components/HomeLibraryItem.vue")['default']
  LoadingSpinner: typeof import("../../components/LoadingSpinner.vue")['default']
  MarkdownRenderer: typeof import("../../components/MarkdownRenderer.vue")['default']
  MatchLeaderboard: typeof import("../../components/MatchLeaderboard.vue")['default']
  ResetTracerDialog: typeof import("../../components/ResetTracerDialog.vue")['default']
  SetIcon: typeof import("../../components/SetIcon.vue")['default']
  ShareSetDialog: typeof import("../../components/ShareSetDialog.vue")['default']
  StarGlyph: typeof import("../../components/StarGlyph.vue")['default']
  StudyModeTile: typeof import("../../components/StudyModeTile.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAiErrorModal: LazyComponent<typeof import("../../components/AiErrorModal.vue")['default']>
  LazyAppButton: LazyComponent<typeof import("../../components/AppButton.vue")['default']>
  LazyAppDialog: LazyComponent<typeof import("../../components/AppDialog.vue")['default']>
  LazyAppIcon: LazyComponent<typeof import("../../components/AppIcon.vue")['default']>
  LazyAppShell: LazyComponent<typeof import("../../components/AppShell.vue")['default']>
  LazyAppTopbar: LazyComponent<typeof import("../../components/AppTopbar.vue")['default']>
  LazyBackButton: LazyComponent<typeof import("../../components/BackButton.vue")['default']>
  LazyBaseModal: LazyComponent<typeof import("../../components/BaseModal.vue")['default']>
  LazyClassCodeDialog: LazyComponent<typeof import("../../components/ClassCodeDialog.vue")['default']>
  LazyClassCreateDialog: LazyComponent<typeof import("../../components/ClassCreateDialog.vue")['default']>
  LazyClassJoinDialog: LazyComponent<typeof import("../../components/ClassJoinDialog.vue")['default']>
  LazyCreateChevron: LazyComponent<typeof import("../../components/CreateChevron.vue")['default']>
  LazyCreateModeIcon: LazyComponent<typeof import("../../components/CreateModeIcon.vue")['default']>
  LazyDuplicateCardsDialog: LazyComponent<typeof import("../../components/DuplicateCardsDialog.vue")['default']>
  LazyFactCheckPanel: LazyComponent<typeof import("../../components/FactCheckPanel.vue")['default']>
  LazyFloatingPageChat: LazyComponent<typeof import("../../components/FloatingPageChat.vue")['default']>
  LazyHomeDestinationLink: LazyComponent<typeof import("../../components/HomeDestinationLink.vue")['default']>
  LazyHomeLibraryItem: LazyComponent<typeof import("../../components/HomeLibraryItem.vue")['default']>
  LazyLoadingSpinner: LazyComponent<typeof import("../../components/LoadingSpinner.vue")['default']>
  LazyMarkdownRenderer: LazyComponent<typeof import("../../components/MarkdownRenderer.vue")['default']>
  LazyMatchLeaderboard: LazyComponent<typeof import("../../components/MatchLeaderboard.vue")['default']>
  LazyResetTracerDialog: LazyComponent<typeof import("../../components/ResetTracerDialog.vue")['default']>
  LazySetIcon: LazyComponent<typeof import("../../components/SetIcon.vue")['default']>
  LazyShareSetDialog: LazyComponent<typeof import("../../components/ShareSetDialog.vue")['default']>
  LazyStarGlyph: LazyComponent<typeof import("../../components/StarGlyph.vue")['default']>
  LazyStudyModeTile: LazyComponent<typeof import("../../components/StudyModeTile.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
