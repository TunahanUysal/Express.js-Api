const express=require("express");
const actorsRouter=require("./routers/actorsRouter.js");
const logger=require("./middlewares/logger.js");
const errorHandling=require("./middlewares/errorHandling.js");
const swaggerUi=require("swagger-ui-express");
const swaggerDocument=require("./swagger.json");

const server=express();

server.use(express.json()); // middleware req.body e gelen datayı parse etmemiz gerekiyor.Otomatik parse ediyor. Express.js middleware mantıgı
server.use(logger);
server.use("/aktorler",actorsRouter);

server.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

server.get('/',(request,response)=>{

    response.send("Express'den merhaba!");

});

server.use(errorHandling);


server.listen(5000,()=>{
    console.log('http://localhost:5000 adresine gelen istekler dinleniyor....');
})

