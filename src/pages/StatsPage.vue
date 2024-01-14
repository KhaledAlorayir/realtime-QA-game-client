<script setup lang="ts">
import { getStats } from "@/lib/api";
import { useUser } from "@/lib/auth";
import StatsCard from "@/components/StatsCard.vue";

const { data, isSuccess, isLoading } = getStats();
const { data: user } = useUser();
</script>

<template>
  <div v-if="isLoading" class="flex gap-4">
    <article
      v-for="item in [1, 2, 3]"
      :key="item"
      class="bg-neutral min-w-32 max-w-lg rounded-md px-3 py-2 space-y-2 skeleton"
    >
      <p class="font-bold text-lg invisible">a</p>
      <p class="font-extrabold text-xl text-center invisible">b</p>
    </article>
  </div>
  <main v-if="isSuccess" class="space-y-8">
    <h3 class="font-bold text-xl">{{ user?.name }}</h3>
    <section class="flex gap-4">
      <StatsCard
        v-for="item in data?.resultsCount"
        :key="item.label"
        :label="item.label"
        :value="item.value"
      />
    </section>
    <section class="space-y-2" v-if="data?.mostPlayedCategories.length">
      <h3 class="text-xl">most played categories</h3>
      <section class="flex gap-4">
        <StatsCard
          v-for="item in data.mostPlayedCategories"
          :key="item.categoryName"
          :label="item.categoryName"
          :value="item.gamesPlayed"
        />
      </section>
    </section>
    <section class="space-y-2" v-if="data?.categoryWithMostWins">
      <h3 class="text-xl">category with most wins</h3>
      <section class="flex gap-4">
        <StatsCard
          :label="data.categoryWithMostWins.categoryName"
          :value="data.categoryWithMostWins.gamesWon"
        />
      </section>
    </section>
  </main>
</template>
