require("dotenv").config();
const imageKit = require("@imagekit/nodejs");

const ImageKitClient = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
});

async function uploadFile(file, type) {
  const result = await ImageKitClient.files.upload({
    file,
    fileName: `${type}-${Date.now()}`,
    folder: `yt-complete-backend/${type}`,
  });

  return result;
}
module.exports = uploadFile;
