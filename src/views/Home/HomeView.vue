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
import { get, ref} from 'firebase/database';
import { database } from "../../../src/firebase";
export default {
  name: 'App',
  components: {
    HomeProduct,
    HomeSlider,
    HomeImage
  },
  data() {
    return {
      isLoadingMen: false,
      listMen: [
        {id:1, productShow: null},
        {id:2, productShow: null},
        {id:3, productShow: null},
      ],
      listWomen: [
        {id:1, productShow: null},
        {id:2, productShow: null},
        {id:3, productShow: null},
      ],
      isLoadingWomen: false,
      male:"1",
      female:"2"
    }
  },

  async mounted() {
    await this.fetchProductMenById()
    await this.fetchProductWomenById()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  },

  methods: {
    async fetchProductMenById() {
      this.isLoadingMen = true;
      await get(ref(database, "Product"))
      .then((snapshot) => {
      if (snapshot.exists()) {
          const response = snapshot.val();
          const keys = Object.keys(response);
          const list = keys?.map(key => {
              return {
                  ...response[key],
                  key,
              }
          })?.filter(el => el.gender === "1");
          this.isLoadingMen = false;
          this.listMen[0].productShow= list?.slice(0,4);
          this.listMen[1].productShow= list?.slice(4,8);
          this.listMen[2].productShow= list?.slice(8,12);
      }
      }).catch((error) => {
        this.isLoadingMen = false;
        console.error(error);
      });
    },
    async fetchProductWomenById() {
      this.isLoadingWomen = true;
      await get(ref(database, "Product"))
      .then((snapshot) => {
      if (snapshot.exists()) {
          const response = snapshot.val();
          const keys = Object.keys(response);
          const list = keys?.map(key => {
              return {
                  ...response[key],
                  key,
              }
          })?.filter(el => el.gender === "2");
          this.isLoadingWomen = false;
          this.listWomen[0].productShow= list?.slice(0,4);
          this.listWomen[1].productShow= list?.slice(4,8);
          this.listWomen[2].productShow= list?.slice(8,12);
      }
      }).catch((error) => {
        this.isLoadingWomen = false;
        console.error(error);
      });
    },
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