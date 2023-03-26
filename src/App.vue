<template>
  <TopBar v-if="isShowTopbar" />
  <div class="main-container container d-flex flex-row p-0">
    <SideBar v-if="isShowSidebar"/>
    <div :class="isShowSidebar && isShowTopbar ?'main-info' : 'main-info-content'">
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
      if (url.slice(21) === '/' || url.includes("/product/")) {
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
  created() {
    const url = window.location.href;
    if (url.slice(21) === '/' || url.includes("/product/")) {
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
  

  
  
  
}
</script>
<style>
  .main-info {
    width: 75% !important;
  }
  
  .main-container {
    width: 1280px !important;
    margin-bottom: 50px;
    min-height: 600PX;
  }

  .main-info-content{
    width: 100%;
  }

  
</style>