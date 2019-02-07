import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase

var config = {
apiKey: "AIzaSyCHz9XeEX4LiYLbSRuUOnQZeBNwGiEzcx0",
authDomain: "ismrtbet.firebaseapp.com",
databaseURL: "https://ismrtbet.firebaseio.com",
projectId: "ismrtbet",
storageBucket: "ismrtbet.appspot.com",
messagingSenderId: "399109134408"
};

const app = firebase.initializeApp(config);
const fauth = firebase.auth();

export default fauth;
