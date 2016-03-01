$(document).ready(function() {

	// ** ONKEYUP search
	$("input.alert-search").on("keyup", function() {
		var searchVal = $(this).val().toLowerCase();
		filter(searchVal);
	});

	// ** ONCLICK of button search
	$(".btn-search").on("click", function() {
		var searchVal = $("input.alert-search").val().toLowerCase();
		filter(searchVal);
	});

	$(".toggle-list").on("click", function() {
		$(".toggle-list.active").removeClass("active");
		$(this).addClass("active");

		$(".list-alerts.active").removeClass("active");
		$("#"+$(this).attr("data-type")+"-alerts").addClass("active");
	});

	$(".btn-menu").on("click", function(event) {
		event.stopPropagation();
		$(".menu-list").toggleClass("show");
	});

	$(document).on("click", function() {
		$(".menu-list").removeClass("show");
	});

	function filter(searchTerm)
	{
		$(".list-alerts ul li").each(function(index, val) {
			if($("a span:first-child",this).text().toLowerCase().indexOf(searchTerm) == -1)
			{
				$(this).addClass("hide");
			} else {
				$(this).removeClass("hide");
			}
		});
	}
});