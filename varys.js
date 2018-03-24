console.log("** loading parser **");
if (window.location.pathname.includes('kibana') && document.msearch_responses === undefined && document.getElementById('parse_download') === null) {
	function (open) {
		// create a response array and create parse button
		document.msearch_responses = []; // TODO: use simple string instead of array.
		create_button();
		
		// intercept all xhr requests and push _msearch responses to array
		XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
			this.addEventListener("readystatechange", function () {
				if (this.readyState == 4 && url.includes("_msearch")) {
					document.msearch_responses.push(this.response);
				}
			}, false);
			open.call(this, method, url, async, user, pass);
		};

		$('#parse_download').click(function () {
			// parse responses and log to console
			if (document.msearch_responses.length > 0) {
				// parse the last pushed _msearch response
				var last_response = JSON.parse(document.msearch_responses[document.msearch_responses.length - 1]);
				var line_responses = [], i = 0;
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
			}
		});
    
    console.log("** parser loaded **);
	})(XMLHttpRequest.prototype.open);
} else if (window.location.pathname.includes('kibana') && document.getElementById('parse_download') === null) {
	create_button();
}

function create_button() {
	$('.filter-bar').html($('.filter-bar').html() + '<button id="parse_download" class="kuiButton kuiButton--small kuiButton--primary pull-right">Parse Hei!</button>');
}
