@echo off

echo undeploy begin

ssh -p 22 moriaty@192.168.50.112 "rm -rf /tmp/vuitton-plus-web && mkdir -p /tmp/vuitton-plus-web"

scp undeploy.sh moriaty@192.168.50.112:/tmp/vuitton-plus-web/undeploy.sh

ssh -p 22 moriaty@192.168.50.112 "cd /tmp/vuitton-plus-web; sh /tmp/vuitton-plus-web/undeploy.sh"

echo undeploy done
