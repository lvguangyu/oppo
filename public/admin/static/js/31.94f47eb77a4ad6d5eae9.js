webpackJsonp([31],{"7bgH":function(t,e,a){"use strict";function n(t){a("nHSZ")}Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),o=a.n(i),l=a("NYxO"),r=a("SAED"),s={components:{},computed:o()({},Object(l.b)(["baseURL"])),data:function(){return{currentPage:1,pageSize:10,total:1,list:[]}},methods:{exportData:function(){console.log("export"),window.open(this.baseURL+"/productions/export")},exportImage:function(){window.open(this.baseURL+"/productions/export_image")},handleSizeChange:function(t){this.pageSize=t,this.fetchList()},handleCurrentChange:function(t){this.currentPage=t,this.fetchList()},fetchList:function(){var t=this;Object(r.b)({page:this.currentPage,limit:this.pageSize,type:this.activeName}).then(function(e){t.list=e.data.list,t.total=e.data.pagination.total,console.log(t.list)})}},created:function(){this.fetchList()}},c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"production-index layout"},[a("div",{staticClass:"block block-gutter"},[a("el-button",{attrs:{type:"primary"},on:{click:t.exportData}},[t._v("导出")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.exportImage}},[t._v("导出作品图片")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,border:""}},[a("el-table-column",{attrs:{prop:"created_at",label:"上传时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user.name",label:"OPPO 账号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user.oppo_id",label:"OPPO ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user.mobile",label:"手机号码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"id",label:"作品唯一编号"}}),t._v(" "),a("el-table-column",{attrs:{width:"120",label:"作品预览"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"image",attrs:{src:t.row.url}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"是否参与告白墙"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.is_up_wall?a("div",[a("el-tag",[t._v("是")])],1):a("div",[a("el-tag",{attrs:{type:"info"}},[t._v("否")])],1)]}}])})],1),t._v(" "),a("div",{staticClass:"block block-pagination"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},u=[],p={render:c,staticRenderFns:u},d=p,g=a("VU/8"),h=n,b=g(s,d,!1,h,"data-v-5010b284",null);e.default=b.exports},WIQr:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,".image[data-v-5010b284]{width:100px;height:auto;max-height:200px}",""])},nHSZ:function(t,e,a){var n=a("WIQr");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("8fe22f4a",n,!0)}});