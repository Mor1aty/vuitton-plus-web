@echo off

echo stop begin

ssh -p 22 moriaty@192.168.50.112 "mkdir -p /tmp/vuitton-plus-web"

scp stop.sh moriaty@192.168.50.112:/tmp/vuitton-plus-web/stop.sh

ssh -p 22 moriaty@192.168.50.112 "cd /tmp/vuitton-plus-web; sh /tmp/vuitton-plus-web/stop.sh"

echo stop done
