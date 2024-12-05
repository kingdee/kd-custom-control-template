<template>
  <div data-control-name="${CONTROL_NAME}">
    <App />
  </div>
</template>

<script lang="ts">
import App from '@/components/App.vue'

export default {
  name: 'Index',
  props: {},
  components: {
    App,
  },
}
</script>
<style scoped></style>
