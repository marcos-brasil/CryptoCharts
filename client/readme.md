# explaing things

# Instalation

```bash
# installing deps
npm i; cd server; npm i; cd ..

# apply patch
npm run patches

# build pod deps
npm run pod

# build ios app
npm run ios

# build android app
npm run android

```

---

## how to rename the app
- create a new react-native project with the new name

- update app.json and package.json to have the new app name

- change index.html to have the new name

- change the git repo name as well.
  - copy the remote repo to the new name
  - clone it and replace the app .git file with the new one

- rename the project folder name

- edit xcode and android manifest to add:
  - vector icons
  - force portrait mode
  - allow android to access the web by add a DNS at the macos system preference

- do a clean build for android and ios

---



### clean build
```bash
cd android && ./gradlew cleanBuildCache
cd ..
cd ios && pod cache clean --all && rm -rf build
cd ..
rm -rf node_modules
npm cache clean --force && npm run clean
npm install
npm run pod
# build ios, android and metro em parallel
npm run ios &
npm run android &
npm run client
```

---

## Developement mode
```bash
# start server, vitejs and metro
npm run client

# on another terminal, to see the server and vitejs logs
pm2 log
```

---

## Production mode
```bash
npm run bundle-client && npm run http-server

```

## Release Test mode
- TODO: 
  - explain how to turn on the qemu image
  - how to bundle the server into an executable
  - how to move the bundles client assets into the vm

---

## Release mode
- TODO: 
  - explain how to take the testd assets from qemu vm into the cloud

---

## There are patches applied on @react-navigation and native-base packages

## This packages dont play well with vitejs

- After every updates of this packages, there is a need to check if new patches are needed.
  - And to check if the patches work

- @react-navigation is converted to pure esm since it has a mix of cjs and esm
  - Each of its modules in bundled by esbuild. This improve build/dev time

- native-base package.json doesnt work well with vitejs. 
  - And also its bundled esm includes all its dependecies.
  - Also it is bundled by esbuild. This improve build/dev time 


- manually edited `node_modules/@react-navigation/routers/lib/typescript/src/types.d.ts`
  - `NavigationRoute` is not exported. But it is need for typescript annotation. So it was edited to export it.


