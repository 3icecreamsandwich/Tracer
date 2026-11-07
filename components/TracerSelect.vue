<script lang="ts">
import { defineComponent, h, Fragment } from 'vue'
import USelect from '@nuxt/ui/components/Select.vue'
// Keep existing option-based forms while Nuxt UI owns the accessible select.
export default defineComponent({
  inheritAttrs: false,
  props: { modelValue: { default: undefined }, value: { default: undefined } },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, attrs, emit }) {
    const emptyValue = '__tracer_select_empty__'
    function options(nodes: any[]): any[] {
      return nodes.flatMap(node => node.type === Fragment ? options(node.children || []) : node.type === 'option' ? [{ label: typeof node.children === 'string' ? node.children : (node.children || []).map((c: any) => c.children || '').join(''), value: (node.props?.value ?? node.children) === '' ? emptyValue : (node.props?.value ?? node.children), disabled: node.props?.disabled }] : [])
    }
    function layoutClass() {
      if (typeof attrs.class !== 'string') return attrs.class
      return attrs.class.split(/\s+/).filter(token => /^(?:(?:sm|md|lg|xl):)?(?:w-|min-w-|max-w-|flex-|grow|shrink|m[trblxyse]?-|col-)/.test(token)).join(' ')
    }
    return () => h(USelect, { ...attrs, items: options(slots.default?.() || []), modelValue: (props.modelValue ?? props.value) === '' ? emptyValue : (props.modelValue ?? props.value), class: ['tracer-select min-w-0', layoutClass()], 'onUpdate:modelValue': (value: any) => { if (value === emptyValue) value = ''; emit('update:modelValue', value); emit('change', { target: { value } }) } })
  }
})
</script>
