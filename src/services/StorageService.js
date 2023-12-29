import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export class StorageService {

    #bucket = "gs://orion-007.appspot.com"
    #child = "proposals"

    async save(buffer, id) {
        const firestoreApp = firebase.app()
        await firestoreApp.storage(this.#bucket)
            .ref().child(this.#child)
            .child(`${id}.pdf`)
            .put(buffer)
    }

    async download(id) {
        const firestoreApp = firebase.app()
        return await firestoreApp.storage(this.#bucket)
            .ref(`${this.#child}/${id}.pdf`).getDownloadURL()
    }
}