webpackJsonp([39],{"G/2s":function(e,t,a){"use strict";function n(e){a("M4fv")}Object.defineProperty(t,"__esModule",{value:!0});var r=a("WBHA"),s=a.n(r),o={name:"countTo-demo",components:{countTo:s.a},data:function(){return{setStartVal:0,setEndVal:2017,setDuration:4e3,setDecimals:0,setSeparator:",",setSuffix:" rmb",setPrefix:"¥ "}},computed:{_startVal:function(){return this.setStartVal?this.setStartVal:0},_endVal:function(){return this.setEndVal?this.setEndVal:0},_duration:function(){return this.setDuration?this.setDuration:100},_decimals:function(){return this.setDecimals?this.setDecimals<0||this.setDecimals>20?(alert("digits argument must be between 0 and 20"),0):this.setDecimals:0},_separator:function(){return this.setSeparator},_suffix:function(){return this.setSuffix},_prefix:function(){return this.setPrefix}},methods:{start:function(){this.$refs.example.start()},pauseResume:function(){this.$refs.example.pauseResume()}}},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"components-container"},[e._m(0,!1,!1),e._v(" "),a("count-to",{ref:"example",staticClass:"example",attrs:{"start-val":e._startVal,"end-val":e._endVal,duration:e._duration,decimals:e._decimals,separator:e._separator,prefix:e._prefix,suffix:e._suffix,autoplay:!1}}),e._v(" "),a("div",{staticStyle:{"margin-left":"25%","margin-top":"40px"}},[a("label",{staticClass:"label",attrs:{for:"startValInput"}},[e._v("startVal:\n      "),a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.setStartVal,expression:"setStartVal",modifiers:{number:!0}}],attrs:{type:"number",name:"startValInput"},domProps:{value:e.setStartVal},on:{input:function(t){t.target.composing||(e.setStartVal=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}})]),e._v(" "),a("label",{staticClass:"label",attrs:{for:"endValInput"}},[e._v("endVal:\n      "),a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.setEndVal,expression:"setEndVal",modifiers:{number:!0}}],attrs:{type:"number",name:"endVaInput"},domProps:{value:e.setEndVal},on:{input:function(t){t.target.composing||(e.setEndVal=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}})]),e._v(" "),a("label",{staticClass:"label",attrs:{for:"durationInput"}},[e._v("duration:\n      "),a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.setDuration,expression:"setDuration",modifiers:{number:!0}}],attrs:{type:"number",name:"durationInput"},domProps:{value:e.setDuration},on:{input:function(t){t.target.composing||(e.setDuration=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}})]),e._v(" "),a("div",{staticClass:"startBtn example-btn",on:{click:e.start}},[e._v("开始")]),e._v(" "),a("div",{staticClass:"pause-resume-btn example-btn",on:{click:e.pauseResume}},[e._v("暂停/恢复")]),e._v(" "),a("br"),e._v(" "),a("label",{staticClass:"label",attrs:{for:"decimalsInput"}},[e._v("decimals:\n      "),a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.setDecimals,expression:"setDecimals",modifiers:{number:!0}}],attrs:{type:"number",name:"decimalsInput"},domProps:{value:e.setDecimals},on:{input:function(t){t.target.composing||(e.setDecimals=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}})]),e._v(" "),a("label",{staticClass:"label",attrs:{for:"separatorInput"}},[e._v("separator:\n      "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.setSeparator,expression:"setSeparator"}],attrs:{name:"separatorInput"},domProps:{value:e.setSeparator},on:{input:function(t){t.target.composing||(e.setSeparator=t.target.value)}}})]),e._v(" "),a("label",{staticClass:"label",attrs:{for:"prefixInput"}},[e._v("prefix:\n      "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.setPrefix,expression:"setPrefix"}],attrs:{name:"prefixInput"},domProps:{value:e.setPrefix},on:{input:function(t){t.target.composing||(e.setPrefix=t.target.value)}}})]),e._v(" "),a("label",{staticClass:"label",attrs:{for:"suffixInput"}},[e._v("suffix:\n      "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.setSuffix,expression:"setSuffix"}],attrs:{name:"suffixInput"},domProps:{value:e.setSuffix},on:{input:function(t){t.target.composing||(e.setSuffix=t.target.value)}}})])]),e._v(" "),a("code",[e._v("<count-to :start-val='"+e._s(e._startVal)+"' :end-val='"+e._s(e._endVal)+"' :duration='"+e._s(e._duration)+"'\n    :decimals='"+e._s(e._decimals)+"' :separator='"+e._s(e._separator)+"' :prefix='"+e._s(e._prefix)+"' :suffix='"+e._s(e._suffix)+"'\n    :autoplay=false>")])],1)},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",{staticClass:"warn-content"},[a("a",{attrs:{href:"https://github.com/PanJiaChen/vue-countTo",target:"_blank"}},[e._v("countTo-component")])])}],u={render:i,staticRenderFns:l},c=u,p=a("VU/8"),f=n,d=p(o,c,!1,f,"data-v-02f9ea3e",null);t.default=d.exports},M4fv:function(e,t,a){var n=a("V713");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("16ad93cb",n,!0)},V713:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".example-btn[data-v-02f9ea3e]{display:inline-block;margin-bottom:0;font-weight:500;text-align:center;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;line-height:1.5;padding:4px 15px;font-size:12px;border-radius:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transition:all .3s cubic-bezier(.645,.045,.355,1);transition:all .3s cubic-bezier(.645,.045,.355,1);position:relative;color:rgba(0,0,0,.65);background-color:#fff;border-color:#d9d9d9}.example-btn[data-v-02f9ea3e]:hover{color:#4ab7bd;background-color:#fff;border-color:#4ab7bd}.example[data-v-02f9ea3e]{font-size:50px;color:#f6416c;display:block;margin:10px 0;text-align:center;font-size:80px;font-weight:500}.label[data-v-02f9ea3e]{color:#2f4f4f;font-size:16px;display:inline-block;margin:15px 30px 15px 0}input[data-v-02f9ea3e]{position:relative;display:inline-block;padding:4px 7px;width:70px;height:28px;cursor:text;font-size:12px;line-height:1.5;color:rgba(0,0,0,.65);background-color:#fff;background-image:none;border:1px solid #d9d9d9;border-radius:4px;-webkit-transition:all .3s;transition:all .3s}.startBtn[data-v-02f9ea3e]{margin-left:20px;font-size:20px;color:#30b08f;background-color:#fff}.startBtn[data-v-02f9ea3e]:hover{background-color:#30b08f;color:#fff;border-color:#30b08f}.pause-resume-btn[data-v-02f9ea3e]{font-size:20px;color:#e65d6e;background-color:#fff}.pause-resume-btn[data-v-02f9ea3e]:hover{background-color:#e65d6e;color:#fff;border-color:#e65d6e}",""])}});