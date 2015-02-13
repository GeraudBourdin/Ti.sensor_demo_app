var args = arguments[0] || {};
var sm = require('sm');
var sensor = require('com.geraudbourdin.sensor');
var lastTime = new Date().getTime();
var offset = 100;
//sensor.setSensor(sensor.TYPE_ACCELEROMETER);
//sensor.setSensor(sensor.TYPE_MAGNETIC_FIELD);
//sensor.setSensor(Sensor.TYPE_ORIENTATION);
var sensorsCallback = function(e) {
	if (e.sType == sensor.TYPE_ORIENTATION) {
		var now = new Date().getTime();
		if(lastTime + offset < now){
			$.degrees.text = e.orientation;
			//img.transform = Titanium.UI.create2DMatrix().rotate( -e.orientation );
			var rotation = Titanium.UI.create2DMatrix().rotate( -e.orientation );
			var animation = Ti.UI.createAnimation();
  			animation.transform = rotation;
  			animation.duration = offset;
  			img.animate(animation);
			lastTime = now;
		}
	}
};



var img = Titanium.UI.createImageView({
    image : '/compassPointer.png',
    backgroundColor : 'transparent',
    anchorPoint : {
        x : '50%',
        y : '50%'
    },
    height : 150,
    width : 150
});
$.square.add(img);
/*
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
*/
$.win.addEventListener('open', function() {
	sensor.addEventListener('update', sensorsCallback);
});


$.win.addEventListener('close', function() {
	sensor.removeEventListener('update', sensorsCallback);
	$.destroy();
});

$.win.addEventListener('pause', function(e) {
	sensor.removeEventListener('update', sensorsCallback);
});

$.win.addEventListener('resume', function(e) {
	sensor.addEventListener('update', sensorsCallback);
});



if (Ti.Platform.osname == 'android'){
    Ti.Gesture.addEventListener('orientationchange', function(e) {
        var curAct = Ti.Android.currentActivity;
        curAct.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
    });
}
