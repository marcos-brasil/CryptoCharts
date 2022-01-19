# instalation of remove packages

```bash
# on remote
aptitude update
aptitude upgrade
apt-get -y install aptitude
aptitue install -y vim sqlite3
# geting nvm to install latest nodejs
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh -o install_nvm.sh

bash install_nvm.sh
source ~/.profile

npm i -g pnpm

# on local machine
scp -i digital-ocean-001-ssh dist/db/create-coins-price.js  root@159.65.252.95:~/fetch-current-prices/index.js

scp -i digital-ocean-001-ssh package.json  root@159.65.252.95:~/fetch-current-prices/package.json

# on remote
cd fetch-current-prices
pnpm i
```
