#!/bin/bash

cd app/KapiPay-Front
git pull

npm install
pm2 restart app.js
