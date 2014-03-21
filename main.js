$(document).ready(function(){
	$(".project").on("mouseenter", ER.hoverProject);
	$(".project").on("mouseleave", ER.unhoverProject);

	ER.expanded = false;
	$(window).on("scroll", ER.expandNav);
	$('#navbar').click(ER.scrollTo);

	$('#projects').click(ER.visitLink);


});

ER = {
	about: 538,
	projects: 0,
	contact: 1080
};

ER.hoverProject = function(event){
	$(event.target).addClass("project-spotlight");
	$(event.target).children(".overlay").animate({opacity: 100}, 200);
};

ER.unhoverProject = function(event){
	$(event.target).removeClass("project-spotlight");
	$(event.target).children(".overlay").animate({opacity: 0}, 200);
};

ER.expandNav = function(){
	var offset = $(window).scrollTop();
	if(offset > 215 && ER.expanded == false){
		$("#nav-top").animate({height: "70px"});
		ER.expanded = true;
	} else if(offset < 215 && ER.expanded == true) {
		$("#nav-top").animate({height: "20px"});
		ER.expanded = false;
	}
};

ER.scrollTo = function(){
	$('html body').animate({
		scrollTop: ER[$(event.target).attr("data-section")]
	}, 800, 'swing');
};

ER.visitLink = function(){
	$project.removeClass("project-spotlight");
}