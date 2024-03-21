@echo off

call undeploy.bat

echo deploy begin

cd ..

call yarn run build

ssh -p 22 moriaty@192.168.50.112 "rm -rf /tmp/vuitton-plus-web && mkdir -p /tmp/vuitton-plus-web"

scp -r dist moriaty@192.168.50.112:/tmp/vuitton-plus-web/dist

scp Dockerfile moriaty@192.168.50.112:/tmp/vuitton-plus-web/Dockerfile

scp nginx.conf moriaty@192.168.50.112:/tmp/vuitton-plus-web/nginx.conf

scp bin/deploy.sh moriaty@192.168.50.112:/tmp/vuitton-plus-web/deploy.sh

ssh -p 22 moriaty@192.168.50.112 "cd /tmp/vuitton-plus-web; sh /tmp/vuitton-plus-web/deploy.sh"

echo deploy done
