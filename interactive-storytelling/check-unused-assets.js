const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const projectDir = __dirname;  // Racine de ton projet
const fileExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.mp3', '.m4a', '.wav'];
const codeExtensions = ['.ts', '.tsx', '.js'];
const allAssets = [];
const allCodeFiles = [];

// Récupérer tous les assets dans le dossier 'assets'
function findAssets(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            findAssets(filePath);
        } else if (fileExtensions.includes(path.extname(file))) {
            allAssets.push(filePath);
        }
    });
}

// Récupérer tous les fichiers de code dans le projet
function findCodeFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory() && !filePath.includes('node_modules')) {
            findCodeFiles(filePath);
        } else if (codeExtensions.includes(path.extname(file))) {
            allCodeFiles.push(filePath);
        }
    });
}

// Vérifier si les assets sont utilisés
function findUnusedAssets() {
    findAssets(assetsDir);
    findCodeFiles(projectDir);

    let projectContent = '';
    allCodeFiles.forEach(file => {
        projectContent += fs.readFileSync(file, 'utf8');
    });

    const unusedAssets = allAssets.filter(asset => {
        const assetName = path.basename(asset).split('.')[0];
        return !projectContent.includes(assetName);
    });

    console.log('🚫 **Assets non utilisés :**', unusedAssets);
}

findUnusedAssets();
