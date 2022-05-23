 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
 
  gtag('config', 'UA-152567488-1');


  $(document).ready(function() {
	  var chkPopform = setInterval(myPopForm, 60000);
	  function myPopForm() {
		$(".opener").trigger("click");
	 }
	$("#book_name, #book_lastname, #book_email, #book_phone").click(function(){
		clearInterval(chkPopform);
	  });
	});

	var BotStar={appId:"sd8316f1f-f5ae-4515-a912-a382e8681c05",mode:"livechat"};!function(t,a){var e=function(){(e.q=e.q||[]).push(arguments)};e.q=e.q||[],t.BotStarApi=e;!function(){var t=a.createElement("script");t.type="text/javascript",t.async=1,t.src="https://widget.botstar.com/static/js/widget.js";var e=a.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}();}(window,document)


	$(".btn-circle").click(function() {
	var book_email = $("#book_email").val();
	var properties = {
		"Email": book_email
	}

	sendinblue.track("booknow_popup",properties);
});

/*$(".owl-carousel").owlCarousel({
  nav: true,
  navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"]
});*/


$('.owl-carousel02').owlCarousel({
      /*margin: 15,*/
      nav: true,
		autoplay:true,
		loop:true,
      navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
      responsive: {
        0: {
          items: 2
        },
        600: {
          items: 3
        },
        1000: {
          items: 6
        }
      }
    });
	
    $('.owl-carousel').owlCarousel({
      /*margin: 15,*/
      nav: true,
		//autoplay:true,
      navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    });

     var TIMEOUT = 7000;
 var interval = setInterval(handleNext, TIMEOUT);

 function handleNext() {
 var $radios = $('input[class*="slide-radio"]');
 var $activeRadio = $('input[class*="slide-radio"]:checked');
 var currentIndex = $activeRadio.index();
 var radiosLength = $radios.length;
 $radios
    .attr('checked', false);
	  if (currentIndex >= radiosLength - 1) {
		$radios
		  .first()
		  .attr('checked', true);
	  } else {
		$activeRadio
		  .next('input[class*="slide-radio"]')
		  .attr('checked', true);
	  }
	}