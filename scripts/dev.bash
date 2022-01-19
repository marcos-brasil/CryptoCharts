#! /bin/bash
cd server
npx pm2 start pm2-dev.config.cjs

cd ../client
npx pm2 start pm2-dev.config.cjs

[ "$(uname)" == "Darwin" ] && npm run native
