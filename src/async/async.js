const fs = require('fs')

const writeFileAsync = async (arr, nameFile) => {
    await fs.promises.writeFile(
      nameFile,
      JSON.stringify(arr, null, 2),
      "utf-8"
    );
  }; 
  
  const readFileAsync = async (nameFile) => {
    let file = await fs.promises.readFile(nameFile, "utf-8");
    return file;
  };
  
  const truncateAsync = async (nameFile) => {
    await fs.promises.truncate(
      nameFile, 0, function() {
  
      }
    )
  }

  module.exports.writeFileAsync = writeFileAsync
  module.exports.readFileAsync = readFileAsync
  module.exports.truncateAsync = truncateAsync