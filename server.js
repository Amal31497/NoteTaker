const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 7080;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});