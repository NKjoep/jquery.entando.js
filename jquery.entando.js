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
		toolcollapseLabelTitle: 'Collapse All Tree', //title for close all
		menuRetriever: function(toggler) { return $("#"+toggler.attr("rel")); }
		//startIndex: ""
		//onOpen: function(toggler, submenu) {},
		//onClose: function(toggler, submenu) {},
		//onStart: function() {},
	};

	var Wood = function (el, opt) {
		var WoodRoot = this.WoodRoot = $(el);
		var opt = this.opt = opt;
		var getSubMenu = this.getSubMenu = opt.menuRetriever;
		var expandAll = this.expandAll = function() {
			WoodRoot.find("."+opt.menuToggler).each(function(index, toggler){
				openWood($(toggler));
			});
		};
		var collapseAll = this.collapseAll = function() {
			WoodRoot.find("."+opt.menuToggler).each(function(index, toggler){
				closeWood($(toggler));
			});
		};
		var openWood = this.openWood = function(toggler) {
			var submenu = getSubMenu(toggler);
			var togglerParent = toggler.parent();
			submenu.addClass(opt.showClass);
			submenu.removeClass(opt.hideClass);
			togglerParent.removeClass(opt.closedClass);
			togglerParent.addClass(opt.openClass);
			if (opt.onOpen) {
				opt.onOpen(toggler, submenu);
			}
		};
		var closeWood = this.closeWood = function(toggler) {
			var submenu = getSubMenu(toggler);
			var togglerParent = toggler.parent();
			submenu.removeClass(opt.showClass);
			submenu.addClass(opt.hideClass);
			togglerParent.addClass(opt.closedClass);
			togglerParent.removeClass(opt.openClass);
			if (opt.onClose) {
				opt.onClose(toggler, submenu);
			}
		};
		var toggleWood = this.toggleWood = function(toggler) {
			var submenu = getSubMenu(toggler);
			var togglerParent = toggler.parent();
			submenu.toggleClass(opt.hideClass);
			if (submenu.hasClass(opt.hideClass)) {
				closeWood(toggler);
			}
			else {
				openWood(toggler);
			}
		};
		var openAllWoodFromRootTo = this.openWood = function(toggler) {
			$(toggler).parentsUntil(WoodRoot).children('.'+opt.menuToggler).each(function(index, togg){
				openWood($(togg));
			});
		};

		if (opt.showTools.toString()=='true') {
			var toolbar = $('<p class="'+opt.toolClass+'"><span class="'+opt.hideClass+'">'+opt.toolTextIntro+'</span> <a href="#" rel="expand" title="'+opt.toolexpandAllLabelTitle+'">'+opt.expandAllLabel+'</a> <a href="#" rel="collapse" title="'+opt.toolcollapseLabelTitle+'">'+opt.collapseAllLabel+'</a></p>');
			$(el).before(toolbar);
			$(toolbar).on('click', 'a[rel="expand"]', function(ev) {
				ev.preventDefault();
				expandAll();
			});

			$(toolbar).on('click', 'a[rel="collapse"]', function(ev) {
				ev.preventDefault();
				collapseAll();
			});

		}
		$(el).on('click', "."+opt.menuToggler, function(ev) {
			ev.preventDefault();
			var toggler = $(ev.target);
			toggleWood(toggler);
		});
		if (opt.onStart) {
			opt.onStart.apply(this);
		}

		if (opt.startIndex!==undefined) {
			openAllWoodFromRootTo(this.WoodRoot.find('#'+opt.startIndex));
		}
		return this;
	};

	$.fn.EntandoWoodMenu = function (userreqopt) {
		var options = $.extend({},defaultOptions, userreqopt);
		var woodDone = [];
		this.each(function () {
			var $this = $(this);
			var data = $this.data(sign);
			if (!data) {
				data = new Wood(this, options);
				$this.data(sign, data);
			}
			woodDone.push(data);
		});
		return woodDone;
	};

	$.fn.EntandoWoodMenu.Constructor = Wood;
}(window.jQuery);
