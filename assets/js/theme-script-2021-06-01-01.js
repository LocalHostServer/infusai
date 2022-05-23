"use strict";
var $window = $(window),
  $document = $(document),
  $body = $('body'),
  $fullScreen = $('.fullscreen-banner') || $('.section-fullscreen'),
  $halfScreen = $('.halfscreen-banner'),
  searchActive = !1;
$.fn.exists = function () {
  return this.length > 0
};

function preloader() {
  $('#ht-preloader').delay(0).fadeOut()
};

function fullScreen() {
  if ($fullScreen.exists()) {
    $fullScreen.each(function () {
      var $elem = $(this),
        elemHeight = $window.height();
      if ($window.width() < 768) $elem.css('height', elemHeight / 2);
      else $elem.css('height', elemHeight)
    })
  }
  if ($halfScreen.exists()) {
    $halfScreen.each(function () {
      var $elem = $(this),
        elemHeight = $window.height();
      $elem.css('height', elemHeight / 2)
    })
  }
};

function menu() {
  $('#main-menu').smartmenus()
};

function counter() {
  $('.count-number').countTo({
    refreshInterval: 2
  })
};

function owlcarousel() {
  $('.owl-carousel').each(function () {
    var $carousel = $(this);
    $carousel.owlCarousel({
      items: $carousel.data("items"),
      slideBy: $carousel.data("slideby"),
      center: $carousel.data("center"),
      loop: !0,
      margin: $carousel.data("margin"),
      dots: $carousel.data("dots"),
      nav: $carousel.data("nav"),
      autoplay: $carousel.data("autoplay"),
      autoplayTimeout: $carousel.data("autoplay-timeout"),
      navText: ['<span class="fas fa-long-arrow-alt-left"><span>', '<span class="fas fa-long-arrow-alt-right"></span>'],
      responsive: {
        0: {
          items: $carousel.data('xs-items') ? $carousel.data('xs-items') : 1
        },
        576: {
          items: $carousel.data('sm-items')
        },
        768: {
          items: $carousel.data('md-items')
        },
        1024: {
          items: $carousel.data('lg-items')
        },
        1200: {
          items: $carousel.data("items")
        }
      },
    })
  })
};

function testimonialcarousel() {
  $('.testimonial-carousel').on('slide.bs.carousel', function (evt) {
    $('.testimonial-carousel .controls li.active').removeClass('active');
    $('.testimonial-carousel .controls li:eq(' + $(evt.relatedTarget).index() + ')').addClass('active')
  })
};

function magnificpopup() {
  $('.popup-gallery').magnificPopup({
    delegate: 'a.popup-img',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: !0,
      navigateByImgClick: !0,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function (item) {
        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>'
      }
    }
  });
  if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: !1,
      fixedContentPos: !1
    })
  }
};

function scrolltop() {
  var pxShow = 300,
    goTopButton = $(".scroll-top")
  if ($(window).scrollTop() >= pxShow) goTopButton.addClass('scroll-visible');
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= pxShow) {
      if (!goTopButton.hasClass('scroll-visible')) goTopButton.addClass('scroll-visible')
    } else {
      goTopButton.removeClass('scroll-visible')
    }
  });
  $('.smoothscroll').on('click', function (e) {
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
    return !1
  })
};

function headerheight() {
  $('.fullscreen-banner .align-center, .nav-arrows span').each(function () {
    var headerHeight = $('.header').height();
    $(this).css('padding-top', headerHeight + 'px')
  })
};

function fxheader() {
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 100) {
      $('#header-wrap').addClass('fixed-header')
    } else {
      $('#header-wrap').removeClass('fixed-header')
    }
  })
};

function scrolling() {
  $('.nav-item a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return !1
      }
    }
  });
  $('.nav-item a[href*="#"]:not([href="#"])').on('click', function () {
    $('.navbar-collapse').collapse('hide')
  });
  $('body').scrollspy({
    target: '.navbar',
    offset: 80
  })
};

function databgcolor() {
  $('[data-bg-color]').each(function (index, el) {
    $(el).css('background-color', $(el).data('bg-color'))
  });
  $('[data-text-color]').each(function (index, el) {
    $(el).css('color', $(el).data('text-color'))
  });
  $('[data-bg-img]').each(function () {
    $(this).css('background-image', 'url(' + $(this).data("bg-img") + ')')
  })
};

