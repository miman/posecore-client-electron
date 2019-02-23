# posenet-client-electron

Posenet client native app using electron

# Build & run

## preparation
npm install -g electron
npm install -g electron-builder
npm install --global gulp-cli

## Install dependencies
npm install

## run
npm run start

This doesn't work in windows, must be run in linux subsystem on Windows 10.


## Build
npm run build

# create distribution packages (exe...)
npm run dist
or 
npm run release (only works on linux right now)

Here we use the library electron-builder.
https://github.com/electron-userland/electron-builder
