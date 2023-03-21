<template>
  <TopBar v-if="isShowTopbar" />
  <div class="main-container container d-flex flex-row">
    <SideBar v-if="isShowSidebar"/>
    <div class="container main-info">
      <RouterView />
    </div>
  </div>
  <Footer />
</template>
<script>
import TopBar from './components/topbar/TopBar.vue';
import SideBar from './components/sidebar/SideBar.vue';
import Footer from './components/footer/FooTer.vue';
export default {
  components: {
      TopBar,
      SideBar,
      Footer
  },
  data() {
    return {
      isShowSidebar: false,
      isShowTopbar: false,
    }
  },
  watch: {
    '$route' () {
      const url = window.location.href;
      if (url.slice(21) === '/' || url.includes("/perfume/")) {
        this.isShowTopbar = true;
        this.isShowSidebar = true;
      } else if (url.includes("/signin") || url.includes("/signup") || url.includes("/forgotpassword")) {
        this.isShowSidebar = false;
        this.isShowTopbar = false;
      } else {
        this.isShowTopbar = true;
        this.isShowSidebar = false;
      }
    }
  },
  

  
  
  
}
</script>
<style>
  .main-info {
    width: 70%;
  }
  
  .main-container {
    margin-top: 30px;
    margin-bottom: 50px;
  }

  
</style>