# Elevate Your Skills to the Next Level: IONIC CAPACITOR, LOGIN, ANGULAR, FIREBASE, SASS, PLAYSTORE DEPLOYMENT

Welcome to the repository for the **Udemy course**: *Elevate Your Skills to the Next Level: IONIC CAPACITOR, LOGIN, ANGULAR, FIREBASE, SASS, PLAYSTORE DEPLOYMENT*. This course is designed to take your skills to the next level, teaching you how to build powerful mobile applications with **Ionic**, **Capacitor**, **Angular**, **Firebase**, **SASS**, and how to deploy your app on **Play Store**.

## Table of Contents
- [Elevate Your Skills to the Next Level: IONIC CAPACITOR, LOGIN, ANGULAR, FIREBASE, SASS, PLAYSTORE DEPLOYMENT](#elevate-your-skills-to-the-next-level-ionic-capacitor-login-angular-firebase-sass-playstore-deployment)
  - [Table of Contents](#table-of-contents)
  - [Course Description](#course-description)
  - [Covered Technologies](#covered-technologies)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Usage](#usage)
  - [Contributions](#contributions)
  - [License](#license)

## Course Description
In this course, we dive into building modern mobile applications using **Ionic** and **Capacitor**. You will learn how to integrate **Angular** with **Firebase** to build a complete app with user authentication, login, and data storage. We will also cover the use of **SASS** for styling and how to prepare your app for production and deploy it on the **Google Play Store**.

## Covered Technologies
- **Ionic**: Build cross-platform mobile apps using web technologies.
- **Capacitor**: A native runtime for Ionic apps, providing access to native device features.
- **Angular**: A framework for building scalable and maintainable applications.
- **Firebase**: A real-time database, authentication, and cloud functions.
- **SASS**: A CSS preprocessor that makes stylesheets more flexible and easier to maintain.
- **Play Store Deployment**: Learn how to package your app and deploy it on Google Play Store.

## Installation
1. Clone the repository:
   git clone https://github.com/dulphyj/IonicProject.git

2. Install dependencies:
   cd ionic-capacitor-login-angular-firebase
   npm install

3. Install **Ionic** and **Capacitor CLI** globally (if not already installed):
   npm install -g @ionic/cli
   npm install @capacitor/cli

4. Initialize the project with Capacitor:
   ionic init

5. Set up Firebase for your project:
   - Create a project on the [Firebase Console](https://console.firebase.google.com/).
   - Add Firebase configuration details to your project.

## Environment Configuration
To configure the Firebase environment for your app:

Create environment files: Inside the `src/environments` folder, create two files if they don't already exist:

`environment.ts` for development.
`environment.prod.ts` for production.
Add your Firebase configuration: Add your Firebase configuration details in both files. Example:

`src/environments/environment.ts`:

```bash
export const environment = {
  production: false,
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
  }
};
```
`src/environments/environment.prod.ts`

```bash
export const environment = {
  production: true,
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
  }
};

```	


## Usage
To run the app locally on your device or emulator, use the following commands:

- **Run in the browser**:
  ionic serve

- **Run on a device or emulator**:
  ionic capacitor run android

## Contributions
If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to your fork (`git push origin feature/new-feature`).
5. Open a pull request.

## License
This project is licensed under the **MIT** License. For more details, please refer to the [LICENSE](LICENSE) file.