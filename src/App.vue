<script setup lang="ts">
import LayoutView from "./components/LayoutView.vue";
</script>
<!-- 
  1- wrapp login and logout to useMutuion, (loading indic)
  2- stats page
  3- game page
 -->

<template>
  <LayoutView>
    <RouterView />
  </LayoutView>
</template>
