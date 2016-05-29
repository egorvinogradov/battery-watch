#!/bin/bash

config_dir=".battery_watch"

if [[ ! -e $dir ]]; then
  mkdir $dir
fi

nohup /usr/local/sbin/sleepwatcher -s "echo 'BATTERY_WATCH=0' > ~/$config_/status" > /dev/null 2>&1 &
nohup /usr/local/sbin/sleepwatcher -w "echo 'BATTERY_WATCH=1' > ~/$config_/status" > /dev/null 2>&1 &

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
forever start $script_dir/battery_watch.js
