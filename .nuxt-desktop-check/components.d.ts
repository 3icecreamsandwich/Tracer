
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


export const AiErrorModal: typeof import("../components/AiErrorModal.vue")['default']
export const AppButton: typeof import("../components/AppButton.vue")['default']
export const AppDialog: typeof import("../components/AppDialog.vue")['default']
export const AppIcon: typeof import("../components/AppIcon.vue")['default']
export const AppShell: typeof import("../components/AppShell.vue")['default']
export const AppTopbar: typeof import("../components/AppTopbar.vue")['default']
export const BackButton: typeof import("../components/BackButton.vue")['default']
export const BaseModal: typeof import("../components/BaseModal.vue")['default']
export const ClassCodeDialog: typeof import("../components/ClassCodeDialog.vue")['default']
export const ClassCreateDialog: typeof import("../components/ClassCreateDialog.vue")['default']
export const ClassJoinDialog: typeof import("../components/ClassJoinDialog.vue")['default']
export const CreateChevron: typeof import("../components/CreateChevron.vue")['default']
export const CreateModeIcon: typeof import("../components/CreateModeIcon.vue")['default']
export const DuplicateCardsDialog: typeof import("../components/DuplicateCardsDialog.vue")['default']
export const FactCheckPanel: typeof import("../components/FactCheckPanel.vue")['default']
export const FloatingPageChat: typeof import("../components/FloatingPageChat.vue")['default']
export const HomeDestinationLink: typeof import("../components/HomeDestinationLink.vue")['default']
export const HomeLibraryItem: typeof import("../components/HomeLibraryItem.vue")['default']
export const LoadingSpinner: typeof import("../components/LoadingSpinner.vue")['default']
export const MarkdownRenderer: typeof import("../components/MarkdownRenderer.vue")['default']
export const MatchLeaderboard: typeof import("../components/MatchLeaderboard.vue")['default']
export const ResetTracerDialog: typeof import("../components/ResetTracerDialog.vue")['default']
export const SetIcon: typeof import("../components/SetIcon.vue")['default']
export const ShareSetDialog: typeof import("../components/ShareSetDialog.vue")['default']
export const StarGlyph: typeof import("../components/StarGlyph.vue")['default']
export const StudyModeTile: typeof import("../components/StudyModeTile.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAiErrorModal: LazyComponent<typeof import("../components/AiErrorModal.vue")['default']>
export const LazyAppButton: LazyComponent<typeof import("../components/AppButton.vue")['default']>
export const LazyAppDialog: LazyComponent<typeof import("../components/AppDialog.vue")['default']>
export const LazyAppIcon: LazyComponent<typeof import("../components/AppIcon.vue")['default']>
export const LazyAppShell: LazyComponent<typeof import("../components/AppShell.vue")['default']>
export const LazyAppTopbar: LazyComponent<typeof import("../components/AppTopbar.vue")['default']>
export const LazyBackButton: LazyComponent<typeof import("../components/BackButton.vue")['default']>
export const LazyBaseModal: LazyComponent<typeof import("../components/BaseModal.vue")['default']>
export const LazyClassCodeDialog: LazyComponent<typeof import("../components/ClassCodeDialog.vue")['default']>
export const LazyClassCreateDialog: LazyComponent<typeof import("../components/ClassCreateDialog.vue")['default']>
export const LazyClassJoinDialog: LazyComponent<typeof import("../components/ClassJoinDialog.vue")['default']>
export const LazyCreateChevron: LazyComponent<typeof import("../components/CreateChevron.vue")['default']>
export const LazyCreateModeIcon: LazyComponent<typeof import("../components/CreateModeIcon.vue")['default']>
export const LazyDuplicateCardsDialog: LazyComponent<typeof import("../components/DuplicateCardsDialog.vue")['default']>
export const LazyFactCheckPanel: LazyComponent<typeof import("../components/FactCheckPanel.vue")['default']>
export const LazyFloatingPageChat: LazyComponent<typeof import("../components/FloatingPageChat.vue")['default']>
export const LazyHomeDestinationLink: LazyComponent<typeof import("../components/HomeDestinationLink.vue")['default']>
export const LazyHomeLibraryItem: LazyComponent<typeof import("../components/HomeLibraryItem.vue")['default']>
export const LazyLoadingSpinner: LazyComponent<typeof import("../components/LoadingSpinner.vue")['default']>
export const LazyMarkdownRenderer: LazyComponent<typeof import("../components/MarkdownRenderer.vue")['default']>
export const LazyMatchLeaderboard: LazyComponent<typeof import("../components/MatchLeaderboard.vue")['default']>
export const LazyResetTracerDialog: LazyComponent<typeof import("../components/ResetTracerDialog.vue")['default']>
export const LazySetIcon: LazyComponent<typeof import("../components/SetIcon.vue")['default']>
export const LazyShareSetDialog: LazyComponent<typeof import("../components/ShareSetDialog.vue")['default']>
export const LazyStarGlyph: LazyComponent<typeof import("../components/StarGlyph.vue")['default']>
export const LazyStudyModeTile: LazyComponent<typeof import("../components/StudyModeTile.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
