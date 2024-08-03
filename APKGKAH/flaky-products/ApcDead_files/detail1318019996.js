
RightNow.Widget.SelectionInput=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._formErrorLocation=null;if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_RADIO)
this._inputField=[document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_1"),document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_0")];else
this._inputField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name);if(!this._inputField||(YAHOO.lang.isArray(this._inputField)&&(!this._inputField[0]||!this._inputField[1])))
return;if(this.data.attrs.initial_focus)
{if(this._inputField[0]&&this._inputField[0].focus)
this._inputField[0].focus();else if(this._inputField.focus)
this._inputField.focus();}
if(this.data.js.hint)
this._initializeHint();if(this.data.attrs.validate_on_blur&&this.data.attrs.required)
YAHOO.util.Event.addListener(this._inputField,"blur",function(){this._formErrorLocation=null;this._validateRequirement();},null,this);RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidate,this);var fieldName=this.data.js.name;if(fieldName==="country_id")
YAHOO.util.Event.addListener(this._inputField,"change",this._countryChanged,null,this);else if(fieldName==="prov_id")
RightNow.Event.subscribe("evt_formFieldProvinceResponse",this._onProvinceResponse,this);};RightNow.Widget.SelectionInput.prototype={_onValidate:function(type,args)
{this._formErrorLocation=args[0].data.error_location;if(this._validateRequirement())
{var eo=new RightNow.Event.EventObject();eo.data={"name":this.data.js.name,"value":this._getValue(),"table":this.data.js.table,"required":(this.data.attrs.required?true:false),"prev":this.data.js.prev,"form":RightNow.UI.findParentForm("rn_"+this.instanceID)};if(this.data.js.profile)
eo.data.profile=true;if(this.data.js.customID)
{eo.data.custom=true;eo.data.customID=this.data.js.customID;eo.data.customType=this.data.js.type;}
else
{eo.data.custom=false;}
eo.w_id=this.data.info.w_id;RightNow.Event.fire("evt_formFieldValidateResponse",eo);}
else
{RightNow.UI.Form.formError=true;}
RightNow.Event.fire("evt_formFieldCountRequest");},_getValue:function()
{if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_RADIO)
{if(this._inputField[0].checked)
return this._inputField[0].value;if(this._inputField[1].checked)
return this._inputField[1].value;}
else if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_CHECK)
{return this._inputField.value==="1";}
else
{return this._inputField.value;}},_validateRequirement:function()
{if(this.data.attrs.required)
{if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_RADIO)
{if((this._inputField[0]&&this._inputField[1])&&(!this._inputField[0].checked&&!this._inputField[1].checked))
{this._displayError(this.data.attrs.label_required);return false;}}
else if(this._inputField.value==="")
{this._displayError(this.data.attrs.label_required);return false;}}
YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");return true;},_initializeHint:function()
{if(YAHOO.widget.Overlay)
{var overlay=document.createElement("span");overlay.id="rn_"+this.instanceID+"_Hint";YAHOO.util.Dom.addClass(overlay,"rn_HintBox");if(YAHOO.lang.isArray(this._inputField))
{YAHOO.util.Dom.setStyle(overlay,"margin-left","2em");YAHOO.util.Dom.insertAfter(overlay,this._inputField[this._inputField.length-1]);}
else
{YAHOO.util.Dom.insertAfter(overlay,this._inputField);}
overlay=new YAHOO.widget.Overlay(overlay,{visible:false});overlay.setBody(this.data.js.hint);overlay.render();YAHOO.util.Event.addListener(this._inputField,"focus",function(){overlay.show();});YAHOO.util.Event.addListener(this._inputField,"blur",function(){overlay.hide();});}
else
{var legend=document.getElementById("rn_"+this.instanceID+"_Label");if(legend)
legend.innerHTML+="<span class='rn_HintText'>"+this.data.js.hint+"</span>";}},_displayError:function(errorMessage)
{var commonErrorDiv=document.getElementById(this._formErrorLocation);if(commonErrorDiv)
{RightNow.UI.Form.errorCount++;if(RightNow.UI.Form.chatSubmit&&RightNow.UI.Form.errorCount===1)
commonErrorDiv.innerHTML="";var elementId=(YAHOO.util.Lang.isArray(this._inputField))?this._inputField[0].id:this._inputField.id,errorLink="<div><b><a href='javascript:void(0);' onclick='document.getElementById(\""+elementId+"\").focus(); return false;'>"+this.data.attrs.label_input;if(errorMessage.indexOf("%s")>-1)
errorLink=RightNow.Text.sprintf(errorMessage,errorLink);else
errorLink=errorLink+errorMessage;errorLink+="</a></b></div> ";commonErrorDiv.innerHTML+=errorLink;}
YAHOO.util.Dom.addClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");},_countryChanged:function()
{if(this._inputField.options)
{var evtObj=new RightNow.Event.EventObject();evtObj.data={"country_id":this._inputField.options[this._inputField.selectedIndex].value,"w_id":this.instanceID};RightNow.Event.fire("evt_formFieldProvinceRequest",evtObj);}},_onProvinceResponse:function(type,args)
{var evtObj=args[0];if(evtObj.states)
{this._inputField.options.length=0;this._inputField.options[0]=new Option();this._inputField.options[0].text="--";this._inputField.options[0].value="";for(var i=0;i<evtObj.states.length;i++)
{this._inputField.options[i+1]=new Option();this._inputField.options[i+1].text=evtObj.states[i].val;this._inputField.options[i+1].value=evtObj.states[i].id;}}}};
RightNow.Widget.DateInput=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._formErrorLocation=null;this._errorNodes=null;var widgetContainer=document.getElementById("rn_"+this.instanceID);if(!widgetContainer)return;this._selectNodes=YAHOO.util.Dom.getElementsBy(function(node){return node.tagName==="SELECT";},"SELECT","rn_"+this.instanceID);if(!this._selectNodes)return;if(this.data.attrs.initial_focus)
{if(this._selectNodes[0]&&this._selectNodes[0].focus)
this._selectNodes[0].focus();}
if(this.data.attrs.validate_on_blur)
YAHOO.util.Event.addListener(this._selectNodes[this._selectNodes.length-1],"blur",this._blurValidate,null,this);RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidate,this);if(this.data.js.hint)
this._initializeHint();};RightNow.Widget.DateInput.prototype={_getValue:function()
{var fieldValue="",monthField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Month"),dayField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Day"),yearField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Year");if(monthField&&dayField&&yearField)
{fieldValue=yearField.options[yearField.selectedIndex].value+"-"+
monthField.options[monthField.selectedIndex].value+"-"+
dayField.options[dayField.selectedIndex].value;if(fieldValue==="--")
{return"";}
if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_DATETIME)
{var hourField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Hour"),minuteField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Minute");if(hourField&&minuteField)
{fieldValue+=" "+hourField.options[hourField.selectedIndex].value+":"+
minuteField.options[minuteField.selectedIndex].value;}}}
return fieldValue;},_onValidate:function(type,args)
{this._formErrorLocation=args[0].data.error_location;YAHOO.util.Dom.removeClass(this._errorNodes,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Legend","rn_ErrorLabel");if(this._checkRequired()&&this._checkValue())
{var eo=new RightNow.Event.EventObject();eo.data={"name":this.data.js.name,"value":this._getValue(),"table":this.data.js.table,"required":(this.data.attrs.required?true:false),"prev":this.data.js.prev,"form":RightNow.UI.findParentForm("rn_"+this.instanceID)};if(this.data.js.profile)
eo.data.profile=true;if(this.data.js.customID)
{eo.data.custom=true;eo.data.customID=this.data.js.customID;eo.data.customType=this.data.js.type;}
else
{eo.data.custom=false;}
eo.w_id=this.instanceID;RightNow.Event.fire("evt_formFieldValidateResponse",eo);}
else
{RightNow.UI.Form.formError=true;}
RightNow.Event.fire("evt_formFieldCountRequest");},_blurValidate:function()
{YAHOO.util.Dom.removeClass(this._errorNodes,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Legend","rn_ErrorLabel");this._formErrorLocation=null;this._checkRequired();this._checkValue();},_checkRequired:function()
{if(this.data.attrs.required)
{this._errorNodes=[];for(var i=0;i<this._selectNodes.length;i++)
{if(this._selectNodes[i].value==="")
{this._errorNodes.push(this._selectNodes[i].id);}}
if(this._errorNodes.length>0)
{this._displayError(this.data.attrs.label_required);return false;}}
return true;},_checkValue:function()
{this._errorNodes=[];var numberFilledIn=0,numberChecked=0;for(var i=0;i<this._selectNodes.length;i++)
{if(this._selectNodes[i].value==="")
this._errorNodes.push(this._selectNodes[i].id);else
numberFilledIn++;numberChecked++;}
if(numberFilledIn>0&&numberFilledIn!==numberChecked)
{this._displayError(RightNow.Interface.getMessage("PCT_S_IS_NOT_COMPLETELY_FILLED_IN_MSG"));return false;}
var monthField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Month"),dayField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Day"),yearField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Year");if((monthField&&dayField&&yearField)&&(monthField.value==="1"&&dayField.value==="1"&&yearField.value==="1970"))
{this._errorNodes=[monthField.id,dayField.id,yearField.id];this._displayError(RightNow.Interface.getMessage("PCT_S_VALUE_MIN_VALUE_PCT_S_MSG"),this.data.js.min_val);return false;}
if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_DATETIME)
{var hourField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Hour");if((monthField&&dayField&&yearField)&&(monthField.value==="1"&&dayField.value==="2"&&yearField.value==="1970")&&(parseInt(hourField.value,10)<9))
{this._errorNodes=[monthField.id,dayField.id,yearField.id,hourField.id];this._displayError(RightNow.Interface.getMessage("PCT_S_VALUE_MIN_VALUE_PCT_S_MSG"),this.data.js.min_val);return false;}}
return true;},_initializeHint:function()
{if(YAHOO.widget.Overlay)
{var overlay=document.createElement("span");overlay.id="rn_"+this.instanceID+"_Hint";YAHOO.util.Dom.addClass(overlay,"rn_HintBox");YAHOO.util.Dom.insertAfter(overlay,this._selectNodes[this._selectNodes.length-1]);overlay=new YAHOO.widget.Overlay(overlay,{visible:false});overlay.setBody(this.data.js.hint);overlay.render();YAHOO.util.Event.addListener(this._selectNodes,"focus",function(){overlay.show();});YAHOO.util.Event.addListener(this._selectNodes,"blur",function(){overlay.hide();});}
else
{var legend=document.getElementById("rn_"+this.instanceID+"_Legend");if(legend)
legend.innerHTML+="<span class='rn_HintText'>"+this.data.js.hint+"</span>";}},_displayError:function(errorMessage)
{var commonErrorDiv=document.getElementById(this._formErrorLocation);if(commonErrorDiv)
{RightNow.UI.Form.errorCount++;if(RightNow.UI.Form.chatSubmit&&RightNow.UI.Form.errorCount===1)
commonErrorDiv.innerHTML="";var errorLink="<div><b><a href='javascript:void(0);' onclick='document.getElementById(\""+this._errorNodes[0]+"\").focus(); return false;'>"+this.data.attrs.label_input;if(errorMessage.indexOf("%s")>-1||arguments.length>1)
{var args=Array.prototype.slice.call(arguments);errorLink=RightNow.Text.sprintf(errorMessage,errorLink,args.slice(1));}
else
{errorLink=errorLink+errorMessage;}
errorLink+="</a></b></div> ";commonErrorDiv.innerHTML+=errorLink;}
YAHOO.util.Dom.addClass(this._errorNodes,"rn_ErrorField");YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Legend","rn_ErrorLabel");}};
RightNow.Widget.TextInput=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._formErrorLocation=null;this._validated=false;this._inputField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name);if(!this._inputField)return;if(this.data.attrs.initial_focus&&this._inputField.focus)
this._inputField.focus();if(this.data.js.hint)
this._initializeHint();if(this.data.js.mask)
this._initializeMask();RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidate,this);this._fieldName=this.data.js.name;if(this._fieldName==="postal_code"||this._fieldName==="ph_office"||this._fieldName==="ph_mobile"||this._fieldName==="ph_fax"||this._fieldName=="ph_asst"||this._fieldName==="ph_home")
RightNow.Event.subscribe("evt_formFieldProvinceResponse",this._onProvinceChange,this);if(this.data.attrs.validate_on_blur)
YAHOO.util.Event.addListener(this._inputField,"blur",this._blurValidate,null,this);};RightNow.Widget.TextInput.prototype={_onValidate:function(type,args)
{this._validated=true;this._formErrorLocation=args[0].data.error_location;this._trimField();if(this._compareInputToMask(true)&&this._checkRequired()&&this._checkData()&&this._checkValue()&&this._checkEmail()&&this._checkUrl())
{YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");var eo=new RightNow.Event.EventObject();eo.data={"name":this.data.js.name,"value":this._getValue(),"table":this.data.js.table,"required":(this.data.attrs.required?true:false),"prev":this.data.js.prev,"form":RightNow.UI.findParentForm("rn_"+this.instanceID)};if(this.data.js.profile)
eo.data.profile=true;if(this.data.js.customID)
{eo.data.custom=true;eo.data.customID=this.data.js.customID;eo.data.customType=this.data.js.type;}
else
{eo.data.custom=false;}
eo.w_id=this.data.info.w_id;RightNow.Event.fire("evt_formFieldValidateResponse",eo);}
else
{RightNow.UI.Form.formError=true;}
this._validated=false;RightNow.Event.fire("evt_formFieldCountRequest");},_blurValidate:function()
{this._formErrorLocation=null;if(this._onAccountExistsResponse._dialogShowing)return;this._trimField();if(this._checkRequired()&&this._checkData()&&this._checkValue()&&this._checkEmail())
{if(this._fieldName==="login"||this._fieldName==="email"||this._fieldName==="email_alt1"||this._fieldName==="email_alt2")
{this._checkExistingAccount();}
YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");return true;}},_checkValue:function()
{if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_INT)
{if(this._inputField.value!==""&&(isNaN(Number(this._inputField.value))||parseInt(this._inputField.value)!==parseFloat(this._inputField.value)))
{this._displayError(RightNow.Interface.getMessage('VALUE_MUST_BE_AN_INTEGER_MSG'));return false;}
if(this.data.js.maxVal||this.data.js.minVal)
{var value=parseInt(this._inputField.value);if(this.data.js.maxVal&&value>parseInt(this.data.js.maxVal))
{this._displayError(RightNow.Interface.getMessage('VALUE_IS_TOO_LARGE_MAX_VALUE_MSG')+this.data.js.maxVal+")");return false;}
if(this.data.js.minVal&&value<parseInt(this.data.js.minVal))
{this._displayError(RightNow.Interface.getMessage('VALUE_IS_TOO_SMALL_MIN_VALUE_MSG')+this.data.js.minVal+")");return false;}}}
else if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_PASSWORD&&this.data.js.name!=="password"&&this.data.js.passwordLength)
{var length=RightNow.Text.Encoding.utf8Length(this._inputField.value),minLength=this.data.js.passwordLength;if(length<minLength)
{this._displayError(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_D_CHARACTERS_MSG"),minLength));return false;}}
if(this.data.js.fieldSize)
{var length=RightNow.Text.Encoding.utf8Length(this._inputField.value),maxLength=this.data.js.field_size;if(maxLength<length)
{var extra,errorString,roughMBCS=parseInt(length/(this._inputField.value.length)),numtokExp=new RegExp("%d");if(length%(this._inputField.value.length)!==0)
roughMBCS++;extra=parseInt((length-maxLength)/roughMBCS);errorString=RightNow.Text.sprintf(RightNow.Interface.getMessage("EXCEEDS_SZ_LIMIT_PCT_D_CHARS_PCT_D_LBL"),numtokExp,parseInt(maxLength/roughMBCS));if((length-maxLength)%(roughMBCS)!==0)
extra++;errorString=errorString.replace(numtokExp,extra);this._displayError(errorString);return false;}}
return true;},_checkData:function(silent)
{var angledBracketsRe=/<|>/;if(this._inputField.value!=="")
{if(this._fieldName==="login")
{var spacesRe=/\s/,quotesRe=/["']/;if(spacesRe.test(this._inputField.value))
{if(!silent)
this._displayError(RightNow.Interface.getMessage('CONTAIN_SPACES_PLEASE_TRY_MSG'));return false;}
if(quotesRe.test(this._inputField.value))
{if(!silent)
this._displayError(RightNow.Interface.getMessage('CONTAIN_QUOTE_CHARS_PLEASE_TRY_MSG'));return false;}
if(angledBracketsRe.test(this._inputField.value))
{if(!silent)
this._displayError(RightNow.Interface.getMessage('NOT_CONT_EITHER_GT_LT_MSG'));return false;}}
else if((this._fieldName==="first_name"||this._fieldName==="last_name"))
{if(angledBracketsRe.test(this._inputField.value))
{if(!silent)
this._displayError(RightNow.Interface.getMessage('NOT_CONT_EITHER_GT_LT_MSG'));return false;}}
else if(this._fieldName==="ph_office"||this._fieldName==="ph_fax"||this._fieldName==="ph_home"||this._fieldName==="ph_asst"||this._fieldName==="ph_mobile"||this._fieldName==="postal_code")
{var validInput=new RegExp("^[-A-Za-z0-9,# +.()]+$");if(!validInput.test(this._inputField.value))
{if(!silent)
{if(this._fieldName==="postal_code")
this._displayError(RightNow.Interface.getMessage("PCT_S_IS_AN_INVALID_POSTAL_CODE_MSG"));else
this._displayError(RightNow.Interface.getMessage("PCT_S_IS_AN_INVALID_PHONE_NUMBER_MSG"));}
return false;}}}
return true;},_checkEmail:function(silent)
{if(!(this._fieldName==='email'||this._fieldName==='email_alt1'||this._fieldName==='email_alt2'||this._fieldName==='alternateemail'||this.data.js.email)||this._inputField.value==="")
return true;if(this._fieldName==='alternateemail')
{var status=true;var emailArray=this._inputField.value.split(";");for(var i=0;i<emailArray.length;i++)
{emailArray[i]=YAHOO.lang.trim(emailArray[i]);status=(this._validateEmail(emailArray[i],silent)&&status)?true:false;}
return status;}
else
{return this._validateEmail(this._inputField.value,silent);}},_validateEmail:function(value,silent)
{if(!RightNow.Text.isValidEmailAddress(value))
{if(!silent)
this._displayError(RightNow.Interface.getMessage("PCT_S_IS_INVALID_MSG"));return false;}
return true;},_checkUrl:function(silent)
{if((this.data.js.customID)&&(this.data.js.url)&&!(this._inputField.value===""))
{if(!RightNow.Text.isValidUrl(this._inputField.value))
{if(!silent)
this._displayError(RightNow.Interface.getMessage("IS_NOT_A_VALID_URL_MSG"));return false;}}
return true;},_checkRequired:function()
{if(this.data.attrs.required)
{if(this._inputField.value==="")
{this._displayError(this.data.attrs.label_required);return false;}}
return true;},_getValue:function()
{if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_INT)
{if(this._inputField.value!=="")
return parseInt(this._inputField.value);}
if(this.data.js.mask)
return this._stripMaskFromFieldValue();return this._inputField.value;},_trimField:function()
{if(this._inputField.value!==""&&this.data.js.type!==RightNow.Interface.Constants.EUF_DT_PASSWORD)
this._inputField.value=YAHOO.lang.trim(this._inputField.value);return true;},_initializeHint:function()
{if(YAHOO.widget.Overlay)
{var overlay=document.createElement("span");overlay.id="rn_"+this.instanceID+"_Hint";YAHOO.util.Dom.addClass(overlay,"rn_HintBox");YAHOO.util.Dom.insertAfter(overlay,this._inputField);overlay=new YAHOO.widget.Overlay(overlay,{visible:false});overlay.setBody(this.data.js.hint);overlay.render();YAHOO.util.Event.addListener(this._inputField,"focus",function(){overlay.show();});YAHOO.util.Event.addListener(this._inputField,"blur",function(){overlay.hide();});}
else
{var hint=document.createElement("span");hint.className="rn_HintText";hint.innerHTML=this.data.js.hint;YAHOO.util.Dom.insertBefore(hint,this._inputField);}},_displayError:function(errorMessage)
{var commonErrorDiv=document.getElementById(this._formErrorLocation);if(commonErrorDiv)
{RightNow.UI.Form.errorCount++;if(RightNow.UI.Form.chatSubmit&&RightNow.UI.Form.errorCount===1)
commonErrorDiv.innerHTML="";var errorLink="<div><b><a href='javascript:void(0);' onclick='document.getElementById(\""+this._inputField.id+"\").focus(); return false;'>"+this.data.attrs.label_input+" ";if(errorMessage.indexOf("%s")>-1)
errorLink=RightNow.Text.sprintf(errorMessage,errorLink);else
errorLink=errorLink+errorMessage;errorLink+="</a></b></div> ";commonErrorDiv.innerHTML+=errorLink;}
YAHOO.util.Dom.addClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");},_checkExistingAccount:function()
{if(this._inputField.value===""||this._inputField.value===this.data.js.prev||(this._fieldName.indexOf("email")>-1&&this._inputField.value.toLowerCase()===this.data.js.prev))
return false;if(!this._checkExistingAccount._seenValue)
this._checkExistingAccount._seenValue=this._inputField.value;else if(this._checkExistingAccount._seenValue===this._inputField.value)
return false;else this._checkExistingAccount._seenValue=this._inputField.value;var evtObj=new RightNow.Event.EventObject();if(this._fieldName.indexOf("email")>-1)
evtObj.data.email=this._inputField.value;else if(this._fieldName==="login")
evtObj.data.login=this._inputField.value;evtObj.data.contactToken=this.data.js.contactToken;RightNow.Event.subscribe("evt_formFieldAccountExistsResponse",this._onAccountExistsResponse,this);RightNow.Event.fire("evt_formFieldAccountExistsRequest",evtObj);},_onAccountExistsResponse:function(type,args)
{RightNow.Event.unsubscribe("evt_formFieldAccountExistsResponse",this._onAccountExistsResponse);var results=args[0];if(results!==false&&this._validated===false)
{YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");YAHOO.util.Dom.addClass(this._inputField,"rn_ErrorField");var handleOK=function(){warnDialog.hide();this._onAccountExistsResponse._dialogShowing=false;this._inputField.focus();};var buttons=[{text:RightNow.Interface.getMessage("OK_LBL"),handler:{fn:handleOK,scope:this},isDefault:true}];var dialogBody=document.createElement("div");dialogBody.innerHTML=results.message;var warnDialog=RightNow.UI.Dialog.actionDialog(RightNow.Interface.getMessage("WARNING_LBL"),dialogBody,{"buttons":buttons,"width":"250px"});this._onAccountExistsResponse._dialogShowing=true;warnDialog.show();}
else
{YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");this._validated=false;}
return false;},_onProvinceChange:function(type,args)
{var eventObj=args[0],resetMask=false;if(!eventObj.states.length)
this.data.js.mask="";if((this._fieldName==="postal_code")&&("postal_mask"in eventObj))
{resetMask=true;this.data.js.mask=eventObj.postal_mask;}
else if("phone_mask"in eventObj)
{resetMask=true;this.data.js.mask=eventObj.phone_mask;}
if(resetMask&&this.data.js.mask)
this._initializeMask();else if(this._maskNodeOnPage)
this._maskNodeOnPage.parentNode.removeChild(this._maskNodeOnPage);},_initializeMask:function()
{YAHOO.util.Event.addListener(this._inputField,"keyup",this._compareInputToMask,null,this);YAHOO.util.Event.addListener(this._inputField,"blur",this._hideMaskMessage,null,this);YAHOO.util.Event.addListener(this._inputField,"focus",this._compareInputToMask,null,this);this.data.js.mask=this._createMaskArray(this.data.js.mask);var overlay=document.createElement("div");YAHOO.util.Dom.addClass(overlay,"rn_MaskOverlay");if(YAHOO.widget.Overlay)
{this._maskNode=YAHOO.util.Dom.insertAfter(overlay,this._inputField);this._maskNode=new YAHOO.widget.Overlay(this._maskNode,{visible:false});this._maskNode.cfg.setProperty("context",[this._inputField,"tl","bl",["windowScroll"]]);this._maskNode.setBody("");this._maskNode.render();}
else
{YAHOO.util.Dom.addClass(overlay,"rn_Hidden");this._maskNode=overlay;YAHOO.util.Dom.insertAfter(this._maskNode,this._inputField);}
if(this.data.attrs.always_show_mask)
{var maskMessageOnPage=this._getSimpleMaskString(),widgetContainer=document.getElementById("rn_"+this.instanceID);if(maskMessageOnPage&&widgetContainer)
{var messageNode=document.createElement("div");messageNode.innerHTML=RightNow.Interface.getMessage("EXPECTED_INPUT_LBL")+": "+maskMessageOnPage;YAHOO.util.Dom.addClass(messageNode,'rn_Mask');this._maskNodeOnPage=widgetContainer.appendChild(messageNode);}}},_createMaskArray:function(mask)
{if(!mask)return;var maskArray=[];for(var i=0,j=0,size=mask.length/2;i<size;i++)
{maskArray[i]=mask.substring(j,j+2);j+=2;}
return maskArray;},_stripMaskFromFieldValue:function()
{if(!this.data.js.mask||this._inputField.value==="")
return this._inputField.value;var result="";for(var i=0;i<this._inputField.value.length;i++)
{if(i<this.data.js.mask.length&&this.data.js.mask[i].charAt(0)!=='F')
result+=this._inputField.value.charAt(i);}
return result;},_getSimpleMaskString:function()
{if(!this.data.js.mask)return"";var maskString="";for(var i=0;i<this.data.js.mask.length;i++)
{switch(this.data.js.mask[i].charAt(0)){case"F":maskString+=this.data.js.mask[i].charAt(1);break;case"U":switch(this.data.js.mask[i].charAt(1)){case"#":maskString+="#";break;case"A":case"C":maskString+="@";break;case"L":maskString+="A";break;}
break;case"L":switch(this.data.js.mask[i].charAt(1)){case"#":maskString+="#";break;case"A":case"C":maskString+="@";break;case"L":maskString+="a";break;}
break;case"M":switch(this.data.js.mask[i].charAt(1)){case"#":maskString+="#";break;case"A":case"C":case"L":maskString+="@";break;}
break;}}
return maskString;},_compareInputToMask:function(submitting)
{if(!this.data.js.mask)return true;var error=[];if(this._inputField.value.length>0)
{for(var i=0,tempRegExVal;i<this._inputField.value.length;i++){if(i<this.data.js.mask.length){tempRegExVal="";switch(this.data.js.mask[i].charAt(0)){case'F':if(this._inputField.value.charAt(i)!==this.data.js.mask[i].charAt(1))
error.push([i,this.data.js.mask[i]]);break;case'U':switch(this.data.js.mask[i].charAt(1)){case'#':tempRegExVal=/^[0-9]+$/;break;case'A':tempRegExVal=/^[0-9A-Z]+$/;break;case'L':tempRegExVal=/^[A-Z]+$/;break;case'C':tempRegExVal=/^[^a-z]+$/;break;}
break;case'L':switch(this.data.js.mask[i].charAt(1)){case'#':tempRegExVal=/^[0-9]+$/;break;case'A':tempRegExVal=/^[0-9a-z]+$/;break;case'L':tempRegExVal=/^[a-z]+$/;break;case'C':tempRegExVal=/^[^A-Z]+$/;break;}
break;case'M':switch(this.data.js.mask[i].charAt(1)){case'#':tempRegExVal=/^[0-9]+$/;break;case'A':tempRegExVal=/^[0-9a-zA-Z]+$/;break;case'L':tempRegExVal=/^[a-zA-Z]+$/;break;default:break;}
break;default:break;}
if((tempRegExVal!=="")&&!(tempRegExVal.test(this._inputField.value.charAt(i))))
error.push([i,this.data.js.mask[i]]);}
else
{error.push([i,"LEN"]);}}
if((!error.length)&&(this._inputField.value.length<this.data.js.mask.length)&&(!this.data.attrs.always_show_mask||submitting===true))
{for(var i=this._inputField.value.length;i<this.data.js.mask.length;i++)
error.push([i,"MISS"]);}
if(error.length>0)
{this._showMaskMessage(error);if(submitting===true)
this._displayError(RightNow.Interface.getMessage("PCT_S_DIDNT_MATCH_EXPECTED_INPUT_LBL"));return false;}
this._showMaskMessage(null);return true;}
if(!this.data.attrs.always_show_mask&&submitting!==true)
this._showMaskMessage(error);return true;},_showMaskMessage:function(error)
{if(error===null)
{this._hideMaskMessage();}
else
{if(!this._showMaskMessage._maskMessages)
{this._showMaskMessage._maskMessages={"F":RightNow.Interface.getMessage('WAITING_FOR_CHARACTER_LBL'),"U#":RightNow.Interface.getMessage('PLEASE_TYPE_A_NUMBER_MSG'),"L#":RightNow.Interface.getMessage('PLEASE_TYPE_A_NUMBER_MSG'),"M#":RightNow.Interface.getMessage('PLEASE_TYPE_A_NUMBER_MSG'),"UA":RightNow.Interface.getMessage('PLEASE_ENTER_UPPERCASE_LETTER_MSG'),"UL":RightNow.Interface.getMessage('PLEASE_ENTER_AN_UPPERCASE_LETTER_MSG'),"UC":RightNow.Interface.getMessage('PLS_ENTER_UPPERCASE_LETTER_SPECIAL_MSG'),"LA":RightNow.Interface.getMessage('PLEASE_ENTER_LOWERCASE_LETTER_MSG'),"LL":RightNow.Interface.getMessage('PLEASE_ENTER_A_LOWERCASE_LETTER_MSG'),"LC":RightNow.Interface.getMessage('PLS_ENTER_LOWERCASE_LETTER_SPECIAL_MSG'),"MA":RightNow.Interface.getMessage('PLEASE_ENTER_A_LETTER_OR_A_NUMBER_MSG'),"ML":RightNow.Interface.getMessage('PLEASE_ENTER_A_LETTER_MSG'),"MC":RightNow.Interface.getMessage('PLEASE_ENTER_LETTER_SPECIAL_CHAR_MSG'),"LEN":RightNow.Interface.getMessage('THE_INPUT_IS_TOO_LONG_MSG'),"MISS":RightNow.Interface.getMessage('THE_INPUT_IS_TOO_SHORT_MSG')};}
var message="",sampleMaskString=this._getSimpleMaskString().split("");for(var i=0,type;i<error.length;i++)
{type=error[i][1];if(type.charAt(0)==="F")
{message+="<b>"+RightNow.Interface.getMessage('CHARACTER_LBL')+" "+(error[i][0]+1)+"</b> "+RightNow.Interface.getMessage('WAITING_FOR_CHARACTER_LBL')+type.charAt(1)+" ' <br/>";sampleMaskString[(error[i][0])]="<span style='color:#F00;'>"+sampleMaskString[(error[i][0])]+"</span>";}
else
{if(type!=="MISS")
{message+="<b>"+RightNow.Interface.getMessage('CHARACTER_LBL')+" "+(error[i][0]+1)+"</b> "+this._showMaskMessage._maskMessages[type]+"<br/>";if(type!=="LEN")
{sampleMaskString[(error[i][0])]="<span style='color:#F00;'>"+sampleMaskString[(error[i][0])]+"</span>";}
else
{break;}}}}
sampleMaskString=sampleMaskString.join("");this._setMaskMessage(RightNow.Interface.getMessage('EXPECTED_INPUT_LBL')+": "+sampleMaskString+"<br/>"+message);this._showMask();}},_setMaskMessage:function(message)
{((this._maskNode.body)?this._maskNode.body:this._maskNode).innerHTML=message;},_showMask:function()
{if(this._maskNode.show)
this._maskNode.show();else
YAHOO.util.Dom.removeClass(this._maskNode,"rn_Hidden");},_hideMaskMessage:function()
{if(this._maskNode.cfg&&this._maskNode.cfg.getProperty("visible")!==false)
this._maskNode.hide();else if(!this._maskNode.cfg)
YAHOO.util.Dom.addClass(this._maskNode,"rn_Hidden");}};
RightNow.Widget.FileAttachmentUpload2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._eo.w_id=this.data.info.w_id;this._attachmentCount=this.data.js.attachmentCount||0;this._attachments=[];this._parentForm=RightNow.UI.findParentForm("rn_"+this.instanceID);this._origEncType="";this._attachmentList=null;this._statusMessage=document.getElementById("rn_"+this.instanceID+"_StatusMessage");this._inputField=document.getElementById("rn_"+this.instanceID+"_FileInput");if(!this._inputField)return;YAHOO.util.Event.addListener(this._inputField,"change",this._onFileAdded,null,this);YAHOO.util.Event.addListener(this._inputField,"keypress",this._onKeyPress,null,this);YAHOO.util.Event.addListener(this._inputField,"paste",function(){return false;});if(this._parentForm)
{this._origEncType=document.getElementById(this._parentForm).enctype;RightNow.Event.subscribe("evt_fileUploadResponse",this._fileUploadReturn,this);RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidateUpdate,this);}
else
{RightNow.UI.addDevelopmentHeaderError("FileAttachmentUpload2 must be placed within a form with a unique ID.");}
this.data.attrs.max_attachments=(this.data.attrs.max_attachments===0)?Number.MAX_VALUE:this.data.attrs.max_attachments;if(this._attachmentCount===this.data.attrs.max_attachments)
this._inputField.disabled=true;};RightNow.Widget.FileAttachmentUpload2.prototype={_onKeyPress:function(event)
{if(event.keyCode&&event.keyCode!==9)
{YAHOO.util.Event.stopEvent(event);return false;}},_onFileAdded:function()
{if(this._inputField.value===""||this._uploading)
return false;this._uploading=true;YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_LoadingIcon","rn_Hidden");if(this._statusMessage)
{YAHOO.util.Dom.removeClass(this._statusMessage,"rn_ScreenReaderOnly");this._statusMessage.innerHTML=RightNow.Interface.getMessage("UPLOADING_ELLIPSIS_MSG");}
var parentForm=document.getElementById(this._parentForm);parentForm.enctype=parentForm.encoding="multipart/form-data";YAHOO.util.Connect.setForm(parentForm,true);RightNow.Event.fire("evt_fileUploadRequest",this._eo);},_fileUploadReturn:function(type,response)
{YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_LoadingIcon","rn_Hidden");if(this._statusMessage)
{YAHOO.util.Dom.addClass(this._statusMessage,"rn_ScreenReaderOnly");this._statusMessage.innerHTML=RightNow.Interface.getMessage("FILE_UPLOAD_COMPLETE_LBL");this._statusMessage.tabIndex=0;RightNow.UI.updateVirtualBuffer();this._statusMessage.focus();}
this._inputField.value="";if(YAHOO.env.ua.ie)
{var inputField=this._inputField.cloneNode(false);this._inputField.parentNode.replaceChild(inputField,this._inputField);this._inputField=document.getElementById(inputField.id);}
var parentForm=document.getElementById(this._parentForm);parentForm.enctype=parentForm.encoding=this._origEncType;var attachmentInfo=response[0],displayLimitMessage=false;this._uploading=false;if(!attachmentInfo)
{RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("ERROR_REQUEST_ACTION_COMPLETED_MSG"),{icon:"WARN"});return;}
else if(attachmentInfo.error===2)
{RightNow.UI.Dialog.messageDialog(this.data.attrs.label_generic_error,{icon:"WARN"});return;}
else if(attachmentInfo.error===4||attachmentInfo.error===88)
{RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("FILE_PATH_FOUND_MSG"),{icon:"WARN"});return;}
else if(attachmentInfo.error==10)
{RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("FILE_ATT_UPLOAD_EMPTY_PLS_ENSURE_MSG"));return;}
else if(attachmentInfo.errorMessage)
{RightNow.UI.Dialog.messageDialog(attachmentInfo.errorMessage,{icon:"WARN"});return;}
this._attachmentCount++;if(this._attachmentCount===this.data.attrs.max_attachments)
{this._inputField.disabled=true;displayLimitMessage=true;}
else if(this._attachmentCount>this.data.attrs.max_attachments)
{this._inputField.disabled=true;return;}
attachmentInfo.name=attachmentInfo.name.replace("&amp;","&");var nextAttachment={"name":attachmentInfo.name,"tmp_name":attachmentInfo.tmp_name,"type":attachmentInfo.type,"size":attachmentInfo.size};this._attachments.push(nextAttachment);attachmentInfo.size/=1024;attachmentInfo.size=Math.round(attachmentInfo.size*100)/100;if(!this._attachmentList)
this._attachmentList=YAHOO.util.Dom.insertAfter(document.createElement("ul"),this._statusMessage);this._attachmentList.innerHTML+="<li>"+attachmentInfo.name+"&nbsp;("+attachmentInfo.size+"K)&nbsp;<a href='' onclick='RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").removeClick(this, "+(this._attachments.length-1)+");return false;'/>"+this.data.attrs.label_remove+" <span class='rn_ScreenReaderOnly'>"+attachmentInfo.name+"</span></a></li>";if(displayLimitMessage)
this._attachmentList.innerHTML+="<li>"+this.data.attrs.label_max_attachment_limit+"</li>";},removeClick:function(item,index)
{this._attachments[index]=null;item.parentNode.parentNode.removeChild(item.parentNode);if(this._statusMessage)
{this._statusMessage.innerHTML=RightNow.Interface.getMessage("FILE_DELETED_LBL");YAHOO.util.Dom.addClass(this._statusMessage,"rn_ScreenReaderOnly");this._statusMessage.tabIndex=0;RightNow.UI.updateVirtualBuffer();this._statusMessage.focus();}
this._attachmentCount--;this._inputField.disabled=false;if(this._attachmentCount===this.data.attrs.max_attachments-1)
this._attachmentList.removeChild(this._attachmentList.lastChild);},_onValidateUpdate:function(type,args)
{var results=null,fattachIndex=0;if(this._attachmentCount>0)
{results={};for(var i=0,fileAttachment;i<this._attachments.length;i++)
{if(this._attachments[i]!=null)
{fileAttachment={"localfname":this._attachments[i].tmp_name,"action":RightNow.Interface.Constants.ACTION_ADD,"size":this._attachments[i].size,"private":0,"userfname":this._attachments[i].name};if(this._attachments[i].type)
fileAttachment.content_type=this._attachments[i].type;else
fileAttachment.content_type="application/octet-stream";results["fattach_item"+fattachIndex]=fileAttachment;fattachIndex++;}}}
this._eo.data={"name":"fattach","value":results,"custom":"false","table":"incidents","required":false,"form":this._parentForm};this._eo.w_id=this.data.info.w_id;RightNow.Event.fire("evt_formFieldValidateResponse",this._eo);RightNow.Event.fire("evt_formFieldCountRequest");}};
RightNow.Widget.FormSubmit=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._requestInProgress=false;this._formButton=document.getElementById("rn_"+this.instanceID+"_Button");this._formSubmitFlag=document.getElementById("rn_"+this.instanceID+"_Submission");this._challengeDivID=this.data.attrs.challenge_location;if(!this._formButton||!this._formSubmitFlag)return;this._statusMessage=document.getElementById("rn_"+this.instanceID+"_StatusMessage");this._parentForm=RightNow.UI.findParentForm("rn_"+this.instanceID);this._errorMessageDiv=document.getElementById(this.data.attrs.error_location);if(!this._errorMessageDiv)
{var errorNode=document.createElement("div");errorNode.id="rn_"+this.instanceID+"_ErrorLocation";this._errorMessageDiv=YAHOO.util.Dom.insertBefore(errorNode,this._formButton);}
this._errorMessageDiv.tabIndex=-1;if(this.data.js.challengeProvider)
{try{this._challengeProvider=eval(data.js.challengeProvider);}
catch(ex){throw"Failed while trying to parse a challenge provider.  "+ex;}
this._createChallengeDiv();this._challengeProvider.create(this._challengeDivID,RightNow.UI.AbuseDetection.options);RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidateChallengeResponse,this);}
if(this._formSubmitFlag.value==="true")
{this._formButton.disabled=true;return;}
if(this._parentForm)
{this._enableClickListener();RightNow.Event.subscribe("evt_formButtonSubmitResponse",this._formSubmitResponse,this);RightNow.Event.subscribe("evt_formValidatedResponse",this._onFormValidated,this);RightNow.Event.subscribe("evt_formFailValidationResponse",this._onFormValidationFail,this);RightNow.Event.subscribe("evt_fileUploadRequest",this._disableClickListener,this);RightNow.Event.subscribe("evt_fileUploadResponse",this._enableClickListener,this);RightNow.Event.subscribe("evt_submitFormRequest",this._onButtonClick,this);}
else
{RightNow.UI.addDevelopmentHeaderError('FormSubmit must be placed within a form with a unique ID.');}};RightNow.Widget.FormSubmit.prototype={_onButtonClick:function(type,args)
{if(this._requestInProgress)return false;this._disableClickListener();this._statusMessage.innerHTML="";YAHOO.util.Dom.addClass(this._errorMessageDiv,"rn_Hidden");this._errorMessageDiv.innerHTML="";var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;eo.data={"form":this._parentForm,"error_location":this._errorMessageDiv.id,"f_tok":this.data.js.f_tok};if(this._challengeDivID){eo.challengeHandler=RightNow.Event.createDelegate(this,this._challengeHandler);}
if(YAHOO.env.ua.ie!==0)
if(window.external&&"AutoCompleteSaveForm"in window.external)
window.external.AutoCompleteSaveForm(document.getElementById(this._parentForm));RightNow.Event.fire("evt_formButtonSubmitRequest",eo);},_reportChallengeError:function(errorMessage){if(!errorMessage){errorMessage=RightNow.Interface.getMessage("PLS_VERIFY_REQ_ENTERING_TEXT_IMG_MSG");}
var errorLinkAnchorID="rn_ChallengeErrorLink",errorLink="<div><b><a id ='"+errorLinkAnchorID+"' href='javascript:void(0);'>"+errorMessage+"</a></b></div>";RightNow.UI.Form.errorCount++;if(RightNow.UI.Form.chatSubmit&&RightNow.UI.Form.errorCount===1)
this._errorMessageDiv.innerHTML="";this._errorMessageDiv.innerHTML+=errorLink;document.getElementById(errorLinkAnchorID).onclick=RightNow.Event.createDelegate(this,function(){this._challengeProvider.focus();return false;});},_createChallengeDiv:function(){var challengeDiv=document.getElementById(this._challengeDivID);if(!challengeDiv){challengeDiv=document.createElement("div");challengeDiv.id=this._challengeDivID;YAHOO.util.Dom.insertBefore(challengeDiv,this._formButton);}},_challengeHandler:function(abuseResponse,requestObject,isRetry){this._createChallengeDiv();if(!this._challengeProvider){this._challengeProvider=RightNow.UI.AbuseDetection.getChallengeProvider(abuseResponse);RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidateChallengeResponse,this);}
this._clearLoadingIndicators();this._challengeProvider.create(this._challengeDivID,RightNow.UI.AbuseDetection.options);this._reportChallengeError(RightNow.UI.AbuseDetection.getDialogCaption(abuseResponse));this._onFormValidationFail();},_onValidateChallengeResponse:function()
{var inputs=this._challengeProvider.getInputs(this._challengeDivID);if(inputs.abuse_challenge_response)
{for(var key in inputs)
{if(inputs.hasOwnProperty(key))
{RightNow.Ajax.addRequestData(key,inputs[key]);}}
var eo=new RightNow.Event.EventObject();eo.data={form:false};RightNow.Event.fire("evt_formFieldValidateResponse",eo);}
else
{this._reportChallengeError();RightNow.UI.Form.formError=true;}
RightNow.Event.fire("evt_formFieldCountRequest");},_onFormValidated:function()
{if(RightNow.UI.Form.form===this._parentForm&&RightNow.UI.Form.formFields.length>0)
{YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_LoadingIcon","rn_Hidden");if(this._statusMessage)
this._statusMessage.innerHTML=RightNow.Interface.getMessage('SUBMITTING_ELLIPSIS_MSG');}},_onFormValidationFail:function()
{YAHOO.util.Dom.addClass(this._errorMessageDiv,"rn_MessageBox");YAHOO.util.Dom.addClass(this._errorMessageDiv,"rn_ErrorMessage");YAHOO.util.Dom.removeClass(this._errorMessageDiv,"rn_Hidden");if(this._errorMessageDiv.tabIndex===0)
{this._errorMessageDiv.focus();}
else
{var firstField=YAHOO.util.Dom.getElementBy(function(e){return true;},"A",this._errorMessageDiv);if(firstField&&firstField.focus)
{firstField.focus();}
else
{var errorDivCoord=YAHOO.util.Dom.getXY(this._errorMessageDiv),viewRegion=YAHOO.util.Dom.getClientRegion();if(!viewRegion.contains(new YAHOO.util.Point(errorDivCoord[0],errorDivCoord[1])))
window.scrollTo(0,errorDivCoord[1]);}}
this._enableClickListener();},_formSubmitResponse:function(type,args)
{var result=args[0];if(!result)
{if(this._statusMessage)
{this._statusMessage.innerHTML=RightNow.Interface.getMessage('ERROR_REQUEST_ACTION_COMPLETED_MSG');}
RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage('ERROR_REQUEST_ACTION_COMPLETED_MSG'),{icon:"WARN"});}
else if(result.sa)
{if(result.newFormToken)
this.data.js.f_tok=result.newFormToken;for(var i in result.sa)
{if(typeof result.sa[i].add_flag!=="undefined"&&result.sa[i].add_flag==false)
{this._disableClickListener();document.getElementById("rn_"+this.instanceID).innerHTML="";return;}}}
else if(result.status===1)
{this._formSubmitFlag.value="true";this._navigateToUrl=function()
{if(result.redirectOverride)
{RightNow.Url.navigate(result.redirectOverride+result.sessionParm);}
else if(this.data.attrs.on_success_url)
{if(result.i_id)
{RightNow.Url.navigate(this.data.attrs.on_success_url+"/i_id/"+result.i_id+result.sessionParm);}
else if(result.refno)
{RightNow.Url.navigate(this.data.attrs.on_success_url+'/refno/'+result.refno+result.sessionParm);}
else
{var sessionValue=result.sessionParm.substr(result.sessionParm.lastIndexOf("/")+1);if(!sessionValue&&this.data.js.redirectSession)
sessionValue=this.data.js.redirectSession;RightNow.Url.navigate(RightNow.Url.addParameter(this.data.attrs.on_success_url,'session',sessionValue));}}
else
{RightNow.Url.navigate(window.location+result.sessionParm);}};if(this.data.attrs.label_confirm_dialog!=='')
{var confirmDialog=RightNow.UI.Dialog.messageDialog(this.data.attrs.label_confirm_dialog,{exitCallback:{fn:this._navigateToUrl,scope:this},width:'250px'});confirmDialog.show();}
else
{this._navigateToUrl();return;}}
else if(result.status==-1)
{RightNow.Url.navigate("/app/error/error_id/5"+result.sessionParm);}
else
{if(result.message)
{this._errorMessageDiv.innerHTML+="<div><b>"+result.message+"</b></div>";this._errorMessageDiv.tabIndex=0;this._onFormValidationFail();this._errorMessageDiv.tabIndex=-1;}
else
{RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage('ERROR_PAGE_PLEASE_S_TRY_MSG'),{icon:"WARN"});}}
this._clearLoadingIndicators();},_clearLoadingIndicators:function(){this._enableClickListener();YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_LoadingIcon","rn_Hidden");if(this._statusMessage)
this._statusMessage.innerHTML="";},_enableClickListener:function()
{this._formButton.disabled=this._requestInProgress=false;YAHOO.util.Event.addListener(this._formButton,"click",this._onButtonClick,null,this);},_disableClickListener:function()
{this._formButton.disabled=this._requestInProgress=true;YAHOO.util.Event.removeListener(this._formButton,"click",this._onButtonClick);}};