function accordian() {
  $(".card").on("show.bs.collapse hide.bs.collapse", function (e) {
    if (e.type == 'show') {
      $(this).addClass('active')
    } else {
      $(this).removeClass('active')
    }
  });
  $('.accordion .card-header a').prepend('<span></span>')
};

function contactform() {
  $('#contact-form').validator();
  $('#contact-form').on('submit', function (e) {
    if (!e.isDefaultPrevented()) {
      var url = "Contact-Us.aspx";
      $.ajax({
        type: "POST",
        url: url,
        data: $("form#contact-form").serialize(),
        cache: !1,
        async: !1,
        success: function (Response) {
          console.log('response =' + Response);
          var messageAlert = '';
          var messageText = '';
          if (Response == 'success') {
			  window.location.href="https://infusai.com/contact-us/thank-you.html";
            messageAlert = 'alert-success';
            messageText = 'Thank you for contacting us, someone will get in touch with you soon'
          } else {
            var messageAlert = 'alert-danger';
            var messageText = 'Sorry, there was some issue while contacting us, Please try again later!'
          }
          var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
          if (messageAlert && messageText) {
            $('#contact-form').find('.messages').html(alertBox).show().delay(2000).fadeOut('slow');
            $('#contact-form')[0].reset()
          }
        }
      });
      return !1
    }
  })
};

function booknow() {
  $('#quick-contact-form').validator();
  $('#quick-contact-form').on('submit', function (e) {
    if (!e.isDefaultPrevented()) {
      var url = "../bookdemo.aspx";
      $.ajax({
        type: "POST",
        url: url,
        data: $("form#quick-contact-form").serialize(),
        cache: !1,
        async: !1,
        success: function (response) {
          var messageAlert = '';
          var messageText = '';
          if (response == 'success') {
			  window.location.href="https://infusai.com/contact-us/thank-you.html";
            messageAlert = 'alert-success';
            messageText = 'Thank you for contacting us, someone will get in touch with you soon'
          } else {
            var messageAlert = 'alert-danger';
            var messageText = 'Sorry, there was some issue while contacting us, Please try again later!'
          }
          var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
          if (messageAlert && messageText) {
            $('#quick-contact-form').find('.messages').html(alertBox).show().delay(2000).fadeOut('slow');
            $('#quick-contact-form')[0].reset()
          }
        }
      });
      return !1
    }
  })
};

function progressbar() {
  var progressBar = $('.progress');
  if (progressBar.length) {
    progressBar.each(function () {
      var Self = $(this);
      Self.appear(function () {
        var progressValue = Self.data('value');
        Self.find('.progress-bar').animate({
          width: progressValue + '%'
        }, 1000)
      })
    })
  }
};

function search() {
  if ($('.search-form').length) {
    var searchForm = $('.search-form');
    var searchInput = $('.search-input');
    var searchButton = $('.search-button');
    searchButton.on('click', function (event) {
      event.stopPropagation();
      if (!searchActive) {
        searchForm.addClass('active');
        searchActive = !0;
        searchInput.focus();
        $(document).one('click', function closeForm(e) {
          if ($(e.target).hasClass('search-input')) {
            $(document).one('click', closeForm)
          } else {
            searchForm.removeClass('active');
            searchActive = !1
          }
        })
      } else {
        searchForm.removeClass('active');
        searchActive = !1
      }
    })
  }
};

function countdown() {
  $('.countdown').each(function () {
    var $this = $(this),
      finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function (event) {
      $(this).html(event.strftime('<li><span>%-D</span><p>Days</p></li>' + '<li><span>%-H</span><p>Hours</p></li>' + '<li><span>%-M</span><p>Minutes</p></li>' + '<li><span>%S</span><p>Seconds</p></li>'))
    })
  })
};

function wowanimation() {
  var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: !1,
    live: !0
  });
  wow.init()
}
$(document).ready(function () {
  fullScreen(), menu(), owlcarousel(), counter(), testimonialcarousel(), magnificpopup(), scrolltop(), headerheight(), fxheader(), scrolling(), databgcolor(), accordian(), contactform(), booknow(), progressbar(), search(), countdown()
});
$window.resize(function () {
  fullScreen()
});
$(window).on('load', function () {
  preloader(), wowanimation()
})