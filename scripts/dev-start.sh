if [ ! -d "./client/node_modules" ]; then 
  cd ./client && npm install && npm start && cd ../
else 
  cd ./client && npm start && cd ../
fi
