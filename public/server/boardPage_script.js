$(document).ready(function(){
  // nav toggle
  $(".nav-toggle").click(function() {
    $(".header .nav").slideToggle();
  })
  $(".header .nav a").click(function() {
    if ($(window).width() < 768) {
      $(".header .nav").slideToggle();
    }
  })
  // fixed header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  })

  //posting Section
  $('.modal-container').css('display', 'none');
  $("#addPost").click(function() {
    $('.modal-container').css('display', 'inline');
  })
  $(".xBtn").click(function() {
    $('.modal-container').css('display', 'none');
  })
})
