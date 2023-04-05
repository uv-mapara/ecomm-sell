/*START - SAVE DATA OPERATIONS*/
$(".btnSubmit").click(function () {    
    Save();  
});
function Save() { 
    var ErrMsg = '';    
     
    if ($('#newpassword').val().trim() == '') {
        ErrMsg += '<br/>-- New Password.';
    }          
    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
    }
    
    else{        
        newpassword = $('#newpassword').val().trim(),      
        ShowLoader();         
        $.ajax({
            url: '/newpassword/',            
            type:'POST',
            data: {                
                newpassword:newpassword,               
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),   
            },            
            success: function(resp) {                
                HideMessage("DivDisplayMsg");                    
                if(resp.optstatus == "Success"){
                    HideLoader()                                        ;
                    window.location.href = '/login/';                                 
                    $("#email").val('');                                        
                }
                else if(resp.optstatus == 'SecondTime'){
                    var pass = 'You cant change the password';
                    HideLoader();
                    HideMessage();
                    ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + pass , 0);
                }                                                                                                                                                            
            },
        });          
    } 
}   
/*END - SAVE DATA OPERATIONS*/