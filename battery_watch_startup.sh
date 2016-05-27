#!/bin/bash

$dir=.battery_watch

if [[ ! -e $dir ]]; then
  mkdir $dir
fi

sleepwatcher -s "echo "BATTERY_WATCH=0" > ~/.battery_watch/status" &
sleepwatcher -w "echo "BATTERY_WATCH=1" > ~/.battery_watch/status" &

node battery_watch.js &
