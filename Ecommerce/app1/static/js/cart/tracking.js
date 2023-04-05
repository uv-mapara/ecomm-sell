function track() {    
    var trackNo = $('#trackNo').val().trim();
    $.ajax({
        type: 'POST',
        url: '/tracking/',
        data: {
            trackNo: trackNo,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function (resp) {
            console.log(resp.optstatus);            
            console.log(resp.optstatus1);
            $('#trackStatus').text(resp.optstatus1)
        }
    })
}