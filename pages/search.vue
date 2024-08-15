<template>
    <UContainer>
        <div class="p-4">
            <h1 class="text-center text-2xl font-bold mb-4">Search Anime</h1>
            <div class="flex items-center space-x-2 mb-4 justify-center">
                <UInput v-model="searchQuery" size="sm" color="white" :trailing="false" placeholder="Berserk" @keyup.enter="search" />
                <button @click="search" class="bg-blue-500 text-white px-2 py-1 rounded shadow-md hover:bg-blue-600 transition-colors duration-300">Search</button>
            </div>

            <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="index in 4" :key="index" class="relative rounded-lg shadow-lg overflow-hidden transition-transform transform bg-metal-900 animate-pulse">
                    <USkeleton class="h-56"/>
                </div>
            </div>

            <div v-else-if="animes.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="anime in animes" :key="anime.id" class="relative rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                    <img :src="anime.imageUrl" alt="Anime Image" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity duration-300 opacity-100 md:opacity-0 hover:opacity-100 p-4">
                        <p class="text-white text-center font-semibold">{{ anime.title }} - {{ anime.year }}</p>
                    </div>
                </div>
            </div>
        </div>
    </UContainer>
</template>

<script setup>
import { ref } from 'vue';

const animes = ref([]);
const searchQuery = ref('');
const isLoading = ref(false);

const search = async () => {
    if (!searchQuery.value.trim()) return;

    isLoading.value = true;
    animes.value = []; 

    try {
        const response = await fetch(`http://localhost:2000/search?q=${searchQuery.value}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        animes.value = data;
    } catch (error) {
        console.error('Error fetching anime data:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>
