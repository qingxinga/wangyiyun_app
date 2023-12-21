<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey">
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">{{ item }}</span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in searchList" :key="i">
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="leftSpan">{{  i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.ar" :key="index">{{ item1.name }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon-bofang" aria-hidden="true" v-if='item.mv !=0'>
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon-liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script>
import {getSearchMusic} from "@/request/api/home"
export default {
    data(){
        return{
          keyWorldList:[],
          searchKey:"",
          searchList:[]
        }
    },
    mounted(){
        this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList")) || []
    },
    methods:{
        enterKey:async function(){
            if(this.searchKey!=""){
               this.keyWorldList.unshift(this.searchKey);
               // 去重
               this.keyWorldList = [...new Set(this.keyWorldList)]
               // 固定长度
               if(this.keyWorldList.length>10){
                   this.keyWorldList.splice(this.keyWorldList.length-1,1)
               }
               localStorage.setItem("keyWorldList",JSON.stringify(this.keyWorldList))
               let res = await getSearchMusic(this.searchKey)
               console.log('rs',res);
               this.searchList = res.data.result.songs
               this.searchKey="" 
            } 
        },
        delHistory:function(){
            localStorage.removeItem("keyWorldList")
            this.keyWorldList = []
        },
        async searchHistory(item){
          let res = await getSearchMusic(item)
          console.log('rs',res);
          this.searchList = res.data.result.songs
        },
        updateIndex(item){
          this.$store.commit("pushPlayList",item)
          this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)    
        }
    }
}
</script>

<style lang="less" scoped>
.searchTop{
    width: 100%;
    height: 1rem;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    input{
        margin-left: .4rem;
        border: none;
        border-bottom: 1px solid #999;
        width: 80%;
        padding: .1rem;
    }
}
.searchHistory{
    width: 100%;
    padding: 0.2rem;
    position: relative;
    .searchSpan{
        font-size: .4rem;
        font-weight: 700;
    }
    .spanKey{
        padding: .1rem .2rem;
        background-color: #d0bfbf;
        border-radius: .4rem;
        margin: .1rem .2rem;
        display: inline-block;
    }
    .icon{
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        right: .2rem;
    }
}
.itemList{
        height: 100%;
        padding: .2rem;
        .item{
            display: flex;
            margin: .4rem .1rem .4rem .1rem;
            height: 60px;
            justify-content: space-between; 
            //overflow: auto;
            .itemLeft{
               height: 100%;
               box-sizing: border-box; 
               display: flex;            
               justify-content: center;
               align-items: center;
               
               .leftSpan{
                 margin-right: .3rem;
               }
               div>p{
                   font-weight: 700;
                   margin-bottom: .1rem;
               }
               div>span{
                   font-size: .24rem;
                   color: rgb(175, 175, 175);
               }
            }
            .itemRight{
                display: flex;
                align-items: center;
                .icon-bofang{
                    fill: #b5b5b5;
                    width: .5rem;
                    height: .5rem;
                    margin-right: .17rem;
                }
                .icon-liebiao{
                    fill: #b5b5b5;
                    width: .5rem;
                    height: .5rem;
                }
            }
        }
    }
</style>