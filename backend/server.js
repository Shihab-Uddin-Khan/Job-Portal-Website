const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();

//  View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../')));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Path to applications.json
const dataPath = path.join(__dirname, 'applications.json');

function readApplications() {
  if (!fs.existsSync(dataPath)) {
    return [];
  }
  const data = fs.readFileSync(dataPath, 'utf-8');
  try {
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Route for Admin Page
app.get('/admin', (req, res) => {
  const applications = readApplications();
  res.render('admin', { applications });
});

// Route for submitting application
app.post('/api/apply', upload.single('resume'), (req, res) => {
  const { name, email, message } = req.body;
  const resumeFileName = req.file ? req.file.filename : '';
  if (!name || !email || !message || !resumeFileName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newApplication = {
    name,
    email,
    message,
    resume: resumeFileName,
    submittedAt: new Date().toISOString(),
  };
  const existingData = readApplications();
  existingData.push(newApplication);
  fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2));

  res.status(201).json({ message: 'Application submitted successfully!' });
});

// Route for JSON API (optional, if needed elsewhere)
app.get('/applications', (req, res) => {
  const applications = readApplications();
  res.json(applications);
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
