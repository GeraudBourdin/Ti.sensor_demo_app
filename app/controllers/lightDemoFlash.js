var args = arguments[0] || {};
var sm = require('sm');
var sensor = require('com.geraudbourdin.sensor');

sensor.setSensor(sensor.TYPE_LIGHT);

var brightness = 0;
var sensorsCallback = function(e) {
	if (e.sType == sensor.TYPE_LIGHT) {
		$.lux.text = 'Ambiant light: ' + e.lux;
		if(e.lux<100){
			sensor.setflashLightOn();
		}else{
			sensor.setflashLightOff();
		}
	}
};

if(sensor.hasFlashLight() == true){
	$.win.addEventListener('open', function() {
		sensor.addEventListener('update', sensorsCallback);
	});

	$.win.addEventListener('close', function() {
		sensor.removeEventListener('update', sensorsCallback);
		sensor.setflashLightOff();
		$.destroy();
	});
	
	$.win.addEventListener('pause', function(e) {
		sensor.removeEventListener('update', sensorsCallback);
		sensor.setflashLightOff();
	});
	
	$.win.addEventListener('resume', function(e) {
		sensor.addEventListener('update', sensorsCallback);
	});
}