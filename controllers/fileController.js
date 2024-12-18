const File = require('../models/File'); // Assuming you have a File model
const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); // Import mime-types
const User = require('../models/User'); // Assuming you have a User model

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    // Generate a unique shared link
    const sharedLink = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // Determine the type of the file
    const typeOfFile = mime.lookup(req.file.originalname) || 'application/octet-stream';

    // Create a new file record in the database
    const newFile = new File({
      originalName: req.file.originalname,
      path: req.file.path,
      owner: req.user.id, // Assuming req.user.id contains the ID of the authenticated user
      sharedLink: sharedLink,
      password: req.body.password || null, // Store the password if provided
      typeOfFile: typeOfFile, // Store the file type
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newFile.save();

    res.status(200).json({
      message: 'File uploaded successfully!',
      file: newFile,
      sharedLink: sharedLink, // Return the shared link
    });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed!', error: error.message });
  }
};

const accessFileBySharedLink = async (req, res) => {
  const { sharedLink, password } = req.body;

  try {
      // Find the file by shared link
      const file = await File.findOne({ sharedLink: sharedLink });
      if (!file) {
          return res.status(404).json({ message: 'File not found!' });
      }

      // Check if a password is required and validate it
      if (file.password && file.password !== password) {
          return res.status(403).json({ message: 'Incorrect password!' });
      }

      // Serve the file if the password is correct or if there's no password
      const filePath = path.join(__dirname, '..', file.path); // Adjust the path if necessary
      res.download(filePath, file.originalName); // This will trigger the download of the file
  } catch (error) {
      res.status(500).json({ message: 'Error accessing file!', error: error.message });
  }
};
const getFilesuserById = async (req, res) => {
  const { id } = req.params; // Assuming id is the user ID passed as a parameter

  try {
      // Find files associated with the user ID
      const files = await File.find({ owner: id });
      if (!files.length) {
          return res.status(404).json({ message: 'No files found for this user!' });
      }

      res.status(200).json({ files });
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving files!', error: error.message });
  }
};
const getFilesById = async (req, res) => {
  const { id } = req.params; // Assuming id is the user ID passed as a parameter

  try {
      // Find files associated with the user ID
      const files = await File.find({ _id: id });
      if (!files.length) {
          return res.status(404).json({ message: 'No files found for this fileID!' });
      }

      res.status(200).json({ files });
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving files!', error: error.message });
  }
};


const newFileName = async (req, res) => {
  const { id, newFileName } = req.body;

  try {
    const file = await File.findById(id); // Find the file by its ID
    if (!file) {
      return res.status(404).json({ message: 'File not found!' });
    }

    // Define the old and new paths
    const oldPath = `./uploads/${file.originalName}`;
    const newPath = `./uploads/${newFileName}`;

    // Check if the file exists
    if (!fs.existsSync(oldPath)) {
      return res.status(404).json({ message: 'Original file not found on the server!' });
    }

    // Update the file name in the database
    file.originalName = newFileName;
    await file.save();

    // Rename the file in the filesystem
    fs.renameSync(oldPath, newPath);

    res.status(200).json({ message: 'File renamed successfully' });
  } catch (error) {
    console.error('Error renaming file:', error);
    res.status(500).json({ message: 'Error renaming file!', error: error.message });
  }
};

const updateFilePassword = async (req, res) => {
  const { newPassword } = req.body; // Expecting only 'newPassword' from the body
  const { id } = req.params; // Get the ID from the URL parameter

  console.log(req.body); // Log the body for debugging
  
  try {
    const file = await File.findById(id); // Find the file by its ID
    if (!file) {
      return res.status(404).json({ message: 'File not found!' });
    }

    // Update the password in the database
    file.password = newPassword;
    await file.save(); // Save the updated file document

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating file password:', error);
    res.status(500).json({ message: 'Error updating file password!', error: error.message });
  }
};


const deleteFile = async (req, res) => {
  // Assuming the shared link is passed in the request body
  const { sharedLink } = req.body; // Get the shared link from the request body

  console.log(`Request to delete file with shared link: ${sharedLink}`); // Log for debugging

  try {
    // Extract the filename from the shared link
    const filename = sharedLink.split('/').pop(); // Use any of the methods described earlier
    console.log('Extracted filename:', filename); // Log the extracted filename

    // Find the file by its filename in the database
    const file = await File.findOne({ filename }); // Adjust the query based on your schema
    if (!file) {
      return res.status(404).json({ message: 'File not found!' });
    }

    // Construct the full file path
    const filePath = path.join(__dirname, 'uploads', filename); // Adjust the path as needed
    console.log('File path:', filePath); // Log the constructed file path

    // Delete the file from the folder
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file from folder:', err);
        return res.status(500).json({ message: 'Error deleting file from folder!', error: err.message });
      }

      // Delete the file document from the database
      file.deleteOne(); // or await file.remove(); if using Mongoose

      res.status(200).json({ message: 'File deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Error deleting file!', error: error.message });
  }
};

module.exports = { uploadFile, accessFileBySharedLink ,getFilesuserById ,getFilesById ,newFileName ,updateFilePassword ,deleteFile};
