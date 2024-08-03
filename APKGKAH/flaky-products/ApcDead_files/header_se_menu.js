jQuery(function() {
		//jQuery("#tabs_container").show();
		var lastTab = jQuery("li.lastTab");
		//jQuery("li.lastTab.active").css("margin","5px 0 0 0");
		//update css style and show content on hover
		jQuery("ul.ui-tabs-nav li div.roundedBackground").mouseenter(function () {
		
			//hide the tab content that was hightlighted
			jQuery("div.active-tab").hide().removeClass("active-tab");
			//remove highlight and set highlights
			jQuery("li.ui-tabs-selected").removeClass("ui-tabs-selected ui-state-active");	
			if(lastTab.is('.active'))
			{
				lastTab.css("margin","5px 0 0 0");
			}else
			{
				lastTab.css("margin","10px 0 0 0");
			}
			
			jQuery(this).parent().addClass("ui-tabs-selected ui-state-active");
			
			if(jQuery(this).parent().is('.lastTab.ui-state-active'))
			{
				jQuery(this).parent().css("margin","5px 0 0 0");
			}
			
			var divName = jQuery(this).parent().find('a').attr("title");
			var tabId = divName.replace(/\s/g, "_");
			divName = "#" + tabId;
			jQuery(divName).addClass("active-tab");	
			jQuery(divName).show();
			jQuery("#menu_panel").show();
			
		});
		jQuery("ul.ui-tabs-nav li div a").focusin(function () {
			jQuery(this).mouseenter();	// do same thing as mouseenter()
		});
		
		//hide content mouserollsout
		jQuery("#tabs").mouseleave(function () {
			if(lastTab.is('.active'))
			{
				lastTab.css("margin","5px 0 0 0");
			}else
			{
				lastTab.css("margin","10px 0 0 0");
			}
			jQuery("li.ui-tabs-selected").removeClass("ui-tabs-selected ui-state-active");
			jQuery("#menu_panel").hide();
		});
		jQuery("ul.ui-tabs-nav li div a").focusout(function () {
			jQuery(this).mouseleave();	// do same thing as mouseleave()			
		});
	});