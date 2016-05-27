#!/bin/bash

dir=".battery_watch"

if [[ ! -e $dir ]]; then
  mkdir $dir
fi

sleepwatcher -s "echo 'BATTERY_WATCH=0' > ~/$dir/status" &
sleepwatcher -w "echo 'BATTERY_WATCH=1' > ~/$dir/status" &

forever start battery_watch.js
