/*!
 * Scroll Bar jQuery-plugin v1.0
 * Copyright 2013 Hilson Shrestha <hilsonshrestha@gmail.com>
 * Released under the MIT license.
 */

$.fn.extend({
	initCore: $.fn.init,
	init: function (selector, context, rootjQuery) {
		var ob = new $.fn.initCore(selector, context, rootjQuery);
		if (ob.hasClass('ui_scroll')) {
			return ob.children().first().children().first();
		};
		return ob;
	}
});

var uiScroll = function() {
	var e_m = this;
	if (this.children().hasClass('ui_scrollableAreaWrapper')) {
		return this.children().children().first();
	}
	var e_a = jQuery('<div/>', {width: '50%'}).append(this.children().remove());
	var e_b = jQuery('<div/>', {
		class: 'ui_scrollableAreaWrapper',
		style: 'width:200%; height:100%; overflow-y:scroll; outline:none; position:relative',
		tabIndex: 0
	}).appendTo(this).append(e_a);

	//thumb size = scroll bar size * page size / scroll bar range


	var e_c = jQuery('<div/>', {
		class: 'scrollTrack',
		style: 'position:absolute; top:0px; right:0px; height:' + (this.height() - 10)  +'px;'
	}).appendTo(this).click(function(e) {
		e_b.focus();
	});

	var e_d = jQuery('<div/>', {
		class: 'scrollThumb',
		style: 'position:absolute; height:' + (e_b.height() / e_a.height() * e_c.height()) + 'px; min-height:15px; top:0;'
	}).appendTo(e_c);

	e_c.mousedown(function(e) {
		if (e_c[0] == $(e.target)[0]) {
			if (e.offsetY < parseInt(e_d.css('top'))) {
				e_b.animate({
					scrollTop:e_b.scrollTop() - 100
				}, 300);
			} else if(e.offsetY > parseInt(e_d.css('top')) + e_d.height()) {
				e_b.animate({
					scrollTop:e_b.scrollTop() + 100
				}, 300);
			}
		}
	});


	e_b.mouseenter(function() {
		e_c.height(e_b.height() - 10);
		e_d.height(e_b.height() / e_a.height() * e_c.height());
		e_b.scroll();
		if (e_d.height() >= e_c.height()) {
			e_c.hide();
		} else {
			e_c.show();
		}
	});

	setTimeout(function() {
		e_b.mouseenter();
	}, 1000);


	e_d.draggable({
		axis: 'y',
		containment: 'parent',
		drag: function() {
			e_b.scrollTop(parseInt((e_a.height() - e_b.height()) / (e_c.height() - (e_d.height())) * parseFloat(e_d.css('top'))));
		}
	});

	e_b.scroll(function() {
		if (!e_d.hasClass('ui-draggable-dragging')) e_d.css('top', parseInt(e_b.scrollTop() / (((e_a.height() - e_b.height()) / (e_c.height() - (e_d.height()))))));
	});	
	this.addClass('ui_scroll').css({
		position: 'relative',
		overflow: 'hidden'
	});
	return this.children().children().first();
}

jQuery.fn.extend({uiScroll: uiScroll});


var iScroll = function() {
	return;
	var e_m = this;

	var d = $(document);
	var w = $(window);

	var reachedBottom = function(t_a) {
		if (t_a.offset().top + t_a.height() < d.scrollTop() + w.height()) {
			return true;
		} else {
			return false;
		}
	}

	
	d.scroll(function(event) {
		//if (e_m.height())
		console.log(reachedBottom(e_m) == true && e_m.css('position') != 'absolute');
		if (reachedBottom(e_m) == true && e_m.css('position') != 'fixed') {
			e_m.css({
				position: 'fixed',
				bottom: 0,
				top: 'auto'//d.scrollTop() - w.height()
			});
			console.log(e_m.height());
		} else if (e_m.css('position') == 'fixed') {
			if (e_m.height() < d.scrollTop() + w.height()) {
				e_m.css({
					position: 'absolute',
					//top: 0,
					//bottom: 'auto'
				});	
			}
		}

		else if (reachedBottom(e_m) == true && e_m.css('position') != 'absolute' && e_m.css('top') != 0) {
			e_m.css({
				position: 'absolute',
				//top: 0,
				//bottom: 'auto'
			});
			console.log(e_m.height());
		}

		//console.log(event);
		//if (reachedBottom(this))
	});
}

jQuery.fn.extend({uiScroll: uiScroll});
