<template>
  <aside :class="{ 'is-expanded': expanded }" class="tracer-sidebar" aria-label="Study navigation" @mouseenter="expanded = true" @mouseleave="expanded = false" @focusin="expanded = true" @focusout="expanded = false">
    <nav class="sidebar-nav">
      <div v-for="item in visibleLinks" :key="item.to" class="nav-entry">
        <NuxtLink :to="item.to" :external="item.to.startsWith('https://')" :aria-label="item.to === '/' ? 'Home' : item.label" :aria-current="isActive(item.to) ? 'page' : undefined" class="nav-item" :class="[`nav-item-${item.tone}`, { 'nav-item-active': isActive(item.to) }]">
          <span class="nav-icon"><SidebarGlyph :name="item.icon" /></span><span class="nav-label">{{ item.label }}</span>
        </NuxtLink>
        <div v-if="item.to === '/library' || item.to === '/classes'" class="recent-sets" :aria-hidden="!expanded">
          <NuxtLink v-for="entry in item.to === '/classes' ? recentClasses : recentSets" :key="entry.to" :to="entry.to" :tabindex="expanded ? 0 : -1">{{ entry.title }}</NuxtLink>
        </div>
      </div>
    </nav>
  </aside>
</template>
<script setup lang="ts">
import { createSetsRepo, useTracerDb } from '~/src/composables/db'
import { listClassrooms, getAccountRole } from '~/src/composables/classrooms'
import { useLockSession } from '~/src/composables/lock-session'
const route = useRoute()
const isActive = (path: string) => route.path === path || (path === '/library' && route.path.startsWith('/folder/'))
const { unlockedThisSession } = useLockSession()
const role = ref('')
const recentSets = ref<Array<{title:string;to:string}>>([])
const recentClasses = ref<Array<{title:string;to:string}>>([])
const visibleLinks = computed(() => links.filter(item => item.to !== '/teacher' || role.value === 'teacher' || role.value === 'super'))
let loadGeneration = 0
async function loadNavigation() {
  const generation = ++loadGeneration
  if (!unlockedThisSession.value) { recentSets.value = []; recentClasses.value = []; role.value = ''; return }
  await Promise.allSettled([
    useTracerDb().then(db => createSetsRepo(db).list()).then(sets => { if (generation === loadGeneration) recentSets.value = sets.slice(0,3).map(set => ({title:set.title,to:`/set/${set.id}`})) }),
    getAccountRole().then(value => { if (generation === loadGeneration) role.value = value ?? '' }),
    listClassrooms().then(classes => { if (generation === loadGeneration) recentClasses.value = classes.slice(0,3).map(c => ({title:c.name,to:c.canTeach ? `/teacher?class=${c.id}` : `/student/classes/${c.id}`})) })
  ])
}
onMounted(loadNavigation)
watch(unlockedThisSession, loadNavigation)
const expanded = ref(false)
const links = [
  { label: 'Sets & Guides', to: '/library', icon: 'cards', tone: 'yellow' },
  { label: 'Classes', to: '/classes', icon: 'classes', tone: 'yellow' },
  { label: 'Basic', to: '/create/basic', icon: 'basic', tone: 'orange' },
  { label: 'Synthesize', to: '/create/synthesize', icon: 'synthesize', tone: 'orange' },
  { label: 'Generate', to: '/create/generate', icon: 'generate', tone: 'orange' },
  { label: 'Request a set', to: 'https://docs.google.com/forms/d/1CH-rdYNHYnsAdiDxbdfZIoAkVE6pYZ0tzP8t0fcyn00/', icon: 'request', tone: 'green' },
  { label: 'Dashboard', to: '/teacher', icon: 'dashboard', tone: 'purple' },
  { label: 'Insights', to: '/insights', icon: 'insights', tone: 'purple' },
  { label: 'Public sets', to: '/public-sets', icon: 'public', tone: 'purple' },
] as const
</script>
<style scoped>
.tracer-sidebar {
  position: fixed;
  top: calc(50% + 20px);
  left: 0;
  z-index: 20;
  width: 68px;
  max-height: calc(100dvh - 88px);
  overflow: hidden;
  color: var(--ui-text-highlighted);
  background: var(--ui-bg);
  border: 0;
  border-left: 0;
  border-radius: 0 20px 20px 0;
  box-shadow: 8px 0 22px rgb(43 39 31 / 7%);
  transform: translateY(-50%);
  transition:
    width 320ms cubic-bezier(0.4, 0, 0.2, 1),
    border-radius 320ms ease,
    box-shadow 320ms ease;
}

.tracer-sidebar.is-expanded,
.tracer-sidebar.is-expanded {
  width: clamp(220px, 22vw, 280px);
  border-radius: 0 24px 24px 0;
  box-shadow: 13px 0 35px rgb(43 39 31 / 10%);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: clamp(3px, 0.7vh, 7px);
  max-height: calc(100dvh - 88px);
  padding: clamp(12px, 2.5vh, 22px) 8px;
  overflow-y: auto;
  scrollbar-width: none;
  transition:
    gap 280ms ease,
    padding 280ms ease;
}

.sidebar-nav::-webkit-scrollbar {
  display: none;
}

.tracer-sidebar.is-expanded .sidebar-nav,
.tracer-sidebar.is-expanded .sidebar-nav {
  gap: clamp(3px, 0.8vh, 8px);
  padding: clamp(14px, 3vh, 26px) clamp(10px, 1.2vw, 16px);
}

