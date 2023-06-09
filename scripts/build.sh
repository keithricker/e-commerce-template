if [ ! -d "./client/node_modules" ]; then 
  cd ./client && npm install && npm run-script build && cd ../ && node ./SSR.js
else
  cd ./client && npm run-script build && cd ../ && node ./SSR.js
fi