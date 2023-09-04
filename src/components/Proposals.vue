<template>
    <div class="container pt-5">
        <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" :stripe="true"
            v-loading="isLoading" style="width: 100%; border-radius: 4px;">
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
                <template slot-scope="scope">
                    <el-button v-loading="isLoadingHandleClick" type="primary" size="small"
                        @click="handleClick(scope.row)">Detalhes</el-button>
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
            tableData: []
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
        handleClick(data) {
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

                this.$router.push({ path: `/home/${data.id}`, params: { proposal: data.id } });
            } finally {
                this.isLoadingHandleClick = false
            }
        }
    },
};
</script>