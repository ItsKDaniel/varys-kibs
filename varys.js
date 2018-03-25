$(function () {
	init_components();
	$('#parse_download').click(function () {
		// parse responses and log to console
		if (document.msearch_responses.length > 0) {
			// parse the last pushed _msearch response
			var last_response = JSON.parse(document.msearch_responses);
			var line_responses = [],
			i = 0;
			var len = last_response.responses[0].hits.hits.length;

			do {
				var cur_line = last_response.responses[0].hits.hits[i]._source.message;
				var cur_time = last_response.responses[0].hits.hits[i]._source.timestamp;
				line_responses[i] = {
					line: cur_line,
					time: cur_time
				};
				i++;
			} while (i < len);

			i = 0; // reset i to 0

			// sort the responses based on the timestamp
			line_responses.sort(function (a, b) {
				return (a.time > b.time) ? 1 : (a.time < b.time) ? -1 : 0;
			});

			// TODO: write code to export to txt
			for (lr in line_responses) {
				console.log(line_responses[lr].line);
			}

			kibs_toast("kibs_snackbar")
		}
	});
});

function init_components() {
	kibs_create_button();
	//TODO: add code to load snackbar to DOM.
	var add_snackbar = document.createElement('div');
	add_snackbar.setAttribute('id', 'kibs_snackbar');
	add_snackbar.innerHTML = 'Logs parsed successfully to Console.';
	document.getElementsByClassName('app-wrapper')[0].appendChild(add_snackbar);
}

function kibs_create_button() {
	$('.filter-bar').html($('.filter-bar').html() + '<button id="parse_download" class="kuiButton kuiButton--small kuiButton--primary pull-right">Parse logs!</button>');
}

function kibs_toast(toast_id) {
	var toast = document.getElementById(toast_id)
		toast.className = "show";
	setTimeout(function () {
		toast.className = toast.className.replace("show", "");
	}, 3000);
}
