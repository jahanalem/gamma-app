# gamma-app

Project setup instructions:

1- go to \gamma-app\server-side> and run:
   - > npm install
   - > npm install nodemon -g
   - > npm install @types/node -g
   - > npm install ts-node -g
   - > npm install typescript -g

2- go to \gamma-app\client-side\gamma-client-app> and run:
   - npm install

3- run powershell in administrator mode and run:
   - > Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine

   (more info: https://stackoverflow.com/a/54776674)

4- Create a database with name gamma_db in MySQL. Gamma is using MySQL by default.
   You can see the database provider in the schema.prisma file that located in \gamma-app\server-side\prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
    
   Also connectionstring is in the .env file in \gamma-app\server-side\
   DATABASE_URL="mysql://root@127.0.0.1:3306/gamma_db?connection_limit=40&pool_timeout=20"

5- After creating the db, you need create the tables. prismaJS as a ORM makes the tables for you.
   run this line in command for this purpose:
   - > npx prisma migrate dev

   (more info: https://www.prisma.io/docs/concepts/components/prisma-migrate)

6- For initializing the database:
   - Install Thunder Client (https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
   - After installing, import Init_db_with_Thunder-Client.json file. 
     (Go to the Collections tab and then click on the triple line and then choose import.)
   - select "Initialize database" collection/folder and the click on the triple dots and the "Run All" and then click on the "Run"
     The order of running is important. you have to follow these orders:
        1- create roles
        2- create admin user
        3- create tags
        4- create categories
        5- create posts

7- Now you can run the project!
   First, in \gamma-app\server-side> run
   > nodemon
   Second, in \gamma-app\client-side\gamma-client-app> run
   > npm start


   


   

