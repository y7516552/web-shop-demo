"use strict";(self["webpackChunkweb_shop_demo"]=self["webpackChunkweb_shop_demo"]||[]).push([[279],{279:function(e,s,t){t.r(s),t.d(s,{default:function(){return X}});var r=t(3396),l=t(9242),a=t(7139);const d={class:"my-5 row justify-content-center"},o={key:0,class:"d-flex justify-content-between"},i=(0,r._)("p",{class:"fs-4"},"確認訂單",-1),n=(0,r._)("p",{class:"fs-4"},"填寫資料",-1),u=(0,r._)("p",{class:"fs-2 fw-bold"},"付款",-1),c=(0,r._)("p",{class:"fs-4 text-muted"},"完成",-1),p=[i,n,u,c],_={key:1,class:"d-flex justify-content-between"},g=(0,r._)("p",{class:"fs-4"},"確認訂單",-1),h=(0,r._)("p",{class:"fs-4"},"填寫資料",-1),w=(0,r._)("p",{class:"fs-4"},"付款",-1),m=(0,r._)("p",{class:"fs-2 fw-bold"},"完成",-1),b=[g,h,w,m],f={key:2,class:"progress"},v=(0,r._)("div",{class:"progress-bar progress-bar-striped bg-warning",role:"progressbar",style:{width:"75%"},"aria-valuenow":"75","aria-valuemin":"0","aria-valuemax":"100"},null,-1),y=[v],k={key:3,class:"progress"},x=(0,r._)("div",{class:"progress-bar progress-bar-striped bg-warning",role:"progressbar",style:{width:"100%"},"aria-valuenow":"100","aria-valuemin":"0","aria-valuemax":"100"},null,-1),z=[x],D={class:"row my-5"},$={class:"table align-middle"},I=(0,r._)("thead",null,[(0,r._)("th",null,"品名"),(0,r._)("th",null,"數量"),(0,r._)("th",null,"單價")],-1),M={class:"text-end"},C=(0,r._)("td",{colspan:"2",class:"text-end"},"總計",-1),O={class:"text-end"},L={class:"table"},j=(0,r._)("th",{width:"100"},"Email",-1),Z=(0,r._)("th",null,"姓名",-1),q=(0,r._)("th",null,"收件人電話",-1),H=(0,r._)("th",null,"收件人地址",-1),S=(0,r._)("th",null,"付款狀態",-1),W={key:0,class:"text-success"},Y={key:1},E={key:0},K=(0,r._)("th",null,"訂單編號",-1),T={class:"d-flex align-items-center"},U=(0,r._)("i",{class:"bi bi-clipboard"},null,-1),A=[U],B={class:"text-end"},F={key:0,class:"btn btn-danger"},G=(0,r.Uk)("繼續購物");function J(e,s,t,i,n,u){const c=(0,r.up)("loading-component"),g=(0,r.up)("router-link"),h=(0,r.up)("message-modal");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(c,{active:n.isLoading},null,8,["active"]),(0,r._)("div",d,[n.order.is_paid?((0,r.wg)(),(0,r.iD)("div",_,b)):((0,r.wg)(),(0,r.iD)("div",o,p)),n.order.is_paid?((0,r.wg)(),(0,r.iD)("div",k,z)):((0,r.wg)(),(0,r.iD)("div",f,y)),(0,r._)("div",D,[(0,r._)("form",{onSubmit:s[1]||(s[1]=(0,l.iM)(((...e)=>u.payOrder&&u.payOrder(...e)),["prevent"])),class:"col-12"},[(0,r._)("table",$,[I,(0,r._)("tbody",null,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(n.order.products,(s=>((0,r.wg)(),(0,r.iD)("tr",{key:s.id},[(0,r._)("td",null,(0,a.zw)(s.product.title),1),(0,r._)("td",null,(0,a.zw)(s.qty)+" / "+(0,a.zw)(s.product.unit),1),(0,r._)("td",M,(0,a.zw)(e.$filters.currency(s.product.price)),1)])))),128))]),(0,r._)("tfoot",null,[(0,r._)("tr",null,[C,(0,r._)("td",O,(0,a.zw)(n.order.total),1)])])]),(0,r._)("table",L,[(0,r._)("tbody",null,[(0,r._)("tr",null,[j,(0,r._)("td",null,(0,a.zw)(n.order.user.email),1)]),(0,r._)("tr",null,[Z,(0,r._)("td",null,(0,a.zw)(n.order.user.name),1)]),(0,r._)("tr",null,[q,(0,r._)("td",null,(0,a.zw)(n.order.user.tel),1)]),(0,r._)("tr",null,[H,(0,r._)("td",null,(0,a.zw)(n.order.user.address),1)]),(0,r._)("tr",null,[S,(0,r._)("td",null,[n.order.is_paid?((0,r.wg)(),(0,r.iD)("span",W,"付款完成 "+(0,a.zw)(e.$filters.date(n.order.paid_date)),1)):((0,r.wg)(),(0,r.iD)("span",Y,"尚未付款"))])]),n.order.is_paid?((0,r.wg)(),(0,r.iD)("tr",E,[K,(0,r._)("td",T,[(0,r._)("p",{ref:"orderId",class:"fs-7 mb-0"},(0,a.zw)(n.order.id),513),(0,r._)("button",{class:"btn btn-outline-dark ms-5",type:"button",onClick:s[0]||(s[0]=(0,l.iM)((e=>u.copyId()),["prevent"]))},A)])])):(0,r.kq)("",!0)])]),(0,r._)("div",B,[n.order.is_paid?((0,r.wg)(),(0,r.j4)(g,{key:1,class:"btn btn-primary",to:"/user/product"},{default:(0,r.w5)((()=>[G])),_:1})):((0,r.wg)(),(0,r.iD)("button",F,"確認付款去"))])],32)])]),(0,r.Wm)(h,{ref:"messageModal",msg:n.msg},null,8,["msg"])],64)}var N=t(5820),P=t(3782),Q={data(){return{orderId:"",order:{user:{}},isLoading:!1,msg:{title:"",success:""}}},components:{MessageModal:P.Z},methods:{getOrder(){const e=`https://vue3-course-api.hexschool.io/api/steven-vue3-demo/order/${this.orderId}`;this.isLoading=!0,this.$http.get(e).then((e=>{console.log(e.data.order),e.data.success&&(this.order=e.data.order,this.isLoading=!1)}))},payOrder(){const e=`https://vue3-course-api.hexschool.io/api/steven-vue3-demo/pay/${this.orderId}`;this.isLoading=!0,this.$http.post(e).then((e=>{console.log(e),e.data.success&&(this.getOrder(),this.$httpMessageState(e,"付款"),N.Z.emit("updateCart"))}))},copyId(){const e=this.$refs.orderId,s=this.$refs.messageModal;console.log(e.textContent),navigator.clipboard.writeText(e.textContent).then((()=>{this.msg.success=!0,this.msg.title="訂單編號複製成功",s.showModal()}))}},created(){this.orderId=this.$route.params.orderId,this.getOrder()}},R=t(89);const V=(0,R.Z)(Q,[["render",J]]);var X=V}}]);
//# sourceMappingURL=279.3253cd42.js.map