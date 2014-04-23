$(document).ready(function(){
  ER.tagSlide();
  ER.setCollapse();
  ER.cloudPos = -25;

  $(window).on("scroll", ER.hideName);
  $(window).on("scroll", ER.toggleClouds);
  $("#navbar li, p").click(ER.scrollTo);
  $("#initials").on("mouseenter", ER.setOn).on("mouseleave", ER.setOff);
});

var ER = {};

ER.getElem = function(id){
  if (!ER.getElem.cache) { ER.getElem.cache = {}; }
  return ER.getElem.cache[id] = ER.getElem.cache[id] || document.getElementById(id);
};

ER.hideName = function(event){
  if($(window).scrollTop() <= 140){
    ER.getElem('initials').style.opacity = (1 - $(window).scrollTop() / 100);
    ER.getElem('tag').style.opacity = (1 - ($(window).scrollTop() - 40) / 100);
  }
};

ER.tagSlide = function(event){
  $("#tag-top").animate({opacity: 1, "padding-top": 0}, 1000);
  $("#tag-bottom").animate({opacity: 1, "padding-top": 0}, 700);
};

ER.scrollTo = function(event){
  var section = "#" + $(event.target).attr("data-section"), top;
  section == "#top" ? top = 0 : top = $(section).position().top - 80;
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

ER.toggleClouds = function(event){
  var contactTop, yPos, diff;
  contactTop = $('#contact').position().top;
  yPos = $(window).scrollTop() + $(window).height() - 175;
  diff = yPos - contactTop;

  if(diff < 0){
    ER.getElem('clouds').style.opacity = 1;
    ER.getElem('social-wrapper').style.opacity = 0;
  } else {
    ER.getElem('clouds').style.opacity = (1 - diff/100);
    ER.getElem('social-wrapper').style.opacity = diff/100;
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
    $(ER.getElem('initials')).animate({'background-position': ER.cloudPos + 'px'}, {duration: 40, complete: ER.floatClouds});
  }
};

ER.enterNav = function(){
  $('#navbar').animate({top: 0}, 400);

};