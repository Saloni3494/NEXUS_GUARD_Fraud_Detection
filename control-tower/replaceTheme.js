const fs = require('fs');
const path = require('path');

const walkDir = (dir, callback) => {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
};

const replaceColors = (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace Hex
  content = content.replace(/#CAFF33/gi, '#06b6d4');
  content = content.replace(/#caff33/gi, '#06b6d4');

  // Replace Tailwind specific arbitrary values
  content = content.replace(/text-\[#06b6d4\]/g, 'text-brand-cyan');
  content = content.replace(/bg-\[#06b6d4\]/g, 'bg-brand-cyan');
  content = content.replace(/border-\[#06b6d4\]/g, 'border-brand-cyan');
  content = content.replace(/hover:text-\[#06b6d4\]/g, 'hover:text-brand-cyan');
  content = content.replace(/hover:bg-\[#06b6d4\]/g, 'hover:bg-brand-cyan');
  content = content.replace(/focus:border-\[#06b6d4\]/g, 'focus:border-brand-cyan');
  content = content.replace(/selection:bg-\[#06b6d4\]/g, 'selection:bg-brand-cyan');
  
  // Also hover:bg-[#b8e62e] to hover:bg-brand-cyan/80
  content = content.replace(/hover:bg-\[#b8e62e\]/gi, 'hover:bg-brand-cyan/80');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
};

walkDir(path.join(__dirname, 'app'), replaceColors);
