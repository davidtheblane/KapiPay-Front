#!/bin/bash

git checkout develop
git pull
sudo npm install
sudo pm2 restart app-develop --update-env
