<template>
  <header class="d-flex justify-content-center py-3">
    <navigation-comp>
    
  </navigation-comp>
    </header>
  <section class="routerview p-5">
    <router-view>

    </router-view>
  </section>
</template>
<style scoped>
.routerview{
  display: flex;
  flex-direction: column;
}
</style>