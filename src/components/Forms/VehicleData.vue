<template>
    <div>
        <el-form label-position="top" label-width="120px" :inline="true">
            <el-form-item label="Selecione de um template" prop="template">
                <el-select v-model="selectedVehicleTemplate" placeholder="Selecione"
                    :loading="isLoadingVehicleTemplate"
                    @change="onChangeSelectedVehicle">
                    <el-option v-for="template in vehicleTemplates"
                        :key="template.id" :label="template.model"
                        :value="template.id">
                        <div class="select-template-content">
                            <span>{{ template.model }} </span>
                            <span class="description"
                                style="color: #8492a6; font-size: 13px"
                                v-html="parseHtml(template.description.substring(0, 180))"></span>
                        </div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form :model="vehicleForm" label-position="top" ref="vehicleForm"
            label-width="120px" :inline="true" class="demo-vehicleForm">

            <el-form-item label="Veículo" prop="product">
                <el-input @input="inputChanged($event)" placeholder="Insira o nome"
                    v-model="vehicleForm.product"></el-input>
            </el-form-item>
        </el-form>
        <el-form label-position="top" label-width="120px" :inline="true"
            class="demo-vehicleForm">
            <el-form-item label="Galeria de mídia">
                <div v-if="getImagesCarTemplate">
                    <!-- v-if="getImagesCarTemplate.length === 0" -->
                    <el-upload action="#" multiple :limit="8" :on-change="fileInput"
                        v-loading="loadingUpload" list-type="picture-card"
                        :auto-upload="false" :on-exceed="handleExceed">
                        <i slot="default">
                            <i class="el-icon-upload2"></i>
                        </i>
                        <div slot="file" slot-scope="{ file }">
                            <img class="el-upload-list__item-thumbnail"
                                :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                    <!-- v-else -->
                </div>
                <div class="d-flex display-img">
                    <span v-for="(img, index) in getImagesCarTemplate" :key="index">
                        <span @click="removeImg(img, index)"
                            class="material-icons icon">
                            close
                        </span>
                        <img @click="handlePictureCardPreview({ url: img })"
                            :src="img" alt="" />
                        <i @click="handlePictureCardPreview({ url: img })"
                            class="el-icon-zoom-in"></i>
                    </span>
                </div>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
            </el-form-item>
            <el-form-item class="w-100" label="Url Video">
                <input style="width: 50%" class="el-input__inner w-100"
                    @keydown="updateVideoData($event)" v-model="videoData"
                    placeholder="https://youtube/mmdsKJdsn" />
            </el-form-item>
            <el-form-item label="Descrição Veículo">
                <ckeditor :editor="editor" v-model="editorData"
                    :config="editorConfig"></ckeditor>
            </el-form-item>
        </el-form>
        <div class="vehicle-template-actions">
            <el-tooltip class="item" effect="dark"
                content="Salva todas as informações do veículo para serem usadas posteriomente através da seleção no início do formulário"
                placement="top-start">
                <el-button @click="saveVehicleTemplate"
                    :loading="isLoadingVehicleTemplate">
                    Salvar como template
                </el-button>
            </el-tooltip>
            <el-button v-if="selectedVehicleTemplate != ''" type="danger"
                icon="el-icon-delete" circle :loading="isLoadingVehicleTemplate"
                @click="deleteVehicleTemplate"></el-button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import commonFormMixin from "@/utils/mixins/commonFormMixin";
import { VehicleTemplateService } from "@/services";
import { VehicleTemplate } from "@/models";

