<template>
    <div class="movie_body">
        <ul>
            <li v-for="data in comingListGetters" :key="data.filmId">
                <div class="pic_show" @click="handleToDetail(data.filmId)"><img :src="data.poster"></div>
                <div class="info_list">
                    <h2 @click="handleToDetail(data.filmId)">
                        {{data.name}}
                        <img v-if='data.item.name==="3D"' src="@/assets/maxs.png">
                    </h2>
                    <p>观众评分<span class="grade">{{data.grade}}</span></p>
                    <p>主演: {{data.actors | actorsFilter}}</p>
                    <p>{{data.synopsis}}</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
import Vue from 'vue'
Vue.filter('actorsFilter',(data)=>{
    return data.map(item => item.name).join(' ')
});
export default {
    name : 'NowPlaying',
    methods: {
        handleToDetail(movieId){
            MessageBox({
                title: '提示',
                message: '没有排期，看看其他电影吧',
                showCancelButton: true
            }).then(res => {
                if (res === 'confirm') {
                    this.$router.push('/movie/nowplaying')
                }
            })
            this.$router.push('/movie/detail/1/' + movieId);
        }
    },
    computed : {
        ...mapGetters(['comingListGetters'])
    },
    mounted () {
        if (this.$store.state.comingList.length === 0) {
            this.$store.dispatch('getComingListAction')
        } else {
            console.log('缓存')
        }
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
.movie_body .pullDown{ margin:0; padding:0; border:none;}
</style>
