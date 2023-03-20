<template>
    <div class="container-fluid m-0 p-0">
        <HeaderRegister />
        <HeaderLogo />
        <HeaderNav />
    </div>
</template>
<script>
import HeaderRegister from './components/HeaderRegister.vue';
import HeaderLogo from './components/HeaderLogo.vue';
import HeaderNav from './components/HeaderNav.vue';
export default {
    components: {
        HeaderRegister,
        HeaderLogo,
        HeaderNav
    }
    
}
</script>
<style>
   
</style>