#!/bin/bash

# Build the Next site including SSG
npm run build

#npm run dev
# Start the production server
pm2-runtime npm --name furni_app -- start 