webpackJsonp([0],{HJPW:function(e,t){},Lccj:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={methods:{reload:function(){this.$emit("reload")}},props:{errorDetails:String}},o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"error-pnl"},[t("i",{staticClass:"el-icon-error"}),this._v(" "),t("el-collapse",[t("el-collapse-item",{attrs:{name:"1",title:"加载页面出现错误，展开查看错误详情！"}},[t("p",[this._v(this._s(this.errorDetails))])])],1),this._v(" "),t("el-button",{attrs:{type:"danger"},on:{click:this.reload}},[this._v("点击重试")])],1)},staticRenderFns:[]},i=n("VU/8")(r,o,!1,function(e){n("HJPW")},"data-v-1a7e61a7",null);t.default=i.exports},UTs9:function(e,t){},hR6V:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("f5OK"),o=n("Lccj"),i={data:function(){return{nowComponent:null,isLoading:!0,isError:!1,errorDetails:""}},props:{componentPath:String,delay:Number},components:{IsLoading:r.default,LoadingError:o.default},mounted:function(){this.load()},methods:{load:function(){var e=this;n("im0E")("./"+this.componentPath).then(function(t){setTimeout(function(){e.nowComponent=function(){return n("im0E")("./"+e.componentPath)},e.isLoading=!1,e.isError=!1},e.delay)}).catch(function(t){e.nowComponent=o.default,e.isError=!0,e.isLoading=!1,e.errorDetails=t.message})}}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.isLoading?n("is-loading"):e._e(),e._v(" "),e.isError?n("loading-error",{attrs:{errorDetails:e.errorDetails},on:{reload:e.load}}):e._e(),e._v(" "),e.isLoading||e.isError?e._e():n(e.nowComponent,{tag:"component"})],1)},staticRenderFns:[]},a=n("VU/8")(i,s,!1,null,null,null);t.default=a.exports},mVIk:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("首页")])},staticRenderFns:[]},o=n("VU/8")({},r,!1,function(e){n("UTs9")},null,null);t.default=o.exports}});
//# sourceMappingURL=0.76787d65810f3d2a0112.js.map