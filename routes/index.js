/* ========================= LIBARY ========================= */
var express = require('express');
var router = express.Router();
const { FILE } = require('dns');
const { readdirSync, rename } = require('fs');
const { resolve } = require('path');
const convert = require('../models/convertPath.js');
/* ========================== REGEX ========================== */
const imageRegex = /.+(\.)(jpg|jpeg|png|gif)$/
const videoRegex = /.+(\.)(mp4|avi|mov|flv|wmv)/
const pdfRegex = /.+(\.)(pdf)/
const txtRegex = /.+(\.)(txt)/
const docxRegex = /.+(\.)(docx|dot|dotx)/
/* ========================== FUNCTION ========================== */
let verityFormat = ( fileExtension ) =>{
  let fileRegex;

  switch(fileExtension)
  {
    case "image":
      fileRegex = imageRegex;
      break;
    case "video":
      fileRegex = videoRegex;
      break;
    case "pdf":
      fileRegex = pdfRegex;
      break;
    case "txt":
      fileRegex = txtRegex;
      break;
    case "docx":
      fileRegex = docxRegex;
      break;
    default:
      fileRegex = imageRegex;
      break;
  }
  return fileRegex;
}
/* ========================= ROUTER ========================= */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  let messenger = "";
  res.render('home',{messenger : messenger});
});

router.post('/home', function(req, res, next) {
  let folderPath =  convert.spinalCase( req.body.folderPath );
  let fileName = req.body.fileName;
  let fileExtension = req.body.fileExtension;
  let fileRegex = verityFormat( fileExtension);
  let messenger = "Congratulation, Renamed successfully (〃￣︶￣)人(￣︶￣〃)";
  let index = 0;

  const imageDirPath = resolve(__dirname, folderPath);// Get path to image directory
  const files = readdirSync(imageDirPath);// Get an array of the files inside the folder
  console.log(`There are ${files.length} ${fileExtension}`)
  for(let file of files)
  {
    if( fileRegex.test(file) == false )
        continue;
    // get file extension
    let extensionPosition = file.lastIndexOf('.');
    let extensionName = file.slice(extensionPosition);
    
    rename(
        imageDirPath + `/${file}`,
        imageDirPath + `/ ${fileName}(${index})${extensionName}`,
        (err) => {
            if(err != null)
                console.log(err);
            else
            {
                console.log(`${index}. ${file} is renamed successfully !`);
            }
        });
    index++;
  };
   res.render('home',{messenger : messenger});
});

module.exports = router;
