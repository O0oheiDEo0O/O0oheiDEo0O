<template>
    <div>
        <Loading v-show="isLoading"/>
        <mt-index-list ref="Height">
            <mt-index-section v-for="data in cityList" :index="data.index" :key="data.index">
                <div v-for="city in data.list" :key="city.cityId" @click="handleClick(city.cityId,city.name)">
                    <mt-cell :title="city.name"></mt-cell>
                </div>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/Loading'
export default {
    name : 'City',
    data () {
        return {
            cityList: [],
            isLoading : true
        }
    },
    components : {
        Loading
    },
    mounted () {
        axios({
            url: 'https://m.maizuo.com/gateway?k=9502566',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res => {
            this.isLoading = false
            this.cityList = this.cityFilter(res.data.data.cities)
            var num = this.$refs.Height.$el.offsetHeight - 50 + 'px'
            this.$refs.Height.$el.style.height = num
        })
    },
    methods: {
        handleClick (id,name) {
            localStorage.setItem('cityName', name)
            localStorage.setItem('cityId', id)
            this.$router.push('/movie/nowplaying')
        },
        cityFilter (dataList) {
            var abcArr = []
            var cityList = []
            for (var i = 65; i < 91; i++) {
                abcArr.push(String.fromCharCode(i))
            }
            for (var j = 0; j < abcArr.length; j++) {
                var arr = 
                dataList.filter(item => item.pinyin.substring(0, 1) === abcArr[j].toLowerCase())
                if (arr.length) {
                    cityList.push({
                        index: abcArr[j],
                        list: arr
                    })
                }
            }
            return cityList
        }
    }
}
</script>

<style scoped>

</style>
