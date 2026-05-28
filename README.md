# AQar Mobile — Local Android Studio & iOS Xcode Build Guide

This repository contains the complete, production-ready full-stack mobile codebase for **AQar Mobile**, configured with **Capacitor v6** for seamless integration with native Android and iOS development environments.

Use this guide to compile, test, and package your native mobile application locally on your computer.

---

## ⚡ Quick Start for Local Compilation

Follow this 5-step checklist to set up your local development environment and launch the project:

### 1. Prerequisites
Ensure your local computer has the following tools installed:
* **Node.js**: [v18 or higher](https://nodejs.org/) (npm included).
* **For Android Compilation**: [Android Studio](https://developer.android.com/studio) + Java Development Kit (JDK 17).
* **For iOS Compilation**: macOS computer + [Xcode](https://developer.apple.com/xcode/) + CocoaPods (`sudo gem install cocoapods`).

---

### 2. Local Installation & Web Build
Clone or extract your ZIP workspace locally, navigate to the folder in your terminal, and install dependencies:

```bash
# Install npm dependencies (Capacitor ecosystem + React + Vite)
npm install

# Build the high-performance React client production bundles
npm run build
```

---

### 3. Capacitor Native Synchronization
Sync the newly generated production web bundles directly into the native iOS and Android workspaces:

```bash
# Synchronizes static code, routes, configurations, and core assets with native files
npm run mobile:build
```
*Tip: This command automatically bundles Vite files into the correct native directory paths (`android/app/src/main/assets/public` and `ios/App/App/public`).*

---

### 4. Running the Local Android Project
To open the Gradle project in **Android Studio**:

```bash
# Automated shortcut to boot Android Studio targeted at your project
npm run cap:open:android
```

#### Manual Android Studio Navigation:
1. Open **Android Studio**.
2. Click **Open an Existing Project** and navigate to the `/android` folder inside your project root.
3. Allow Gradle to perform its initial sync (takes ~1 minute on first boot).
4. Connect a physical Android phone with **USB Debugging** enabled, or start a Virtual Device Emulator.
5. Click the green **Run (Play)** button in the top toolbar to launch the app!

#### Command-Line Android Apk Compilation:
To compile the installable APK without opening the full IDE:
* **Windows (PowerShell)**:
  ```powershell
  cd android; .\gradlew.bat assembleDebug
  ```
* **macOS / Linux (Terminal)**:
  ```bash
  cd android && chmod +x gradlew && ./gradlew assembleDebug
  ```
*Your final debug APK will be stored at:* `android/app/build/outputs/apk/debug/app-debug.apk`

---

### 5. Running the Local iOS Project
To open the Xcode compilation target Workspace on macOS:

```bash
# Automated shortcut to boot Xcode targeted at your project
npm run cap:open:ios
```

#### Manual Xcode Workspace Navigation:
1. Open a terminal and run CocoaPods installation inside the iOS project folder:
   ```bash
   cd ios/App && pod install && cd ../..
   ```
2. Open **Xcode**.
3. Open the workspace file: `/ios/App/App.xcworkspace` (always choose the `.xcworkspace` over the `.xcodeproj` when using Pods).
4. Configure your Team details under **Signing & Capabilities** to authorize code signatures.
5. Select a virtual iOS simulator (e.g., iPhone 15 Pro) or a plugged-in physical device.
6. Press `Cmd + R` or click the play button to build and execute the application.

---

## 📖 Available NPM Shortcut Scripts

The `package.json` contains native automation tools:

* `npm run build` : Compiles high-performance React SPA bundles locally.
* `npm run mobile:build` : Compiles the web interface and syncs assets into native platform directories.
* `npm run mobile:android` : Performs a clean web build, transfers assets, and triggers opening Android Studio.
* `npm run mobile:ios` : Performs a clean web build, transfers assets, and triggers opening Xcode.
* `npm run cap:sync` : Rapidly syncs asset changes to both Android and iOS targets.
* `npm run cap:open:android` : Launches Android Studio directed to `./android` workspace targets instantly.
* `npm run cap:open:ios` : Launches Xcode directed to `./ios/App/App.xcworkspace` workspace targets instantly.

---

## 🛠️ Offline & Native-Safe Features Already Integrated

Your application codebase includes mature native features:
1. **Adaptive Status Bar Padding**: Styled elements utilize `.safe-top` and `.safe-bottom` Tailwind utilities configured to respect punch-holes, dynamic island sizes, and bottom touch swipes.
2. **Arabic RTL Text Alignment Auto-detection**: Native rendering perfectly reflects Arabic right-to-left UI.
3. **Smooth Scroll-Acceleration**: Scroll containers utilize physics styling for touch-acceleration on native screens.
4. **App Icons & Splash Resources**: Over 90 launcher assets are pre-loaded inside `android/app/src/main/res/mipmap-*` and `ios/App/App/Assets.xcassets` configurations.

---
*AQar CRM — Enabling Enterprise Native Luxury Real Estate Platforms.*
