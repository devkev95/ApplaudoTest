1.Install all node dependencies using
``` bash
cd services
npm install
```
2. Create a new MariaDB/MySQL database called OnlineStore
3. Use the script database.sql to create the tables on OnlineStore
4. Set your database username, password and port on services/server/config/config.json on the development configuration part
5. Use the file data.sql to dump data on the OnlineStore database
6. There are 2 users added to the system it's creadentials are:

Email | Password | Role
------------ | ------------- | -------------
devkev95@gmail.com | contraseña | Administrator
usuario@correo.com | 123456 | Normal
7. To start the app you can use either:
``` bash
cd services
npm run start
```
o

``` bash
cd services
npm run start:dev
```
Note: To test secured endpoints you will have to provide a JSON Web token to those endpoints. You can do this adding an Authorization header with value: Bearer *token* where *token* is the JSON Web Token that you received when you logged in on the app using the /api/singin route providing your credentials(email, password).