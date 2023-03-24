<template >
    <div class="detail-product-container container m-o p-0">
        <div class="detail-header">
            <p>Trang chủ/ <span style="color: #2d8356">{{ detailList?.productName }}</span></p>
        </div>
        <div class="detail-info d-flex flex-row">
            <div class="content-detail-image">
                <img :src="imageShow" alt="" />
                <div className="icon-click-image d-flex flex-row">
                    <div className="image-show-detail" v-for="(item, index) in detailList.imageShow" :key="index" >
                        <img v-if="item.image" :src="item.image" @click="CHANGE_IMAGE_SHOW(item.image)" alt="" />
                    </div>
                </div>
            </div>
            <div class="content-detail-info">
                <h2>{{detailList?.productName?.toLowerCase()}}</h2>
                <div className="capacity">
                    <h6>Dung Tích</h6>
                    <div className="capacity-info">
                        <p><img style= "color: red; width: 15px" src="https://www.shareicon.net/data/256x256/2016/06/10/585973_checkbox_512x512.png" /> {{detailList?.capacity}}</p>
                        <p style="font-size: 13px; font-weight: 600">{{Number(detailList?.price?.split(" ").join('')).toLocaleString()}} VND{{"  "}}<span className="sale-disable">{{Number(detailList?.sale_price?.split(" ").join('')).toLocaleString()}} VND</span></p>
                    </div>
                    <p>Số lượng còn lại: 20</p>
                    <p>Tình trạng: <img className="icon-status" src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" /><span>Còn hàng</span></p>
                    <p>Tình trạng: <img className="icon-status" src="https://cdn3d.iconscout.com/3d/premium/thumb/checkmark-2997167-2516205.png" /><span>Sắp hết hàng</span></p>
                    <p>Tình trạng: <img className="icon-status" src="https://www.citypng.com/public/uploads/preview/png-red-round-close-x-icon-31631915146jpppmdzihs.png" /><span>Hết hàng</span></p>
                                 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    data() {
        return {
            productId: ''
        }
    },
    computed: {
        ...mapGetters(['detailList', 'isLoading', 'imageShow'])
    },

    watch: {
        productId:function() {
            this.getDetailProductById(this.productId);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        },
    },
    created() {
        this.productId = this.$route.params.id;
        this.getDetailProductById(this.productId);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
    methods: {
        ...mapActions(['getDetailProductById']),
        ...mapMutations(['CHANGE_IMAGE_SHOW', 'DELETE_DETAIL' ])
    },
    unmounted() {
        this.DELETE_DETAIL()
    },
    
}
</script>
<style >
    .icon-status {
        width: 30px;
    }
    .capacity {
        margin-top: 30px;
    }

    .capacity-info {
        width: 30%;
        text-align: center;
        background-color: red;
        color: white;
        height: 50px;
        border-radius: 5px;
    }

    .capacity-info > p {
        margin: 0;
    } 
    .detail-product-container {
        width: 100%;
    }

    .content-detail-image {
        width: 40%;
        margin-right: 80px;
    }

    .content-detail-info {
        width: 60%;
    }

    .detail-header > p {
        margin: 0;
    }

    .detail-header {
        border-bottom: 1px solid gray;
    }

    .detail-info {
        width: 90%;
        justify-content: space-around;
        margin: 50px auto 50px;
    }
    .content-detail-image > img {
        width: 100%;
        height: 560px;
    }

    .image-show-detail > img {
        width: 72px;
        height: 90px;
        
    }

    .icon-click-image {
        width: 55%;
        justify-content: space-between;
        margin-top: 20px;
    }

    .content-detail-info > h2{
        text-transform: capitalize; 
        color: #2d8356;
        border-bottom: 1px solid #2d8356;
        width: 100%;
    }
</style>