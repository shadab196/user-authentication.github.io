const express = require('express');
const app = express(); //create instance
//The app variable is assigned this instance, and it becomes an object with its 
//own properties and methods specific to the Express.js framework.

// when you create an "instance" of an Express application with const app = express();, 
// you are creating a unique copy of the Express.js framework that you can customize 
// and use to define how your server behaves and responds to HTTP requests.

const authRouter = require('./routes/userRoutes.js');
const databaseconnect = require('./config/userdb.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// connect to db
databaseconnect();

app.use(express.json()); // Built-in middleware  it is used for to understand json
app.use(cookieParser()); // Third-party middleware

app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true })); //Third-party middleware

// origin: [process.env.CLIENT_URL]: This specifies the allowed origins (i.e., domains)
//  that are permitted to make cross-origin requests to your server. process.env.CLIENT_URL 
//  is typically an environment variable that holds the URL of the client-side application, 
//  which is allowed to access your server's resources. Only requests from this origin are
//   allowed.

// credentials: true: This option indicates that the client may include credentials 
// (such as cookies or HTTP authentication) in the request. When credentials is set 
// to true, the server can respond to requests with the appropriate CORS headers to 
// allow these credentials to be sent.











// Auth router
app.use('/api/auth', authRouter);

app.use('/', (req, res) => {
  res.status(200).json({ data: 'JWTauth server ;)' });
});



module.exports = app;
//Finally, this line exports the app object, making it available for use in other parts
//of your application, such as in the index.js file, where you start the server.
