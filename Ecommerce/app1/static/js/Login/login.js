$('.btnSubmit').click(function(){    
    ShowLoader();    
    $.ajax({
        url: '',
        type: 'POST',  
        data: {         
            email:$('#email').val(),                
            password:$('#pass').val(),                
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),     
        },
        dataType: "json",              
        success: function(resp){ 
            console.log(resp)            
            if(resp.optstatus=='success'){
                HideLoader();
                $('#email').val(),                
                $('#pass').val(),
                window.location.href = "/";                 
            }
            else if(resp.optstatus=='error')
            {
                HideLoader();
                window.location.href = "login";                
            }
        }
    }); 
})

var sub, user, pass, mainContent, loggedIn;
var loggedIn = document.querySelector('.logged-in')

function _(x) {
  return document.getElementById(x);
}

sub = _('submit');
user = _('user-name');
pass = _('user-pass');
mainContent = _('main');
loggedIn = _('logged-in');

sub.addEventListener('click', login);

function login(event) {
  event.preventDefault();
  var userValue = user.value;
  var passValue = pass.value;
  
  if (userValue.length >= 3 && passValue.length >= 3) {_
      mainContent.classList.add('login-true');
      loggedIn.style.display = 'block';
      loggedIn.innerHTML = '<h2>Welcome, ' + userValue + '</h2>';
   } else {
     alert('Username and Password must contain at least 3 characters.')
   }
}