import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

console.log('Starting native Android APK compilation via Gradle wrapper...');

try {
  // Let's run gradlew inside the android directory
  const androidDir = path.join(process.cwd(), 'android');
  
  // Assemble the Debug APK which is installable on android devices
  execSync('./gradlew assembleDebug', {
    cwd: androidDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      // Ensure headless environment doesn't trigger UI dialogs
      GRADLE_OPTS: '-Dorg.gradle.daemon=false -Dorg.gradle.welcome=false'
    }
  });

  console.log('----------------------------------------------------');
  console.log('Native APK Compiled Successfully!');
  
  // Find where the compiled APK resides
  const apkPath = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
  if (fs.existsSync(apkPath)) {
    console.log(`Bingo! APK exists at: ${apkPath}`);
    const destApk = path.join(process.cwd(), 'dist', 'aqar_crm_release_build.apk');
    
    // Copy the APK to the public/dist directory so the user can easily download it via the Dev App URL!
    if (!fs.existsSync(path.join(process.cwd(), 'dist'))) {
      fs.mkdirSync(path.join(process.cwd(), 'dist'));
    }
    fs.copyFileSync(apkPath, destApk);
    console.log(`Copied APK to public web directory: ${destApk}`);
    console.log(`User can download from: /aqar_crm_release_build.apk`);
  } else {
    console.warn('Could not locate compiled APK at expected destination path.');
  }
} catch (error) {
  console.error('Gradle compilation failed:', error);
  process.exit(1);
}
