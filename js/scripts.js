jQuery(window).load(function () {

    "use strict";

    // Remove loader

    jQuery('#progress-bar').width('100%');
    jQuery('#loader').hide();

});

jQuery(document).ready(function () {

    "use strict";

    // Loader bar

    var count = 1;

    jQuery('img').load(function () {

        jQuery('#progress-bar').css('width', count * 170);
        count = count + 1;
    });

    jQuery('#loader').css('padding-top', jQuery(window).height() / 2);

    // Smooth Scroll to internal links

    jQuery('.smooth-scroll').smoothScroll({
        speed: 800,
        offset: -68
    });

    // Initialize Sliders

    jQuery('#home-slider').flexslider({
        directionNav: false
    });

    jQuery('.testimonials-slider').flexslider({
        directionNav: false,
        animation: "slide",
        slideshow: false
    });

    jQuery('#client-slider').flexslider({
        directionNav: false,
        controlNav: false,
        maxItems: 4,
        minItems: 1,
        move: 1,
        animation: "slide",
        itemWidth: 250,
        slideshowSpeed: 7000
    });

    jQuery('#about-detail-slider').flexslider({
        directionNav: false,
        manualControls: "#about-toggle li",
        animation: "slide",
        smoothHeight: true,
        slideshow: false,
        animationSpeed: 400,
        touch: false
    });

    jQuery('.project-slider').flexslider({
        directionNav: false
    });
    
    jQuery('.post-slider').flexslider({
        directionNav: false
    });
    
    jQuery('.blog-left a').addClass('highlight');
    jQuery('.post h4 a').addClass('lowlight');
    jQuery('.blog-right a').addClass('highlight');

    // Mobile Menu

    jQuery('#mobile-toggle').click(function () {
        if (jQuery('#navigation').hasClass('open-nav')) {
            jQuery('#navigation').removeClass('open-nav');
        } else {
            jQuery('#navigation').addClass('open-nav');
        }
    });

    jQuery('#menu li a').click(function () {
        if (jQuery('#navigation').hasClass('open-nav')) {
            jQuery('#navigation').removeClass('open-nav');
        }
    });

    // Adjust slide height for smaller screens

    jQuery('#home-slider .slides li').css('height', jQuery(window).height());



    // Append HTML <img>'s as CSS Background for slides
    // also center the content of the slide

    jQuery('#home-slider .slides li').each(function () {

        var imgSrc = jQuery(this).children('.slider-bg').attr('src');
        jQuery(this).css('background', 'url("' + imgSrc + '")');
        jQuery(this).children('.slider-bg').remove();

        var slideHeight = jQuery(this).height();
        var contentHeight = jQuery(this).children('.slide-content').height();
        var padTop = (slideHeight / 3) - (contentHeight / 2);

        jQuery(this).children('.slide-content').css('padding-top', padTop);

    });

    // Turn dynamic animations for iOS devices (because it doesn't look right)

    var iOS = false,
        p = navigator.platform;

    if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
        iOS = true;
    }

    // Sticky Nav

    jQuery(window).scroll(function () {

        if (jQuery(window).scrollTop() > 100) {
            jQuery('#navigation').addClass('sticky-nav');
        } else {
            jQuery('#navigation').removeClass('sticky-nav');
        }

        // Parallax

        if (iOS === false) {

            var scrollAmount = jQuery(window).scrollTop() / 5;
            scrollAmount = Math.round(scrollAmount);
            jQuery('.has-parallax').css('backgroundPosition', '50% ' + scrollAmount + 'px');

        }
    });

    // Append .divider <img> tags as CSS backgrounds

    jQuery('.divider').each(function () {
        var imgSrc = jQuery(this).children('.divider-bg').attr('src');
        jQuery(this).css('background', 'url("' + imgSrc + '")');
        jQuery(this).children('.divider-bg').remove();
    });

    
    // About slide clicks

    jQuery('#about-toggle li').click(function () {
        jQuery('#about-toggle li').removeClass('active');
        jQuery(this).addClass('active');
    });

    // Team Hovers

    jQuery('.team-member').hover(function () {
        jQuery('.team-member').addClass('team-focus');
        jQuery(this).removeClass('team-focus');
    }, function () {

        jQuery('.team-member').removeClass('team-focus');
    });


    // Portfolios

    jQuery('.filters li').click(function () {

        jQuery('.filters li').removeClass('active');
        jQuery(this).addClass('active');

        var category = jQuery(this).attr('data-category');
        jQuery(this).closest('.projects-wrapper').find('.project').removeClass('hide-project');

        if (category !== 'all') {
            jQuery(this).closest('.projects-wrapper').find('.project').each(function () {

                if (!jQuery(this).hasClass(category)) {
                    jQuery(this).addClass('hide-project');
                }

            });
        }

    });

    // Project Clicks with AJAX call
    
    // Project Clicks with AJAX call

    jQuery('.project').click(function (event) {
        event.preventDefault();
        var projectContainer = jQuery(this).closest('.projects-wrapper').children('.ajax-container').attr('data-container');

        if (jQuery('.ajax-container[data-container="'+projectContainer+'"]').hasClass('open-container')) {
            jQuery('.ajax-container[data-container="'+projectContainer+'"]').addClass('closed-container');
            jQuery('.ajax-container[data-container="'+projectContainer+'"]').removeClass('open-container');
        }

        var fileID = jQuery(this).attr('data-project-file');

        if (fileID != null) {
            jQuery('html,body').animate({
                scrollTop: jQuery('.ajax-container[data-container="'+projectContainer+'"]').offset().top - 70
            }, 500);

        }
        
        jQuery('.ajax-container[data-container="'+projectContainer+'"]').load(fileID+" .project-body", function(){
        	jQuery('.ajax-container[data-container="'+projectContainer+'"]').addClass('open-container');
        	jQuery('.close-project').click(function () {
                jQuery('.ajax-container').addClass('closed-container');
                jQuery('.ajax-container').removeClass('open-container');
                jQuery('html,body').animate({
                    scrollTop: jQuery('.projects-container').offset().top - 70
                }, 500);
                setTimeout(function () {
                    jQuery('.ajax-container').html('');
                }, 1000);
            });
        	jQuery('.project-slider').flexslider({
                directionNav: false
            });
            jQuery('.ajax-container[data-container="'+projectContainer+'"]').removeClass('closed-container');
            
            jQuery('.close-project').click(function () {
                jQuery('.ajax-container[data-container="'+projectContainer+'"]').addClass('closed-container');
                jQuery('.ajax-container[data-container="'+projectContainer+'"]').removeClass('open-container');
                jQuery('html,body').animate({
                    scrollTop: jQuery('.project-container[data-container="'+projectContainer+'"]').offset().top - 70
                }, 500);
                setTimeout(function () {
                    jQuery('.ajax-container[data-container="'+projectContainer+'"]').html('');
                }, 1000);
            });
        });

    });

    // Contact Form Code

    jQuery('#form-button').click(function () {

        var name = jQuery('#form-name').val();
        var email = jQuery('#form-email').val();
        var message = jQuery('#form-msg').val();
        var error = 0;

        if (name === '' || email === '' || message === '') {
            error = 1;
            jQuery('#details-error').fadeIn(200);
        } else {
            jQuery('#details-error').fadeOut(200);
        }

        if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
            jQuery('#details-error').fadeIn(200);
            error = 1;
        }

        var dataString = 'name=' + name + '&email=' + email + '&text=' + message;

        if (error === 0) {
            jQuery.ajax({
                type: "POST",
                url: "mail.php",
                data: dataString,
                success: function () {
                    jQuery('#details-error').fadeOut(1000);
                    jQuery('#form-sent').fadeIn(1000);
                }
            });
            return false;
        }

    });

    // Reset form contents

    jQuery('.reset-btn').click(function () {
        jQuery('#form-name').val('');
        jQuery('#form-email').val('');
        jQuery('#form-msg').val('');
    });




});


  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-52115242-6', 'auto');
  ga('send', 'pageview');

