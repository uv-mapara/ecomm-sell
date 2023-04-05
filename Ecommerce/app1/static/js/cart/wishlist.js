function SaveAddToCart(ele){  
    addcart =  $(ele).attr('id');   
     $.ajax({
       url: '/addtocart/' + addcart + '/',  
       type:"POST",
       data: {                   
          addcart:addcart,
          csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
       },            
       success: function (resp) {
         console.log(resp.optstatus)              
         if(resp.optstatus == 'added'){
            HideToastrMsg();
            ShowToastrMsg("Success", "toast-top-full-width", "Cart Added SuccessFully.", "", 15000);
         }    
         else{
             window.location.href = "/show_wishlist/";
         }    
       },            
     }); 
 }


 function deleteWishlist(ele){
    delWishlist = $(ele).attr('id');
    console.log(delWishlist)
    $.ajax({
        url: '/delete_to_wishlist/' + delWishlist + '/',            
        data: {                   
          delWishlist:delWishlist,
        },            
        success: function (resp) {
          console.log(resp.optstatus)              
          if(resp.optstatus == 'success'){
            window.location.href = "/show_wishlist/"
          }
        },            
    }); 
 }