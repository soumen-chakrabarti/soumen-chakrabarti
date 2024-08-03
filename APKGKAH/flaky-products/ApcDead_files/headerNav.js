/* JS script to address IE's ignorance for :hover pseudo class */
startList = function() {
	if (document.all && document.getElementById) {
		navHeaderItem = document.getElementById("headerNav");
		if (navHeaderItem) {
			navItems = navHeaderItem.getElementsByTagName("LI");
			for (i=0; i<navItems.length; i++) {
				navItems[i].onmouseover=function() {
					this.className+=" over";
				}
				navItems[i].onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}
}
/* On page load fire off startList function*/
if (window.addEventListener) {
	window.addEventListener('onload',startList,'false');
} else if (window.attachEvent) {
	window.attachEvent('onload',startList);
}

function doSeperatorCheck(id, doSeperator){
	var isFirst = false;
	var theIDName = "SectionHeader_" + id;
	var allSections = document.getElementsByName("HeaderSectionLink");
	var currentEl = document.getElementById(theIDName)
	
	for( var i=0; i<allSections.length; i++) {
		if (allSections[i].id == theIDName) {
			var nextEl = allSections[i+1];
			break;
		}
	}
	
	if (currentEl.className == 'first') {
		isFirst = true;
	}
	
	if (nextEl) {
		if (doSeperator == "true") {
			nextEl.className = "ieBorder";
			if (!isFirst) {
				currentEl.className = "ieBorder";
			}
		}
		else {
			nextEl.className = "separater";
			if (!isFirst) {
				currentEl.className = "separater";
			}
		}
	} else {
		if (doSeperator == "true") {
			currentEl.className = "ieBorder";
		} else {
			currentEl.className = "separater";		}
	}
}
