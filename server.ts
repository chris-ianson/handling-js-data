import app from "./app";
import logger from "./src/services/logger";

require('dotenv').config();

const port: string = process.env.PORT || '3000';

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
