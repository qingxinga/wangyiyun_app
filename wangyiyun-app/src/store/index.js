import { createStore } from 'vuex'
import { getMusicLyric, } from '@/request/api/item'
import {getPhoneLogin} from '@/request/api/home'

export default createStore({
  state: {
    playList:[{ //播放列表
      al:{
        id: 3076049,
        name: "不贰",
        pic: 6627856093408611,
        picUrl: "https://p2.music.126.net/1WVjNSCc4M-l417SYcvUBA==/6627856093408611.jpg",
      },
      id:29769321,
      name: "悟空",
      ar:[{
        name: "蔡翊昇"
      }]
    }],
    playListIndex:0,//默认下标为0
    isbtnShow:true,//暂停按钮的显示
    detailShow:false,//歌曲详情页的显示
    lyricList:{},//歌词
    currentTime:0, //当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否需要显示
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow=value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    updatePlayList:function(state,value){
      state.playList=value
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex=value
    },
    updateDetailShow:function(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    updateCurrentTime:function(state,value){
      state.currentTime=value
    },
    updateDuration:function(state,value){
      state.duration=value
    },
    updateIsLogin:function(state,value){
      state.isLogin=true
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      //console.log(res);
      context.commit('updateLyricList',res.data.lrc)
    },
    getLogin:async function(context,value){
      let res = await getPhoneLogin(value)
      
      //console.log(res);
      return res
      //context.commit('updateIsLogin',res.data.isLogin)
    }
  },
  modules: {
  }
})
