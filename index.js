import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import { mergePdfs } from './merge.js';

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 3000;

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.post('/merge', upload.array('pdfs'), async (req, res, next) => {
  try {
    const fileArr = req.files.map((file) => path.join(__dirname, file.path));
    // const file1 = path.join(__dirname, req.files[0].path);
    // const file2 = path.join(__dirname, req.files[1].path);

    // const d = await mergePdfs(file1, file2);
    const d = await mergePdfs(fileArr);

    // Delete the uploaded files after merging
    // fs.unlinkSync(file1);
    // fs.unlinkSync(file2);

    fileArr.forEach(file => {
      fs.unlinkSync(file);
    });

    res.redirect(`/static/${d}`);
  } catch (error) {
    console.error('Error during PDF merging:', error);
    res.status(500).send('An error occurred during the PDF merging process.');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
