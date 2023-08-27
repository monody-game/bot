# Monody's discord bot

This bot is used for discord-related features (vocal games).
It also has some commands that uses Monody's API to display roles' details or users' profiles

## Run it locally
Install deps : ``yarn install``  
Fill config.yml file to correspond to your discord server  
Fill .env with your discord credentials (bot token). Make sure you use the same APP_PRIVATE_NETWORK_KEY as in the API .env file.  
Then just run ``docker-compose up -d --build``. It depends on monody docker network so you need to run the API/ws server/front docker-compose file too