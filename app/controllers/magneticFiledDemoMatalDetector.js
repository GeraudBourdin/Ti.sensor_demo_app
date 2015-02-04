var args = arguments[0] || {};
var sm = require('sm');
var sensor = require('com.geraudbourdin.sensor');

sensor.setSensor(sensor.TYPE_MAGNETIC_FIELD);

var sensorsCallback = function(e) {
	if (e.sType == sensor.TYPE_MAGNETIC_FIELD) {
		var val = new Number(e.magnetometer+'').toFixed(parseInt(0));
		$.magnetometer.text = val +' uT.';
		
		if(val>50){
			$.magnetometer.color="red";
			$.messageMetalDetected.text = 'Metal detected!';
		}else{
			$.magnetometer.color="black";
			$.messageMetalDetected.text = '';
		}
	}
};
sensor.addEventListener('update', sensorsCallback); 