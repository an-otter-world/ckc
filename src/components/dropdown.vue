<template lang="pug">
div(class="dropdown")
  header
    a(href="#" @click="toggle()")
      slot(name="header")
        ciu-icon(icon="chevron-down")
  div(v-if="isOpen" @click="isOpen = false")
    slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  setup() {
    let isOpen = ref(false);
    let toggle = () => {
      isOpen.value = !isOpen.value;
    }
    return {
      isOpen,
      toggle
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
  background: var(--primary);
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  border-top: 1px solid var(--on-primary);
  padding: var(--spacing);
  position: absolute;
  right: 0px;
}
</style>
