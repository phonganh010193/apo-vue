<template>
    <div class="cart-container container d-flex flex-row">
        <div class="perfume-info">
          <div class="cart-title">
            <p>Trang chủ/<span style="color: #2d8356">Giỏ hàng</span></p>
          </div>
          <div class="cart-table">
            <table class="table table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Đơn giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Thành tiền</th>
                  <th scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  </template>
  <script>
  export default {
    components: {
    },
    
    
    
    
    
    
  }
  </script>
  <style>
    .cart-container {
      width: 100%;
      margin-top: 30px;
      padding: 0;
    }
    .cart-title {
      border-bottom: 1px solid gray;
      width: 100%;
    }

    .cart-title > p {
      margin: 0;
    }
    
    .perfume-info {
      width: 100%;
    }

    .cart-table {
      margin-top: 30px;
    }
  </style>