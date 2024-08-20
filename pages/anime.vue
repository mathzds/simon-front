<template>
  <UContainer>
    <div v-if="anime" class="flex flex-col">
      <UContainer class="mt-8 flex flex-col md:flex-row">
        <img :src="anime.imageUrl" class="w-64 h-64 md:w-[200px] md:h-auto" />
        <UContainer class="mt-10 mb-2 md:ml-10">
          <h1 class="text-2xl font-bold">{{ anime.titulo }}</h1>
          <p><strong>Ano:</strong> {{ anime.ano }}</p>
          <p><strong>Diretor:</strong> {{ anime.diretor }}</p>
          <p><strong>Nota:</strong> {{ anime.score }}</p>
          <p><strong>Sinopse:</strong> {{ anime.sinopse }}</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <strong>Gêneros:</strong>
            <UButton v-for="(g, i) in anime.generos.split(',')" :key="i" color="gray" variant="solid"
              :ui="{ rounded: 'rounded-md' }">{{ g }}</UButton>
          </div>
        </UContainer>
      </UContainer>

      <!-- Lista de Episódios -->
      <UContainer class="mt-10 mb-2">
        <div class="flex flex-wrap gap-2">
          <strong>Episódios:</strong>
          <UButton v-for="(ep, i) in anime.episodes.data" :key="i" color="gray" variant="solid"
            :ui="{ rounded: 'rounded-md' }" @click="playEpisode(ep)">{{ 'Episódio ' + ep.n_episodio }}</UButton>
        </div>
      </UContainer>
    </div>

    <div v-else>
      <p>Carregando...</p>
    </div>
  </UContainer>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const path = ref(route.query.q || 'No path provided');
    const anime = ref(null);

    const fetchDetail = async () => {
      try {
        //const response = await fetch(`http://localhost:2000/anime?q=${encodeURIComponent(path.value)}`);
        const response = await fetch(`https://simonapi.squareweb.app/anime?q=${encodeURIComponent(path.value)}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        anime.value = await response.json();
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    const playEpisode = (episode) => {
      const slug = anime.value.slug_serie;
      const ep = episode.n_episodio;

      router.push({
        path: `/player/${slug}/${ep}`,
      });
    };

    onMounted(() => {
      fetchDetail();
    });

    return {
      anime,
      playEpisode
    };
  }
};
</script>
