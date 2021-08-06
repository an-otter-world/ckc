<template lang="pug">
div(class="dropdown" ref="dropdown")
  header
    a(href="#" @click="toggle()")
      slot(name="header")
        c-icon(icon="chevron-down")
  div(v-if="isOpen" v-on:mouseup="close()")
    slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  setup() {
    const isOpen = ref(false);
    const html = document.documentElement
    const dropdown = ref<Node | null>(null)

    function open() {
      html.addEventListener('click', onBodyClick)
      isOpen.value = true
    }

    function close() {
      html.removeEventListener('click', onBodyClick)
      isOpen.value = false
    }

    function toggle() {
      if(!isOpen.value) {
        open()
      }
      else {
        close()
      }
    }

    function onBodyClick(e: Event) {
      if(!dropdown.value!.contains(e.target as Node)) {
        close()
      }
    }

    return {
      close,
      dropdown,
      isOpen,
      toggle,
    }
  },
})
</script>

<style>
.dropdown > header {
  position: relative;
}

.dropdown > header {
  vertical-align: middle;
}

.dropdown > div {
  background: var(--context);
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  border-top: 1px solid var(--on-context);
  padding: var(--spacing);
  position: absolute;
  right: 0px;
}
</style>
