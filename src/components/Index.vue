<template>
  <Suspense>
    <template #default>
      <div data-control-name="${CONTROL_NAME}">
        <App />
      </div>
    </template>
    <template #fallback></template>
  </Suspense>
</template>

<script setup lang="ts">
import { App } from "@/components/index";
</script>
