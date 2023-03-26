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
      <form class="form-login-input">
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
            placeholder="Họ và tên"
            v-model="name"
          />
        </div>
        <div class="form-input-content d-flex flex-row">
          <label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-geo-alt"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
              />
              <path
                d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </svg>
          </label>
          <input
            class="input-children"
            type="text"
            placeholder="Địa chỉ"
            v-model="address"
          />
        </div>
        <div class="form-input-content d-flex flex-row">
          <label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-telephone"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
              />
            </svg>
          </label>
          <input
            class="input-children"
            type="text"
            placeholder="Số điện thoại"
            v-model="phone"
          />
        </div>
        <div class="form-input-content d-flex flex-row">
          <label>
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
            type="email"
            placeholder="phonganh@gmail.com"
            v-model="email"
          />
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
            placeholder="Password"
            v-model="password"
          />
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
            placeholder="ConfimPassword"
            v-model="confirmPassword"
          />
        </div>
        <div>
          <button
            class="btn-login"
            @click="
              (event) => {
                event.preventDefault();
                createUser({
                  name: name,
                  address: address,
                  phone: phone,
                  email: email,
                  password: password,
                  roles: 'C',
                });
              }
            "
          >
            Đăng ký
          </button>
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      imageLogin:
        "https://theperfume.vn/wp-content/uploads/2021/05/dior-sauvage-edp-1.jpg",
      name: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  created() {
    console.log(this.user);
  },
  computed: {
    ...mapGetters(["user", "isLoading"]),
  },
  methods: {
    ...mapActions(["createUser"]),
  },
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
  height: 30px;
  border-radius: 5px;
  justify-content: space-around;
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
.img-login {
  width: 350px;
  margin-right: 50px;
  height: 380px;
}

.form-login-input div {
  margin-bottom: 22px;
}
</style>
