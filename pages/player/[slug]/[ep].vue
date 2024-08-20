<template>
  <h1 class="text-2xl font-bold text-center mt-4">
    {{ slug }} - {{ ep }}
  </h1>
  <UContainer>
    <video ref="video" controls class="w-full mb-10"></video>
  </UContainer>
</template>

<script>
import Hls from 'hls.js';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const slug = route.params.slug;
    const ep = route.params.ep;

    return { slug, ep };
  },
  mounted() {
    const video = this.$refs.video;
    const videoSrc = `http://localhost:2000/episode/${this.slug}/${this.ep}`;

    try {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
      } else {
        throw new Error('HLS não é suportado e o tipo MIME não é compatível.');
      }
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
