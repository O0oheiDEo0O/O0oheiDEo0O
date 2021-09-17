<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
    props: ['perview', 'myclassname'],
    mounted () {
        Swiper('.' + this.myclassname, {
            slidesPerView: this.perview,
            spaceBetween: this.myclassname === 'actorswiper' ? 30 : 10,
            freeMode: true
        })
    }
}
</script>

<style scoped>
.swiper-wrapper .img{ width:100%;}
</style>
