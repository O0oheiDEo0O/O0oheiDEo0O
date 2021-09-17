<template>
    <div class="movie_body">
        <Loading v-show="isLoading"/>
        <ul v-infinite-scroll="loadMore" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
            <li v-for="data in comingList" :key="data.filmId">
                <div class="pic_show" @click="handleToDetail(data.filmId)"><img :src="data.poster"></div>
                <div class="info_list">
                    <h2 @click="handleToDetail(data.filmId)">
                        {{data.name}}
                        <img v-if='data.item.name==="3D"' src="@/assets/maxs.png">
                    </h2>
                    <p><span class="person">{{data.timeType}}</span> 人想看</p>
                    <p>主演: {{data.actors | actorsFilter}}</p>
                    <p>2021.{{data.grade}}上映</p>
                </div>
                <div class="btn_pre">
                    预售
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Indicator } from 'mint-ui'
import Loading from '@/components/Loading'
Vue.filter('actorsFilter',(data)=>{
    return data.map(item => item.name).join(' ')
});

export default {
    name : 'ComingSoon',
    data () {
        return {
            comingList : [],
            isLoading : true,
            current: 1,
            total: 0
        }
    },
    components : {
        Loading
    },
    methods: {
        handleToDetail(movieId){
            this.$router.push('/movie/detail/2/' + movieId);
        },
        loadMore () {
            this.isLoading = true
            this.current++
            if (this.comingList.length === this.total || this.comingList.length === 40) {
                this.isLoading = false
                return
            }
            axios({
                url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=${this.current}&pageSize=10&type=1&k=4271989`,
                headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
                'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                this.comingList = [...this.comingList, ...res.data.data.films]
                this.isLoading = false
                Indicator.close()
            })
        }
    },
    mounted () {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=4271989',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            var msg = res.data.msg
            if (msg === 'ok') {
                this.comingList = res.data.data.films
                this.total = res.data.data.total
                this.isLoading = false
            }
        })
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
