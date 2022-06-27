import { ServiceAccount } from 'firebase-admin';
import {initializeApp,cert} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import serviceAccount from './serviceAcctKey.json';
import ServiceAcct from './serviceAccountKey.json';

// const svcAccount = serviceAccount;

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
    //databaseURL: 'https://construyo-coding-challenge.firebaseio.com'
});

const db = getFirestore();
export default db;
