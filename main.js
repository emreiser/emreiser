$(document).ready(function(){
  ER.tagSlide();
  ER.setCollapse();

  $(window).on("scroll", ER.hideName);
  $(window).on("scroll", ER.hideClouds);
  $("#navbar li, p").click(ER.scrollTo);
  ER.cloudPos = $("#initials").css('background-position-x').split('px')[0];

  $("#initials").on("mouseenter", ER.setOn).on("mouseleave", ER.setOff);
});

ER = {};

ER.hideName = function(event){
  if($(window).scrollTop() <= 140){
    $("#initials").css("opacity", (1 - $(window).scrollTop() / 100));
    $("#tag").css("opacity", (1 - $(window).scrollTop() / 140));
  }
};

ER.tagSlide = function(event){
  $("#tag-top").animate({opacity: 1, "padding-top": 0}, 1000);
  $("#tag-bottom").animate({opacity: 1, "padding-top": 0}, 700);
};

ER.scrollTo = function(event){
  var section = "#" + $(event.target).attr("data-section"), top;
  top = section == "#top" ? 0 : $(section).position().top - 80;
  $("html, body").animate({
    scrollTop: top
  }, 800, "swing");
};

ER.setCollapse = function(event){
  if(window.innerWidth <= 765){
    $('#navbar li, p').attr("data-toggle", "collapse");
    $('#navbar li, p').attr("data-target", "#nav-links");
  }
};

ER.hideClouds = function(event){
  var contactTop, yPos, diff;
  contactTop = $('#contact').position().top;
  yPos = $(window).scrollTop() + $(window).height() - 175;
  diff = yPos - contactTop;

  if(diff < 0){
    $('.clouds').css('opacity', 1);
    $('.social-wrapper').css('opacity', 0);
  } else {
    $('.clouds').css('opacity', (1 - diff/100));
    $('.social-wrapper').css('opacity', diff/100);
  }
};

ER.setOn = function(){
  ER.onBox = true;
  ER.floatClouds();
};

ER.setOff = function(){
  ER.onBox = false;
};

ER.floatClouds = function(event){
  if(ER.onBox === true){
    ER.cloudPos -= 1;
    $('#initials').animate({'background-position-x': ER.cloudPos + 'px'}, {duration: 40, complete: ER.floatClouds});
  }
};