#!/bin/bash

cd app/KapiPay-Front
git checkout main
git pull origin main
npm install
pm2 restart app.js
