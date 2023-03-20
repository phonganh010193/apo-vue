<template >
    <div class="container-fluid nav-parent-container m-0 p-0 ">
        <div class="nav-container container d-flex flex-row justify-content-between align-items-center">
            <div class="nav-left">
                <ul class="d-flex flex-row align-items-center">
                    <li><RouterLink to="/">Trang chủ</RouterLink></li>
                    <li>Giới thiệu</li>
                    <li>Sản phẩm</li>
                    <li>Liên hệ</li>
                    <li>Dịch vụ mới</li>
                </ul>
            </div>
            <div class="input-group justify-content-end">
                <div class="search-container">
                    <form>
                        <input type="text" placeholder="Search.." name="search">
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .nav-parent-container {
        background-color: black;
    }

    .nav-container {
        width: 100%;
        height: 50px;
        background-color: black;
    }

    .nav-left {
        width: 70%;
    }

    .input-group {
        width: 30%;
    }

    .nav-left ul {
        height: 50px;
        margin: 0;
        padding: 0;
        text-align: center;
    }

    .nav-left ul li {
       width: 150px;
       height: 50px;
       line-height: 50px;
       list-style: none;
       color: white;
       font-size: 17px;
    }

    .nav-left ul li a {
        text-decoration: none;
        color: white;
    }

    .nav-left ul li:hover{
        background-color: #2d8356;
        color: White;
    }

    /* .input-group {
        margin-right: 50px !important;
    } */

    .search-container form button {
        background-color: #2d8356;
        width: 100px;
        border: none;
        height: 30px;
    }
</style>