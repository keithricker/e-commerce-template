if [ ! -d "./client/node_modules" ]; then 
  cd ./client && npm run-script install && npm start && cd ../ & npm start
else 
  cd ./client && npm start && cd ../ & npm start
fi