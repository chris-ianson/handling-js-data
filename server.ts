import app from "./app";

require('dotenv').config();

const port: any = process.env.PORT || '3000';

app.listen(port, () => {
  console.log('listening on port ' + port)
});
