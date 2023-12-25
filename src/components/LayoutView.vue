<script setup lang="ts">
import { login, logout } from "../lib/supabase";
import { useUser, authListener } from "../services/Auth";

authListener();
const { data } = useUser();
</script>

<template>
  <main class="container mx-auto py-8">
    <header class="flex justify-end">
      <button class="btn btn-secondary" v-on:click="login()" v-if="!data">
        discord login
      </button>
      <button class="btn btn-secondary" v-on:click="logout()" v-else>
        logout
      </button>
    </header>
    <slot></slot>
  </main>
</template>
