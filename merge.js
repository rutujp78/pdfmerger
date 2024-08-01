import PDFMerger from 'pdf-merger-js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mergePdfs = async (pArr) => {
  const merger = new PDFMerger();

  // await merger.add(p1);  // Add the first PDF
  // await merger.add(p2);  // Add the second PDF
  for(let i=0;i<pArr.length;i++) {
    await merger.add(pArr[i]);
  }

  const outputPath = path.join(__dirname, 'public', `${new Date().getTime()}.pdf`);
  await merger.save(outputPath); // Save the merged PDF

  return path.basename(outputPath);
}

export { mergePdfs };
