import { StorageService } from "@/services";
import { Document } from "@/models";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export class DocumentService {

    #collection = 'documents'

    async save(id, buffer, proposalId) {
        const document = new Document(id, proposalId)
        console.log('from document save', document)

        const firestoreApp = firebase.app()
        await firestoreApp.firestore().runTransaction(async (transaction) => {    
            const docRef = firestoreApp.firestore().collection(this.#collection).doc(document.id);

            await new StorageService().save(buffer, document.id)
            transaction.set(docRef, { ...document })
        })
    }

    async findByProposalId(id) {
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

}