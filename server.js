const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors());
app.use("/public", express.static("public"));

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
});