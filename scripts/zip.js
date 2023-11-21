const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function zipDirectory(sourceDir, outPath) {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outPath);

    return new Promise((resolve, reject) => {
        archive
            .directory(sourceDir, false)
            .on('error', err => reject(err))
            .pipe(stream);

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

function deleteIfExists(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'smart-design-lib');
const outPath = path.join(rootDir, 'smart-design-lib.zip');

deleteIfExists(outPath);
zipDirectory(sourceDir, outPath)
    .then(() => console.log('压缩完成'))
    .catch(err => console.error('压缩过程中出错', err));
