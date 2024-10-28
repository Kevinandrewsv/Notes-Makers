const dotenv = require('dotenv');
dotenv.config();

const dbConnect = require('./config/database');
const app = require('./app');

const port = process.env.PORT || 8000;

dbConnect();
app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});
