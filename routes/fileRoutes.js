const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware'); // Adjust path as necessary
const { uploadFile, accessFileBySharedLink ,getFilesuserById , getFilesById ,newFileName ,updateFilePassword,deleteFile} = require('../controllers/fileController');

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Multer configuration
const upload = multer({ storage: storage });

// Route to upload files
router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

// Route to access files by shared link
router.get('/filesss/:filename', async (req, res) => {
  try {
    const file = await File.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.sendFile(file.path, { root: '.' });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving file', error: error.message });
  }
});



router.post('/access/shared', authMiddleware,accessFileBySharedLink);
router.get('/id/:id',authMiddleware, getFilesuserById); // This should match the path in your request
router.get('/fileid/:id',authMiddleware, getFilesById); // This should match the path in your request
router.put('/files/:id/rename', authMiddleware, newFileName);
router.put('/files/:id/update-password', authMiddleware, updateFilePassword);
router.delete('/files/:id', deleteFile);

module.exports = router;
