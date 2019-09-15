//切换大布局
$('.header .btns').on('click', '.glyphicon-th-large', function() {
	$(this).removeClass('default-btn');
	$(this).addClass('active-btn');
	var btns=$('.header .btns').find('.glyphicon-th');
	var changer=$('.wrap .changer');
	btns.removeClass('active-btn');
    btns.addClass('default-btn');
	changer.removeClass('default-content');
	changer.addClass('large-content');
	//延迟时间展示信息
	setTimeout(function() {
		$('.large-content').find('.thing-show-large').css({
			display: 'block'
		});
		console.log();
	}, 500);
})
//切换小布局
$('.header .btns').on('click', '.glyphicon-th', function() {
	$(this).removeClass('default-btn');
	$(this).addClass('active-btn');
	var btns=$('.header .btns .glyphicon-th-large');
	var changer=$('.wrap .changer');
	btns.addClass('default-btn');
	btns.removeClass('active-btn');
	changer.addClass('default-content');
	changer.removeClass('large-content');
	$('.default-content').find('.thing-show-large').css({
		display: 'none'
	});
})
//鼠标放入li事件
function productHoverEffect() {
	$('.changer ul li').hover(
		function() {
			$(this).addClass('hoverShow');
		},
		function() {
			$(this).removeClass('hoverShow');
		}
	);
}
//创建商品列表
// var productlist = [];
//商品数据存储列表
var productData = [];
var bought = $('.cart-top button');
var tip = $('.tip');
var blinkcart = $('.products ul').find('li').length;
if (blinkcart == 0) {
	bought.css('display', 'none');
}
//点击加入购物车，商品飞入，并实现存储
$('.changer ul li').on('click', '.add-cart', function() {
	//获取图片
	var product = $(this).parents('li').find('.picture img');
	//给克隆的商品定位
	var cloneproduct = product.clone().css(product.offset()).appendTo('body');
	cloneproduct.css('position', 'absolute');
	//获得购物车
	var cart = $('.cart .products');
	//获得图片信息
	var productImg = product.attr('src');
	var productName = product.parents('li').find('.thing-name h5 span').last().text();
	var productPrice = product.parents('li').find('.thing-price h3').text();
	//移动
	cloneproduct.animate({
		left: cart.offset().left,
		top: cart.offset().top + cart.height(),
		width: '50px',
		height: '80px'
	}, 500).fadeOut('slow', function() {
		var bool = true;
		//判断购物车里是否存在
		$.each(productData,function(i,v){
			if(productName==v.name){
				alert("购物车里存在该物品")
				bool = false;
			}
		})
		if (bool == true) {
			appendProductToCart(productImg,productName,productPrice);
			bought.show();
            tip.hide();
			// bought.css({
			// 	display: 'block'
			// });
			// tip.css({
			// 	display: 'none'
			// });
			// 删除克隆对象
			cloneproduct.remove();

			//传入存储列表
			addProductLocalStroage(productImg,productName,productPrice);
		}
	})
});

function addProductLocalStroage(productImg,productName,productPrice){
	productData.push({
		image:  productImg,
		name: productName,
		price: productPrice
	});
	//存入电脑数据
	localStorage.setItem('products', JSON.stringify(productData));
}

function loadProductLocalStorage(){
	var productsJson = localStorage.getItem('products');
	if (
        productsJson !== '' &&
        productsJson !== null &&
        productsJson !== undefined
    ) {
        productData = JSON.parse(productsJson);
        $.each(productData, function(i, v) {
            appendProductToCart(v.image, v.name, v.price);
            bought.show();
            tip.hide();
        });
   //  bought.css({
			// 	display: 'block'
			// });
			// tip.css({
			// 	display: 'none'
			// });
    }
}

function appendProductToCart(productImg,productName,productPrice){
	var inner =
		'<li>' +
		'<img src="' +
		productImg +
		'" alt="请使用新版浏览器查看">' +
		'<div class="text">' +
		'<p class="name" >' +
		productName +
		'</p><p class="price">' +
		productPrice + '</p></div>';
	$('.products ul').append($(inner));
}

$(function() {
	productHoverEffect();
	loadProductLocalStorage();
});