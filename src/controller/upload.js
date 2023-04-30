const fs = require('fs')

const { Storage } = require('@google-cloud/storage');

//credentials-key
const storage = new Storage({
  projectId: 'qwiklabs-gcp-03-da615e512362',
  keyFilename: './credentials/credentials.json', 
});

const bucket = storage.bucket('bucket_express2'); //my bucket name in the cloud


const uploadPhoto = (req, res, next) => {
    const file = req.file;
    const destination = bucket.file(file.filename);// path to save in the bucket and the file name
    try {
    
    fs.createReadStream(`./public/images/${file.filename}`)
    .pipe(destination.createWriteStream())
 
    // do delete file here in public/images directory 

    res.json({
        message: "UPLOAD Success"
    })
 

    } catch (error) {
        res.json({
            message: error
        })
    }
         
}

module.exports = {
    uploadPhoto
}