const fs = require('fs');
const path = require('path');

const walkDir = (dir, callback) => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.next' || f.startsWith('.')) return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
};

const replaceText = (filePath) => {
  const ext = path.extname(filePath);
  if (!['.tsx', '.ts', '.md', '.json', '.html'].includes(ext)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/Mule Hunter/g, 'Nexus Guard');
  content = content.replace(/Mule Hunter/gi, 'Nexus Guard');
  content = content.replace(/MuleHunter/g, 'NexusGuard');
  content = content.replace(/Mulehunter/g, 'NexusGuard');
  content = content.replace(/mulehunter/g, 'nexusguard');
  content = content.replace(/MULE HUNTER/g, 'NEXUS GUARD');
  content = content.replace(/MULE_HUNTER/g, 'NEXUS_GUARD');

  // Prevent breaking backend URL endpoints that have /api/mulehunter if any (but none exist here)
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Renamed in:', filePath);
  }
};

walkDir(path.join(__dirname, 'control-tower'), replaceText);

// Also do the main README
const rootReadme = path.join(__dirname, 'README.md');
if (fs.existsSync(rootReadme)) replaceText(rootReadme);
