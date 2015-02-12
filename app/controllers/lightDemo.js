var args = arguments[0] || {};
var sm = require('sm');
var sensor = require('com.geraudbourdin.sensor');

sensor.setSensor(sensor.TYPE_LIGHT);
var brightness = 0;
var sensorsCallback = function(e) {
	if (e.sType == sensor.TYPE_LIGHT) {
		$.lux.text = 'Ambiant light: ' + e.lux;
		brightness = sensor.getScreenBrightness();
		$.brightness.text = 'Screen brightness: ' + brightness;
		if(e.lux>255){
			e.lux = 255;
		}
		sensor.setScreenBrightness(e.lux);
	}
};
function getBrightnessModeText(mode){
	if(mode == sensor.SCREEN_BRIGHTNESS_MODE_MANUAL){
		return 'MANUAL';
	}else if (mode == sensor.SCREEN_BRIGHTNESS_MODE_AUTOMATIC){
		return 'AUTOMATIC';
	}else {
		return 'Not detected';
	}
}
var initialBrightnessMode = sensor.getBrightnessMode();
$.win.addEventListener('open', function() {
	$.initialBrightnessModeText.text = 'Initial brightness mode: ' + getBrightnessModeText(initialBrightnessMode) + '.';
	sensor.setBrightnessMode(sensor.SCREEN_BRIGHTNESS_MODE_MANUAL);
	$.updatedBrightnessModeText.text = 'Updated brightness mode: ' + getBrightnessModeText(sensor.getBrightnessMode()) + '.';
	sensor.addEventListener('update', sensorsCallback);
});

$.win.addEventListener('close', function() {
	sensor.setBrightnessMode(initialBrightnessMode);
});

Ti.Android.currentActivity.addEventListener('pause', function(e) {
	Ti.API.info("removing sensorsCallback on pause");
	sensor.removeEventListener('update', sensorsCallback);
});
Ti.Android.currentActivity.addEventListener('resume', function(e) {
	Ti.API.info("adding sensorsCallback on resume");
	sensor.addEventListener('update', sensorsCallback);
});
