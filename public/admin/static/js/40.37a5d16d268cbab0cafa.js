webpackJsonp([40],{"2+wZ":function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,".chart-container[data-v-e52e004a]{position:relative;width:100%;height:90%;padding-bottom:40px}",""])},P2bu:function(t,e,a){"use strict";function i(t){a("abuO")}Object.defineProperty(e,"__esModule",{value:!0});var o=a("XLwt"),r=a.n(o),n={props:{className:{type:String,default:"chart"},id:{type:String,default:"chart"},width:{type:String,default:"200px"},height:{type:String,default:"200px"}},data:function(){return{chart:null}},mounted:function(){this.initChart(),this.chart=null},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{initChart:function(){this.chart=r.a.init(document.getElementById(this.id));var t=function(){for(var t=[],e=1;e<13;e++)t.push(e+"月份");return t}();this.chart.setOption({backgroundColor:"#344b58",title:{text:"统计",x:"4%",textStyle:{color:"#fff",fontSize:"22"},subtextStyle:{color:"#90979c",fontSize:"16"}},tooltip:{trigger:"axis",axisPointer:{textStyle:{color:"#fff"}}},grid:{borderWidth:0,top:110,bottom:95,textStyle:{color:"#fff"}},legend:{x:"15%",top:"10%",textStyle:{color:"#90979c"},data:["女","男","平均"]},calculable:!0,xAxis:[{type:"category",axisLine:{lineStyle:{color:"#90979c"}},splitLine:{show:!1},axisTick:{show:!1},splitArea:{show:!1},axisLabel:{interval:0},data:t}],yAxis:[{type:"value",splitLine:{show:!1},axisLine:{lineStyle:{color:"#90979c"}},axisTick:{show:!1},axisLabel:{interval:0},splitArea:{show:!1}}],dataZoom:[{show:!0,height:30,xAxisIndex:[0],bottom:30,start:10,end:80,handleIcon:"path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",handleSize:"110%",handleStyle:{color:"#d3dee5"},textStyle:{color:"#fff"},borderColor:"#90979c"},{type:"inside",show:!0,height:15,start:1,end:35}],series:[{name:"女",type:"bar",stack:"总量",barMaxWidth:35,barGap:"10%",itemStyle:{normal:{color:"rgba(255,144,128,1)",label:{show:!0,textStyle:{color:"#fff"},position:"insideTop",formatter:function(t){return t.value>0?t.value:""}}}},data:[709,1917,2455,2610,1719,1433,1544,3285,5208,3372,2484,4078]},{name:"男",type:"bar",stack:"总量",itemStyle:{normal:{color:"rgba(0,191,183,1)",barBorderRadius:0,label:{show:!0,position:"top",formatter:function(t){return t.value>0?t.value:""}}}},data:[327,1776,507,1200,800,482,204,1390,1001,951,381,220]},{name:"平均",type:"line",stack:"总量",symbolSize:10,symbol:"circle",itemStyle:{normal:{color:"rgba(252,230,48,1)",barBorderRadius:0,label:{show:!0,position:"top",formatter:function(t){return t.value>0?t.value:""}}}},data:[1036,3693,2962,3810,2519,1915,1748,4675,6209,4323,2865,4298]}]})}}},l=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{class:t.className,style:{height:t.height,width:t.width},attrs:{id:t.id}})},s=[],c={render:l,staticRenderFns:s},h=c,d=a("VU/8"),u=d(n,h,!1,null,null,null),f=u.exports,p={name:"mixChart",components:{Chart:f}},x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"components-container",staticStyle:{height:"100vh"}},[a("div",{staticClass:"chart-container"},[a("chart",{attrs:{height:"100%",width:"100%"}})],1)])},y=[],b={render:x,staticRenderFns:y},m=b,g=a("VU/8"),v=i,S=g(p,m,!1,v,"data-v-e52e004a",null);e.default=S.exports},abuO:function(t,e,a){var i=a("2+wZ");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("48c2c3b0",i,!0)}});