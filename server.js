import app from "./app.js";

import { connectTODB } from "./database/connection.js";

const PORT = process.env.PORT || 5000;

connectTODB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
});
