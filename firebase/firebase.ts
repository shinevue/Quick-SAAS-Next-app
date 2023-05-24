// Imports
import {getAuth} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";
import {getApps, initializeApp} from "firebase/app";
import {getPerformance} from "firebase/performance";

/* TODO: Add SDKs for Firebase products that you want to use
 https://firebase.google.com/docs/web/setup#available-libraries

 Your web app's Firebase configuration
 For Firebase JS SDK v7.20.0 and later, measurementId is optional */

interface IFirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
}

// FireBase Web App Configuration
export const firebaseConfig: IFirebaseConfig = {
	apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
	authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
	projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
	storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
	appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
	measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`,
};

interface IFirebaseUser {
	uid: string;
	email: string;
	metadata: string;
	phoneNumber: string;
	displayName: string;
	profileImageURL: string;
}

// Firebase User Details
export const firebaseUser: IFirebaseUser = {
	uid: ``,
	email: ``,
	metadata: ``,
	phoneNumber: ``,
	displayName: ``,
	profileImageURL: ``,
};

export const initializeFirebase = () => {
	try {
		if (!getApps().length) {
			// Initializing Firebase
			const app = initializeApp(firebaseConfig);

			// Creating auth for Authentication
			const auth = getAuth(app);

			// Firebase User Details
			const firebaseUser: IFirebaseUser = {
				uid: `${auth?.currentUser?.uid}`,
				email: `${auth?.currentUser?.email}`,
				metadata: `${auth?.currentUser?.metadata}`,
				phoneNumber: `${auth?.currentUser?.phoneNumber}`,
				displayName: `${auth?.currentUser?.displayName}`,
				profileImageURL: `/${auth?.currentUser?.photoURL}`,
			};

			// Initializing Firebase Analytics & Performance
			if (typeof window !== "undefined") {
				if ("measurementId" in firebaseConfig) {
					const analytics = getAnalytics(app);
					const performance = getPerformance(app);
				}
			}

			console.log(`Firebase initialization successful`);
			return firebaseUser;
		} else {
			console.log(`Firebase already initialized successfully`);
		}
	} catch (error) {
		console.log(error);
		throw new Error(
			"Failed Initializing Firebase: Something went wrong initializing firebase. Please reattempt firebase initialization"
		);
	}
};

export default initializeFirebase;
