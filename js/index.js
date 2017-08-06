'use strict';
$(function(){
	var eachWidth = 768;
	// 获取所有的图片
	var imgs = $('.wjs-carousel .item img');
	var item = $('.wjs-carousel .item');
	
	$(window).resize(function(){
		// 获取屏幕的宽度
		var screenWidth = $(window).width();
		var isMobile = screenWidth < eachWidth;		
		// 手机
		imgs.each(function(index,el){
		
			var _el = $(el);
		
			var src = _el.data(isMobile ? 'msrc' : 'psrc');
			// 设置src为msrc
			_el.attr('src',src);				
		})
		//　重写手机端的图片的css
		imgs.css({
			width : isMobile ? '100%' : 'auto',
			height : isMobile ? 'auto' : 410,
			position : isMobile ? 'static' : 'absolute',
			transform : isMobile ? 'none' : 'translateX(-50%)'
		})
		item.css('height',isMobile ? 'auto' : 410);
	}).trigger('resize');


	// 在手机端通过touch去控制看到上一张和下一张
	var carousel = $('.carousel');
	var screenWidth = $(window).width();
	
	var startX = 0;
	var startTime = null;
	carousel.on('touchstart',function(e){
		
		startTime = Date.now();
	
		startX = e.originalEvent.changedTouches[0].clientX;
	})
	carousel.on('touchend',function(e){
		// 获取手指的距离
		var dx = e.originalEvent.changedTouches[0].clientX - startX;
		// 获取隔间的时间
		var dTime = Date.now() - startTime;
		if(Math.abs(dx) > screenWidth/3 || (Math.abs(dx) > 30 && dTime < 300)){	
			if(dx > 0) {			
				carousel.carousel('prev');
			}else{	
				carousel.carousel('next');
			}
		}
	})


	// 横向滚动条
	var scrollUl = $('.scroll ul');
	
	var scrollLis = $('.scroll ul li');	

	var allWidth = 0;
	scrollLis.each(function(index,el){
		var _el = $(el);
		allWidth += _el.width();
	})

	scrollUl.width(allWidth);

})