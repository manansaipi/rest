const fs = require('fs')

const { Storage } = require('@google-cloud/storage');

//credentials-key
const storage = new Storage({
  projectId: 'qwiklabs-gcp-00-d947baf6112d',
  keyFilename: './credentials/credentials.json', 
});

const bucketName = 'bucket_express3'

const bucket = storage.bucket(bucketName); //my bucket name in the cloud



const uploadPhoto = async (req, res, next) => {
    const file = req.file;
    const destination = bucket.file(file.filename);// path to save in the bucket and the file name

    const filePath = `./public/images/${file.filename}`;

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.filename}`;

    try {
    const options = {
      metadata: {
        contentType: file.mimetype,
      },
      predefinedAcl: 'publicRead', // set public access control
    };
    
    // fs.createReadStream(`./public/images/${file.filename}`)
    // .pipe(destination.createWriteStream(options))

    await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(`./public/images/${file.filename}`);
      const writeStream = destination.createWriteStream(options);

      readStream.on('error', reject);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);

      readStream.pipe(writeStream);
    });
    // do delete file here in public/images directory 
     fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Failed to delete file: ${err}`);
        }
     })

    res.json({
      message: 'Upload success',
      data: req.file,
      url: publicUrl
    
    });
 

    } catch (error) {
        res.json({
            message: error
        })
    }
         
}

module.exports = {
    uploadPhoto
}