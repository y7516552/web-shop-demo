"use strict";(self["webpackChunkweb_shop_demo"]=self["webpackChunkweb_shop_demo"]||[]).push([[520],{5925:function(e,t,l){l.d(t,{Z:function(){return h}});var s=l(3396),r=l(7139);const n={class:"banner-small"},o=(0,s._)("div",{class:"banner-img active"},null,-1),d={class:"banner-title"};function a(e,t,l,a,u,i){return(0,s.wg)(),(0,s.iD)("div",n,[o,(0,s._)("h2",d,(0,r.zw)(l.msg.title),1)])}var u={props:["msg"]},i=l(89);const c=(0,i.Z)(u,[["render",a]]);var h=c},4520:function(e,t,l){l.r(t),l.d(t,{default:function(){return q}});var s=l(3396),r=l(9242),n=l(7139);const o={class:"row my-3"},d={class:"input-group mb-3"},a=(0,s._)("i",{class:"bi bi-search"},null,-1),u=(0,s.Uk)("搜尋"),i=[a,u],c={class:"col-12"},h={class:"table align-middle"},_=(0,s._)("thead",null,[(0,s._)("th",null,"品名"),(0,s._)("th",null,"數量"),(0,s._)("th",null,"單價")],-1),m={class:"text-end"},p=(0,s._)("td",{colspan:"2",class:"text-end"},"總計",-1),g={class:"text-end"},w={key:0,class:"table"},b=(0,s._)("th",{width:"100"},"Email",-1),v=(0,s._)("th",null,"姓名",-1),f=(0,s._)("th",null,"收件人電話",-1),y=(0,s._)("th",null,"收件人地址",-1),k=(0,s._)("th",null,"付款狀態",-1),z={key:0,class:"text-success"},M={key:1};function S(e,t,l,a,u,S){const D=(0,s.up)("banner-component"),x=(0,s.up)("message-modal");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(D,{msg:u.msg},null,8,["msg"]),(0,s._)("div",o,[(0,s._)("div",d,[(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>u.orderSearch=e),type:"text",class:"form-control",placeholder:"請輸入訂單編號","aria-label":"Recipient's username","aria-describedby":"button-addon2"},null,512),[[r.nr,u.orderSearch]]),(0,s._)("button",{onClick:t[1]||(t[1]=(0,r.iM)((e=>S.getOrder()),["prevent"])),class:"btn btn-outline-secondary",type:"button",id:"button-addon2"},i)]),(0,s._)("div",c,[(0,s._)("table",h,[_,(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(u.order.products,(t=>((0,s.wg)(),(0,s.iD)("tr",{key:t.id},[(0,s._)("td",null,(0,n.zw)(t.product.title),1),(0,s._)("td",null,(0,n.zw)(t.qty)+" / "+(0,n.zw)(t.product.unit),1),(0,s._)("td",m,(0,n.zw)(e.$filters.currency(t.product.price)),1)])))),128))]),(0,s._)("tfoot",null,[(0,s._)("tr",null,[p,(0,s._)("td",g,(0,n.zw)(u.order.total),1)])])]),u.orderShow?((0,s.wg)(),(0,s.iD)("table",w,[(0,s._)("tbody",null,[(0,s._)("tr",null,[b,(0,s._)("td",null,(0,n.zw)(u.order.user.email),1)]),(0,s._)("tr",null,[v,(0,s._)("td",null,(0,n.zw)(u.order.user.name),1)]),(0,s._)("tr",null,[f,(0,s._)("td",null,(0,n.zw)(u.order.user.tel),1)]),(0,s._)("tr",null,[y,(0,s._)("td",null,(0,n.zw)(u.order.user.address),1)]),(0,s._)("tr",null,[k,(0,s._)("td",null,[u.order.is_paid?((0,s.wg)(),(0,s.iD)("span",z,"付款完成 "+(0,n.zw)(e.$filters.date(u.order.paid_date)),1)):((0,s.wg)(),(0,s.iD)("span",M,"尚未付款"))])])])])):(0,s.kq)("",!0)])]),(0,s.Wm)(x,{ref:"messageModal",msg:u.msgModal},null,8,["msg"])],64)}var D=l(5925),x=l(3782),Z={data(){return{msg:{title:"訂單查詢"},orderSearch:"",orderShow:!1,order:{user:{}},msgModal:{title:"找不到訂單...",success:""}}},components:{BannerComponent:D.Z,MessageModal:x.Z},methods:{getOrder(){const e=`https://vue3-course-api.hexschool.io/api/steven-vue3-demo/order/${this.orderSearch}`;this.isLoading=!0;const t=this.$refs.messageModal;this.$http.get(e).then((e=>{null==e.data.order&&(this.msgModal.success=!1,this.orderShow=!1),e.data.order&&(this.msgModal.success=e.data.success,this.order=e.data.order,this.isLoading=!1,this.msgModal.title="查詢成功!!",this.orderShow=!0),t.showModal()}))}}},$=l(89);const C=(0,$.Z)(Z,[["render",S]]);var q=C}}]);
//# sourceMappingURL=520.27f99ea1.js.map