<!-- eslint-disable vue/no-unused-vars -->
<template>
    <div class="container pt-5">
        <el-row type="flex" class="pb-8" justify="end" :align="'middle'">
            <el-col :span="12">
                <div style="color: white">Propostas</div>
            </el-col>
            <el-col :span="12">
                <div style="float: right">
                    <el-button v-loading="isLoadingHandleClick" type="primary" size="small"
                        @click="$router.push('/home')">Nova proposta</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table
            :data="proposals"
            :default-sort="{ prop: 'date', order: 'descending' }"
            :stripe="true"
            v-loading="isLoading"
            style="width: 100%; border-radius: 4px;"
            @expand-change="loadDocuments"
        >
            <el-table-column type="expand" width="45">
                <template slot-scope="props">
                    <el-table :data="getDocuments(props.row.id)" style="width: 100%"
                        v-loading="isLoadingDocuments(props.row.id)">
                        <el-table-column label="Data de criação" sortable width="150">
                            <template slot-scope="scope">
                                {{ new Date(props.row.createdAt) | formatDate }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="id" width="288" />
                        <el-table-column prop="name" label="Nome" />
                        <el-table-column fixed="right" label="" width="200">
                            <template slot-scope="scope">
                                <el-button icon="el-icon-printer" v-loading="isLoadingDownload" size="small" circle
                                    @click="printDocument(scope.row.id)" />
                                <!-- <el-button icon="el-icon-download" v-loading="isLoadingDownload" type="primary" size="small" circle @click="downloadDocument(scope.row.id)" /> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="Data de criação" sortable width="150">
                <template slot-scope="scope">
                    {{ new Date(scope.row.createdAt) | formatDate }}
                </template>
            </el-table-column>
            <el-table-column label="Data" width="100">
                <template slot-scope="scope">
                    {{ new Date(scope.row.vehicle.date) | formatDate }}
                </template>
            </el-table-column>
            <el-table-column prop="id" label="Proposta">
            </el-table-column>
            <el-table-column label="Cliente" width="100">
                <template slot-scope="scope">
                    {{ scope.row.costumer?.name ?? '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="user" label="Usuário">
            </el-table-column>
            <el-table-column label="Carro">
                <template slot-scope="scope">
                    {{ scope.row.vehicle.product }}
                </template>
            </el-table-column>
            <el-table-column label="Valor">
                <template slot-scope="scope">
                    {{ parseFloat(StringToDouble(scope.row.resume.finalValue)).toLocaleString('pt-br', {
                        style: 'currency', currency: 'BRL'
                    })
                    }}
                </template>
            </el-table-column>
            <el-table-column label="">
                <!-- <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="Digite para buscar" clearable />
                </template> -->
                <template slot-scope="scope">
                    <el-button v-loading="isLoadingHandleClick" type="primary" size="small" i
                        @click="handleDetails(scope.row)">Detalhes</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import StringToDouble from "@/utils/common/StringToDouble";
import { mapActions, mapGetters } from "vuex";
import { ProposalService, DocumentService, StorageService } from "@/services";

export default {
    name: "ProposalScreen",
    data() {
        return {
            StringToDouble,
            isLoading: true,
            isLoadingHandleClick: false,
            isLoadingDownload: false,
            proposals: [],
            documents: [],
            search: '',
            loadingMap: []
        }
    },
    beforeMount() {
        this.getProposals()
    },
    computed: {
        ...mapGetters([
            "getUserFromCache",
        ]),
    },
    methods: {
        ...mapActions([
            "updateFormTreeData",
            "updateAllSteps",
            "setProposal"
        ]),
        isLoadingDocuments(id) {
            const element = this.loadingMap.find(i => i.id == id)
            if (!element) {
                return false
            }
            return element.state
        },
        getDocuments(id) {
            const element = this.documents.find(i => i.id == id)
            if (!element) {
                return []
            }
            return element.documents
        },
        async getProposals() {
            this.isLoading = true;
            try {
                const user = this.getUserFromCache;
                const email = user && "daniel@visioncomex.com" !== user.email ? user.email : undefined;
                const proposals = await new ProposalService().findAllByUser(email)
                this.proposals = proposals
            } catch (error) {
                console.error(error)
                this.$notify({
                    title: "Erro",
                    message: "Ocorreu um erro ao carregar as propostas",
                    type: "error",
                });
            } finally {
                this.isLoading = false
            }
        },
        handleDetails(data) {
            this.isLoadingHandleClick = true
            try {
                const steps = {
                    vehicleData: data.vehicle,
                    clientData: data.costumer,
                    currency: data.currency,
                    costData: data.cost,
                    tributeData: data.tribute,
                    importData: data.import,
                    resumeData: data.resume,
                    default: (stepData) => stepData,
                };

                for (const step in steps) {
                    this.updateFormTreeData({
                        data: steps[step],
                        stepName: step,
                    });
                }

                this.updateAllSteps();
                this.setProposal(data)

                this.$router.push({ path: `/propostas/${data.id}`, params: { proposal: data.id } });
            } catch (error) {
                console.error(error)
                this.$notify({
                    title: "Erro",
                    message: "Ocorreu um erro ao carregar os detalhes",
                    type: "error",
                });
            } finally {
                this.isLoadingHandleClick = false
            }
        },
        async loadDocuments(row) {
            this.setLoadingState(row.id, true)
            try {
                const documents = await new DocumentService().findByProposalId(row.id)
                this.setDocumentsState(row.id, documents)
            } catch (error) {
                console.error(error)
                this.$notify({
                    title: "Erro",
                    message: "Ocorreu um erro ao carregar os documentos",
                    type: "error",
                });
            } finally {
                this.setLoadingState(row.id, false)
            }
        },
        async printDocument(id) {
            this.isLoadingDownload = true
            try {
                const url = await new StorageService().download(id)
                window.open(url)
            } catch (error) {
                console.error(error)
                this.$notify({
                    title: "Erro",
                    message: "Ocorreu um erro ao tentar buscar documento",
                    type: "error",
                });
            } finally {
                this.isLoadingDownload = false
            }
        },

        //Cors errors
        // async downloadDocument(id) {
        //     this.isLoadingDownload = true
        //     try {
        //         const url = await new StorageService().download(id)
        //         const xhr = new XMLHttpRequest();
        //         xhr.responseType = 'blob';
        //         // eslint-disable-next-line no-unused-vars
        //         xhr.onload = (event) => {
        //         // eslint-disable-next-line no-unused-vars
        //         const blob = xhr.response;
        //         };
        //         xhr.open('GET', url);
        //         xhr.send();
        //     } catch (error) {
        //         console.error(error)
        //     } finally {
        //         this.isLoadingDownload = false
        //     }
        // },
        setDocumentsState(id, documents) {
            const index = this.documents.findIndex(i => i.id == id)

            if (index !== -1) {
                this.documents[index].documents = documents ?? []
            } else {
                this.documents.push({ id: id, documents: documents ?? [] })
            }
        },
        setLoadingState(id, value) {
            const index = this.loadingMap.findIndex(i => i.id == id)

            if (index !== -1) {
                this.loadingMap[index].state = value ?? false
            } else {
                this.loadingMap.push({ id: id, state: value ?? false })
            }
        }
    },
};
</script>

<style scoped>
.pb-8 {
    padding-bottom: 8px;
}
</style>