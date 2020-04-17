cd 
mkdir dbQuiz -p
mongod --bind_ip_all --storageEngine wiredTiger --dbpath "./dbQuiz" --port 27016 &
echo '============   Cache database (wiredTiger) started ============'
