//$('input:radio[name=Payment]').click(function () {
//    $("input:radio[name=Cash]").prop("checked", false)
//});
//$('input:radio[name=Cash]').click(function () {
//    $("input:radio[name=Payment]").prop("checked", false)
//});


$('#btnSubmit').click(function (e) {
    var ErrMsg = '';

    // FOR SINGLE SELECT DROPDOWN VALIDATION
    if ($("#country option:selected").val() == 0) {
        ErrMsg += '<br/>-- Country.';
    }
    if ($("#address").val().trim() == '') {
        ErrMsg += '<br/>-- Address.';
    }
    if ($("#city").val().trim() == '') {
        ErrMsg += '<br/>-- City.';
    }
    if ($("#state").val().trim() == '') {
        ErrMsg += '<br/>-- State.';
    }
    if ($("#postcode").val().trim() == '') {
        ErrMsg += '<br/>-- Postcode.';
    }
    if ($("#phone").val().trim() == '') {
        ErrMsg += '<br/>-- Phone.';
    }
    if (ErrMsg.length != 0) {
        ShowMessage('DivDisplayMsg', "alert alert-warning TextBlack", "Please check below.", '<br/>' + ErrMsg, 0);
    }

    else {
        var totalamount = $('#amount').val().trim();
        var order_id = $('#order_id').val().trim();
        var firstname = $('#firstname').val().trim();
        var email = $('#email').val().trim();
        console.log(totalamount)
        var options = {
            "key": "rzp_test_rcgMRmUfjVOdI3",
            // "amount": totalamount*100, 
            "amount": 1,
            "currency": "INR",
            "name": "U R Developer",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order_id,
            // "callback_url": "http://127.0.0.1:8000/cart/checkout/success/",        
            "handler": function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                SaveData();
            },
            "prefill": {
                "name": firstname,
                "email": email,
                "contact": "9999999999"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();
    }
});

function SaveData() {
    var firstname = $("#firstname").val().trim();
    var order_id = $("#order_id").val().trim();
    var amount = $("#amount").val().trim();
    var lastname = $("#lastname").val().trim();
    var payment = $("#payment").val().trim();
    var country = $("#country").val().trim();
    var address = $("#address").val().trim();
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var postcode = $("#postcode").val().trim();
    var phone = $("#phone").val().trim();
    var email = $("#email").val().trim();    

    ShowLoader();
    $.ajax({
        type: 'POST',
        url: '/cart/checkout/',
        data: {
            firstname: firstname,
            order_id: order_id,
            amount: amount,
            lastname: lastname,
            payment: payment,
            country: country,
            address: address,
            city: city,
            state: state,
            postcode: postcode,
            phone: phone,
            email: email,            
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (resp) {
            if (resp.optstatus == 'Success') {
                HideLoader();
                window.location.href = "success/";
            }
        }
    })
}

