import * as fs from 'fs';
import * as path from 'path';

// Use relative paths within the workspace root
const srcIcon = path.join(process.cwd(), 'src', 'assets', 'images', 'aqar_logo_icon_1779920008844.png');
const srcSplash = path.join(process.cwd(), 'src', 'assets', 'images', 'aqar_splash_bg_1779920027455.png');

const assetsDir = path.join(process.cwd(), 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

fs.copyFileSync(srcIcon, path.join(assetsDir, 'icon.png'));
fs.copyFileSync(srcIcon, path.join(assetsDir, 'icon-only.png'));
fs.copyFileSync(srcSplash, path.join(assetsDir, 'splash.png'));

console.log('Assets copied successfully to /assets folder.');
