#! /bin/bash

CMD="node $PWD/node_modules/.bin/vite build"
ps -e | grep "$CMD" | grep -v 'grep' | cut -d' ' -f1 |\
  while read pid; do
    echo "kill -9 $pid"
    kill -9 $pid 2> /dev/null
  done

NODE_ENV=production npx vite build