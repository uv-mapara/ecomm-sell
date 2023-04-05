/*START - SAVE DATA OPERATIONS*/
$(".btnSubmit").click(function () {
    signup();  
});
function signup() { 
    var ErrMsg = '';    

    if ($("#firstname").val().trim() == '') {
        ErrMsg += '<br/>-- Firstname.';
    }  
    if ($("#lastname").val().trim() == '') {
        ErrMsg += '<br/>-- Lastname.';
    }   
    if ($('#email').val().trim() == '') {
        ErrMsg += '<br/>-- E-mail ID.';
    }
    else {
        var Valid = validateEmail($("#email").val().trim());
        if (!Valid) {
            ErrMsg += '<br/>-- Invalid E-mail ID.';
        }       
    } 

    if ($("#phone").val().trim() == '') {
        ErrMsg += '<br/>-- Mobile.';
    }  
     
    if ($("#password").val().trim() == '') {
        ErrMsg += '<br/>-- Password.';
    }
    
    if ($("#confirmpassword").val().trim() == '') {
        ErrMsg += '<br/>-- Confirm Password.';
    }
    
    else{
        if ($("#password").val() != $("#confirmpassword").val()) {
            ErrMsg += '<br/>-- Password Does not Match.';
        }
    }

    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
    }
    
    else{         
        ShowLoader(); 
        $.ajax({
            url: '',
            type:'POST',
            data: {
                firstname:$('#firstname').val(),
                lastname:$('#lastname').val(),
                email:$('#email').val(),
                mobile:$('#phone').val(),
                password:$('#password').val(),
                confirmpassword:$('#confirmpassword').val(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
              },
            dataType: 'json',
            success: function(resp) {             
                HideMessage("DivDisplayMsg"); 
                setTimeout(HideLoader,2000);      
                
                if(resp.opstatus ==  "Error"){                    
                    setTimeout(function(){
                        email="-- Email has already Exist."
                        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + email, 0);                       
                    },2000)                                        
                }   
                else
                {                   
                    setTimeout(function(){
                        window.location.href = "SignupAuthentication";
                    },2000)
                    $("#firstname").val('');             
                    $("#lastname").val('');             
                    $("#email").val('');
                    $("#phone").val('');
                    $("#password").val('');
                    $("#confirmpassword").val('');
                }                                         
            },
        });          
    } 
}   
/*END - SAVE DATA OPERATIONS*/