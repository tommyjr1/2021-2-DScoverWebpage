$(document).ready(function() {

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
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  var slideIndex = 0;
  showSlides();

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("work-item");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
  }

  //login Section
  $('.modal-container').css('visibility', 'hidden');
  $('.signup-section').css('visibility', 'hidden');
  $('.login-section').css('visibility', 'hidden');
  $("#login").click(function() {
    $('.modal-container').css('visibility', 'visible');
    $('.login-section').css('visibility', 'visible');
  })
  $(".xBtn").click(function() {
    $('.modal-container').css('visibility', 'hidden');
    $('.login-section').css('visibility', 'hidden');
  })

  //signup section
  $("#signup").click(function() {
    $('.modal-container').css('visibility', 'visible');
    $('.signup-section').css('visibility', 'visible');
  })
  $(".xBtn").click(function() {
    $('.modal-container').css('visibility', 'hidden');
    $('.signup-section').css('visibility', 'hidden');
  })
})
