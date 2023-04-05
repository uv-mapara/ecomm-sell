/*START - OTP DATA OPERATIONS*/
$(".btnSubmit").click(function () {    
    Otp();  
});
function Otp() {        
    var ErrMsg = '';    

    if ($("#otp").val().trim() == '') {
        ErrMsg += '<br/>-- Otp.';
    }   
    
    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
    }
    
    else{         
        var otp = $('#otp').val().trim();     
        ShowLoader();           
        $.ajax({
            type:'POST',
            url:'/forgotOtp/',
            data:{
                otp : otp,                
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),              
            },
            success:function(resp){                
                $('#otp').val('');                   
                HideMessage('DivDisplayMsg');                                  
                if(resp.optstatus == 'Success'){ 
                    HideLoader();    
                    $("#email").val('');           
                    window.location.href = "/newpassword"
                } 
                else if(resp.opstatus ==  "Wrong"){ 
                    HideLoader();
                    $("#email").val('');                                       
                    email="-- Email Not Exist."
                    ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + email, 0);                                                                                 
                }                
            }
        })         
    } 
}   
/*END - OTP DATA OPERATIONS*/

/*START - OTP DATA OPERATIONS*/
$("#btnResendOtp").click(function () {
    Otp();  
});

/*END - OTP DATA OPERATIONS*/