$(document).ready(function(){

	var putURL = "http://codechallenge.gobutlernow.com/user/1.json";

	// used to store user data
	var userInfo;

	// grab the data
	$.getJSON('1.json', function( data ) {

		userInfo = data; // store data

		// update the fields in the form with the retrieved data
		$("#user-name").val(userInfo.name);

		// I added in the option for an additional line for apartment #s, etc; A comma will separate the Address 1 and Address 2 lines
		$("#user-address-1").val(userInfo.address.street.split(',')[0]);
		$("#user-address-2").val(userInfo.address.street.split(',')[1]);
		$("#user-city").val(userInfo.address.city);
		$("#user-state").val(userInfo.address.state);
		$("#user-zip").val(userInfo.address.zip);

		// loop through all of the emails
		for(var i =0; i < userInfo.email.length; i++)
		{
			// if there is more than one email, create a new field for each additional email
			if(i > 0)
			{
				newEmail();
			}
			// put the email into the field
			$("#user-email-"+(i+1)).val(userInfo.email[i]);
		}

		// hide loading icon and show the form
		$("#loading-icon").css("display","none");
		$("form").addClass("show");
	});

	// adds new email field into the form
	var newEmail = function() {

		// input-inline forces the field to have input:inline which keeps the "+" icon on the same line;
		// this forces all previous emails to be on a new line
		$(".input-inline").removeClass("input-inline");
		var emailCount = $(".user-email").length + 1;

		// HTML of the new input (note the input-inline class)
		var emailHTML = '<input class="user-input user-email input-inline" type="text" id="user-email-' + emailCount + '">';
		$(".plus-icon").parent().append(emailHTML);
		$("#user-email-"+emailCount).insertBefore(".plus-icon"); // switch it to be before the "+" icon
		toggleFocus("#user-email-"+emailCount); // give new input event listeners
	};


	// Event listeners below

	// on submit of the form
	$("form").on("submit", function(event) {
		event.preventDefault();

		// update userInfo with all of the updated information
		var address2 = $("#user-address-2").val(); // put address-2 in temp variable so we don't have to call .val() multiple times
		userInfo.name = $("#user-name").val();
		userInfo.address.street = $("#user-address-1").val() + (address2 != "" ? "," : "") + address2;
		userInfo.address.city = $("#user-city").val();
		userInfo.address.state = $("#user-state").val();
		userInfo.address.zip = $("#user-zip").val();
		userInfo.email = []; // reset email

		// loop through all of the emails
		$(".user-email").each(function() {

			// if the email field isn't empty, add it to the "email" array
			if($(this).val() != "")
			{
				userInfo.email.push($(this).val());
			}
		});

		// submit "PUT" request
		$.ajax({
			type : "PUT",
			url : putURL,
			contentType : "application/json",
			data : JSON.stringify(userInfo)  // turn data into string
		}).done(function() {

			// when completed successfully, give the submit button a green background and a check symbol for 3 seconds
			$(".input-submit").addClass("input-check");
			var t = setTimeout(function(){$(".input-submit").removeClass("input-check");},3000);
		}).fail(function() {

			// when the ajax request fails, give the submit button a red background and an "x" symbol for 3 seconds
			$(".input-submit").addClass("input-fail");
			var t = setTimeout(function(){$(".input-submit").removeClass("input-fail");},3000);
		});
	});

	// clicking the "+" icon adds a new email field
	$(".plus-icon").on("click",function (event) {
		event.preventDefault();
		newEmail();
	});

	// function that changes the color of the label when its input field is focused
	var toggleFocus = function(elem) {
		$(elem).on("focus",function() {
			$(this).parent().prev().toggleClass("input-focus");
		});
		$(elem).on("blur",function() {
			$(this).parent().prev().toggleClass("input-focus");
		});
	};

	// attach event listeners to all current inputs on page
	toggleFocus("input[type='text']");
});