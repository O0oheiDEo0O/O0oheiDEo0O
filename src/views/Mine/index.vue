<template>
    <div id="main">
        <Header title="我的喵喵"/>
        <div id="content">
            <Login/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Login from '@/components/Mine/Login'
export default {
    name : 'Mine',
    components : {
        Header,
        Footer,
        Login
    }
}
</script>

<style scoped>

</style>
