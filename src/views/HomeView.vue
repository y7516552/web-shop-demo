<template>
  <navbar-component></navbar-component>
  <section class="banner">
    <div class="img-carousel">
      <ul class="img-carousel-list">
        <li class="bg-1"></li>
      </ul>
      <div class="title mb-1">
        <h2>{{ msg.title1 }}</h2>
        <h4>{{ msg.title2 }}</h4>
        <h5>{{ msg.content }}</h5>
        <router-link class="btn btn-success" to="/user/product">{{ msg.btn }}</router-link>
      </div>
      <i class="bi bi-arrow-down-short"></i>
    </div>
  </section>
  <section class="my-5" id="product-card">
    <div class="container">
      <product-card></product-card>
    </div>
  </section>
  <section class="my-5 py-5" id="news">
    <div class="container">
      <news-section></news-section>
    </div>
  </section>
  <section class="my-5 py-5" id="location">
    <div class="container">
      <location-section></location-section>
    </div>
  </section>
  <section class="contact">
    <div class="img-carousel">
      <ul class="img-carousel-list">
        <li class="bg-1 animate"></li>
        <li class="bg-2 animate"></li>
      </ul>
      <div class="title mb-1">
        <h2>{{ contact.title }}</h2>
        <vee-form ref="contactForm" class="w-100" v-slot="{ errors, validate }"  @submit="sendEmail">
          <div class="input-group mb-3">
            <vee-field
            name="email"
            type="email"
            v-model="contact.userEmail"
            rules="email|required"
            :class="{ 'is-invalid': errors['email'] }"
            class="form-control"
            placeholder="輸入您的Email"
            aria-label="輸入您的Email"
            aria-describedby="button-addon2"
            />
            <button class="btn btn-success" type="submit" id="button-addon2" @click="validate">
              <span v-if="contact.loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              訂閱
            </button>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>
        </vee-form>
      </div>
    </div>
  </section>
  <message-modal ref="messageModal"
  :msg="msgModal"></message-modal>
  <footer-component></footer-component>
<div class="loading" :class="{ 'none': !isLoading}">
  <div class="loading-icon"></div>
  <p class="fs-1">Loading...</p>
</div>
</template>

<style lang="scss">
html{
  position: relative;
  overflow-x: hidden;
  scroll-behavior: smooth;
  .loading{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 3s;
    color: #fff;
    animation: fadeOutAni 3s 1 linear ;
    .loading-icon{
      background-image: url('../img/taco.svg');
      background-repeat: no-repeat;
      background-size: cover;
      width: 80px;
      height: 80px;
      animation:  shakeAni  .1s linear infinite;
      &::before{
        content: "";
        position: absolute;
        bottom: 0;
        left: -5px;
        background-color: #333;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        box-shadow: 60px 0px 0px 0px  #333;
      }
      &::after{
        content: "";
        position: absolute;
        bottom: 5px;
        left: 0;
        background-color: #999;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: 60px 0px 0px 0px  #999;
      }
      @keyframes shakeAni {
        0%{
          transform: translateY(0);
        }
        50%{
          transform: translateY(5px);
        }
        100%{
          transform: translateY(0);
        }
      }
    }
    &.none{
      display: none;
    }
     @keyframes fadeOutAni {
        0%{
          opacity: 1;
        }
        50%{
          opacity: 0.5;
        }
        100%{
          opacity: 0;
          z-index: -10;
          display: none;
        }
      }
  }
  .banner{
    .img-carousel{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    &.scroll{
      .img-carousel-list{
        width: 1200px;
        height: 300px;
      }
    }
    .img-carousel-list{
      position: absolute;
      width: 100vw;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: .5s;
      list-style-type: none;
      padding: 0;
      li{
        position: absolute;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 110% auto;
        opacity: 1;
        filter: blur(1px) opacity(.9);
      }
      li.bg-1{
        background-position: 20% 60%;
        background-image: url("../img/banner/bg-2.jpg");
      }
    }
    .title{
      position: absolute;
      top: 250px;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(51, 51, 51, 0.23);
      color: #fff;
      border-radius: 10px;
      padding: 15px;
      h2{
        font-size: 3em;
        font-weight: 800;
        &:hover{
          color:#fa0;
        }
      }
    }
    .bi.bi-arrow-down-short{
      position: absolute;
      left: 50%;
      bottom: 0px;
      color: #fff;
      font-size: 80px;
      font-weight: 900;
      animation: arrowDown 2s linear infinite;
      &::before{
        transform: translateX(-50%);
      }
    }
    @keyframes arrowDown {
      0%{
        transform: translateY(-10px);
        opacity: 0;
      }
      50%{
        transform: translateY(0px);
        opacity: 0.7;
      }
      75%{
        transform: translateY(10px);
        opacity: 1;
      }
      100%{
        transform: translateY(10px);
        opacity: 1;
      }
    }
    }
  }
  #news{
    min-height: 70vh;
    background-color: #999;
    background-image: url("../img/news/i-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  #location{
    color: #fff;
  }
  .section-title{
    color: #000;
    font-weight: 900;
    font-size: 40px;
    &:hover{
      color: #fa0;
    }
  }
  .contact{
    .img-carousel{
    position: relative;
    width: 100vw;
    height: 50vh;
    overflow: hidden;
    &.scroll{
      .img-carousel-list{
        width: 1200px;
        height: 300px;
      }
    }
    .img-carousel-list{
      position: absolute;
      width: 100vw;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: .5s;
      list-style-type: none;
      padding: 0;
      li{
        position: absolute;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 150% auto;
        opacity: 1;
        filter: blur(1px) opacity(.7);
      }
      li.bg-1{
        background-position: 20% 80%;
        background-image: url("../img/banner/b-1.jpg");
      }
      li.bg-2{
        background-position: 50% 50%;
        background-image: url("../img/banner/b-2.jpg");
        animation-delay: 9s;
      }
      li.animate{
        animation-name: carouselAnimate;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-duration: 18s;
      }
      @keyframes carouselAnimate {
        0%{
          opacity: 0;
          background-size: 130% auto;
        }
        25%{
          opacity: 1;
        }
        50%{
          opacity: 1;
        }
        75%{
          opacity: 0;
        }
        100%{
          opacity: 0;
          background-size: 100% auto;
        }
      }
    }
    .title{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: rgba(51, 51, 51, 0.63);
      color: #fff;
      border-radius: 10px;
      font-size: 28px;
      padding: 15px;
    }
    .invalid-feedback{
      font-size: 18px;
    }
    }
  }
}
</style>

