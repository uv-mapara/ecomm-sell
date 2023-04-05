// In this function every menu which has an active link opens if a link is active. Its ul parent opens itself and adds the class 'open' to its parent (the arrow) so it turns 90 degrees
$('.pagenav li').each(function(i, el) {
    if ($(el).hasClass('current_page_item')) {
      $(el).parent().show().parent().addClass('open');
    };
  });
  
  // This function ensures that a menu pops open when you click on it. All other menu's automatically close if the user clicks on a ul header. All the opened ul's close except the one clicked on
  $('.accordion h4').click(function(event) {
    $('.accordion > ul > li > ul:visible').not($(this).nextAll('ul')).stop().hide(200).parent().removeClass('open'); //
    $(this).nextAll('ul').slideToggle(200, function() {
      $(this).parent('.pagenav').toggleClass('open');
    });
  });


// setTimeout(function(){
//     if ($('#msg').length > 0) {
//       $('#msg').remove();
//     }
// }, 2000)



