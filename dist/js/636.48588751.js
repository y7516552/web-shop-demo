"use strict";(self["webpackChunkweb_shop_demo"]=self["webpackChunkweb_shop_demo"]||[]).push([[636],{5636:function(t,s,e){e.r(s),e.d(s,{default:function(){return Q}});var a=e(3396),i=e(7139),r=e(9242);const c={class:"container mt-3 px-3"},d={"aria-label":"breadcrumb"},o={class:"breadcrumb"},u={class:"breadcrumb-item"},l=(0,a.Uk)("首頁"),n={class:"breadcrumb-item"},p=(0,a.Uk)("美味精選"),m={class:"breadcrumb-item active","aria-current":"page"},g={class:"container mb-5"},h={class:"card mb-3 border-0"},b={class:"row g-0"},_={class:"col-md-6"},v=["src"],w={class:"col-md-6 d-flex align-items-center"},k={class:"card-body"},y={class:"card-title h3"},f={class:"product-tag"},q={class:"card-text"},x={class:"col-12 mb-3"},z={key:0,class:"h5"},C={key:1,class:"h6"},D={key:2,class:"h4"},M=(0,a.Uk)("特價 "),U={class:"fs-4 text-danger"},I=(0,a._)("hr",null,null,-1),P={class:"btn-group btn-group-sm mb-3"},Z={key:0,class:"bi bi-suit-heart"},$={key:1,class:"bi bi-suit-heart-fill"},W={class:"input-group mb-3"},L={class:"input-group-text"},j={class:"mb-3 d-flex justify-content-end"},H=["disabled"],V={key:0,class:"spinner-border text-danger spinner-grow-sm",role:"status"},Y=(0,a._)("span",{class:"visually-hidden"},"Loading...",-1),A=[Y],B=(0,a.Uk)(" 加入購物車 ");function E(t,s,e,Y,E,F){const G=(0,a.up)("router-link"),J=(0,a.up)("product-card"),K=(0,a.up)("message-modal");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",c,[(0,a._)("nav",d,[(0,a._)("ol",o,[(0,a._)("li",u,[(0,a.Wm)(G,{to:"/"},{default:(0,a.w5)((()=>[l])),_:1})]),(0,a._)("li",n,[(0,a.Wm)(G,{to:"/user/product"},{default:(0,a.w5)((()=>[p])),_:1})]),(0,a._)("li",m,(0,i.zw)(E.product.title),1)])]),(0,a._)("div",g,[(0,a._)("div",h,[(0,a._)("div",b,[(0,a._)("div",_,[(0,a._)("img",{src:E.product.imageUrl,class:"product-image",alt:"..."},null,8,v)]),(0,a._)("div",w,[(0,a._)("div",k,[(0,a._)("h5",y,(0,i.zw)(E.product.title),1),(0,a._)("span",f,(0,i.zw)(E.product.category),1),(0,a._)("p",q,(0,i.zw)(E.product.content),1),(0,a._)("div",x,[E.product.price?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",z,(0,i.zw)(E.product.origin_price)+" 元",1)),E.product.price?((0,a.wg)(),(0,a.iD)("del",C,"原價"+(0,i.zw)(E.product.origin_price)+" 元",1)):(0,a.kq)("",!0),E.product.price?((0,a.wg)(),(0,a.iD)("div",D,[M,(0,a._)("span",U,(0,i.zw)(E.product.price)+"元",1)])):(0,a.kq)("",!0)]),I,(0,a._)("div",P,[(0,a._)("button",{type:"button",class:"btn btn-secondary",onClick:s[0]||(s[0]=(0,r.iM)((t=>this.likeProduct=!0),["prevent"]))},[this.likeProduct?((0,a.wg)(),(0,a.iD)("i",$)):((0,a.wg)(),(0,a.iD)("i",Z))])]),(0,a._)("div",W,[(0,a.wy)((0,a._)("input",{type:"number",class:"form-control","onUpdate:modelValue":s[1]||(s[1]=t=>E.qty=t)},null,512),[[r.nr,E.qty]]),(0,a._)("span",L,(0,i.zw)(E.product.unit),1)]),(0,a._)("div",j,[(0,a._)("button",{onClick:s[2]||(s[2]=(0,r.iM)((t=>F.addCart(E.product.id)),["prevent"])),disabled:this.status.loadingItem===E.product.id,class:"btn btn-outline-danger",type:"button"},[this.status.loadingItem===E.product.id?((0,a.wg)(),(0,a.iD)("div",V,A)):(0,a.kq)("",!0),B],8,H)])])])])])]),(0,a.Wm)(J)]),(0,a.Wm)(K,{ref:"messageModal",msg:E.msg},null,8,["msg"])],64)}var F=e(4700),G=e(5820),J=e(3782),K={data(){return{product:{imagesUrl:[]},likeProduct:!1,qty:1,status:{loadingItem:""},msg:{title:"加入購物車",product:{},success:"",qty:""}}},components:{ProductCard:F.Z,MessageModal:J.Z},methods:{getProduct(t){const s=`https://vue3-course-api.hexschool.io/api/steven-vue3-demo/product/${t}`;this.isLoading=!0,this.$http.get(s).then((t=>{this.product=t.data.product,this.msg.product=t.data.product,this.isLoading=!1}))},addCart(t){const s="https://vue3-course-api.hexschool.io/api/steven-vue3-demo/cart",e=this.$refs.messageModal;this.status.loadingItem=t;const a={product_id:t,qty:this.qty};this.$http.post(s,{data:a}).then((t=>{console.log(t),this.msg.success=t.data.success,this.msg.title=t.data.message,this.msg.qty=this.qty,t.data.success&&(G.Z.emit("updateCart"),this.status.loadingItem="",e.showModal())}))}},provide(){return{emitter:G.Z}},created(){this.getProduct(this.$route.params.productId)}},N=e(89);const O=(0,N.Z)(K,[["render",E]]);var Q=O}}]);
//# sourceMappingURL=636.48588751.js.map