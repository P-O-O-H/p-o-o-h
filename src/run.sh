#!/bin/bash

npm start &

inotifywait -m /var/pots/ -e create -e moved_to -e delete |
while read DIR ACTION FILE ; do
    if [[ "$ACTION" == "CREATE" && "$FILE" =~ .yaml$ ]]; then
    	/usr/local/bin/deploy -spec $FILE
    elif [[ "$ACTION" == "DELETE" && "$FILE" =~ .yaml$ ]]; then
    	/usr/local/bin/deploy -spec $FILE -delete $ACTION
    fi
done