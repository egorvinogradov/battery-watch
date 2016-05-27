battery-watch
=============

Puts Mac into sleep mode when battery reaches certain level. Requires nodejs.

1. Install sleepwatcher `brew install sleepwatcher`
2. Change path to the startup script in `com.BatteryWatch.plist` if necessary
3. Move `com.BatteryWatch.plist` into `~/Library/LaunchAgents`
4. Run script manually in the background
```shell
cd battery-watch
./battery_watch_startup.sh &
```
