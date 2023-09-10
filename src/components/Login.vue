<template>
    <div class="login-container">
        <div class="vertical-center">
            <div class="inner-block">
                <el-form ref="form" :model="user">
                    <h4>Login</h4>
                    <el-form-item label="E-mail">
                        <el-input placeholder="E-mail" v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item label="Senha">
                        <el-input placeholder="Senha" v-model="user.password" show-password></el-input>
                    </el-form-item>

                    <el-button type="text">
                        <router-link to="/forgot-password">Esqueceu sua senha?</router-link>
                    </el-button>

                    <el-form-item>
                        <el-button :loading="isLoading" type="primary" @click="onSubmit" style="width: 100%;"
                            native-type="submit">
                            Login
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

import Cookies from "js-cookie";

import { mapActions } from "vuex";

export default {
    name: "LoginScreen",
    data() {
        return {
            isLoading: false,
            user: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        ...mapActions([
            "setUser",
        ]),
        async onSubmit() {
            try {
                this.isLoading = true;
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(this.user.email, this.user.password)
                    .then((data) => {
                        this.setUser(data.user)
                        Cookies.set("user", JSON.stringify(data.user));
                        this.$router.push('/propostas')
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$notify({
                            title: "Erro",
                            message: "Ocorreu um erro ao tentar realizar login",
                            type: "error",
                        });
                    });
            } finally {
                this.isLoading = false
            }
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