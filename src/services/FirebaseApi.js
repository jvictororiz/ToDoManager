import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD3521kpFjJosF8p-8rOl79ZWsjCE3DcFA",
    authDomain: "todomanager-23a43.firebaseapp.com",
    databaseURL: "https://todomanager-23a43.firebaseio.com",
    projectId: "todomanager-23a43",
    storageBucket: "todomanager-23a43.appspot.com",
    messagingSenderId: "926579520010"
};

export const initializeFirebaseApi = () => firebase.initializeApp(config);

export const createUserOnFirebaseAsync = async (email, password) => {
    const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    return user;
}

export async function signInOnFirebaseAsync(email, password) {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    return user;
}

export const currentFirebaseUser = () => {
    return new Promise((resolve, reject) => {
        var unsubscribe = null;
        unsubscribe = firebase
            .auth()
            .onAuthStateChanged((user) => {
                resolve(user);
            }, (error) => {
                reject(error);
            }, () => {
                unsubscribe();
            });
    });
}

export const writeTaskOnFirebaseAsync = async (task) => {
    const user = await currentFirebaseUser();

    var tasksReference = firebase
        .database()
        .ref(user.uid);

    const key = task.key ?
        task.key :
        tasksReference
            .child('tasks')
            .push()
            .key;

    return await tasksReference
        .child(`tasks/${key}`)
        .update(task);
}

export const readTasksFromFirebaseAsync = async (listener) => {
    const user = await currentFirebaseUser();
    var tasksReference = firebase
        .database()
        .ref(user.uid)
        .child('tasks');
    tasksReference
        .on('value', (snapshot) => {
            var tasks = [];
            snapshot.forEach(function (element) {
                var task = element.val();
                task.key = element.key;
                tasks.push(task);
            });
            listener(tasks);
        });
}