// /*START - SAVE DATA OPERATIONS*/
// $(".btnSubmit").click(function () {
//     Otp();
// });
// function Otp() { 
//     var ErrMsg = '';    

//     if ($("#otp").val().trim() == '') {
//         ErrMsg += '<br/>-- OTP.';
//     }      
//     if (ErrMsg.length != 0) {
//         ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
//     }
    
//     else{         
//         ShowLoader(); 
//         $.ajax({
//             url: '/register/SignupAuthentication/',
//             type:'POST',
//             data: {
//                 otp:$('#otp').val(),                
//                 csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
//             },
//             dataType: 'json',
//             success: function(resp) {                                            
//                 HideMessage("DivDisplayMsg"); 
//                 setTimeout(HideLoader,2000);
//                 if(resp.opstatus ==  "Success"){                    
//                   setTimeout(function(){
//                       window.location.href = "/login";
//                   },2000)                                 
//                   $("#otp").val('');                                        
//                  }
//                  if(resp.opstatus !=  "Success")
//                  {                  
//                   setTimeout(function(){
//                       otp="-- OTP Wrong."
//                           ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + otp, 0);                       
//                       },2000)
//                  }
//             },
//         });           
//     } 
// }   
// /*END - SAVE DATA OPERATIONS*/