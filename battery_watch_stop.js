// Kills battery_watch process

var exec = require('child_process').exec;

exec('ps aux | grep battery_watch', function(error, stdout, stderr){
  try {

    var data = stdout.split(/\n/).map(function(str){
      return str.split(/\s+/);
    }).filter(function(items){
      return (items.indexOf('node') > -1 || items.indexOf('sleepwatcher') > -1) && items.indexOf('battery_watch_stop.js') === -1;
    });

    console.log('\nKilling battery_watch...\n');
    var pids = data.map(function(item){
      console.log(item.join(' '));
      return item[1];
    });
    console.log('\nDone\n');
    exec('kill -9 ' + pids.join(' '));
  }
  catch (e) {}
});
