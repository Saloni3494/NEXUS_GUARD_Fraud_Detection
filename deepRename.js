const fs = require('fs');
const path = require('path');

const walkDir = (dir, callback) => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === 'target' || f === '.next' || f.startsWith('.')) return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
};

const replaceText = (filePath) => {
  const ext = path.extname(filePath);
  // Do NOT touch python files (.py)
  if (!['.java', '.xml', '.yml', '.yaml', '.properties'].includes(ext)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/com\.mulehunter/g, 'com.nexusguard');
  content = content.replace(/com\/mulehunter/g, 'com/nexusguard');
  content = content.replace(/mulehunter-net/g, 'nexusguard-net');
  content = content.replace(/mule-hunter/g, 'nexus-guard');
  content = content.replace(/MULE HUNTER/g, 'NEXUS GUARD');
  content = content.replace(/Mulehunter/g, 'NexusGuard');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated references in:', filePath);
  }
};

// 1. Replace text in files
console.log("Replacing text in backend...");
walkDir(path.join(__dirname, 'backend'), replaceText);
console.log("Replacing text in security-forensics...");
walkDir(path.join(__dirname, 'security-forensics'), replaceText);

const dockerCompose = path.join(__dirname, 'docker-compose.yml');
if (fs.existsSync(dockerCompose)) replaceText(dockerCompose);

// 2. Rename Java directories
const renameJavaDir = (basePath) => {
  const source = path.join(__dirname, basePath, 'com', 'mulehunter');
  const dest = path.join(__dirname, basePath, 'com', 'nexusguard');
  
  if (fs.existsSync(source)) {
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    
    // Move all contents from source to dest
    fs.readdirSync(source).forEach(file => {
      fs.renameSync(path.join(source, file), path.join(dest, file));
    });
    
    // Remove the old source directory
    fs.rmdirSync(source);
    console.log(`Moved directory from ${source} to ${dest}`);
  }
};

renameJavaDir('backend/src/main/java');
renameJavaDir('backend/src/test/java');
renameJavaDir('security-forensics/src/main/java');
renameJavaDir('security-forensics/src/test/java');

// 3. Rename Application Classes
const renameClass = (basePath, oldName, newName) => {
  const dirPath = path.join(__dirname, basePath, 'com', 'nexusguard', 'backend');
  const oldPath = path.join(dirPath, oldName);
  const newPath = path.join(dirPath, newName);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed class to ${newName}`);
  }
};

renameClass('backend/src/main/java', 'BackendApplication.java', 'NexusGuardApplication.java');
renameClass('backend/src/test/java', 'BackendApplicationTests.java', 'NexusGuardApplicationTests.java');
