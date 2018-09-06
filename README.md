# collin-cash

## Overview

This app utilizes a reward system for my son.

This app leverages the Ionic Framework, Angular, and Firebase.

## Getting Started

The following tools are pre-requisites and should be installed globally:

- npm
- firebase-tools

    `npm install -g firebase-tools`
- ionic

    `npm install -g cordova ionic`
- gulp

    `npm install -g gulp`

### Install NPM packages

`npm install`

### Setup Firebase project

1. Update `.firebaserc` file with correct project
2. Update `src/environments/environment.${ENV}.ts` file(s) with correct Firebase parameters
3. Make sure `src/app/app.module.ts` in @NgModule imports `AngularFireModule.initializeApp(environment.firebase)` is pointing to the correct environment

### Serve in local browser

`ionic serve`