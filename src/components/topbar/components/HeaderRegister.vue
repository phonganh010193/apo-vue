<template>
  <div class="register-container container-fluid m-0 p-0">
    <div
      class="container header-container d-flex flex-row align-items-center p-0"
      :class="checkUser ? 'justify-content-end' : 'justify-content-between'"
    >
      <div class="header-register d-flex flex-row align-items-center" v-if="!checkUser">
        <p><RouterLink to="/signin">Đăng nhập</RouterLink></p>
        <p><RouterLink to="/signup">Đăng ký</RouterLink></p>
      </div>
      <div class="user-header d-flex flex-row align-items-center" v-else @click="ISSHOW_POUP()">
        <img
          :src="userCurrent?.avatar? userCurrent?.avatar : 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80'"
          alt=""
        />
        <p>{{userCurrent?.name}}</p>
      </div>
      <div class="popup-user" v-show="isShowPopup">
        <ul>
          <li>My account</li>
          <li>Vai trò</li>
          <li>Thêm sản phẩm mới</li>
          <li>Liên hệ</li>
          <li>Đơn hàng</li>
          <li>Kho hàng</li>
          <li @click="fetchSignOut()">Logout</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import {auth} from '../../../firebase';
import { onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {
      checkUser: false
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      this.checkUser = !this.checkUser
      this.getUser(user);
    } else {
      localStorage.removeItem('token')
    }
    });
  },
  computed: {
    ...mapGetters(['userCurrent', 'isShowPopup'])
  },
  methods: {
    ...mapActions(['getUser', 'fetchSignOut']),
    ...mapMutations(['ISSHOW_POUP', 'ISHIDE_POPUP'])
  }
};
</script>
<style>
.popup-user ul li {
  list-style: none;
  font-size: 14px;
}

.popup-user ul {
  margin: 0;
  padding: 0;
}

.popup-user ul li:hover {
  list-style: none;
  cursor: pointer;
  background-color: green;
  color: white;
}
.popup-user {
  width: 150px;
  /* min-height: 200px; */
  top: 60px;
  background-color: white;
  position: absolute;
  border-radius: 10px;
  z-index: 1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 10px;
}
.register-container {
  width: 100%;
  border-bottom: 1px solid gray;
  height: 60px;
  align-items: center;
}

.header-container {
  width: 1280px !important;
  height: 100%;
}
.header-register {
  height: 60px;
}
.header-register p {
  border-left: 1px solid gray;
  margin: 0;
  padding: 0;
  height: 60px;
  line-height: 60px;
  width: 120px;
  text-align: center;
}

.header-register p a {
  color: black;
  text-decoration: none;
}

.header-register p a:hover {
  cursor: pointer;
  color: green;
  font-size: 17px;
}

.header-register p:last-child {
  border-right: 1px solid gray;
}

.user-header img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.user-header {
  position: relative;
}

.user-header:hover {
  cursor: pointer;
}

.user-header p {
  margin: 0;
  padding: 0;
  margin-left: 10px;
}
</style>
