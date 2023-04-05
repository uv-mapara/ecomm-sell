/*START - VALIDATE TEXTBOX VALUES*/
var objUsername = ".0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
var objAlphaNumeric = ".0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz_-/()*#@!:;<>$%^&? ";
var objAlphaNumericWithNoSpace = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var objAlphaNumericWithSpace = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
var objAlphaNumericComments = ".0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-/(),*#@!:;~<>$%^&? ";
var objAlphaNumericCommentsNoComma = ".0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-/()*#@!:;<>$%^&? ";
var objAlphaNumericAddress = ".0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-/(),*#@!:;~<>$%^&? ";
var objAlphaNumericAddresswithslash = ".0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-/(),*#@!:;~<>$%^&?\\ ";
var objNumber = ".0123456789";
var objFinancialYear = "0123456789-";
var objMoney = ".,0123456789";
var objWholeNumber = "0123456789";
var objMobileNumber = "0123456789+-";
var objPhone = "-()0123456789 ";
var objGeoLoc = "0123456789-.";
var objEmail = ".0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz@";
var Obj0To4 = "01234";
var objPassword = ".0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz_-/()*#@!;<>$%^&?";
var objNum1to9 = "123456789";
var objAlphaAToFNumberic = "ABCDEFabcdef0123456789";
var objAlphaNumWithUnderScore = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
var objEmailAsUsername = ".0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz@-";
var objUpperAplhaNumeric = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var objFloatNumber = "-.0123456789";
var objAlphaNumSlashWithNoSpace = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/";
var objBookBookingRefNo = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-";
function isRule(oComp, sRule, nLength, fdecimal) {
    if (fdecimal == "" || typeof (fdecimal) == "undefined") { fdecimal = false; }

    //If the object is not specified return false
    if (typeof (oComp) == 'undefined' || oComp == null || oComp == '') {
        alert('Error: Input object not specified.');
        return false;
    }
        //If neither rule nor max length is specified, return false
    else if (typeof (sRule) == 'undefined' && typeof (nLength) == 'undefined') {
        alert('Error: No rule/maximum length for input object specified.');
        return false;
    }

    var noErrorFlg = true;

    //If object is specified and either of rule is specified,
    if (typeof (sRule) != 'undefined' && sRule != null) {
        var temp;
        sRule = sRule + "";
        var discardChars = false;
        if (sRule.length > 0 && sRule.charAt(0) == "~") { sRule = sRule.substring(1); discardChars = true; }

        if (typeof (oComp) == "undefined" || typeof (sRule) == "undefined") { return false; }

        for (var i = 0; i < oComp.value.length; i++) {
            temp = oComp.value.charAt(i);

            if ((!discardChars && sRule.indexOf(temp) == -1) || (discardChars && sRule.indexOf(temp) >= 0)) {
                //alert("Field disobeys entry rule.  Following are the valid characters:\n" + sRule);
                //alert("Invalid Character!");
                oComp.value = oComp.value.substring(0, i);// + (oComp.value.length > i ? oComp.value.substring(i+1):"");
                noErrorFlg = false;
                break;
            }
        }
    }

    if (nLength) {
        if (fdecimal) {
            nLength -= fdecimal;
            var dp = oComp.value.indexOf(".");
            var p1;
            var p2 = "";
            if (dp >= 0) { p1 = oComp.value.substring(0, dp); p2 = oComp.value.substring(dp + 1); }
            else { p1 = oComp.value; }

            if (p1.length > nLength) {
                oComp.value = oComp.value.substring(0, nLength);
                return noErrorFlg;
            }
            for (var i = 0; i < p2.length; i++) {
                var ch = p2.charAt(i);
                if (ch < '0' || ch > '9') { oComp.value = p1 + "." + p2.substring(0, i); return noErrorFlg; }
            }
            if (p2.length > fdecimal) { oComp.value = p1 + "." + p2.substring(0, fdecimal); }
        } else if (oComp.value.length > nLength) {
            oComp.value = oComp.value.substring(0, nLength);
        }
    }
    return noErrorFlg;
}
/*END - VALIDATE TEXTBOX VALUES*/

/*START - VALIDATE E-MAIL FUNCTIONALITY*/
var validateEmail = function (elementValue) {
    //var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z0-9._%+-]/; //--WORKING
    return emailPattern.test(elementValue);
}
/*END - VALIDATE E-MAIL FUNCTIONALITY*/

/* START - NAVBA-MENU ACTIVE OPERATION */
$(document).ready(function () {  
    $(".menu-active").click(function (){
      $(this).addClass("active").siblings().removeClass("active");
    });
});
/* END - NAVBA-MENU ACTIVE OPERATION */

/*START - SHOW & HIDE ALL TYPES OF MESSAGES*/
function ShowMessage(DivId, MsgType, MsgHeading, MsgText, MsgTimeout) {
    //alert(DivId + ',' + MsgType + ',' + MsgHeading + ',' + MsgText + ',' + MsgTimeout);
    $("#" + DivId).show();
    $("#" + DivId).addClass(MsgType);
    $("#SpnMsgHeader").text(MsgHeading);
    $("#SpnErrorMsg").html(MsgText);
    if (MsgTimeout == 0) {
        $("#" + DivId).show();
    }
    else {
        $("#" + DivId).fadeOut(MsgTimeout);
    }
}

function HideMessage(DivId) {
    //alert(DivId);
    $("#" + DivId).hide();
    $("#" + DivId).removeClass();
}
/*END - SHOW & HIDE ALL TYPES OF MESSAGES*/

/* START BOOTSTRAP ALERT CLOSE BUTTON */
$('.close').click(function(){
    HideMessage('DivDisplayMsg');
})
/* END BOOTSTRAP ALERT CLOSE BUTTON */


/*START - SHOW & HIDE LOADER*/
    function ShowLoader(LdrText) {
        if (LdrText != "") {
            $('.LoaderText').text(LdrText);
            $(".se-pre-con").show();
        }
        else {
            $('.LoaderText').text('Please Wait...');
            $(".se-pre-con").show();
        }
    }

    function HideLoader(LdrText) {
        // $('.LoaderText').text('Please Wait...');
        $('.LoaderText').text(LdrText);
        $(".se-pre-con").hide();
    }
/*END - SHOW & HIDE LOADER*/    

setTimeout(function(){
    if ($('#msg').length > 0) {
      $('#msg').remove();
    }
}, 2000)



/*START - SHOW & HIDE ALL TYPES OF TOASTER MESSAGES*/
function ShowToastrMsg(MsgType, MsgPosition, MsgText, MsgTimeOut) {
    toastr.options =
    {
        "closeButton": true,
        "debug": false,
        "positionClass": MsgPosition,
        "onclick": null,
        "showEasing": "linear",
        "showMethod": "show",
        "timeOut": MsgTimeOut
    }
    if (MsgType == 'Success') {
        toastr.success(MsgText, 'Success');
    } else if (MsgType == 'Error') {
        toastr.error(MsgText, 'Error');
    } else if (MsgType == 'Warning') {
        toastr.warning(MsgText, 'Warning');
    } else {
        toastr.info(MsgText, 'Information');
    }
}

function HideToastrMsg() {
    toastr.clear();
}
/*END - SHOW & HIDE ALL TYPES OF TOASTER MESSAGES*/



$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload(); 
    }
});