<script>
import emitter from '@/methods/emitter.js'
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ProductCard from '../components/ProductCard.vue'
import LocationSection from '../components/LocationSection.vue'
import NewsSection from '../components/NewsSection.vue'
import MessageModal from '../components/MessageModal.vue'
import emailjs from 'emailjs-com'
// @ is an alias to /src
export default {
  data () {
    return {
      isLogin: false,
      isLoading: true,
      msg: {
        title1: '特製辣醬',
        title2: '濃濃的墨西哥風情，在舌尖上綻放。每一口都是熱情奔放的滋味。',
        content: '從經典到創新，口味百變，總能給你驚喜！',
        btn: '趕快上車'
      },
      contact: {
        title: '訂閱我們以獲得更多優惠資訊',
        userEmail: '',
        loading: false
      },
      msgModal: {
        title: '訂閱',
        success: ''
      }
    }
  },
  components: {
    NavbarComponent,
    FooterComponent,
    ProductCard,
    LocationSection,
    NewsSection,
    MessageModal
  },
  methods: {
    async sendEmail () {
      this.contact.loading = true
      emailjs.init(`${process.env.VUE_APP_EMAIL_JS_USER_ID}`)
      if (this.contact.userEmail != null) {
        const templateParams = {
          userEmail: this.contact.userEmail,
          message: '訂閱就送5折優惠碼',
          code: '121212'
        }
        const serviceId = `${process.env.VUE_APP_EMAIL_JS_SERVER_ID}`
        const templateId = `${process.env.VUE_APP_EMAIL_JS_TEMPLATE_ID}`
        const userId = `${process.env.VUE_APP_EMAIL_JS_USER_ID}`
        // console.log(templateParams)
        emailjs.send(
          serviceId,
          templateId,
          templateParams,
          userId
        )
          .then(response => {
            // console.log('SUCCESS!', response.status, response.text)
            if (response.status) {
              this.showMsgModal(true, '訂閱成功')
              this.$refs.contactForm.resetForm()
              this.contact.userEmail = ''
            }
          }, error => {
            if (error) {
              // console.log('FAILED...', error)
              this.showMsgModal(false, '訂閱失敗')
            }
          })
        this.contact.loading = false
      }
    },
    showMsgModal (success, title) {
      const messageComponent = this.$refs.messageModal
      this.msgModal.success = success
      this.msgModal.title = title
      messageComponent.showModal()
    }
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 3000)
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
