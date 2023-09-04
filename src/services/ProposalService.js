import firebase from 'firebase/compat/app';
// import storage from "firebase/compat/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export class ProposalService {

    #collection = 'proposals'

    async save(proposal) {
        const firestoreApp = firebase.app()
        await firestoreApp.firestore().runTransaction(async (transaction) => {    
            const docRef = firestoreApp.firestore().collection(this.#collection).doc(proposal.id);
            transaction.set(docRef, { ...proposal })

            // await firestoreApp.storage("gs://orion-007.appspot.com")
            //   .ref().child('proposals')
            //   .child(`proposal-${document.id}`)
            //   .put(new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]))
        })
    }

    async findById(id) {
        const firestoreApp = firebase.app()
        return firestoreApp.firestore().collection(this.#collection).doc(id).get()
            .then(data => {
                return data.data()
            })
            .catch(error => {
                console.error(error)
                this.$notify({
                    title: "Erro",
                    message: "Ocorreu um erro ao tentar salvar a proposta",
                    type: "error",
                });
            })
    }

    async findAll() {
        const firestoreApp = firebase.app()
        return firestoreApp.firestore().collection(this.#collection).get()
            .then(data => {
                return data.docs.map(doc => doc.data())
            })
            .catch(error => {
                console.error(error)
                this.$notify({
                    title: "Erro",
                    message: "Ocorreu um erro ao tentar salvar a proposta",
                    type: "error",
                });
            })
    }

}