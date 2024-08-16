<template>
    <UContainer>
        <div v-if="anime" class="flex flex-col md:flex-row">
            <UContainer class="mt-8" >
                <img :src="anime.imageUrl"class="w-64 h-full md:w-[800px] md:h-auto " />
            </UContainer>

            <UContainer class=" mt-10 mb-2">
                <h1 class="text-righ text-2xl font-bold">{{ anime.titulo }}</h1>
                <p><strong>Ano:</strong> {{ anime.ano }}</p>
                <p><strong>Diretor:</strong> {{ anime.diretor }}</p>
                <p><strong>Nota:</strong> {{ anime.score }}</p>
                <p><strong>Sinopse:</strong> {{ anime.sinopse }}</p>
                <div class="flex flex-wrap gap-2"><strong>Gêneros :</strong>
                    <UBadge v-for="(g, i) in anime.generos.split(',')" :key="i" color="gray" variant="solid" :ui="{ rounded: 'rounded-md' }">{{ g }}</UBadge>
                </div>
            </UContainer>
        </div>
        <div v-else>
            <p>Carregando...</p>
        </div>
    </UContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const path = ref(route.query.q || 'No path provided');
const anime = ref(null);

const fetchDetail = async () => {
    try {
        const response = await fetch(`http://localhost:2000/anime?q=${encodeURIComponent(path.value)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        anime.value = await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
};

onMounted(() => {
    fetchDetail();
});
</script>
