<template>
  <button
    class="px-4 py-3 rounded-lg font-bold"
    :class="disabled ? 'bg-gray-500' : ''"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
    },
  },
};
</script>

<style>
</style>