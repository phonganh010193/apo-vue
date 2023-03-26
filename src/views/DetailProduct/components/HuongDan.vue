<!-- eslint-disable vue/no-unused-components -->
<template >
  <div className="guide-container">
    <p>Bước 1:</p>
    <img :src="'https://phong-t3h.web.app/static/media/step1.5cf51e6ab2369dde2056.jpg'" alt="" />
    <p>Bước 2:</p>
    <img :src="'https://phong-t3h.web.app/static/media/step2.cd4ee314ae433b1b23f1.jpg'" alt="" />
    <p>Bước 3:</p>
    <img :src="'https://phong-t3h.web.app/static/media/step3.ac4a41e4b8a577eb5313.jpg'" alt="" />
  </div>
</template>
<script>
export default {
    data: function() {
    return {
    };
  },
    
}
</script>
<style >
    .guide-container {
      width: 1280px;
      text-align: center;
    }

    .guide-container img{
      width: 95%;
      margin: 0 auto;
    }
</style>