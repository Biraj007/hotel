$(function () {
  "use strict";

  //------- Defer Heavy Plugins (Popup & Carousel) --------//
  setTimeout(function () {
    //------- video popup -------//
    $(".play-btn").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });

    //------- Lightbox  js --------//  
    $('.img-gal').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });

    //------- Testimonial Carousel (Fixed Selector) --------//  
    if ($('.testimonial-carousel').length > 0) {
      $('.testimonial-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 30,
        smartSpeed: 600,
        nav: true,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        dots: false,
        responsive: {
          0: { items: 1 },
          800: { items: 2 },
          1000: { items: 3 }
        },
        onInitialized: function () { $('.owl-prev, .owl-next').removeAttr('role'); }
      });
    }

    //------- Rooms Carousel (Restored) --------//
    if ($('#rooms_carousel').length > 0) {
      $('#rooms_carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        smartSpeed: 1000,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          992: { items: 3 }
        }
      });
    }

    //------- Blogs Carousel (Restored) --------//
    if ($('#blogs_carousel').length > 0) {
      $('#blogs_carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        smartSpeed: 1000,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          992: { items: 3 }
        }
      });
    }
  }, 100); // Short delay to unblock paint

  //------- initialize menu --------//    
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  //* Navbar Fixed (Optimized with IntersectionObserver)
  function navbarFixed() {
    var $header = $('.header_area');
    if ($header.length) {
      // Use IntersectionObserver to avoid scroll event listener reflows
      var headerHeight = $header.outerHeight() || 80; // Fallback height

      // Create a sentinel element that sits at the top of the body
      var $sentinel = $('<div id="sticky-menu-sentinel"></div>').css({
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'width': '100%',
        'height': headerHeight + 'px',
        'pointer-events': 'none',
        'visibility': 'hidden',
        'z-index': -1
      });

      $('body').prepend($sentinel);

      var observer = new IntersectionObserver(function (entries) {
        // If the sentinel is NOT intersecting (scrolled out of view), fix the navbar
        if (!entries[0].isIntersecting) {
          $header.addClass("navbar_fixed");
        } else {
          $header.removeClass("navbar_fixed");
        }
      }, { threshold: 0, rootMargin: "0px" });

      observer.observe($sentinel[0]);
    }
  }

  // Call after DOM is ready
  navbarFixed();


  //------- mobile navigation --------//  
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  //------- Defer Non-Critical UI (Select & Mailchimp) --------//
  setTimeout(function () {
    //------- Active Nice Select --------//
    $('select').niceSelect();

    //------- mailchimp --------//  
    function mailChimp() {
      $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();
    function mailChimp2() {
      $('#mc_embed_signup2').find('form').ajaxChimp();
    }
    mailChimp2();
  }, 2000); // 2s delay for tertiary content

  //------- Active Nav Menu (Robust Filename Check) --------//
  var currentPath = window.location.pathname;
  var currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  // Handle root or empty path as index.html
  if (currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }

  // Clear all active classes first to remove hardcoded or previous states
  $('.nav-item').removeClass('active');
  $('.submenu').removeClass('active');

  $('.nav-link').each(function () {
    var linkHref = $(this).attr('href');

    if (!linkHref || linkHref === '#' || linkHref.startsWith('tel:') || linkHref.startsWith('mailto:') || linkHref.startsWith('javascript:')) {
      return;
    }

    // Extract filename from the link href
    var linkPage = linkHref.substring(linkHref.lastIndexOf('/') + 1);

    // Handle root link hrefs (e.g. href="/" or href="http://site.com/")
    if (linkPage === '' || linkHref === '/') {
      linkPage = 'index.html';
    }

    // Remove query params or hashes (e.g. index.html?v=1)
    if (linkPage.indexOf('?') > -1) {
      linkPage = linkPage.split('?')[0];
    }
    if (linkPage.indexOf('#') > -1) {
      linkPage = linkPage.split('#')[0];
    }

    // Compare filenames
    if (linkPage === currentPage) {
      // Highlight the direct item
      $(this).parent('.nav-item').addClass('active');

      // Highlight the parent dropdown/submenu (e.g. Mandarmani, Lataguri)
      // This will traverse up to find the .submenu container
      $(this).parents('.submenu').addClass('active');
    }
  });

  //------- Fix Owl Carousel Accessibility --------//
  function fixOwlAccessibility() {
    $('.owl-prev').attr('aria-label', 'Previous slide');
    $('.owl-next').attr('aria-label', 'Next slide');
    $('.owl-dot').each(function (index) {
      if (!$(this).attr('aria-label')) {
        $(this).attr('aria-label', 'Go to slide ' + (index + 1));
      }
    });
  }

  // Apply on initialization and change
  $(document).on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function () {
    fixOwlAccessibility();
  });

  // Apply immediately in case it's already rendered
  fixOwlAccessibility();

  //------- Track Navbar Call Button Click --------//
  //------- Track Navbar Call Button Click --------//
  $('#navbar-call-btn').on('click', function () {
    window.dataLayer = window.dataLayer || [];

    // 1. Fire the General Navbar Event
    window.dataLayer.push({
      'event': 'navbar_call_click',
      'category': 'Engagement',
      'action': 'Click',
      'label': 'Navbar Call Button'
    });

  });
});

//------- Track Footer Phone Clicks --------//
$('.footer-phone-link').on('click', function () {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'footer_phone_click',
    'category': 'Engagement',
    'action': 'Click',
    'label': 'Footer Phone Link' // + $(this).text().trim() // Optional: add number clicked
  });
});

//------- Track Contact Page Phone Clicks --------//
$('.contact-page-phone-link').on('click', function () {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'contact_page_phone_click',
    'category': 'Engagement',
    'action': 'Click',
    'label': 'Contact Page Phone Link'
  });
});

/* ============================================== */
/* SMOOTH SCROLLING (Lenis Implementation)        */
/* ============================================== */
(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js';
  script.async = true;
  script.onload = function () {
    // Standard Configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Default native touch is usually better for mobile UX
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  };
  document.head.appendChild(script);
})();

