<template>
    <div class="login_body">
        <Loading v-if="isLoading"/>
        <div v-else>
            <div>
                <!-- <input v-model="username" class="login_text" type="text" placeHolder="账户名/手机号/Email" > -->
                <input class="login_text" type="text" placeHolder="账户名/手机号/Email" >
            </div>
            <div>
                <!-- <input v-model="password" class="login_text" type="password" placeHolder="请输入您的密码" > -->
                <input class="login_text" type="password" placeHolder="请输入您的密码" >
            </div>
            <div>
                <!-- <input type="text" class="login_text" v-model="verifyImg" placeHolder="请输入您的验证码">  -->
                <!-- <img @touchstart="handleToVerifyImg" src="/api2/users/verifyImg"> -->
                <input type="text" class="login_text" placeHolder="请输入您的验证码"> 
            </div>
            <div class="login_btn">
                <!-- <input type="submit" value="登录" @touchstart="handleToLogin"> -->
                <input type="submit" value="登录">
            </div>
            <div class="login_link">
                <router-link to="/cinema">立即注册</router-link>
                <router-link to="/movie">找回密码</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading'
export default {
    name : 'Login',
    data () {
        return {
            isLoading : true
        }
    },
    components : {
        Loading
    },
    mounted () {
        setTimeout(() => {
            this.isLoading = false
        }, 100);
    }
}
</script>

<style scoped>
#content .login_body{  width:100%;}
.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_body .login_btn{ height:50px; margin:10px;}
.login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>
