# Installation

``` bash
#install dependencies
npm install

#install mongodb
$sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

$echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

$sudo apt-get update

$sudo apt-get install -y mongodb-org

$sudo service mongod start

# open mongo shell and create database named schedulerDatabase
$mongo
>use schedulerDatabase

# run the mock-db.js file to generate dummy user
$node mock-db.js

# run
$node index.js
```

## Note

#### API End points

GET /api/schedule

GET /api/tasks

POST /api/schedule (name,email,startTime,endTime,days)

POST /api/tasks (name,duration,startDateTime,email)
