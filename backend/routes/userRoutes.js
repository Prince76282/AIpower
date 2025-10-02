const express = require('express');
const multer = require('multer');
const {
  createUser,
  updateUser,
  getUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('profileImage'), createUser);
router.put('/:id', upload.single('profileImage'), updateUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const { createUser, getAllUsers } = require('../controllers/userController');

// const router = express.Router();

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
// const upload = multer({ storage });

// // POST and GET
// router.post('/', upload.single('profileImage'), createUser);
// router.get('/', getAllUsers);

// module.exports = router;
