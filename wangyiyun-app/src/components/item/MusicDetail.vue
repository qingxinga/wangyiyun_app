<template>
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <div class="detailTop">
       <div class="detailTopLef">
          <svg class="icon-liebiao" aria-hidden="true" @click="backHome">
            <use xlink:href="#icon-zuojiantou"></use>
          </svg>
            <div class="leftMarquee">
              <marquee-text :repeat="2" :interval="1000"   :duration="8" :loop="true" style="color: #fff;">
                {{ musicList.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </marquee-text>
              <!-- <p></p> -->
                <span v-for="item in musicList.ar" :key="item">
                  {{ item.name }}
                </span>
                <svg class="icon-liebiao" aria-hidden="true">
                  <use xlink:href="#icon-youjiantou1"></use>
                </svg>  
            </div>  
       </div>
       <div class="detailTopRight">
         <svg class="icon-liebiao" aria-hidden="true">
           <use xlink:href="#icon-fenxiang"></use>
          </svg>
       </div> 
 
    </div>
    <div class="detailContent" v-show="!isLyricShow">
      <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
      <img src="@/assets/cd.png" alt="" class="img_cd">
      <img :src="musicList.al.picUrl" alt="" class="img_ar" @click="isLyricShow=true" :class="{img_ar_active:!isbtnShow,img_ar_paused:isbtnShow}">
    </div>
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
      <p v-for="item in lyric" :key="item" :class="{active:(currentTime *1000)>=item.time && currentTime*1000<item.pre}">
        {{ item.lrc }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon-liebiao" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
          </svg>
          <svg class="icon-liebiao" aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
          </svg>
          <svg class="icon-liebiao" aria-hidden="true" @click="isLyricShow=false">
            <use xlink:href="#icon-yinlechangpian"></use>
          </svg>
          <svg class="icon-liebiao" aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
          </svg>
          <svg class="icon-liebiao" aria-hidden="true">
            <use xlink:href="#icon-liebiao-"></use>
          </svg>
      </div>
      <div class="footerContent">
        <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.01">
      </div>
      <div class="footer">
        <svg class="icon-liebiao" aria-hidden="true">
            <use xlink:href="#icon-xunhuan"></use>
          </svg>
          <svg class="icon-liebiao" aria-hidden="true" @click="goPlay(-1)">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
          <svg class="icon-liebiao1" aria-hidden="true" v-if="isbtnShow" @click="play">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <svg class="icon-liebiao1" aria-hidden="true" v-else @click="play">
            <use xlink:href="#icon-zanting"></use>
          </svg>
          <svg class="icon-liebiao" aria-hidden="true" @click="goPlay(1)">
            <use xlink:href="#icon-xiayigexiayishou"></use>
          </svg>
          <svg class="icon-liebiao" aria-hidden="true">
            <use xlink:href="#icon-zu"></use>
          </svg>
      </div>
    </div>
    <div></div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component'
import { mapMutations,mapState } from 'vuex'
export default {
  data(){
    return{
      isLyricShow:false
    }
  },
  computed:{
      ...mapState(['lyricList','currentTime','playListIndex','playList','duration']),
      lyric:function(){
        let arr;
        if(this.lyricList.lyric){
          arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
            let min = item.slice(1,3);
            let sec = item.slice(4,6);
            let mill = item.slice(7,10);
            let lrc = item.slice(11,item.length);
            let time = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill);
            if(isNaN(Number(mill))){
              mill = item.slice(7,9)
              lrc = item.slice(10,item.length)
              time = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill);
            }
            //console.log(min,sec,mill,lrc);
            return {min,sec,mill,lrc,time}
          })
          arr.forEach((item,i)=>{
            if(i === arr.length - 1 || isNaN(arr[i+1].time)){
              item.pre= 100000
            }else{
              item.pre=arr[i+1].time
            }
          })
        }
        //console.log(arr);
        return arr
      }
  },
    mounted(){
      //console.log(this.musicList)
      //console.log(this.lyricList.lyric)
      this.addDuration()
    },
    props:['musicList','play','isbtnShow','addDuration'],
    methods:{
      backHome:function(){
        this.isLyricShow=false
        this.updateDetailShow()
      },
      goPlay:function(num){
        let index = this.playListIndex+num
        if(index<0){
          index=this.playList.length-1
        }else if(index==this.playList.length){
          index=0
        }
        this.updatePlayListIndex(index)
      },
      ...mapMutations(['updateDetailShow','updatePlayListIndex'])
    },
    watch:{
      currentTime:function(newValue){
        let p =document.querySelector('p.active')
        if(p){
          if(p.offsetTop>260){
            this.$refs.musicLyric.scrollTop = p.offsetTop - 260
          }
        }
        if(newValue===this.duration){    
          if(this.playListIndex===this.playList.length-1){
            this.updatePlayListIndex(0)
            this.play()
          }else {
            this.updatePlayListIndex(this.playListIndex+1)
          }
        }
        //console.log([p]);
        
      }
    },
    components:{
      MarqueeText
    }
}
</script>

<style lang="less" scoped>
.bgimg{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter:blur(50px)
    //filter: grayscale(100%) brightness(40%);

}
.detailTop{
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;
    .detailTopLef{
        display: flex;
        align-items: center;
        .icon-liebiao{
            width: .5rem;
            height: .5rem; 
        }
        .leftMarquee{
            width: 3rem;
            height: 100%;
            margin-left: 0.4rem;
            
            span{
              color: #adadad;
              font-size: 14px;
              
            }
            .icon-liebiao{
            width: .3rem;
            height: .3rem;
            fill: #adadad;
            padding-top: 6px;
          }
        }
        
    }

    .detailTopRight{
        .icon-liebiao{
            width: .5rem;
            height: .5rem;
        }
    }
}
.detailContent{
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle{
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition:  all 2s;
  }
  .img_needle_active{
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition:  all 2s;
  }
  .img_cd{
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar{
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active{
    animation-play-state: running;
  }
  .img_ar_paused{
    animation-play-state: paused;
  }
  @keyframes rotate_ar{
    0%{
      transform: rotateZ(0deg);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric{
  width: 100%;
  height: 8.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .2rem;
  overflow: scroll;
  p{
    color: #e8caca;
    margin-bottom: .4rem;
  }
  .active{
    color: #fff;
    font-size: .5rem;
  }
}
.detailFooter{
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon-liebiao{
      width: .6rem;
      height: .6rem;
      fill: #6a6a6a;
    }
  }
  .footerContent{
    width: 100%;
    height: 1.1rem;
    display: flex;
    .range{
      width: 100%;
      height: 0.6rem;
    }
  }
  .footer{
    width: 100%;
    height: 1.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon-liebiao{
      width: .6rem;
      height: .6rem;
      fill: rgb(249, 183, 183);
    }
    .icon-liebiao1{
      width: 1.1rem;
      height: 1.1rem;
      fill: rgb(248, 172, 172);
    }
  }
}
</style>