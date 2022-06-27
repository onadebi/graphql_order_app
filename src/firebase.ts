import { ServiceAccount } from 'firebase-admin';
import {initializeApp,cert} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import ServiceAcct from './serviceAccountKey.json';


initializeApp({
    credential: cert(ServiceAcct as ServiceAccount),
    databaseURL: 'https://construyo-coding-challenge.firebaseio.com'
});

const db = getFirestore();
export default db;
