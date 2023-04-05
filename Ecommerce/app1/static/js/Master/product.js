// In this function every menu which has an active link opens if a link is active. Its ul parent opens itself and adds the class 'open' to its parent (the arrow) so it turns 90 degrees
$('.pagenav li').each(function (i, el) {
    if ($(el).hasClass('current_page_item')) {
        $(el).parent().show().parent().addClass('open');
    };
});

// This function ensures that a menu pops open when you click on it. All other menu's automatically close if the user clicks on a ul header. All the opened ul's close except the one clicked on
$('.accordion h4').click(function (event) {
    $('.accordion > ul > li > ul:visible').not($(this).nextAll('ul')).stop().hide(200).parent().removeClass('open'); //
    $(this).nextAll('ul').slideToggle(200, function () {
        $(this).parent('.pagenav').toggleClass('open');
    });
});

function MinusQuantity(ele) {
    if ($(ele).next().val() > 1) {
        if ($(ele).next().val() > 1) $(ele).next().val(+$(ele).next().val() - 1);
    }
}

function AddQuantity(ele) {
    stock = $(ele).next('.product-stock').attr('id');    
    if ($(ele).prev().val() < stock) {
        $(ele).prev().val(+$(ele).prev().val() + 1);
    }
}


function SaveAddToCart(ele) {
    addcart = $(ele).attr('id');
    quantity = $('.input-qty').val();
    $.ajax({
        url: '/addtocart/' + addcart + '/',
        type: "POST",
        data: {
            quantity: quantity,
            addcart: addcart,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (resp) {            
            if (resp.optstatus == 'added') {                
                /*window.location.href = window.location.href;*/
                HideToastrMsg();                
                ShowToastrMsg("Success", "toast-top-full-width", "Cart Added SuccessFully.", "", 15000);
            }
            else if (resp.optstatus == 'exists') {                
                HideToastrMsg();                
                window.location.href = window.location.href;
            }
            else {
                window.location.href = '/login/';
            }
        },
    });
}

function SubmitWishlist(ele) {
    var submitWishlist = $(ele).attr('id');
    if ($(ele).hasClass('fa-heart-o')) {
        $.ajax({
            url: '/add_to_wishlist/' + submitWishlist + '/',
            type: "POST",
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function (resp) {
                console.log(resp.optstatus)
                if (resp.optstatus == 'success') {
                    window.location.href = window.location.href
                }
            },
        });
    }
    else {
        $.ajax({
            url: '/delete_to_wishlist/' + submitWishlist + '/',
            data: {
                'submitWishlist': submitWishlist,
            },
            success: function (resp) {
                console.log(resp.optstatus)
                if (resp.optstatus == 'success') {
                    window.location.href = window.location.href
                }
            },
        });
    }
}


