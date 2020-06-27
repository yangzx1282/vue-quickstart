<template>
   <el-tabs :value="activeItem" @tab-remove="tabRemove" class="content-body"
            @tab-click="tabClick" type="card" >
        <el-tab-pane label="首页" name="Home" :lazy="true">
          <span slot="label">
            <i class="el-icon-odometer" style="margin-right: 5px;"></i>
            首页
          </span>
          <!-- <transition mode="out-in"> -->
            <!-- <admin-home></admin-home> -->
          <!-- </transition> -->
        </el-tab-pane>
        <el-tab-pane v-for="item in tabs" :label="item.label" :key="item.index" :name="item.index"  :closable="item.closable">
          <span slot="label">
            <i :class="item.icon" style="margin-right: 5px;"></i>
            {{item.label}}
          </span>
          <!-- <async-component :componentPath="item.componentPath" class="async-component"></async-component> -->
        </el-tab-pane>
        <!-- 保持 -->
        <!-- <transition-group mode="out-in" tag="div" >
          <keep-alive :key="$route.name">
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view :key="$route.name" v-if="!$route.meta.keepAlive"></router-view>
        </transition-group> -->

        <keep-alive>
          <transition mode="out-in">
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </transition>
        </keep-alive>
        <transition mode="out-in">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
   </el-tabs>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import AdminHome from "@/views/Home";
import AsyncComponent from "../AsyncComponent";

export default {
  data() {
    return {
      currentRouter: this.$router.currentRouter,
    }
  },
  computed: {
    ...mapState("menuModule", {
      tabs: "tabs",
      activeItem: "activeItem"
    })
  },
  methods: {
    ...mapActions("menuModule", {
      closeTab: "closeTab"
    }),
    ...mapMutations("menuModule",{
      switchTab:"switchTab"
    }),
    tabClick(e){
      // this.switchTab(e.name)
      console.log(e)
      this.$router.push({
        name: e.name
      });
    },
    tabRemove(index) {
      this.closeTab(index);
    }
  },
  mounted() {
    console.log(this.tabs)
    console.log(this.$route)
  },
  watch: {
    currentRouter() {
      alert(1)
    }
  },
  components: {
    AdminHome,
    AsyncComponent
  }
};
</script>
<style scoped>
.content-body {
  height: 100%;
}

.v-enter,.v-leave-to{
  opacity: 0;
  transform: translateX(0,200px)
}
.v-enter-active,.v-leave-active{
  transition: all .4s ease-in-out;
}
</style>
