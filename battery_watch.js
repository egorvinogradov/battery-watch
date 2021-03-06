// TODO: split out battery watch and lid close watch into separate background deamons

var exec = require('child_process').exec;

var BATTERY_LIMIT_WARNING = 45;
var BATTERY_LIMIT_SLEEP = 40;

var warning_showed = false;
var final_warning_showed = false;

var i = 0;

setInterval(function(){
  
  console.log('Check', i);
  i++;

  isAwake(function(awake){
    if (awake) {
      console.log('Awake');
      getBatteryStatus(function(error, percentage, isDischarging){
        console.log(isDischarging ? 'discharging' : 'NOT discharging', percentage);
        if (!error && isDischarging) {
          if (percentage <= BATTERY_LIMIT_WARNING && !warning_showed) {
            exec('osascript -e \'display notification "Low battery level"\'');
            warning_showed = true;
          }
          else if (percentage <= BATTERY_LIMIT_SLEEP && !final_warning_showed) {
            final_warning_showed = true;
            exec('osascript -e \'display notification "Putting computer to sleep in 1 minute"\'; sleep 60; pmset sleepnow', function(){
              warning_showed = false;
              final_warning_showed = false;
            });
          }
        }
        if (percentage > BATTERY_LIMIT_WARNING) {
          warning_showed = false;
          final_warning_showed = false;
        }
      });
    }
  });

}, 20 * 1000);


function isAwake(callback){
  exec('source ~/.battery_watch/status; echo $BATTERY_WATCH', function(error, stdout, stderr){
    if (!error && +stdout === 1) {
      callback(true);
    }
    else {
      callback(false);
    }
  });
}

function getBatteryStatus(callback){
  exec('pmset -g batt', function(error, stdout, stderr){
    try {
      var data = stdout.split(/\n/)[1].split(/;\s+/);
      var percentage = +data[0].replace(/^.*\s+([0-9]+)%$/, '$1');
      var isDischarging = data[1] === 'discharging';
      callback(false, percentage, isDischarging);
    }
    catch (e) {
      callback(true);
    }
  });
}



// TODO: move to a separate daemon

function checkIfLidIsClosed(callback){
  exec('ioreg -r -k AppleClamshellState -d 4 | grep AppleClamshellState  | head -1', function(error, stdout, stderr){
    try {
      callback(/\s+yes$/i.test(stdout.trim()));
    }
    catch(e){
      callback(false);
    }
  });
}

setInterval(function(){
  checkIfLidIsClosed(function(closed){
    if (closed) {
      exec('pmset sleepnow');
    }
  });
}, 1 * 1000);
