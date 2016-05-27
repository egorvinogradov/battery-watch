battery-watch
=============

Puts Mac into sleep mode when battery reaches certain level. Requires nodejs.

* Install sleepwatcher `brew install sleepwatcher`
* Change path to the startup script in `com.BatteryWatch.plist` if necessary
* Move `com.BatteryWatch.plist` into `~/Library/LaunchAgents`
* Install forever
```shell
npm install forever -g
cd cd battery-watch
npm install forever-monitor
```
* Run startup script manually `./battery_watch_startup.sh`



To kill battery-watch run `node battery_watch_stop.js `
