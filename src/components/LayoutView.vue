<script setup lang="ts">
import { login, logout } from "../lib/supabase";
import { useUser, authListener } from "../services/Auth";

authListener();
const { data } = useUser();
</script>

<template>
  <main class="container mx-auto py-6 min-h-svh flex flex-col px-4 lg:px-0">
    <header class="flex items-center justify-between">
      <RouterLink to="/">
        <h1 class="text-primary font-bold text-2xl">QAD</h1>
      </RouterLink>
      <button class="btn btn-secondary" v-on:click="login()" v-if="!data">
        discord login
      </button>
      <section class="flex items-center gap-4" v-else>
        <RouterLink to="/stats" class="avatar">
          <div class="w-10 rounded-full">
            <img v-bind:src="data.image" alt="profile" />
          </div>
        </RouterLink>
        <button class="btn btn-secondary" v-on:click="logout()">logout</button>
      </section>
    </header>
    <slot></slot>
  </main>
</template>
