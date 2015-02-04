var args = arguments[0] || {};


var sm = require('sm');
var sensor = require('com.geraudbourdin.sensor');
var infos = sensor.getSensorInfos(args['type']);
sm.dump(infos);

$.name.text = infos['name'];
$.constant.text = infos['constant'];
$.version.text = infos['version'];
$.resolution.text = infos['resolution'];
$.power.text = infos['power'];
$.vendor.text = infos['vendor'];
$.maximumRange.text = infos['maximumRange'];
$.minDelay.text = infos['minDelay'];
