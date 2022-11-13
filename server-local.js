const app = require('./express/server');
require('dotenv').config();

const PORT = process.env.PORT||80;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));