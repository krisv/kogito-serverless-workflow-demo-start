function sendEvent() {
	var key = Math.floor((Math.random() * 100000));
	jQuery.ajax ({
	    url: "/",
	    type: "POST",
	    data: $('input[name = data]').val(),
		dataType: "xml",
	    headers: {
			"ce-specversion": "1.0",
			"ce-source": "/from/sw-service",
			"ce-type": $('input[name = type]').val(),
			"ce-kogitobusinesskey": key,
			"ce-id": "xyzabcdefgh"
		},
		success: function(result) {
			if ($('input[name = audit]').is(':checked')) {
				$("#div").show();
				$('input[name = key2]').val(key);
				setTimeout(
					function() 
					{
						find();
					}, 2000);
			} else {
				$("#div").hide();
			}
		},
		error: function (jqXHR, exception) {
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert('Error ' + msg);
		}
	});
}

function find() {
	jQuery.ajax ({
	    url: "http://localhost:8180/graphql/?query=%7B%0A%20%20ProcessInstances%20%28where%3A%20%7B%20businessKey%3A%20%7Bequal%3A%22" + $('input[name = key2]').val() + "%22%7D%20%7D%29%20%7B%0A%20%20%20%20id%2C%20businessKey%2C%20state%2C%20processName%2C%20nodes%20%7B%0A%20%20%20%20%20%20id%2C%20name%2C%20enter%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D",
	    type: "GET",
		headers: {
		},
		success: function(result) {
			var pInstance = result.data.ProcessInstances[0];
			if (typeof pInstance === "undefined") {
				setTimeout(
					function() 
					{
						find();
					}, 2000);
			} else {
				$('#result').text("Workflow " + pInstance.processName + " (id=" + pInstance.id + ")");
				$('#result').append(" <BR/>");
				$('#result').append("Status " + pInstance.state + " <BR/>");
				$('#result').append(" <BR/>");
				$(pInstance.nodes).each(function(index, element) {
					if (element.name != "EmbeddedStart" && element.name != "EmbeddedEnd" && element.name != "Script") {
						$('#result').append($.formatDate(element.enter) + " " + element.name + " <BR/>");
					}
				});
			}
		},
		error: function (jqXHR, exception) {
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert('Error ' + msg);
		}
	});
}

$.formatDate = function(dateObject) {
	var d = new Date(dateObject);
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}
	var curr_hour = d.getHours();
	if (curr_hour < 10) {
		curr_hour = "0" + curr_hour;
	}
	var curr_min = d.getMinutes();
	if (curr_min < 10) {
		curr_min = "0" + curr_min;
	}
	var curr_sec = d.getSeconds();
	var date = day + "/" + month + "/" + year + " " + curr_hour + ":" + curr_min + ":" + curr_sec;
	return date;
}