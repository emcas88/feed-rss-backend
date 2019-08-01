# Feed RSS backend
This project defines the services Feed RSS backend

# Getting Started ⚡️

As a prerequisite to run the project you need have Docker installed, if not please refer to the [Docker Docs](https://docs.docker.com) for more information about how to install it in your operating system.

After Docker is installed you can follow the following steps to run the container in order to the have project running:

 1. Go to the root folder.
 2. Run the in the terminal the command `docker-compose up -d`.
 3. Now run `docker container ls` and you should see 3 containers running, the nodejs server, the mongodb instance and a simple administrative mongodb dashboard.
 4. The server is reachable through port 3001, mongo instance through 27017 and the mongo dashboard 8001.

 # Test
 
 1. Run `npm test` to execute the tests.
 