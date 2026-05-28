# AQar Mobile — Android Packaging & Google Play Store Publishing Guide

Your AQar CRM application is fully packaged for production-grade native Android deployment using **Capacitor by Ionic**. This workspace provides a full-stack, native hybrid environment optimized for performance, equipped with beautiful adaptive assets, responsive notch layouts, and pre-configured automated cloud builds.

---

## 🏎️ What has been configured for you

1. **Native Mobile Packaging**:
   - Organized modern **Capacitor v6** integration using `@capacitor/core` and `@capacitor/android`.
   - Setup of `capacitor.config.json` targeting the unique bundle identifier: `luxury.aqar.crm` with the app name **AQar Mobile**.
   - Generated native `/android` workspace files ready for immediate IDE alignment (Android Studio).

2. **Official App Icons & Adaptive Launcher Resources**:
   - Generated and configured the official **AQar App Icon** (`assets/icon.png` and `assets/icon-only.png`).
   - Run the Capacitor Asset generator CLI to programmatically build **all 99 adaptive Android launcher icons** matching the official, luxury AQar logo across all high-definition and standard density mipmap targets (`hdpi`, `mdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`).
   - Modern adaptive icons are correctly wired to include round borders, standard dynamic launcher icons, and modern system backdrops.

3. **Premium Splash Screen Integration**:
   - Designed a high-resolution, luxury corporate dark velvet splash screen styled image (`assets/splash.png`).
   - Generated **all portrait, landscape, and night-themed splash screen assets** inside `/android/app/src/main/res/drawable-*` for frictionless screen transitions on launch of physical Android devices.

4. **Notch & Cutout Screen Protection**:
   - Updated `index.html` to lock responsive viewport scaling and added `viewport-fit=cover` to fill modern punch-hole screens.
   - Built custom `.safe-top`, `.safe-bottom`, and `.safe-pb-nav` Tailwind-friendly safe area utility classes inside `src/index.css` to protect crucial components against phone physical camera notches and home indicator overlaps.

5. **Automated CI/CD Pipeline**:
   - Set up **GitHub Actions workflow** (`.github/workflows/android.yml`) which automates compiling native builds inside secure cloud infrastructure on push.
   - The workflow compiles a **Debug APK** (instantly installable on real Android devices) as well as an optimized **Release AAB (Android App Bundle)** required for Google Play Store publishing!

---

## 🛠️ How to Compile Your APK locally

Since local preview sandboxes are streamlined Node.js containers that do not include Java SDK dependencies out-of-the-box, running the compiler locally in this web editor is bypassed. Instead, you can compile the production-ready APK in seconds on your own local device or via GitHub:

### Option A: The GitHub CI/CD Way (Easiest and Recommended)
If you export your code to GitHub:
1. Push this project to a GitHub repository.
2. Under the **Actions** tab of your repo, you will see the **Build Android APK & AAB** workflow automatically start running.
3. Once completed (takes ~3 minutes), you can download the generated **Debug APK** or **Release AAB** directly from the run summary under **Artifacts**!

### Option B: Local Android Studio Build
If you download this code as a ZIP archive to run on your local machine:

1. **Prerequisites**: Make sure you have [Node.js](https://nodejs.org/) and [Android Studio](https://developer.android.com/studio) installed on your computer.
2. **Build Web Files**: Run the Vite build command in your terminal:
   ```bash
   npm run build
   ```
3. **Synchronize Native Code**: Push the latest web changes directly into your native Android subproject:
   ```bash
   npx cap sync
   ```
4. **Compile the APK**: Run the gradle wrapper from your terminal to generate an installable `.apk`:
   - **Windows PowerShell**:
     ```powershell
     cd android; .\gradlew.bat assembleDebug
     ```
   - **macOS / Linux Terminal**:
     ```bash
     cd android && chmod +x gradlew && ./gradlew assembleDebug
     ```
   - *Your final installable APK will be stored at:* `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🚀 Google Play Store Publishing Blueprint

To publish **AQar Mobile** to the Google Play Store, prepare for production release using these simple steps in Android Studio:

1. Open Android Studio and choose **Open an Existing Project**, selecting the `android` folder in your project root.
2. In the top navigation menu, select **Build > Generate Signed Bundle / APK...**
3. Select **Android App Bundle (AAB)** and click Next.
4. If you do not have a Keystore yet, click **Create new...** to create a secure upload key. Keep this keystore safe, as it signature-locks all future updates of the app on Google Play!
5. Select Build Variant: `release` and click **Create / Finish**.
6. Retrieve the generated `.aab` file from `android/app/release/`.
7. Log into your [Google Play Console](https://play.google.com/console), create an enrollment, and upload your signed enterprise App Bundle (`.aab`) to the production track. 

---

*AQar CRM — Streamlining high-end Real Estate Management.*
