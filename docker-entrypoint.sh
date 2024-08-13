#!/bin/bash

# Build the Next site including SSG
npm run build

# Start the production server
pm2 start npm run start --name furni_app 