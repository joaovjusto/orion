import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export class StorageService {

    #bucket = "gs://orion-007.appspot.com"
    #child = "proposals"

    async save(buffer, id) {
        console.log('from storage save', id)
        const firestoreApp = firebase.app()
        await firestoreApp.storage(this.#bucket)
            .ref().child(this.#child)
            .child(`${id}.pdf`)
            .put(buffer)
    }
}