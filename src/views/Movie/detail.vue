<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @click="handleToBack" id="iconImg"></i>
        </Header>
		<Loading v-if="isLoading"/>
		<div v-else>
			<div id="content" class="contentDetail" v-if="filminfo">
				<div class="detail_list">
					<div class="detail_list_bg" :style="{ 'background-image' : 'url('+ filminfo.poster+')' }"></div>
					<div class="detail_list_filter"></div>
					<div class="detail_list_content">
						<div class="detail_list_img">
							<img :src="filminfo.poster">
						</div>
						<div class="detail_list_info">
							<h2>{{filminfo.name}}</h2>
							<p>A Cool Fish</p>
							<p>{{filminfo.grade}}</p>
							<p>{{filminfo.category}}</p>
							<p>{{filminfo.nation}} / {{filminfo.runtime}}</p>
							<p>2018-11-16大陆上映</p>
						</div>
					</div>
				</div>
				<div class="detail_intro">
					<p>{{filminfo.synopsis}}</p>
				</div>
				<div class="detail_player swiper-container">
					<swiper perview="3" class="actorswiper" myclassname="actorswiper">
						<div class="swiper-slide" v-for="data in filminfo.actors" :key="data.name">
							<img :src="data.avatarAddress">
							<p>{{data.name}}</p>
						</div>
					</swiper>
					<h3>剧照</h3>
					<swiper perview="2" class="photoswiper" myclassname="photoswiper">
						<div class="swiper-slide" v-for="(data, index) in filminfo.photos" :key="index">
							<img :src="data">
						</div>
					</swiper>
				</div>
			</div>
		</div>
        
    </div>
</template>

<script>
import axios from 'axios'
import Swiper from '@/components/Movie/Swiper'
import Header from '@/components/Header'
import Loading from '@/components/Loading'

export default {
    name : 'detail',
    data () {
        return {
            filminfo: null,
            isLoading : true
        }
    },
    methods : {
        handleToBack(){
            this.$router.back();
        }
    },
    components : {
        Header,
        Swiper,
		Loading
    },
    mounted () {
        axios({
			url: `https://m.maizuo.com/gateway?filmId=${this.movieId}&k=4359832`,
			headers: {
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
				'X-Host': 'mall.film-ticket.film.info'
			}
		}).then(res => {
			this.filminfo = res.data.data.film
			this.isLoading = false
		})
    },
    props : ['movieId'],
}
</script>

<style scoped>
#detailContrainer{ position: absolute; left:0; top:0; z-index: 100; width:100%; min-height:100%; background:white;}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
#iconImg {position: absolute ; top: 12px; left: 5px;font-size: 25px;}
</style>
