/*
 * USAGE :
 * var sm = require('sm');
 * sm.dump(resultArray); 
 */

var var_dump = function (_var, _level) {
  var dumped_text = "";
  if(!_level) _level = 0;
     
  var level_padding = "";
  for(var j=0; j<_level+1; j++) level_padding += "\t";
     
    if(typeof(_var) == 'object') { //Array/Hashes/Objects 
      for(var item in _var) {
	    var value = _var[item];
	             
	    if(typeof(value) == 'object') { // If it is an array,
	      dumped_text += level_padding + "'" + item + "' ...\n";
	      dumped_text += var_dump(value, _level+1);
	    } else {
	      dumped_text += level_padding +"'"+ item +"' => \""+ value +"\"\n";
	    }
      }
    } else { //Stings/Chars/Numbers etc.
      dumped_text = "===>"+ _var +"<===("+ typeof(_var) +")";
    }
  return dumped_text;
};

exports.dump = function (obj) {
	Ti.API.info('[---DEBUG VAR DUMP---]:\n\n\n' + var_dump(obj)+'\n\n\n;');
};
