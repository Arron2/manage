$(function(){
	// $(".sidebar-menu-item").click(function(event) {
	// 	//$(this).toggleClass('active');
	// 	var _this = $(this);

	// 	$(".sidebar-menu-item").each(function(index, el) {
	// 		$(el).removeClass('active');
	// 		var elm1 = $(this).next()[0];
	// 		$(elm1).css('display', 'none');
	// 	});
	// 	var elm = $(this).next()[0];
	// 	if($(elm).css('display') == 'none'){
	// 		$(_this).addClass('active');
	// 	}else{
	// 		$(_this).removeClass('active');
	// 	}
		
		
		
	// 	if($(this).hasClass('active')){
	// 		$(elm).css('display', 'block');
	// 	}else{
	// 		$(elm).css('display', 'none');
	// 	}
		
	// });
	$(".sidebar-menu-item").each(function(index, el) {
		var elm = $(this).next()[0];
		$(this).click(function(event) {
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				$(".treeview-menu").each(function(index, el) {
					$(this).slideUp(500);
				});
				$(this).parent().siblings().each(function(index, el) {
					$(el).find('.sidebar-menu-item').removeClass('active');
				});

				$(elm).slideDown(500);
				$(this).children("i:last-child").removeClass('fa-angle-left').addClass('fa-angle-down');
			}else{
				$(elm).slideUp(500);
				$(this).children("i:last-child").removeClass('fa-angle-down').addClass('fa-angle-left');
			}

		});
	});
	
	//设置主题内容高度
	var vHeight = $(window).height() - 90;
	$("#main-content").height(vHeight);
	$(window).resize(function(event) {
		var vHeight = $(window).height() - 90;
		$("#main-content").height(vHeight);
	});
	//菜单跳转
	$(".treeview-menu>li>a").click(function(event) {
		var id = $(this).data('id');
		//检查元素是否存在
		$(".page-tabs-content > a").removeClass('active');
		$(".main-content > iframe").removeClass('show');
		$(".main-content > iframe").addClass('hide');
		if($("#tab"+id).length > 0){
			$("#tab"+id).addClass('active');
			$("iframe[name=content-iframe"+id+"]").removeClass('hide').addClass('show');
		}else{
			//创建tab便签
			var tabContent = $(this).find('span').html();
			var href = $(this).attr("href");
			var tab = '<a href="#" class="menuTab active" id="tab'+id+'" data-id="'+id+'">'+tabContent
				+'<i class="fa fa-remove"></i></a>';
			$(tab).appendTo('#page-tabs-content');

			
			//创建iframe
			var iframe = '<iframe name="content-iframe'+id+'" class="show"  src="'+href+'"></iframe>';
			$(iframe).appendTo('#main-content');

			$(this).attr('target', 'content-iframe'+id);
		}
	});
	//关闭iframe页面
	$("body").on('click', '.fa-remove', function(event) {
		event.preventDefault();
		/* Act on the event */
		var id = $(this).parent().data('id');
		var nextObj = $(this).parent().next();
		var tmpObj = null;
		if(nextObj.length > 0){
			tmpObj = nextObj;
		}else{
			var prevObj = $(this).parent().prev();
			if(prevObj.length > 0){
				tmpObj = prevObj;
			}
		}
		var tmpId = tmpObj.data('id');
		if(tmpId == undefined){
			tmpId = 0;
		}
		
		$("#tab"+id).remove();
		$("iframe[name=content-iframe"+id+"]").remove();

		//显示tab
		if(tmpId != 0){
			$("#tab"+tmpId).addClass('active');
		}
		
		$("iframe[name=content-iframe"+tmpId+"]").removeClass('hide').addClass('show');
		return false;
	});
	//显示tab
	$("body").on('click', '.menuTab', function(event) {
		event.preventDefault();
		/* Act on the event */
		var id = $(this).data('id');
		$(".page-tabs-content > a").removeClass('active');
		$(".main-content > iframe").removeClass('show');
		$(".main-content > iframe").addClass('hide');
		$("#tab"+id).addClass('active');
		$("iframe[name=content-iframe"+id+"]").removeClass('hide').addClass('show');
	});
	//全屏支持
	$(".fullscreen").click(function(event) {
		fullScreen();
	});
	//侧边栏收纳
	$(".sidebar-toggle").click(function(event) {
		/* Act on the event */
		$("body").toggleClass('sidebar-collapse');
		$(".sidebar-menu-item").removeClass("active");
		$(".treeview-menu").css("display","none");
		if($("body").hasClass('sidebar-collapse')){
			$(".logo").animate({width:'50px'});
			$(".main-sidebar").animate({width:'50px'});
			$(".navbar-top").animate({marginLeft:'50px'});
			$(".content-wrapper").animate({marginLeft:'50px'});
		}else{
			$(".logo").animate({width:'230px'});
			$(".main-sidebar").animate({width:'230px'});
			$(".navbar-top").animate({marginLeft:'230px'});
			$(".content-wrapper").animate({marginLeft:'230px'});
		}
		return false;
	});
	//
	$(".dropdown").click(function(event) {
		$(this).toggleClass('open');
		if($(this).hasClass('open')){
			$(".dropdown-menu").slideDown();
		}else{
			$(".dropdown-menu").slideUp();
		}
	});
	//关闭下拉菜单
	$(".dropdown-menu > li").click(function(event) {
		var type = $(this).data("type");
		//获取当前tab
		var id = 0;
		var tabLen = $(".menuTab").length;
		if(tabLen > 0){
			$(".menuTab").each(function(index,ele){
				var tmpid = $(ele).data("id");
				if($(ele).hasClass('active')){
					id = tmpid;
				}
			});
		}
		if(type == 'reflash-tab'){
			$("iframe[name=content-iframe"+id+"]").attr('src', $("iframe[name=content-iframe"+id+"]").attr('src'));
		}else if(type == "close-tab"){
			
		}
		//$(this).parent().slideUp();
		//$(".dropdown").removeClass('open');
	});
	//如果点的不是btn-group区域，关闭下拉菜单
	jQuery.fn.isChildAndSelfOf = function(b){ return (this.closest(b).length > 0); };
	$(document).click(function(event){
//		if( !$(event.target).isChildAndSelfOf(".togglebtn")&&!$(event.target).isChildAndSelfOf(".sidebar-main")){
//			$(".sidebar-main").css('display', 'none');
//		    $(".togglebtn").removeClass('active');
//		}	
		
		if(!$(event.target).isChildAndSelfOf(".btn-group")){
			$(".dropdown-menu").slideUp();
			$(".dropdown").removeClass('open');
		}
	});
	
	//左菜单收缩起来的时候，当鼠标以上的时候弹出子菜单
	$(".treeview").mouseover(function(){
		if($("body").hasClass('sidebar-collapse')){
			$(".treeview-menu").each(function(index,el){
				$(el).css("display","none");
			});
			$(".sidebar-menu-item").each(function(index,el){
				$(el).removeClass("hover");
			});
			$(this).children(".sidebar-menu-item").addClass("hover");
			$(this).children(".treeview-menu").each(function(index,el){
				$(el).css("display","block");
			});
		}
	});
	$(".treeview").mouseout(function(){
		if($("body").hasClass('sidebar-collapse')){
			$(".treeview-menu").each(function(index,el){
				$(el).css("display","none");
			});
			$(".sidebar-menu-item").each(function(index,el){
				$(el).removeClass("hover");
			});
		}
	});
	//左右切换
	$(".roll-right").click(function(){
		
	});

});

function fullScreen() {
  var el = document.documentElement;
  var rfs = el.requestFullScreen || el.webkitRequestFullScreen || 
      el.mozRequestFullScreen || el.msRequestFullScreen;
  if(typeof rfs != "undefined" && rfs) {
    rfs.call(el);
  } else{
    //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
    var wscript = new ActiveXObject("WScript.Shell");
    if(wscript != null) {
        wscript.SendKeys("{F11}");
    }
  }
}
