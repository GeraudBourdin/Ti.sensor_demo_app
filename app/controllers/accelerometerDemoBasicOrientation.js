var args = arguments[0] || {};
var sm = require('sm');
var sensor = require('com.geraudbourdin.sensor');

sensor.setSensor(sensor.TYPE_ACCELEROMETER);

var width = 0;
var height = 0;
$.win.addEventListener('open', function() {
	var s = setTimeout(function() {
		width = $.square.toImage().width / (Titanium.Platform.displayCaps.dpi / 160);
		height = $.square.toImage().height / (Titanium.Platform.displayCaps.dpi / 160);
		$.dot.left = width/2;
		$.dot.top  = height/2;
	}, 100);
});

var sensorsCallback = function(e) {
	if (e.sType == sensor.TYPE_ACCELEROMETER) {

		$.dot.left -= e.x * 5;
		$.dot.top += e.y * 5;

		if ($.dot.left < 0) {
			$.dot.left = 0;
		} else if ($.dot.left > width - 20) {
			$.dot.left = width - 20;
		}

		if ($.dot.top < 0) {
			$.dot.top = 0;
		} else if ($.dot.top > height - 20) {
			$.dot.top = height - 20;
		}
	}
};
sensor.addEventListener('update', sensorsCallback); 