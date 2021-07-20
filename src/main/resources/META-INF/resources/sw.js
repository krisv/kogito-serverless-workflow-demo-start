function sendEvent() {
	jQuery.ajax ({
	    url: "/",
	    type: "POST",
	    data: $('input[name = data]').val(),
	    contentType: "application/json",
		headers: {
			"ce-specversion": "1.0",
			"ce-source": "/from/sw-service",
			"ce-type": $('input[name = type]').val(),
			"ce-id": "xyzabcdefgh"
		},
		error: function(data) {
			alert('Error ' + data);
		}
	});
}