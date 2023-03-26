<template>
  <div class="detail-product-container container m-o p-0">
    <div class="detail-header">
      <p>
        Trang chủ/ <span style="color: #2d8356">{{ detailList?.productName }}</span>
      </p>
    </div>
    <div class="detail-info d-flex flex-row">
      <div class="content-detail-image">
        <div class="detail-image-children">
          <img :src="imageShowUi" alt="" />
          <div className="icon-click-image d-flex flex-row">
            <div
              className="image-show-detail"
              v-for="(item, index) in detailList?.imageShow"
              :key="index"
            >
              <img
                v-if="item.image"
                :src="item.image"
                @click="CHANGE_IMAGE_SHOW(item.image)"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="content-detail-info">
        <div class="detail-info-children">
          <h2>{{ detailList?.productName?.toLowerCase() }}</h2>
          <div className="capacity">
            <h6>Dung Tích</h6>
            <div className="capacity-info">
              <p>
                <img
                  style="color: red; width: 15px"
                  src="https://www.shareicon.net/data/256x256/2016/06/10/585973_checkbox_512x512.png"
                />
                {{ detailList?.capacity }}
              </p>
              <p style="font-size: 13px; font-weight: 600">
                {{
                  Number(detailList?.price?.split(" ").join("")).toLocaleString()
                }}
                VND{{ "  "
                }}<span className="sale-disable"
                  >{{
                    Number(detailList?.sale_price?.split(" ").join("")).toLocaleString()
                  }}
                  VND</span
                >
              </p>
            </div>
            <p class="number-amount">Số lượng còn lại: {{ detailList?.quantity }}</p>
            <p v-if="detailList?.quantity >= 10">
              Tình trạng:
              <img
                className="icon-status"
                src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png"
              /><span>Còn hàng</span>
            </p>
            <p v-else-if="detailList?.quantity >= 1 && detailList?.quantity <= 5">
              Tình trạng:
              <img
                className="icon-status"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/checkmark-2997167-2516205.png"
              /><span>Sắp hết hàng</span>
            </p>
            <p v-else>
              Tình trạng:
              <img
                className="icon-status"
                src="https://www.citypng.com/public/uploads/preview/png-red-round-close-x-icon-31631915146jpppmdzihs.png"
              /><span>Hết hàng</span>
            </p>
            <div class="detail-add-cart">
              <p>Số lượng:</p>
              <div class="btn-detail-number-order">
                <input type="number" value="number" min="1" max="10" />
                <button>Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-detail-product-container">
      <div class="info-product-in-detail">
        <ul class="d-flex flex-row m-0 p-0">
          <li
            class="nav-item"
            v-for="item in listInfoProductTitle"
            :key="item.id"
            @click="CHANGE_KEY(item.id)"
            :style="item.active ? 'border-bottom: 3px solid green; color: green' : null"
          >
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </div>
      <div class="info-content-detail">
        <p v-show="changeKey === 1">{{ detailList?.description }}</p>
        <p v-show="changeKey === 2"><HuongDan /></p>
        <p v-show="changeKey === 3"><BinhLuan /></p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import HuongDan from "./components/HuongDan.vue";
import BinhLuan from "./components/BinhLuan.vue";
export default {
  components: {
    HuongDan,
    BinhLuan,
  },
  data() {
    return {
      productId: "",
    };
  },
  computed: {
    ...mapGetters([
      "detailList",
      "isLoading",
      "imageShowUi",
      "listInfoProductTitle",
      "changeKey",
    ]),
  },

  watch: {
    productId: function () {
      this.getDetailProductById(this.productId);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
  },
  created() {
    this.productId = this.$route.params.id;
    this.getDetailProductById(this.productId);
    this.CHANGE_KEY(1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  },
  methods: {
    ...mapActions(["getDetailProductById"]),
    ...mapMutations(["CHANGE_IMAGE_SHOW", "DELETE_DETAIL", "CHANGE_KEY"]),
  },
  unmounted() {
    this.DELETE_DETAIL();
  },
};
</script>
<style>
.info-content-detail {
  margin-top: 30px;
  font-size: 14px;
}

.info-product-in-detail {
  border-bottom: 1px solid #e2e0e0;
}

.nav-item {
  width: 157px;
  height: 30px;
  list-style: none;

  text-align: center;
}

.info-product-in-detail ul li p {
  margin: 0;
}

.info-product-in-detail ul {
  gap: 15px;
}

.btn-detail-number-order input {
  width: 100px;
  margin-right: 30px;
}

.number-amount {
  margin-top: 20px !important;
  font-size: 14px;
}

.btn-detail-number-order button {
  width: 200px;
  height: 50px;
  background-color: #2d8356;
  color: aliceblue;
  border: none;
}

.btn-detail-number-order button:hover {
  background-color: #47b77d;
}

.detail-info-children h2 {
  text-transform: capitalize;
  border-bottom: 1px solid gray;
}
.icon-status {
  width: 30px;
}
.capacity {
  margin-top: 30px;
}

.capacity > p {
  margin: 0;
}

.capacity-info {
  width: 35%;
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
  margin-top: 30px;
}

.content-detail-image {
  width: 50%;
}

.content-detail-info {
  width: 50%;
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
.detail-image-children > img {
  width: 100%;
  height: 450px;
}

.detail-image-children {
  width: 400px;
  margin: 0 auto;
}

.image-show-detail > img {
  width: 72px;
  height: 90px;
}

.icon-click-image {
  width: 60%;
  justify-content: space-between;
  margin-top: 20px;
}

.content-detail-info > h2 {
  text-transform: capitalize;
  color: #2d8356;
  border-bottom: 1px solid #2d8356;
  width: 100%;
}
</style>
