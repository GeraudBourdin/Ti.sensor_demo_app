var sensor = require('com.geraudbourdin.sensor');
var sm = require('sm');

var sensorsId = {};
sensorsId[sensor.TYPE_ACCELEROMETER] = 'status_accelerometer';

sensorsId[sensor.TYPE_AMBIENT_TEMPERATURE] = 'status_ambient_temperature';
sensorsId[sensor.TYPE_GAME_ROTATION_VECTOR] = 'status_game_rotation_vector';
sensorsId[sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR] = 'status_geomagnetic_rotation_vector';
sensorsId[sensor.TYPE_GRAVITY] = 'status_gravity';
sensorsId[sensor.TYPE_GYROSCOPE] = 'status_gyroscope';
sensorsId[sensor.TYPE_GYROSCOPE_UNCALIBRATED] = 'status_gyroscope_uncalibrated';

sensorsId[sensor.TYPE_LIGHT] = 'status_light';
sensorsId[sensor.TYPE_LINEAR_ACCELERATION] = 'status_linear_acceleration';
sensorsId[sensor.TYPE_MAGNETIC_FIELD] = 'status_magnetic_field';
sensorsId[sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED] = 'status_magnetic_field_uncalibrated';
sensorsId[sensor.TYPE_ORIENTATION] = 'status_orientation';
sensorsId[sensor.TYPE_PRESSURE] = 'status_pressure';
sensorsId[sensor.TYPE_PROXIMITY] = 'status_proximity';
sensorsId[sensor.TYPE_RELATIVE_HUMIDITY] = 'status_relative_humidity';
sensorsId[sensor.TYPE_ROTATION_VECTOR] = 'status_rotation_vector';
sensorsId[sensor.TYPE_SIGNIFICANT_MOTION] = 'status_significant_motion';
sensorsId[sensor.TYPE_STEP_COUNTER] = 'status_step_counter';
sensorsId[sensor.TYPE_STEP_DETECTOR] = 'status_step_detector';

//sensorsId[sensor.TYPE_HEART_RATE] = 'status_heart_rate';


var sensorList = sensor.getSensorList(sensor.TYPE_ALL);

