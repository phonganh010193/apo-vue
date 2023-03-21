<template >
    <carousel 
          class="list-item-image" 
          :items-to-show="1" 
          :autoplay="2000" 
          :wrap-around="true"
          :pause-autoplay-on-hover="true"
        >
        <slide class="list-image-show" v-for="item in images" :key="item.id">
        <img class="image-home" :src="item.image" alt="" />
        </slide>
        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>
</template>
<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      images: [
        {id: 1, image: "https://img.fragrancex.com/images/aboutus/aboutus-realfragrances.jpg"},
        {id: 2, image: "https://assets.burberry.com/is/image/Burberryltd/3733ce231c48bfec5ce95439ed6508c516cf81fd.jpg?$BBY_V2_SL_4X3$&wid=760&hei=570"},
        {id: 3, image: "https://th.bing.com/th/id/R.11dfb5228f92cacb30c2d13ca9347a30?rik=N1BH2SLe2Fckfg&riu=http%3a%2f%2fwww.mywishstyle.com%2fwp-content%2fuploads%2f2015%2f11%2fBurberry-Festive-Beauty-Collection-2015-1080x764.jpg&ehk=4mhkYO19%2bAzVvvrOPIfAlVQdnCn2TEMOUQMdpUriRis%3d&risl=&pid=ImgRaw&r=0"},
      ]
    }
  }
}
</script>
<style >
    .image-home {
      width: 100%;
      height: 800px;
    }

    .list-item-image {
      width: 967px;
    }
    .list-image-show {
      width: 697px;
    }
</style>