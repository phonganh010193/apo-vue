<template>
  <div class="container login-container m-0 p-0" v-if="!isLoading">
    <div class="login-heaser">
      <RouterLink to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left-square-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"
          />
        </svg>
      </RouterLink>
      <p>APO Đăng nhập</p>
    </div>
    <div class="form-login">
      <img class="img-login" :src="imageLogin" alt="" />
      <form 
        class="form-login-input"
        @submit="(event) => {
          event.preventDefault();
          checkForm();
          Login({
            email: email,
            password: password
          });
        }"
      >
        <div class="form-input-content d-flex flex-row">
          <label for="email">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
              />
            </svg>
          </label>
          <input
            class="input-children"
            type="text"
            id="email"
            placeholder="abc@gmail.com"
            v-model="email"
          />
          
        </div>
        <div class="validate-info">
          <p v-if="errorEmail.required && !email" style="color: red; font-size: 13px;">Chưa nhập Email!</p>
          <p v-if="email && !validEmail(email)" style="color: red; font-size: 13px;">Đây không phải email!</p>
          <p style="height: 20px;"></p>
        </div>
        <div class="form-input-content d-flex flex-row">
          <label for="password">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-lock"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
              />
            </svg>
          </label>
          <input
            class="input-children"
            type="password"
            id="password"
            placeholder="Nhập mật khẩu"
            v-model="password"
          />
          <span>
            <svg v-if="!showHidePW"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16" @click="showHidePassword()">
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16" @click="showHidePassword()">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>
          </span>
        </div>
        <div class="validate-info">
          <p v-if="errorEmail.required && !password" style="color: red; font-size: 13px;">Chưa nhập mật khẩu!</p>
          <p v-if="password && !validPassWord(password)" style="color: red; font-size: 13px;">Mật khẩu tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt</p>
          <p v-else></p>
          <p style="height: 20px;"></p>
        </div>
        <div>
          <input id="checkbox" type="checkbox" />
          <label for="checkbox">Remember</label>
          <RouterLink class="forgot-password" to="/forgotpassword"
            >Quên mật khẩu</RouterLink
          >
        </div>
        <div class="btn-login-item">
          <button class="btn-login" type="submit">Đăng nhập</button>
          <span
            >hoặc
            <RouterLink class="forgot-password" to="/signup">Đăng ký!</RouterLink></span
          >
        </div>
      </form>
    </div>
  </div>
  <div v-else class="loading-signup">
    <img :src="'https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831'" alt="" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      imageLogin:"https://theperfume.vn/wp-content/uploads/2021/05/dior-sauvage-edp-1.jpg",
      email: '',
      password: '',
      errorEmail: {
        required: false,
      },
      showHidePW: false
    };
  },
  created() {
    if(this.user) {
      console.log('user', this.user)
      // router.push('/')
    }
  },
  computed: {
    ...mapGetters(['user', 'isLoading'])
  },
  methods: {
    ...mapActions(['Login']),
    checkForm() {
      // e.preventDefault();
      if(!this.email || !this.password) {
        this.errorEmail.required = true;
      } 
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPassWord: function (password) {
      var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return re.test(password);
    },

    showHidePassword() {
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
        this.showHidePW= !this.showHidePW
      } else {
        x.type = "password";
        this.showHidePW= !this.showHidePW
      }
    }
  }
};
</script>
<style>
/* #email{
  width: 100% !important;
} */
.btn-login-item {
  margin-top: 20px;
}
.validate-info p {
  margin: 0;
}
.login-title {
  font-size: 25px;
  color: green;
  text-align: center;
  margin-bottom: 30px;
}
.btn-login {
  width: 110px;
  height: 40px;
  background-color: #1677ff;
  border-radius: 5px;
  border: none;
  color: white;
  margin-right: 5px;
}
.forgot-password {
  margin-left: 10px;
  text-decoration: none;
  color: blue;
  font-size: 14px;
}
#checkbox {
  margin-right: 10px;
}

.login-container {
  width: 1280px;
}

.input-children {
  width: 70%;
  height: 18px;
  background-color: rgb(255, 255, 255);
  border: none;
  outline: none;
}

.form-input-content {
  border: 1px solid rgb(221, 220, 220);
  width: 350px;
  height: 35px;
  border-radius: 5px;
  /* justify-content: space-around; */
  align-items: center;
}

.form-input-content > label {
  width: 30px;
  text-align: center;
}

.form-input-content > input {
  background-color: #d3e0e7;
  height: 25px;
}

.form-input-content:hover {
  border: 1px solid rgb(4, 182, 90);
}

.form-login {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  width: 58%;
  /* justify-content: space-around; */
  margin: 0 auto;
}

.login-heaser {
  height: 100px;
  font-size: 30px;
  font-weight: 600;
  background-image: url("https://image.shutterstock.com/image-photo/sky-blue-background-cloud-clear-260nw-1386181790.jpg");
  background-repeat: repeat-x;
  background-size: cover;
  color: white;
  margin-bottom: 87px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.login-heaser > p {
  padding: 0;
}
.img-login {
  width: 350px;
  height: 100%;
  margin-right: 50px;
}

/* .form-login-input div {
  margin-bottom: 0px !important;
} */
</style>
