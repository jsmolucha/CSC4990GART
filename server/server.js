const express = require('express');

const app = express();

const port = 5000;

app.get("/")

app.listen(port, () => console.log(`Server started on port ${port}`));
