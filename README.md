# Coleweight
Coleweight bot used @ discord.gg/mining and API for the [Coleweight mod](https://chattriggers.com/modules/v/Coleweight).

## Setup
1. Create a directory for your docker container. Create docker-compose and git clone this repo to subdirectory data:
├── data
│   ├── src
└── docker-compose.yml
2. Use docker compose:

```
services:
  coleweight:
    build: ./data
    container_name: coleweight
    restart: unless-stopped
    volumes:
      - /etc/letsencrypt/live/ninjune.dev/privkey.pem:/app/certs/privkey.pem:ro
      - /etc/letsencrypt/live/ninjune.dev/fullchain.pem:/app/certs/fullchain.pem:ro
      - ./data:/app
    ports:
      - 8003:80
      - 8004:443
```
This will run a website on http://localhost:8003 and https://localhost:8004. Only /api has content.

Change the certificates & ports 8003 and 8004 to 80 and 443 respectively if you do not use a reverse proxy. Alternatively, delete the website code if you don't need api access.
