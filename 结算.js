function initLocalStorage() {
    var productsJson = localStorage.getItem('products');
    var productData=[];
    if (
        productsJson !== '' &&
        productsJson !== null &&
        productsJson !== undefined
    ) {
        //将JSON数据转为数组
        productData = JSON.parse(productsJson);
    }
    var cartBody = $('#cartTable tbody');
    $.each(productData, function(i, v) {
        // appendProductToCart(v.image, v.name, v.price);
        var productEle =
            '<tr>' +
            '<td><input type="checkbox" name="productCheck"></td>' +
            '<td class="cart-product-name">' +
            '<img src="' +
            v.image +
            '" alt="No Image">' +
            '<span>' +
            v.name +
            '</span>' +
            '</td>' +
            '<td class="cart-product-price">' +
            v.price +
            '</td>' +
            '<td class="cart-product-count">' +
            '<span class="reduce">-</span>' +
            '<input class="count-input" type="text" value="1">' +
            '<span class="add">+</span>' +
            '</td>' +
            '<td class="cart-product-subtotal">'+ 
            v.price +
            '</td>' +
            '<td class="cart-product-operation">' +
            '<span class="delete">删除</span>' +
            '</td>' +
            '</tr>';
        cartBody.append(productEle);
    });
        //增加商品数量
    cartBody.on('click', '.add', function() {
        var input = $(this).prev();
        var inputValue = parseInt(input.val());
        input.val(inputValue + 1);
        countProductSubtotal(
            $(this)
            .parent()
            .parent()
        );
        countProductTotalPrice();
    });
      //减少商品数量
    cartBody.on('click', '.reduce', function() {
        var input = $(this).next();
        var inputValue = parseInt(input.val());
        inputValue = inputValue > 1 ? inputValue - 1 : inputValue;
        input.val(inputValue);
        countProductSubtotal(
            $(this)
            .parent()
            .parent()
        );
        countProductTotalPrice();
    });

    cartBody.on('click','input:checkbox',function(){
        countProductTotalPrice();
    });
     //删除单个
    cartBody.on('click','.delete',function(){
        var productItem=$(this).parent().parent();
        var productName=productItem.find('.cart-product-name span').text();
        productItem.remove();
        countProductTotalPrice();
        $.each(productData, function(i) {
           //  console.log(this.name===v.name);
            if(productName==this.name){
                productData.splice(i,1);
            }
        })
        localStorage.setItem('products', JSON.stringify(productData));
    });
    //删除所有
    $('#deleteAllProduct').click(function(){
        var result=confirm('确定清空购物车？');
        if(result==true){
            $('#cartTable tbody').empty();
            localStorage.removeItem('products');
            countProductTotalPrice();
        }
    });
    // 全选
    $('#selectAllProduct').click(function(){
        var checkAll=$(this).prop('checked');
        $('#cartTable tbody :checkbox').prop('checked',checkAll);
         countProductTotalPrice();
    });

}

function countProductTotalPrice(){
    var litlecount=0;
    var selectproduct=0;
    $('#cartTable tbody input:checkbox[name="productCheck"]:checked').each(function(i,v){
        var productItem=$(this).parent().parent();
        var productcount=productItem.find('.count-input').val();
        litlecount+=parseInt(productcount);
        var productAmount=productItem.find('.cart-product-subtotal').text();
        selectproduct+=parseFloat(productAmount);
    });
    $('#selectedTotalCount').text(litlecount);
    $('#selectedTotalAmount').text(selectproduct.toFixed(2));
}

//计算商品数量的总价
function countProductSubtotal(product) {
    var productItem = product;
    var cartproduct = parseFloat(productItem.find('.cart-product-price').text());
    var productcount = parseInt(productItem.find('.count-input').val());
    productItem.find('.cart-product-subtotal').text((cartproduct * productcount).toFixed(2));
}

$(function(){
    initLocalStorage();
})