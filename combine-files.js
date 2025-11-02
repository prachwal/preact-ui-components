import fs from 'fs';
import path from 'path';

/**
 * Script to combine all .ts, .tsx, .scss, and .css files into one output file
 * Separates each file with clear comments
 */

const typedocConfig = JSON.parse(fs.readFileSync('typedoc.json', 'utf8'));
const excludePatterns = typedocConfig.exclude || [];

const extensions = ['.ts', '.tsx', '.scss', '.css'];
const outputFile = 'combined-code.txt';
const rootDir = './src'; // Start from src directory

function shouldExclude(filePath) {
  const relativePath = path.relative('.', filePath);
  return excludePatterns.some(pattern => {
    if (pattern === '**/node_modules/**') {
      return relativePath.includes('node_modules');
    } else if (pattern === '**/*.stories.tsx') {
      return relativePath.endsWith('.stories.tsx');
    } else if (pattern === '**/*.test.tsx') {
      return relativePath.endsWith('.test.tsx');
    }
    return false;
  });
}

function findFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and other common directories
      if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
        findFiles(fullPath, files);
      }
    } else if (extensions.includes(path.extname(fullPath))) {
      if (!shouldExclude(fullPath)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function combineFiles() {
  const files = findFiles(rootDir);
  let combinedContent = '';

  // Sort files for consistent order
  files.sort();

  for (const file of files) {
    const relativePath = path.relative('.', file);
    const content = fs.readFileSync(file, 'utf8');

    combinedContent += `\n\n${'='.repeat(80)}\n`;
    combinedContent += `FILE: ${relativePath}\n`;
    combinedContent += `${'='.repeat(80)}\n\n`;
    combinedContent += content;
  }

  // Add file list at the end
  combinedContent += `\n\n${'='.repeat(80)}\n`;
  combinedContent += `COMBINED FILES LIST\n`;
  combinedContent += `${'='.repeat(80)}\n\n`;
  combinedContent += `Total files combined: ${files.length}\n\n`;
  files.forEach((file, index) => {
    const relativePath = path.relative('.', file);
    combinedContent += `${index + 1}. ${relativePath}\n`;
  });

  fs.writeFileSync(outputFile, combinedContent);
  console.log(`Combined ${files.length} files into ${outputFile}`);
}

combineFiles();
