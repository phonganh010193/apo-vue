<template>
    <div class="container home-container d-flex flex-row m-0 p-0">
      <div class="home-content">
        <HomeSlider />
        <HomeProduct :product="productMen" />
      </div>
    </div>
</template>
<script>
import HomeSlider from "../Home/components/homeSlider/HomeSlider.vue";
import HomeProduct from "./components/homeProduct/HomeProduct.vue";
import { get, ref} from 'firebase/database';
import { database } from "../../../src/firebase";
export default {
  name: 'App',
  components: {
    HomeProduct,
    HomeSlider
  },
  data() {
    return {
      productMen: null,
      productWomen: null,
      
    }
  },

  async mounted() {
    await this.fetchProductMenById()
    await this.fetchProductWomenById()
  },

  methods: {
    async fetchProductMenById() {
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
          this.productMen=list;
      }
      }).catch((error) => {
          console.error(error);
      });
    },
    async fetchProductWomenById() {
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
          this.productWomen=list;
      }
      }).catch((error) => {
          console.error(error);
      });
    },
  }
}
</script>
<style >
    .home-container {
      width: 100%;
    }
    .home-content {
      width: 100%;
      margin-left: 30px;
      overflow: hidden;

    }

    /* .home-content p {
      border-bottom: 1px solid gray;
      font-size: 20px;
    } */

   
</style>