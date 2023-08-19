<template>
    <div class="login-container">
        <div class="vertical-center">
            <div class="inner-block">
                <el-form @submit.native.prevent ref="form" :model="user">
                    <h4>Esqueceu sua senha?</h4>
                    <el-form-item label="E-mail">
                        <el-input placeholder="E-mail" v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="isLoading" type="primary" @click="forgetPassword" style="width: 100%;" native-type="submit">
                            Resetar senha
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="backToLogin" style="width: 100%;">
                            Voltar
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
    name: "ForgetPasswordScreen",
    data() {
        return {
            isLoading: false,
            user: {
                email: ''
            }
        };
    },
    methods: {
        async forgetPassword() {
            try {
                this.isLoading = true;
                await firebase
                    .auth()
                    .sendPasswordResetEmail(this.user.email)
                    .then(() => {
                        this.$notify({
                            title: "Sucesso",
                            message: "Foi enviado um email para resetar sua senha!",
                            type: "success",
                        });
                        this.user = {
                            email: ''
                        }
                        this.backToLogin()
                    }).catch((error) => {
                        if (error.toString().includes("user-not-found")) {
                            this.$notify({
                                title: "Erro",
                                message: "Usuário não encontrado",
                                type: "error",
                            });
                        } else {
                            console.log(error)
                            this.$notify({
                                title: "Erro",
                                message: "Ocorreu um erro ao tentar resetar sua senha",
                                type: "error",
                            });
                        }
                    })
            } finally {
                this.isLoading = false
            }
        },
        backToLogin() {
            this.$router.push('/login')
        }
    }
};
</script>
<style scoped>
.inner-block {
    width: 450px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 16px;
    transition: all .3s;
}

.vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    text-align: left;
    justify-content: center;
    flex-direction: column;
}

.vertical-center .form-control:focus {
    border-color: #000;
    box-shadow: none;
}

.vertical-center h4 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 16px;
}
</style>