for (i in sensorList){
	if( typeof  sensorsId[sensorList[i]] === 'undefined' ){
		continue;
	}
	sensor.setSensor(sensorList[i]);
	var type = sensorsId[sensorList[i]];
	$[type].setText("Yes.");
	$[type].setColor("green");
	
	if(sensorList[i] == sensor.TYPE_ACCELEROMETER){
		$.accelerometerDemo1.addEventListener('click',function(e){
			sensor.removeEventListener('update', sensorsCallback);
			Alloy.createController('accelerometerDemoBasicOrientation').getView().open();
		});
		$.accelerometerDemo2.addEventListener('click',function(e){
			sensor.removeEventListener('update', sensorsCallback);
			Alloy.createController('accelerometerDemoLinearAcceleration').getView().open();
		});
		var accelerometerInfos = Titanium.UI.createButton({ title: 'Infos',  width: 80, height: 50, right:5 });
		accelerometerInfos.addEventListener('click',function(e) {
		   viewInfos(sensor.TYPE_ACCELEROMETER);
		});	
		$.view_accelerometerLabel.add(accelerometerInfos);
		
	}
	
	if(sensorList[i] == sensor.TYPE_MAGNETIC_FIELD){
		$.magneticFiledDemo1.addEventListener('click',function(e){
			sensor.removeEventListener('update', sensorsCallback);
			Alloy.createController('accelerometerMagneticFiledDemoCompass').getView().open();
		});
		$.magneticFiledDemo2.addEventListener('click',function(e){
			sensor.removeEventListener('update', sensorsCallback);
			Alloy.createController('magneticFiledDemoMatalDetector').getView().open();
		});
		var magneticFiledInfos = Titanium.UI.createButton({ title: 'Infos',  width: 80, height: 50, right:5 });
		magneticFiledInfos.addEventListener('click',function(e) {
		   viewInfos(sensor.TYPE_MAGNETIC_FIELD);
		});	
		$.view_magneticFiledLabel.add(magneticFiledInfos);
	}
	
	if(sensorList[i] == sensor.TYPE_ORIENTATION){
		$.orientationDemo.addEventListener('click',function(e){
			sensor.removeEventListener('update', sensorsCallback);
			Alloy.createController('orientationDemo').getView().open();
		});
		
		var orientationInfos = Titanium.UI.createButton({ title: 'Infos',  width: 80, height: 50, right:5 });
		magneticFiledInfos.addEventListener('click',function(e) {
		   viewInfos(sensor.TYPE_ORIENTATION);
		});	
		$.view_orientationLabel.add(orientationInfos);
	}	
	
	
	
	if(sensorList[i] == sensor.TYPE_AMBIENT_TEMPERATURE){
		var ambientTemperatureInfos = Titanium.UI.createButton({ title: 'Infos',  width: 80, height: 50, right:5 });
		ambientTemperatureInfos.addEventListener('click',function(e) {
		   viewInfos(sensor.TYPE_AMBIENT_TEMPERATURE);
		});	
		$.view_ambientTemperatureLabel.add(ambientTemperatureInfos);
	}	
	
	
	if(sensorList[i] == sensor.TYPE_GRAVITY){
		$.gravityDemo1.addEventListener('click',function(e){
			sensor.removeEventListener('update', sensorsCallback);
			Alloy.createController('gravityDemoBasicOrientation').getView().open();
		});
		var gravityInfos = Titanium.UI.createButton({ title: 'Infos',  width: 80, height: 50, right:5 });
		gravityInfos.addEventListener('click',function(e) {
		   viewInfos(sensor.TYPE_GRAVITY);
		});	
		$.view_gravityLabel.add(gravityInfos);
		
	}	
	
	
	
	
	
	if(sensorList[i] == sensor.TYPE_LINEAR_ACCELERATION){
		$.linearAccelerationDemo1.addEventListener('click',function(e){
			sensor.removeEventListener('update', sensorsCallback);
			Alloy.createController('linearAccelerationDemo').getView().open();
		});
	}



}
var significantMotionNumber = 0;
var sensorsCallback = function(e) {
	if(e.sType == sensor.TYPE_ACCELEROMETER){
		$.accelerometerLabelx.text = 'x: ' + e.x;
		$.accelerometerLabely.text = 'y: ' + e.y;
		$.accelerometerLabelz.text = 'z: ' + e.z;
		$.linearAccelerationX.text = 'linearAccelerationX: ' + e.linearAccelerationX;
		$.linearAccelerationY.text = 'linearAccelerationY: ' + e.linearAccelerationY;
		$.linearAccelerationZ.text = 'linearAccelerationZ: ' + e.linearAccelerationZ;
	}else if(e.sType == sensor.TYPE_MAGNETIC_FIELD){
		$.magneticFieldLabelx.text = 'x: ' + e.x;
		$.magneticFieldLabely.text = 'y: ' + e.y;
		$.magneticFieldLabelz.text = 'z: ' + e.z;
		$.azimuth.text = 'linearAccelerationX: ' + e.azimuth;
		$.pitch.text = 'linearAccelerationY: ' + e.pitch;
		$.roll.text = 'linearAccelerationZ: ' + e.roll;	
	}else if(e.sType == sensor.TYPE_AMBIENT_TEMPERATURE){
		$.ambientTemperatureLabelCelcius.text = 'Celcius: ' + e.celcius +'°C.';
		$.ambientTemperatureLabelFahrenheit.text = 'Fahrenheit: ' + e.fahrenheit+'°F.';
	}else if(e.sType == sensor.TYPE_GAME_ROTATION_VECTOR){
		$.gameRotationVectorLabelX.text  = 'X: ' + e.x;
		$.gameRotationVectorLabelY.text  = 'Y: ' + e.y;
		$.gameRotationVectorLabelZ.text  = 'Z: ' + e.z;
		$.gameRotationVectorLabelCos.text  = 'Cos: ' + e.cos;
		$.gameRotationVectorLabelheadingAccuracy  = 'Estimated heading Accuracy (in radians) (-1 if unavailable): ' + e.headingAccuracy;
	}else if(e.sType == sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR){
		$.geomagneticRotationVectorLabelX.text  = 'X: ' + e.x;
		$.geomagneticRotationVectorLabelY.text  = 'Y: ' + e.y;
		$.geomagneticRotationVectorLabelZ.text  = 'Z: ' + e.z;
		$.geomagneticRotationVectorLabelCos.text  = 'Cos: ' + e.cos;
		$.geomagneticRotationVectorLabelheadingAccuracy  = 'Estimated heading Accuracy (in radians) (-1 if unavailable): ' + e.headingAccuracy;
	}else if(e.sType == sensor.TYPE_GRAVITY){
		$.gravityLabelX.text  = 'X: ' + e.x;
		$.gravityLabelY.text  = 'Y: ' + e.y;
		$.gravityLabelZ.text  = 'Z: ' + e.z;
	}else if(e.sType == sensor.TYPE_GYROSCOPE){
		$.gyroscopeLabelRadianX.text = 'Radian X: ' + e.radianX;
		$.gyroscopeLabelRadianY.text = 'Radian Y: ' + e.radianY;
		$.gyroscopeLabelRadianZ.text = 'Radian Z: ' + e.radianZ;
		$.gyroscopeLabelDegreesX.text = 'Degrees X: ' + e.degreesX;
		$.gyroscopeLabelDegreesY.text = 'Degrees Y: ' + e.degreesY;
		$.gyroscopeLabelDegreesZ.text = 'Degrees Z: ' + e.degreesZ;
	}else if(e.sType == sensor.TYPE_LIGHT){
		$.lightLabelLux.text = 'Light detected: ' + e.lux + ' lx (Lux).';
	}else if(e.sType == sensor.TYPE_LINEAR_ACCELERATION){
		$.linearAccelerationLabelX.text  = 'X: ' + e.x;
		$.linearAccelerationLabelY.text  = 'Y: ' + e.y;
		$.linearAccelerationLabelZ.text  = 'Z: ' + e.z;
	}else if(e.sType == sensor.TYPE_PROXIMITY){
		$.proximityLabel.text  = 'Distance: ' + e.cm + 'cm.';
	}else if(e.sType == sensor.TYPE_RELATIVE_HUMIDITY){
		$.humidityLabel.text  = 'Humidity: ' + e.percent + '%.';
	}else if(e.sType == sensor.TYPE_STEP_COUNTER){
		$.stepCounterLabelVal.text  = 'Step from last reboot: ' + e.val + '.';
		$.stepCounterLabelCount.text  = 'Step from application start: ' + e.count + '.';
	}else if(e.sType == sensor.TYPE_STEP_DETECTOR){
		$.stepDetectorLabel.text  = 'Step: ' + e.count + '.';
	}else if(e.sType == sensor.TYPE_ORIENTATION){
		$.orientationLabel.text  = 'Degrees offset: ' + e.orientation + '.';
	}else if(e.sType == sensor.TYPE_SIGNIFICANT_MOTION){
		$.significantMotion.text  = 'Motion detected: ' + e.motion + '.';
		significantMotionNumber++;
		$.significantMotionNumber.text  = 'Motion detected n°: ' + significantMotionNumber + '.';
	}
};

//sensor.addEventListener('update', sensorsCallback);
Ti.Android.currentActivity.addEventListener('pause', function(e) {
	Ti.API.info("removing sensorsCallback on pause");
	sensor.removeEventListener('update', sensorsCallback);
});
Ti.Android.currentActivity.addEventListener('resume', function(e) {
	Ti.API.info("adding sensorsCallback on resume");
	sensor.addEventListener('update', sensorsCallback);
});

$.start.addEventListener('click', function(e) {
	sensor.addEventListener('update', sensorsCallback);
});
$.stop.addEventListener('click', function(e) {
	sensor.removeEventListener('update', sensorsCallback);
});


function viewInfos(type){
	Alloy.createController('infos', {type:type}).getView().open();
}



$.index.open();
