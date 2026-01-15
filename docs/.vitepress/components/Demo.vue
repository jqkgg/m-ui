<template>
  <div class="demo-wrapper">
    <div class="">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.demo-wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 0;
  /* margin: 16px 0; */
  overflow: hidden;
  background-color: var(--vp-c-bg);
  padding: 16px;
}

.demo-container {
  padding: 24px;
}
</style>