export default {
    name: "VehicleData",
    mixins: [commonFormMixin],
    data() {
        return {
            editor: ClassicEditor,
            editorData:
                "<p>Tesla Model 3 Performance, 2023/2023, com full auto-pilot, interior alpine white e preto, com 5 bancos, carregador rápido extra e também uma capa personalizada para ser usada em ambientes fechados.&nbsp;</p><ul><li>Motor V8 4.0 Biturbo + 3 Motores Elétricos&nbsp;</li><li>1.000 cv de Potência Combinada&nbsp;</li><li>81,5 Kgfm de Torque&nbsp;</li><li>Câmbio Automatizado de Dupla Embreagem de 8 Velocidades&nbsp;</li><li>Tração Integral&nbsp;</li><li>Aceleração de 0 a 100 km/k em 2,5 s&nbsp;</li><li>Aceleração de 0 a 200 km/h em 6,7 s&nbsp;</li><li>Velocidade Máxima de 340 km/h</li></ul>",
            editorConfig: {
                width: "75%",
            },
            videoData: "",
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            loadingUpload: false,
            isLoadingVehicleTemplate: false,
            inputChangedTimes: 0,
            currencyOptions: [
                {
                    label: "DÓLAR",
                    value: "USD",
                },
                {
                    label: "EURO",
                    value: "EUR",
                },
            ],
            vehicleForm: {
                canChangeInput: false,
                inputChangedTimes: 0,
                currency: "",
                currencyTax: "",
                importer: "",
                billing: "",
                date: "",
                modal: "",
                cargoType: "",
                purchaser: "",
                fob: "",
                shipping: "",
                product: "",
                cntr: "",
                origin: "",
                destination: "",
                icmsDestination: "",
                ncm: "",
            },
            vehicleTemplates: [],
            selectedVehicleTemplate: ""
        };
    },
    mounted() {
        this.initVehicleDataData();
        setTimeout(() => {
            if (this.vehicleForm.videoData) {
                this.videoData = this.vehicleForm.videoData.url;
            }
            this.inputChanged();
        }, 3000);
    },
    computed: {
        ...mapGetters([
            "getImagesCarTemplate",
            "getVehicleDataFromCache",
            "getCurrency",
        ]),
    },
    watch: {
        editorData(newValue) {
            this.SET_DESCRIPTION_DATA(newValue);
        },
    },
    methods: {
        ...mapMutations([
            "SET_IMAGES_CAR_TEMPLATE",
            "SET_DESCRIPTION_DATA",
            "SET_VIDEO_DATA",
            "REMOVE_IMAGES_CAR_TEMPLATE"
        ]),
        ...mapActions([
            "updateFormTreeData",
            "updateCurrencyData",
            "updateBrowserCache",
        ]),
        removeImg(img, index) {
            // console.log(img, index, this.getImagesCarTemplate);

            let filteredArr = []
            //  = this.getImagesCarTemplate.splice(index, 1)
            this.getImagesCarTemplate.map((item, i) => {
                if (i != index) {
                    filteredArr.push(item)
                }
            })

            this.REMOVE_IMAGES_CAR_TEMPLATE(filteredArr);

            localStorage.setItem(
                "carImages",
                JSON.stringify({ images: filteredArr })
            );
        },
        async initVehicleDataData() {
            this.handleCanChangeInput();

            if (this.vehicleTemplates.length == 0) {
                this.getVehicleTemplates()
            }
        },
        youtubeParser(url) {
            var regExp =
                /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            return match && match[7].length == 11 ? match[7] : false;
        },
        updateVideoData() {
            setTimeout(() => {
                const videoId = this.youtubeParser(this.videoData);
    
                console.log(this.videoData);
                this.vehicleForm.videoData = {
                    url: this.videoData,
                    thumbBase64: `http://img.youtube.com/vi/${videoId}/sddefault.jpg`,
                };
                this.inputChanged();
                setInterval(() => {
                    const videoId = this.youtubeParser(this.videoData);
                    // this.toDataUrl(
                    //   `http://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                    // ).then((resp) => {
                    this.SET_VIDEO_DATA({
                        url: this.videoData,
                        thumbBase64: `http://img.youtube.com/vi/${videoId}/sddefault.jpg`,
                        //   });
                    });
                }, 1500);
            }, 3000);
        },
        handleExceed() {
            this.$notify({
                title: "Limite de imagens atingido!",
                message: "Favor recarregar a página e tentar novamente.",
                type: "warning",
            });
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // async toDataUrl(url) {
        //   //Convert to base64
        //   return new Promise((resolve, reject) => {
        //     var xhr = new XMLHttpRequest();
        //     xhr.onload = function () {
        //       var reader = new FileReader();
        //       reader.onloadend = function () {
        //         resolve(reader.result);
        //       };
        //       reader.readAsDataURL(xhr.response);
        //     };
        //     xhr.onerror = () => {
        //       reject({
        //         status: this.status,
        //         statusText: xhr.statusText,
        //       });
        //     };
        //     url += "?key=AIzaSyDti7Y_KJsxb7iEqPPLqRwZPNmf_7gjNKQ";
        //     xhr.open("GET", url);
        //     xhr.responseType = "blob";
        //     xhr.send();
        //   });
        // },
        async fileInput(file) {
            try {
                if (file && file.name) {
                    this.processing = true;
                    var url = file.url;
                    const imgData = new FormData();
                    imgData.append("image", file);
                    // eslint-disable-next-line no-unused-vars
                    const metadata = { contentType: file.type };
                    const that = this;
                    that.loadingUpload = true;
                    fetch(url)
                        .then((res) => res.blob())
                        // eslint-disable-next-line no-unused-vars
                        .then((blob) => {
                            that.blobToBase64(blob).then((resp) => {
                                that.SET_IMAGES_CAR_TEMPLATE(resp);
                                localStorage.setItem(
                                    "carImages",
                                    JSON.stringify({ images: that.getImagesCarTemplate })
                                );
                            });
                            that.loadingUpload = false;
                        });
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.processing = false;
            }
        },
        async blobToBase64(blob) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        },
        handleCanChangeInput() {
            setTimeout(() => {
                this.canChangeInput = true;
                if (this.getVehicleDataFromCache) {
                    this.vehicleForm = this.getVehicleDataFromCache;
                }
            }, 500);
        },
        inputChanged() {
            if (this.inputChangedTimes >= 1 && this.canChangeInput) {
                const dataToUpdate = { ...this.vehicleForm };
                this.updateFormTreeData({
                    data: dataToUpdate,
                    stepName: "vehicleData",
                });
            }
            this.inputChangedTimes += 1;
        },
        async getVehicleTemplates() {
            this.isLoadingVehicleTemplate = true;

            try {
                this.vehicleTemplates = await new VehicleTemplateService().getAll()
            } catch (error) {
                console.error(error);
                this.$notify({
                    title: "Erro",
                    message: "Ocorreu um erro ao buscar templates dos veículos",
                    type: "error",
                });
            } finally {
                this.isLoadingVehicleTemplate = false;
            }
        },
        parseHtml(html) {
            const parser = new DOMParser();
            const elem = parser.parseFromString(html, 'text/html');

            return elem.body.innerText;
        },
        onChangeSelectedVehicle(id) {
            const template = this.vehicleTemplates.find(t => t.id == id)
            this.vehicleForm.product = template.model
            this.editorData = template.description
            if (template.videos.length > 0) {
                this.videoData = template.videos[0]
            }
            if (template.images.length > 0) {
                localStorage.setItem(
                    "carImages",
                    JSON.stringify({ images: template.images })
                );
            }
        },
        async saveVehicleTemplate() {
            this.isLoadingVehicleTemplate = true;

            try {
                const template = new VehicleTemplate()

                if (this.selectedVehicleTemplate) {
                    template.id = this.selectedVehicleTemplate
                }

                template.description = this.editorData
                // template.manufacturer = this.
                // template.color = this.
                // template.year = this.
                // template.currency = this.
                template.model = this.vehicleForm.product
                template.images = this.getImagesCarTemplate
                template.videos = this.videoData.length > 0 ? [this.videoData] : []

                await new VehicleTemplateService().save(template);

                this.$notify({
                    title: "Sucesso",
                    message: "Template salvo com sucesso",
                    type: "success",
                });

            } catch (error) {
                console.error(error);
                this.$notify({
                    title: "Erro",
                    message: "Ocorreu um erro ao tentar salvar o template",
                    type: "error",
                });
            } finally {
                this.isLoadingVehicleTemplate = false;
            }
        },
        async deleteVehicleTemplate() {
            this.isLoadingVehicleTemplate = true;

            try {
                await new VehicleTemplateService().delete(this.selectedVehicleTemplate);
                this.selectedVehicleTemplate = ""

                await this.getVehicleTemplates()

                this.$notify({
                    title: "Sucesso",
                    message: "Template deletado com sucesso",
                    type: "success",
                });
            } catch (error) {
                console.error(error);
                this.$notify({
                    title: "Erro",
                    message: "Ocorreu um erro ao deletar o template",
                    type: "error",
                });
            } finally {
                this.isLoadingVehicleTemplate = false;
            }
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.el-upload-list--picture-card {
    display: none;
}

.el-upload--picture-card {
    display: block;
    min-width: 300px;
    width: 100% !important;
    margin-bottom: 15px;
}

.el-upload-list .el-upload-list--picture-card {
    display: none !important;
}

.icon {
    z-index: 5;
    display: none;
    cursor: pointer;
    position: absolute !important;
    top: -12px;
    right: -12px;
    color: white;
    background-color: orangered;
    border-radius: 50%;
    padding: 2px 2px;
}

.display-img {
    flex-wrap: wrap;
    margin-top: 8px;
    margin-left: 10px;

    span {
        position: relative;
        cursor: pointer;

        img {
            transition: 0.3s;
            display: block;
            max-width: 230px;
            max-height: 135px;
            width: auto;
            height: auto;
            border-radius: 4px;
            margin-left: 15px;
        }

        i {
            position: absolute;
            top: 50%;
            left: 50%;
            display: none;
        }

        &:first-child {
            img {
                margin-left: 0;
            }
        }

        &:hover {
            img {
                opacity: 0.3;
            }

            i {
                display: block;
            }

            .icon {
                display: block;
            }
        }
    }
}

.el-upload-list--picture-card .el-upload-list__item {
    height: unset !important;
}

@media screen and (max-width: 768px) {
    .ck.ck-editor {
        max-width: 300px;
    }
}

.vehicle-template-actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}

.select-template-content {
    // padding: 25px 0;
    // background-color: #1A1A1A;

    .description {
        display: block;
        max-width: 300px;
    }

}
</style>
