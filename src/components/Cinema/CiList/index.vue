<template>
    <div class="cinema_body" :style="mystyle">
        <Loading v-if="isLoading"/>
        <ul v-else>
            <li v-for="data in dataList" :key="data.cinemaId">
                <div>
                    <span>{{data.name}}</span>
                    <span class="q"><span class="price">{{data.lowPrice | moneyFilter}}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{data.address}}</span>
                    <span>{{data.telephones[0]}}</span>
                </div>
                <div class="card">
                    <div>小吃</div>
                    <div>折扣卡</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import BetterScroll from 'better-scroll'
import Loading from '@/components/Loading'
Vue.filter('moneyFilter',(data)=>{
    return ' 优惠' + data / 100
});
export default {
    name : 'CiList',
    data () {
        return {
            dataList: [],
            mystyle: {
                height: '0px'
            },
            isLoading : true
        }
    },
    components : {
        Loading
    },
    mounted () {
        this.mystyle.height = document.documentElement.clientHeight - 50 + 'px'
        var id = null
        if (localStorage.getItem('cityId') === null) {
            id = 110100
        }else{
            id = localStorage.getItem('cityId')
        }

        axios({
            url: `https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=5440610`,
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res => {
            if (res.data.msg === 'ok') {
                this.dataList = res.data.data.cinemas
                this.isLoading = false
                this.$nextTick(() => {
                    BetterScroll('.cinema_body', {
                    scrollbar: {
                        fade: true,
                        interactive: false
                    }
                    })
                })
            }
        })
    }
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto; overflow:hidden;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