.nav-entry {
  flex: 0 0 auto;
}

.nav-item {
  position: relative;
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  gap: 13px;
  padding: 0 9px;
  overflow: hidden;
  color: var(--ui-text-muted);
  border-radius: 15px;
  transition:
    color 180ms ease,
    background 180ms ease;
}

.nav-item:hover,
.nav-item:focus-visible {
  color: var(--ui-text-highlighted);
  background: var(--ui-bg-muted);
}

.nav-item-active::before {
  display:none;
  position: absolute;
  left: -9px;
  width: 3px;
  height: 26px;
  content: '';
  background: currentcolor;
  border-radius: 0 4px 4px 0;
}

.nav-icon {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  place-items: center;
  border-radius: 11px;
  transition:
    color 180ms ease,
    background 180ms ease,
    transform 180ms ease;
}

.nav-item:hover .nav-icon {
  transform: scale(1.04);
}

.nav-item-yellow .nav-icon {
  color: var(--nav-yellow-text);
  background: var(--nav-yellow-bg);
}

.nav-item-orange .nav-icon {
  color: var(--nav-orange-text);
  background: var(--nav-orange-bg);
}

.nav-item-purple .nav-icon {
  color: var(--nav-purple-text);
  background: var(--nav-purple-bg);
}

.nav-item-yellow.nav-item-active {
  color: #8b5900;
  background: #fff8dc;
}

.nav-item-orange.nav-item-active {
  color: #a53b13;
  background: #fff1e5;
}

.nav-item-purple.nav-item-active {
  color: #302774;
  background: #f0efff;
}

.nav-label {
  overflow: hidden;
  font-size: 13.5px;
  font-weight: 500;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-8px);
  transition:
    opacity 160ms ease 40ms,
    transform 220ms ease 40ms;
}

.tracer-sidebar.is-expanded .nav-label,
.tracer-sidebar.is-expanded .nav-label {
  opacity: 1;
  transform: translateX(0);
}

.recent-sets {
  display: grid;
  max-height: 0;
  gap: 2px;
  padding-left: 25px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-5px);
  transition:
    max-height 300ms ease,
    margin 300ms ease,
    opacity 180ms ease 70ms,
    transform 220ms ease 70ms;
}

.tracer-sidebar.is-expanded .recent-sets,
.tracer-sidebar.is-expanded .recent-sets {
  max-height: 150px;
  margin: 5px 0 3px;
  opacity: 1;
  transform: translateY(0);
}

.recent-sets a {
  display: flex;
  height: 28px;
  align-items: center;
  padding: 0 8px;
  overflow: hidden;
  color: var(--ui-text-muted);
  font-size: 11px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 8px;
  transition:
    color 160ms ease,
    background 160ms ease;
}

.recent-sets a:hover,
.recent-sets a.recent-active,
.recent-sets a.router-link-exact-active {
  color: #7e5200;
  background: #fff8dc;
}

@media (max-width: 700px) {
  .tracer-sidebar.is-expanded,
  .tracer-sidebar.is-expanded {
    width: min(260px, 78vw);
  }
}

@media (max-height: 720px) {
  .sidebar-nav {
    gap: 3px;
    padding-block: 12px;
  }

  .tracer-sidebar.is-expanded .sidebar-nav,
  .tracer-sidebar.is-expanded .sidebar-nav {
    gap: 3px;
    padding-block: 14px;
  }

  .nav-item {
    height: 42px;
  }

  .tracer-sidebar.is-expanded .recent-sets,
  .tracer-sidebar.is-expanded .recent-sets {
    max-height: 112px;
  }

  .recent-sets a {
    height: 23px;
  }
}

.tracer-sidebar { --nav-yellow-bg: #fff1c2; --nav-yellow-text: #95600d; --nav-orange-bg: #fbe1d0; --nav-orange-text: #a84e28; --nav-purple-bg: #e5e0fa; --nav-purple-text: #51458a; }
:global(.dark) .tracer-sidebar { --nav-yellow-bg: #39311c; --nav-yellow-text: #e5c16e; --nav-orange-bg: #3b2b26; --nav-orange-text: #e4aa88; --nav-purple-bg: #302d43; --nav-purple-text: #b9afe5; }
:global(.dark) .nav-item-active { background:var(--ui-bg-elevated); color:var(--ui-text-highlighted); }
@media(prefers-reduced-motion:reduce) { .tracer-sidebar, .tracer-sidebar * { transition:none !important; } }

</style>

<style scoped>
:global(.dark) .nav-item-yellow .nav-icon { background:#514321; color:#ffdf91; }
:global(.dark) .nav-item-orange .nav-icon { background:#58382b; color:#ffc2a0; }
:global(.dark) .nav-item-purple .nav-icon { background:#443b64; color:#d3c9ff; }
:global(.dark) .nav-item-active { background:#393453; color:#f3efff; }
</style>

<style scoped>

.nav-item-green .nav-icon { background:#d1fae5; color:#059669; }
.nav-item-green .nav-icon :deep(svg) { width:18px; height:18px; }
:global(html.dark) .nav-item-green .nav-icon { background:#064e3b; color:#6ee7b7; }
.nav-item-green:hover { background:#d1fae5; }
:global(html.dark) .nav-item-green:hover { background:#064e3b; }
</style>
