const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello, World!'); 
});
app.post("/signup", require("./route/userroute")); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;