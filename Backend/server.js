require("dotenv").config();
const app = require("./src/app");

// ✅ Vercel ke liye export karo
module.exports = app;

// ✅ Local development ke liye
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server is running on port ${port}..`);
  });
}
