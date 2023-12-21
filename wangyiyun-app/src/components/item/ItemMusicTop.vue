<template>
    <div class="all">
      <div class="itemMusicTop">
    <!-- 上部头部 -->
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <!-- 上部中间部分 -->
    <div class="rgLeft">
      <img :src="playlist.coverImgUrl" alt="" class="rgimg" />
        <span class="playCount">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play" fill="white"></use>
            </svg>
            {{ changeCount(playlist.playCount) }}
        </span>  
    </div>
    
    <div class="rgRight">
      <span class="span1">{{ playlist.name }}</span>
      <div class="avtor">
        <img :src="playlist.creator.backgroundUrl" alt="" class="rgRightImg">
        <span class="span2">{{ playlist.creator.nickname }}</span>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
        </div>
      </div>
      <div class="avtor1">
        <span class="span3">{{ playlist.name }}</span>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
        </div>
      </div>
    </div>
    <!-- 上部底部四图标 -->
    <div class="rgBottom">
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>  
    </div>
  
</template>
<script>
export default {
  setup(props) {
    console.log(props);
    // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的数据
    if((props.playlist.creator="")){
      props.playlist.creator=JSON.parse(sessionStorage.getItem("itemDetail").playlist).creator
    }
    //对播放量的处理
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount }
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.all{
    position: relative;
    height: 5.8rem;
}
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //padding: .2rem;
  position: relative;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      fill: #fff;
    }
  }
  .bgimg {
    width: 100%;
    height: 11rem;
    position: fixed;
    z-index: -1;
    filter: blur(0.6rem);
  }

  .rgLeft{
    top: 1rem;
    width: 3rem;
    position: absolute;
    .rgimg {
        margin: 0.4rem 0.4rem 0.4rem 0.2rem;
        width: 3rem;
        height: 3rem;
        position: absolute;
        border-radius: 0.4rem;
    }
    .playCount {
        height: 1.7rem;
        //left: 1.8rem;
        display: flex;
        align-items: center;
        position: absolute;
        top:0.01rem;
        right: 0.1rem;
        color: #fff;
        font-weight: 300;
        .icon{
          width: 0.3rem;
          fill: red;
        }
      }
  }
  
  .rgRight {
    width: 4rem;
    top: 1.5rem;
    left: 3.5rem;
    position: absolute;
    justify-content: left;
    .span1{
        color: #fff;
        font-weight: 600;
    }
    
    .avtor{
        display: flex;
        position:relative;
        align-items: center;
        margin: .2rem 0 .2rem 0;
        .span2{
            color: #ccc;
            font-size: 0.3rem;
        }
        .icon{
            width: .3rem;
            height: .3rem;
            margin-top: .17rem;
            fill: #ccc;
        }
    }
    .avtor1{
        display: flex;
        align-items: center;
        margin: .2rem 0 .2rem 0;
        position: relative;
        .span3{
            color: #ddd;
            font-size: 0.26rem;
            // white-space: nowrap;  /* 保持文本在一行内 */
            // overflow: hidden;  /* 隐藏溢出的文本 */
            // text-overflow: ellipsis;  /* 使用省略号表示溢出的文本 */
            // min-width: 3rem;  /* 设置最大宽度，可以根据需要调整 */
        }  
        .icon{
            // position: absolute;
            width: .3rem;
            height: .3rem;
            margin-top: .06rem;
            fill: #ccc; 
        }
    }
    .rgRightImg {
      width: .8rem;
      height: .8rem;
      margin-right: .2rem;
      border-radius: 1rem;
    }
  }

  .rgBottom {
    top: 4.5rem;
    width: 100%;
    height: 2rem;
    margin-top: .2rem;
    display: flex;
    position: absolute;
    justify-content: space-between;
    align-items: center;
    .iconItem{
        top: 5.1rem;
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon{
            width: .4rem;
            height: .4rem;
            fill: white;
        }
        span{
            color: white;
            margin-top: .1rem;
            font-size: 14px;
        }
    }
  }
}
</style>
