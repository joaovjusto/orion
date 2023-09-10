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
        <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" :stripe="true"
            v-loading="isLoading" style="width: 100%; border-radius: 4px;">
            <el-table-column type="expand" width="45">
                <template slot-scope="props">
                    Listar PDFs salvos
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
            <el-table-column prop="name" label="Nome">
            </el-table-column>
            <el-table-column label="Carro">
                <template slot-scope="scope">
                    {{ scope.row.vehicle.product }}
                </template>
            </el-table-column>
            <el-table-column label="Valor">
                <template slot-scope="scope">
                    {{ parseFloat(scope.row.resume.finalValue).toLocaleString('pt-br', {
                        style: 'currency', currency: 'BRL'
                    })
                    }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="Digite para buscar" clearable />
                </template>
                <template slot-scope="scope">
                    <el-button v-loading="isLoadingHandleClick" type="primary" size="small"
                        @click="handleDetails(scope.row)">Detalhes</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { ProposalService } from "@/services";

export default {
    name: "ProposalScreen",
    data() {
        return {
            isLoading: true,
            isLoadingHandleClick: false,
            tableData: [],
            search: ''
        }
    },
    beforeMount() {
        this.getProposals()
    },
    methods: {
        ...mapActions([
            "updateFormTreeData",
            "updateAllSteps",
            "setProposal"
        ]),
        async getProposals() {
            this.isLoading = true;
            try {
                const proposals = await new ProposalService().findAll()
                this.tableData = proposals
            } finally {
                this.isLoading = false
            }
        },
        handleDetails(data) {
            this.isLoadingHandleClick = true
            try {
                const steps = {
                    vehicleData: data.vehicle,
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
            } finally {
                this.isLoadingHandleClick = false
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