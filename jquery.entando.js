!function ($) {
	"use strict"; // jshint ;_;
	var sign = 'Entando.Wood.Menu';
	
	var defaultOptions = {
		menuToggler: "toggler", //togglers css class
		hideClass: "noscreen", //css class for hidden menu
		showClass: "undoNoscreen", //css class for visible menu
		openClass: "openmenu", //css class used when the branch is open
		closedClass: "closedmenu", //css class used when the branch is closed
		showTools: false, //show the toolbar open/close all?
		expandAllLabel: "+", //etichetta per il link che "espande tutto"
		collapseAllLabel: "-", //etichetta per il link che "chiude tutto"
		toolClass: "toolClass", //classe css utilizzata per gli strumenti
		toolTextIntro: 'You can expand the tree structure, or collapse it, using the appropriate links.', //text before toolbar links
		toolexpandAllLabelTitle: 'Expand All Tree',	//title for expand  all
		toolcollapseLabelTitle: 'Collapse All Tree' //title for close all
	};

	var WoodMenu = function (el, opt) {
		if (opt.showTools.toString()=='true') {
			var toolbar = $('<p class="'+opt.toolClass+'"><span class="intro">'+opt.toolTextIntro+'</span> <a href="#" rel="expand" title="'+opt.toolexpandAllLabelTitle+'">'+opt.expandAllLabel+'</a> <a href="#" rel="collapse" title="'+opt.toolcollapseLabelTitle+'">'+opt.collapseAllLabel+'</a></p>');
			$(el).before(toolbar);
			$(toolbar).on('click', 'a[rel="expand"]', {WoodMenu: $(el), WoodMenuOpts: opt}, function(ev) {
				ev.preventDefault();
				var wood = ev.data.WoodMenu;
				var opt = ev.data.WoodMenuOpts;
				wood.find("."+opt.menuToggler).each(function(index, toggler){
					var toggler= $(toggler);
					var submenu = $("#"+toggler.attr("rel"));
					var togglerParent = toggler.parent();
					if (submenu.hasClass(opt.hideClass)) {
						submenu.removeClass(opt.hideClass);
						submenu.addClass(opt.showClass);
						togglerParent.removeClass(opt.closedClass);
						togglerParent.addClass(opt.openClass);
						if (opt.onOpen) {
							opt.onOpen(toggler, submenu);
						}
					}
				});
			});

			$(toolbar).on('click', 'a[rel="collapse"]', {WoodMenu: $(el), WoodMenuOpts: opt}, function(ev) {
				ev.preventDefault();
				var wood = ev.data.WoodMenu;
				var opt = ev.data.WoodMenuOpts;
				wood.find("."+opt.menuToggler).each(function(index, toggler){
					var toggler= $(toggler);
					var submenu = $("#"+toggler.attr("rel"));
					var togglerParent = toggler.parent();
					if (!submenu.hasClass(opt.hideClass)) {
						submenu.addClass(opt.hideClass);
						submenu.removeClass(opt.showClass);
						togglerParent.removeClass(opt.closedClass);
						togglerParent.addClass(opt.openClass);
						if (opt.onClose) {
							opt.onOpen(toggler, submenu);
						}
					}
				});
			});

		}

		$(el).on('click', "."+opt.menuToggler, function(ev) {
			ev.preventDefault();
			var toggler = $(ev.target);
			var submenu = $("#"+toggler.attr("rel"));
			var togglerParent = toggler.parent();
			submenu.toggleClass(opt.hideClass);
			if (submenu.hasClass(opt.hideClass)) {
				submenu.removeClass(opt.showClass);
				togglerParent.addClass(opt.closedClass);
				togglerParent.removeClass(opt.openClass);
				if (opt.onClose) {
					opt.onClose(toggler, submenu);
				}
			}
			else {
				submenu.addClass(opt.showClass);
				togglerParent.removeClass(opt.closedClass);
				togglerParent.addClass(opt.openClass);
				if (opt.onOpen) {
					opt.onOpen(toggler, submenu);
				}
			}
		});
		return this;
	};

	$.fn.EntandoWoodMenu = function (userreqopt) {
		var options = $.extend(defaultOptions, userreqopt);
		return this.each(function () {
			var $this = $(this);
			var data = $this.data(sign);
			if (!data) { 
				$this.data(sign, (data = new WoodMenu(this, options))); 
			}
			});
	};

	$.fn.EntandoWoodMenu.Constructor = WoodMenu;
}(window.jQuery);
