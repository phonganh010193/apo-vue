<template>
    <div class="register-container container-fluid m-0 p-0">
        <div class="container header-container d-flex flex-row align-items-center justify-content-between">
        <div class="header-register d-flex flex-row align-items-center">
            <p><RouterLink to="/signin">Đăng nhập</RouterLink></p>
            <p>Đăng Ký</p>
        </div>
        <div class="user-header d-flex flex-row align-items-center">
            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" alt="" />
            <p>Phong</p>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .register-container {
        width: 100%;
        border-bottom: 1px solid gray;
    }
    .header-register{
        height: 50px;
    } 
    .header-register p {
        border-left: 1px solid gray;
        margin: 0;
        padding: 0;
        height: 50px;
        line-height: 50px;
        width: 120px;
        text-align: center;
    }

    .header-register p:hover {
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

    .user-header:hover {
        cursor: pointer;
    }

    .user-header p {
        margin: 0;
        padding: 0;
        margin-left: 10px;
    }
</style>