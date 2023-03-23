<template>
    <div class="home-container d-flex flex-row">
      <div class="home-content">
        <HomeSlider />
        <HomeProduct :list="listMen" :loading="isLoadingMen" :gender="male" />
        <HomeImage />
        <HomeProduct :list="listWomen" :loading="isLoadingWomen" :gender="female" />
      </div>
    </div>
</template>
<script>
import HomeSlider from "../Home/components/homeSlider/HomeSlider.vue";
import HomeProduct from "./components/homeProduct/HomeProduct.vue";
import HomeImage from "./components/homeImage/HomeImage.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  name: 'App',
  components: {
    HomeProduct,
    HomeSlider,
    HomeImage
  },
  data() {
    return {
      // isLoadingMen: false,
      // listMen: [
      //   {id:1, productShow: null},
      //   {id:2, productShow: null},
      //   {id:3, productShow: null},
      // ],
      // listWomen: [
      //   {id:1, productShow: null},
      //   {id:2, productShow: null},
      //   {id:3, productShow: null},
      // ],
      // isLoadingWomen: false,
      
    }
  },
  computed: mapGetters([ 'male', 'female', 'listMen', 'listWomen', 'isLoadingMen', 'isLoadingWomen' ]),

  async mounted() {
    await this.getDataProductMale()
    await this.getDataProductFemale()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  },

  methods: {
    ...mapActions(['getDataProductMale', 'getDataProductFemale'])
    
    
  }
}
</script>
<style >
    .home-container {
      width: 100% !important;
    }
    .home-content {
      width: 100% !important;
      margin-left: 30px;
      overflow: hidden;

    }

    /* .home-content p {
      border-bottom: 1px solid gray;
      font-size: 20px;
    } */

   
</style>