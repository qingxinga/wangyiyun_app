<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofanganniu"></use>
                </svg>
                <span>播放全部
                    <span>(共{{ itemList.length }}首)</span>
                </span>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏({{ subscribedCount }})</span>
            </div>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item, i) in itemList" :key="i">
                <div class="itemLeft" @click="playMusic(i)">
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
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default{
    setup(props){
        //console.log(props);
    },
    props:['itemList','subscribedCount'],
    methods:{
        playMusic:function(i){
            this.updatePlayList(this.itemList);
            this.updatePlayListIndex(i)
        },
        ...mapMutations(['updatePlayList','updatePlayListIndex'])
    }
}
</script>

<style lang="less" scoped>
.itemMusicList{
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    margin-bottom: 1.4rem;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    .itemListTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .listLeft{
            //width: 3rem;
            height: 100%;
            display: flex;
            align-items: center;
            transform: translateX(-10px);
            .icon{
                margin: 0 .2rem 0;
            }
            span{
                font-size: .29rem;
                font-weight: 700;
                span{
                    color: rgb(175, 175, 175);
                    font-size: .24rem;
                    font-weight: 300;
                }
            }
        }
        .listRight{
            height: 87%;
            display: flex;
            align-items: center;
            background-color: rgb(255, 0, 0);
            color: #fff;
            margin-top: .15rem;
            border-radius: 0.5rem;
            .icon{
                width: .3rem;
                height: .3rem;
                fill: #fff;
                margin: 0 .14rem 0 .19rem;
            }
            span{
                margin-right: 7px;
                font-size: .26rem;
                padding: 0 0.15rem 0 0;
            }
        }
    }
    .itemList{
        height: 100%;
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
}
</style>