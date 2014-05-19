$(document).ready(function(){
  ER.tagSlide();
  ER.setCollapse();
  ER.cloudPos = -25;

  $(window).on("scroll", ER.hideName);
  $(window).on("scroll", ER.toggleClouds);
  $("#navbar li, p").click(ER.scrollTo);
  $("#initials").on("mouseenter", ER.setOn).on("mouseleave", ER.setOff);
  $(".project").on("click", function(event){
    ER.openDesc(event);
    ER.scrollTo(event);
  });
  $(document).on("click", ".close-project", ER.closeDesc);

  $(document).on("click", ".next", function(event){
    ER.selected = ER.getNext(ER.projects, ER.selected);
    ER.setProject(event, ER.selected);
  });
});

var ER = ER || {};

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
  yPos = $(window).scrollTop() + $(window).height() - 200;
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

ER.openDesc = function(event){
  ER.setProject(event);
  $(ER.getElem('project-description')).slideDown();
};

ER.closeDesc = function(){
  $(ER.getElem('project-description')).slideUp();
};

ER.setProject = function(event, name){
  ER.selected = name || event.target.id;
  var project = ER.projects[ER.selected];
  $('#project-description .title').text(project.title);
  $('#project-description .tag').html(project.tag.replace(/\n/g, "<br>"));
  $('#project-description .desc').html(project.description.replace(/\n/g, "<br>"));
  $('#project-description .tech').html(project.tech);
  $('#project-description img').attr("src", (project.image));
  $('#project-description a').attr("href", (project.link));
};

ER.getNext = function(object, currentKey){
  var keys = Object.keys(object), index = keys.indexOf(currentKey);
  return keys[index + 1] ? keys[index + 1] : keys[0]  ;
};

ER.projects = {
  "go-figure": {
    title: "Go Figure",
    tag: "A Comparative Look at Countries through Human Development Statistics",
    description: "Go Figure was designed to explore our perceptions of how countries stack up through the lens of the Human Development Report indicators. \nThe site engages viewers through a series of questions comparing countries' ranks in several key areas from gender equality to innovation and tracks bias through their responses.",
    link: "http://go-figure.herokuapp.com",
    tech: "RUBY | RAILS | HAML | HANDLEBARS | COFFEESCRIPT | D3",
    image: "//s3.amazonaws.com/emiliereiser.com/go-figure-2-small.jpg"
  },
  loopd: {
    title: "Loopd",
    tag: "A Simple RSS Feed Aggregator",
    description: "Loopd is a light-weight RSS reader that allows you to bring together your favorite content on the web in one place. Feeds can be tagged, categorized and filtered",
    link: "http://loopdin.herokuapp.com/",
    tech: "RUBY | RAILS | JAVASCRIPT | JQUERY | RSPEC | CAPYBARA",
    image: "//s3.amazonaws.com/emiliereiser.com/loopd-2-small.jpg"
  },
  outflux: {
    title: "Outflux",
    tag: "An Interactive Map of International Refugee Flows",
    description: "Every year, millions of people around the world are forced to flee their countries of origin due to violence, persecution and natural disaster. \nOutflux was created with historical data from the UN Refugee Agency and was designed to help users visualize ongoing global refugee crises and access specific country information from UNHCR's news feed.",
    link: "http://outflux.herokuapp.com/",
    tech: "RUBY | RAILS | DEVISE | UNDP API",
    image: "//s3.amazonaws.com/emiliereiser.com/outflux-2-small.jpg"
  }
};