$(document).ready(function(){

  /* Navigation Bar Resizing 
     whenever I scroll past 80pixels (or 5em), it will shrink */
  var navShrinkHeight = 80; //5em
  $(document).on("scroll",function(){
      if($(document).scrollTop()>navShrinkHeight){
          $("nav").css({"height": "3em"});
      } else{
          $("nav").css({"height": "5em"});
      }
  });

  /* Navigation Smooth Scrolling */
  //these are offsets from various margin-top/bottoms as well as the navigation bar offset
  var navOffset = 48;
  var modalMarginOffset = 96;
  var navHeight = 96;
  var textOffset = 42;
  var whyTextOffset = 16;

  //We'll animate (aka scroll) to the desired section identified by the href value
  $('#navScrollLearn, #navScrollFollow').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top - navOffset}, 650);
    return false;
  });
  $('#navScrollWhy').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top - navOffset - textOffset + whyTextOffset}, 650);
    return false;
  });
  $('#navScrollMe').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top - modalMarginOffset - textOffset}, 650);
    return false;
  });
  $('#navScrollHome').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top - navHeight}, 650);
    return false;
  });

/* Navigation Position Indicator */
  $(window).scroll(function(){
      var windowPos = $(window).scrollTop(); //offset from top of page
      var vidOffset = 16;

      //Whenever the current window y position is in view of a section, we had the "highlight" class to the text
      //When it is out of view, then we remove it
      if (windowPos >= ($('#follow_us').position().top) - navOffset){
          $('#navScrollFollow').addClass("nav-active");
        }
      else 
          $('#navScrollFollow').removeClass("nav-active");

      if (windowPos >= ($('#me').position().top - navOffset - textOffset) && windowPos < $('#me').position().top + $('#me').outerHeight() + navOffset){
          $('#navScrollMe').addClass("nav-active");
        }
      else
          $('#navScrollMe').removeClass("nav-active");


      if (windowPos >= ($('#learn').position().top - navOffset) && windowPos < $('#learn').position().top + $('#learn').outerHeight() - navOffset){
          $('#navScrollLearn').addClass("nav-active");
        }
      else 
          $('#navScrollLearn').removeClass("nav-active");


      if (windowPos > ($('#why').position().top - navOffset - vidOffset - whyTextOffset) && windowPos < $('#why').position().top + $('#why').outerHeight() -navOffset){
          $('#navScrollWhy').addClass("nav-active");
        }
      else
          $('#navScrollWhy').removeClass("nav-active");

      if (windowPos > ($('#home').position().top - navOffset) && windowPos < $('.backgroundVideo').position().top - navOffset + $('.backgroundVideo').outerHeight()){
          $('#navScrollHome').addClass("nav-active");
        }
      else
          $('#navScrollHome').removeClass("nav-active");
  });

  /* Video Text Overlay & Centering */
  var $vid = $('video','.backgroundVideo');
  var $vidTitle = $('.videoText'); 
  var $vidSubtitle = $('.videoSubtitle');

  //Calculate an offset for the video text (note this is not vertically centered)
  $vidTitle.css({
      top:$vid.offset().top/2 + (($vid.height()/4) - ($vidTitle.height()/8)),
  });
  $vidSubtitle.css({
      top:$vid.offset().top*3/4 + (($vid.height()/4) - ($vidSubtitle.height()/2)),
  });​

  /* Initiate Carousel Width */
  $('#carouselContent ul').css({width: ($( window ).width()*5)});
  $('#carouselContent ul').css({"margin-left": -1*($( window ).width())});
  $('#carouselContent li').css({width: ($( window ).width())});
  $('#carouselContent').css({width: ($( window ).width())});
    

  /* Carousel SlideShow Animation */
  //the carousel is actually one long image, created by appending every image in the list together
  //our viewport "scans" along this very long image. Every time we do so, we'll take an image
  //from the end of the list and put it to the front
  var carouselTimer;
  function carouselInit(){
      carouselTimer = setInterval(function(){
        $("#carouselContent ul").animate({marginLeft:-2*$( window ).width()},500,function(){
          $(this).find("li:last").after($(this).find("li:first"));
          $(this).css({marginLeft:-1*($( window ).width())});
        })
      },2500);
  }
  carouselInit();

  /* Carousel Buttons Actions */
  //when we hit left, we want to see the previous image (against the default transition)
  //we will restart our time interval (so it doesn't keep counting when we manually transition)
  //since we're going back, we want to take the image in the last of the list and put it in front
  $(".carouselLeft").click(function(){
        clearInterval(carouselTimer);
          
        $("#carouselContent ul").animate({marginLeft: 0},500,function(){
          $(this).find("li:first").before($(this).find("li:last"));
          $(this).css({marginLeft:-1*($( window ).width())});
        });
        carouselInit();
  });
  //the default transition of the carousel. we restart the interval to not count while we manually transition
  //since we're moving with the default transition, we will take the first element of the list and place it last
   $(".carouselRight").click(function(){
        clearInterval(carouselTimer);
        $("#carouselContent ul").animate({marginLeft: -2*$( window ).width()},500,function(){
          $(this).find("li:last").after($(this).find("li:first"));
          $(this).css({marginLeft:-1*($( window ).width())});
        });
        carouselInit();
  });

  /* Modal Responsiveness */
  //when the modal-before picture is clicked, we will append the modal-after picture
  //when we click anywhere else (body) it will remove the modal-after picture
  $('.modalPictureHit').on('click', function(e) {
      e.preventDefault(); //this prevents the modal picture from "overwriting" the page
      $('html').css({"overflow": "hidden"});
      $('body').append('<div class="modalPicture"><img src="' + $(this).attr('href') + '">');
  });
  $('body').on('click', '.modalPicture', function() {
      $('html').css({"overflow": "visible"});
      $('.modalPicture').remove();
  });
});

