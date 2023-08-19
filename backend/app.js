const express=require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDocument = require('./swagger_output.json');
const app=express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
 const product=require("./routes/productRoute")
 const user=require("./routes/userRoute")
 const order=require("./routes/orderRouter")
const payment = require("./routes/paymentRoute");
const track = require("./routes/trackRouter");
const errorMiddleware = require("./middleware/error");
const path = require("path");
var cors = require('cors')
const fileUpload = require("express-fileupload");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(express.json());
app.use(cors());
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1", payment);
app.use("/api/v1", track);
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });
app.use(errorMiddleware);
    // Swagger definition
    const swaggerDefinition = {
      info: {
        title: 'REST API for my App', // Title of the documentation
        version: '3.0.0', // Version of the app
        description: 'This is the REST API for my product', // short description of the app
      },
      host: `localhost:4000//api/v1`, // the host or url of the app
      // basePath: '', // the basepath of your endpoint
    };
    
    // options for the swagger docs
    const options = {
      // import swaggerDefinitions
      swaggerDefinition,
      // path to the API docs
      apis: ['./*.json','./docs/**/*.yaml','./routes/*.js'],
    };
    // initialize swagger-jsdoc
    const swaggerSpec = swaggerJSDoc(options);
    
    // use swagger-Ui-express for your app documentation endpoint
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports=app;