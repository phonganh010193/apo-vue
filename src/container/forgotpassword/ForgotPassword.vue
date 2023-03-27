<template>
  <div class="container login-container m-0 p-0">
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
          forgotPassword(email)
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
        <div>
          <button class="btn-login" type="submit">Gửi Email</button>
          <span
            >hoặc
            <RouterLink class="forgot-password" to="/signin">Đăng nhập ngay!</RouterLink>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      imageLogin:"https://theperfume.vn/wp-content/uploads/2021/05/dior-sauvage-edp-1.jpg",
      email: '',
      errorEmail: {
        required: false,
      },
    };
  },
  methods: {
    ...mapActions(['forgotPassword']),
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
  }
};
</script>
<style>
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
  width: 85%;
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

.form-input-content:hover {
  border: 1px solid rgb(4, 101, 51);
}

.form-login {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  width: 58%;
  justify-content: space-around;
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
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.login-heaser a {
  color: aliceblue;
}
.img-login {
  width: 350px;
  margin-right: 50px;
}

/* .form-login-input div {
  margin-bottom: 22px;
} */
</style>
