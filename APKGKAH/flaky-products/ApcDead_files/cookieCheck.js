/*
	Description: This will create a cookie. Check if that cookie exists and display/hide the country change link.
	
	Modification History:
	DChin		4/9/2008		Initial Creation
*/

// Set var
document.cookie = "cookiesEnabled=1";

// Check if cookie is found
if (document.cookie.indexOf("cookiesEnabled") == -1) {
	// Set CSS display value to 'none'
	document.getElementById("header-country-change-group").style.display = 'none';
}