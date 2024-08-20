<template>
    <UContainer>
        <div class="p-4">
            <h1 class="text-center text-2xl font-bold mb-2">Latest episodes</h1>
            <div v-if="episodes.length === 0"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="index in 12" :key="index"
                    class="relative rounded-lg shadow-lg overflow-hidden transition-transform transform bg-metal-900 animate-pulse">
                    <USkeleton class="h-32" />
                </div>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="episode in episodes" :key="episode.id_episodio"
                    class="relative rounded-lg shadow-md overflow-hidden card" @click="goToPlayer(episode)">
                    <img :src="episode.imageUrl" class="w-full h-32 object-cover" />

                    <div v-if="episode.episode.anime.dub !== undefined" :class="['absolute bottom-2 left-10 text-white text-xs px-1 py-0 rounded z-20',
                        episode.episode.anime.dub === 0 ? 'bg-red-500' : 'bg-blue-500']">
                        {{ episode.episode.anime.dub === 0 ? 'LEG' : 'DUB' }}
                    </div>

                    <div class="absolute bottom-2 left-2 text-black text-xs px-1 py-0 rounded bg-white z-20">HD</div>
                    <div class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity duration-300 p-4 
                         md:opacity-0 md:hover:opacity-100 z-10">
                        <p class="text-white text-center cursor-pointer" @click.stop="goToPlayer(episode)">
                            {{ episode.episode.anime.titulo }} - {{ episode.episode.n_episodio }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </UContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const episodes = ref([]);
const router = useRouter();

const fetchEpisodes = async () => {
    try {
        //const response = await fetch('http://localhost:2000/releases');
        const response = await fetch('https://simonapi.squareweb.app/releases');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        episodes.value = data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
};

const goToPlayer = (episode) => {
    const slug = episode.episode.anime.slug_serie;
    const ep = episode.episode.n_episodio;
    router.push(`/player/${slug}/${ep}`);
};

onMounted(() => {
    fetchEpisodes();
});
</script>
