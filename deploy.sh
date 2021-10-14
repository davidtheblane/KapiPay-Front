#!/bin/bash

cd app/KapiPay-Front
sudo git pull

sudo npm install
sudo pm2 restart app.js
