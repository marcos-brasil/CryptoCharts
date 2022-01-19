#! /bin/bash

cd server
npm run create-prod

cd ../client
npm run bundle

cd ..

rm -rf release/public release/db 2> /dev/null
mkdir -p release 2> /dev/null

cp -r server/public \
  server/dist-prod/* \
  server/certs \
  release-config/* \
  release

cd release

find . -type f | \
  grep -vE 'node_modules|dbs|certs' | \
  tar cvzf ../release.tar.gz --files-from=- 
  # | openssl enc -d -aes256 -out

[ -d "node_modules" ] || npm i
[ -d "dbs" ] || {
  mkdir dbs 2>/dev/null
  find ../server/dbs -type f | \
    while read file; do
      target="./dbs/$(basename $file | sed 's;-dev;-prod;')"
      cp $file "$target"
    done
}
[ -d "certs" ] || cp ../server/secrets/certs .

cd ..
gpg -c --armor --cipher-algo AES256 --no-symkey-cache --output release.tar.gz.gpg release.tar.gz
rm release.tar.gz
# cat release.tar.gz | gpg -c > release.tar.gz.gpg
