if [ ! -d "./client/node_modules" ]; then 
  cd ./client && npm run-script install && cd ../
fi
cd ./client && npm run-script build && cd ../ && node ./SSR.js