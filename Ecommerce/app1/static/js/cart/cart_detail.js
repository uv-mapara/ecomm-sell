$('.increment-btn').click(function () {
    if ($(this).prev().val() < 10) {
    $(this).prev().val(+$(this).prev().val() + 1);
    }
});
$('.decrement-btn').click(function () {
    if ($(this).next().val() > 1) {
    if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
    }
});