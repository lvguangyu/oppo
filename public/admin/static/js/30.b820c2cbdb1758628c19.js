webpackJsonp([30],{"0MeR":function(t,e,l){e=t.exports=l("FZ+f")(!1),e.push([t.i,".production-wall .avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.production-wall .avatar-uploader .el-upload:hover{border-color:#409eff}.production-wall .avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center}.production-wall .avatar{width:178px;height:178px;display:block}.production-wall .image{width:100px;height:auto;max-height:200px}",""])},KX9n:function(t,e,l){"use strict";function o(t){l("a2pi")}Object.defineProperty(e,"__esModule",{value:!0});var a=l("Dd8w"),i=l.n(a),n=l("NYxO"),r=l("SAED"),s={components:{},computed:i()({},Object(n.b)(["baseURL"])),data:function(){return{dialogFormVisible:!1,form:{url:""},formLabelWidth:"120px",currentPage:1,pageSize:10,total:1,list:[]}},methods:{handleFresh:function(){this.dialogFormVisible=!1,this.fetchList(),this.form={url:""}},setShown:function(t){Object(r.c)(t.id,{shown_wall:1}).then(function(e){200===e.code&&(t.shown_wall=1)})},setHide:function(t){Object(r.c)(t.id,{shown_wall:0}).then(function(e){200===e.code&&(t.shown_wall=0)})},exportData:function(){console.log("export")},newProduct:function(){var t=this;console.log(this.form),Object(r.a)(this.form).then(function(e){200===e.code&&t.handleFresh()})},handleSuccess:function(t,e,l){console.log("success"),this.form.url=t.link},handleSizeChange:function(t){this.pageSize=t,this.fetchList()},handleCurrentChange:function(t){this.currentPage=t,this.fetchList()},fetchList:function(){var t=this;Object(r.b)({page:this.currentPage,limit:this.pageSize,type:"up_wall"}).then(function(e){t.list=e.data.list,t.total=e.data.pagination.total,console.log(t.list)})}},created:function(){this.fetchList()}},c=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"production-wall layout"},[l("div",{staticClass:"block block-gutter"},[l("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogFormVisible=!0}}},[t._v("新增作品")])],1),t._v(" "),l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.list,border:""}},[l("el-table-column",{attrs:{prop:"shown_wall",label:"是否展示"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.shown_wall?l("div",[l("el-tag",[t._v("是")])],1):l("div",[l("el-tag",{attrs:{type:"info"}},[t._v("否")])],1)]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"created_at",label:"上传时间"}}),t._v(" "),l("el-table-column",{attrs:{prop:"user.name",label:"OPPO 账号"}}),t._v(" "),l("el-table-column",{attrs:{prop:"user.oppo_id",label:"OPPO ID"}}),t._v(" "),l("el-table-column",{attrs:{prop:"user.mobile",label:"手机号码"}}),t._v(" "),l("el-table-column",{attrs:{prop:"id",label:"作品唯一编号"}}),t._v(" "),l("el-table-column",{attrs:{width:"120",label:"作品预览"},scopedSlots:t._u([{key:"default",fn:function(t){return[l("img",{staticClass:"image",attrs:{src:t.row.url}})]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"是否参与告白墙"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.is_up_wall?l("div",[l("el-tag",[t._v("是")])],1):l("div",[l("el-tag",{attrs:{type:"info"}},[t._v("否")])],1)]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.shown_wall?t._e():l("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(l){t.setShown(e.row)}}},[t._v("设为展示")]),t._v(" "),e.row.shown_wall?l("el-button",{attrs:{type:"info",size:"small"},on:{click:function(l){t.setHide(e.row)}}},[t._v("设为不展示")]):t._e()]}}])})],1),t._v(" "),l("div",{staticClass:"block block-pagination"},[l("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),l("el-dialog",{attrs:{title:"新增作品品",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[l("el-form",{attrs:{model:t.form,"label-width":t.formLabelWidth}},[l("el-form-item",{attrs:{label:"作品图片"}},[l("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.baseURL+"/oss/upload","show-file-list":!1,"on-success":t.handleSuccess}},[t.form.url?l("img",{staticClass:"avatar",attrs:{src:t.form.url}}):l("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:t.newProduct}},[t._v("确 定")])],1)],1)],1)},u=[],d={render:c,staticRenderFns:u},p=d,h=l("VU/8"),f=o,b=h(s,p,!1,f,null,null);e.default=b.exports},a2pi:function(t,e,l){var o=l("0MeR");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);l("rjj0")("621e22d4",o,!0)}});