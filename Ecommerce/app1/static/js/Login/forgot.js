/*START - SAVE DATA OPERATIONS*/
$(".btnSubmit").click(function () {
    Forgot();  
});
function Forgot() { 
    var ErrMsg = '';    
     
    if ($('#email').val().trim() == '') {
        ErrMsg += '<br/>-- E-mail ID.';
    }      

    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
    }
    
    else{    
        var email = $('#email').val().trim();     
        ShowLoader();             
        $.ajax({
            type:'POST',
            url:'/forgot_password/',
            data:{
                email : email,                
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),             
            },
            success:function(resp){
                $('#email').val('');                   
                HideMessage('DivDisplayMsg');  
                console.log(resp);
                
                if(resp.optstatus == 'Success'){ 
                    HideLoader();   
                    $("#email").val('');           
                    window.location.href = "/forgotOtp"
                } 
                else if(resp.opstatus ==  "Error"){ 
                    HideLoader();
                    $("#email").val('');                                       
                    email="-- Email Not Exist."
                    ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + email, 0);                                                                                 
                }                
            }
        })      
        // $.ajax({
        //     type:'POST',
        //     url:'/forgot_password/',
        //     data:{
        //         email : email,                
        //         csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),             
        //     },            
        //     success: function(resp) {                                                        
        //         HideMessage("DivDisplayMsg"); 
        //         setTimeout(HideLoader,2000);      
        //         console.log(resp)
        //         if(resp.opstatus ==  "Success"){                    
        //             setTimeout(function(){
        //                 window.location.href = "forgotOtp";
        //             },2000)                                 
        //             $("#email").val('');                                        
        //         }  
        //         else if(resp.opstatus ==  "Error"){                    
        //             setTimeout(function(){
        //                 email="-- Email Not Exist."
        //                 ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + email, 0);                       
        //             },2000)                                        
        //         }                                                                                        
        //     },
        // });          
    } 
}   
/*END - SAVE DATA OPERATIONS*/