#!/bin/bash

npm start &

inotifywait -m /var/pots/ -e create -e moved_to |
while read DIR ACTION FILE ; do
    if [[ "$FILE" =~ .yaml$ ]]; then
    	/usr/local/bin/deploy -spec $FILE
    fi
done