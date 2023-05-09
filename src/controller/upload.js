const fs = require('fs')

const { Storage } = require('@google-cloud/storage');

//credentials-key
const storage = new Storage({
  projectId: 'qwiklabs-gcp-00-d947baf6112d',
  keyFilename: '../credentials/cloud-storage.json', 
});

const bucketName = 'bucket_express3'

const bucket = storage.bucket(bucketName); //my bucket name in the cloud

// CRUD //
//C
const uploadPhoto = async (req, res) => {
    const file = req.file;
    const destination = bucket.file(`images/profile/${file.filename}`);// path to save in the bucket and the file name

    const filePath = `./public/images/${file.filename}`;

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucketName}/images/profile/${file.filename}`; // can store this URL to the cloudSQL

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

//R
//to read, first store the public url to databse and query that url to the client if needed

//U
//to update, simply upload a new file to the same bucket, in the same folder and same filename and it will overwrite the original file with the new version.

//D
//to delete just simply use this methof = destination.delete(). destination is => const destination = bucket.file(`images/profile/${file.filename}`);// path to save in the bucket and the file name

//If you want to keep a backup of your files, you may want to consider using object versioning or object lifecycle management in Google Cloud Storage to automatically move files to cheaper storage or delete them after a certain period of time.

module.exports = {
    uploadPhoto
}