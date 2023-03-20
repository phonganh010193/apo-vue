<template>
    <div class="logo-container container d-flex flex-row">
        <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" className="icon-logo" alt="" />
        <div className="header-logo-info d-flex flex-row justify-content-around align-items-center">
            <div className="transport d-flex flex-row align-items-center">
                <img src="//bizweb.dktcdn.net/thumb/thumb/100/110/910/themes/139252/assets/feature1-top.png?1670065088107" alt="" />
                <p>Vận chuyển miễn phí toàn quốc</p>
            </div>
            <div className="hotline  d-flex flex-row align-items-center">
                <img src="//bizweb.dktcdn.net/thumb/thumb/100/110/910/themes/139252/assets/feature2-top.png?1670065088107" alt="" />
                <p>Hotline: 0379010193</p>
            </div>
            <div className="shop-cart  d-flex flex-row align-items-center">
                <div className="icon-cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                </div>
                <div className="info-cart">
                    <p><RouterLink to="/cart">Giỏ hàng</RouterLink></p>
                    <p><span>2</span> sản phẩm</p>
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
    .header-logo-info {
        width: 100%;
        height: 150px;
    }

    .icon-logo {
        height: 150px;
        width: 150px;
    }

    .transport p {
        margin: 0;
        padding-left: 10px;
    }

    .hotline p {
        margin: 0;
        padding-left: 10px;
    }

    .icon-cart {
        width: 50px ;
        height: 50px;
        border-radius: 25px;
        border: 1px solid #2d8356;
        text-align: center;
        line-height: 40px;
        background-color: #2d8356;
    }

    .info-cart p {
        margin: 0;
        padding-left: 10px;
    }

    .info-cart:hover {
        cursor: pointer;
    }

    
</style>