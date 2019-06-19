<!-- eslint-disable-next-line -->
<template>
    <div class="container-fluid full-height" style="padding-left: 0">
        <div class="row full-height">
            <div id="left-container" class="col-md-2 left-panel">
                <div class="icon-rabbit">
                    <img src="../../assets/rabbit.png" alt="icon">
                </div>
            </div>
            <div id="right-container" class="col-md-10 right-panel">
                <div class="background-img full-height">
                    <img class="img" src="../../assets/bitexco.jpg" alt="bgr">
                </div>
                <div class="signin-form">
                    <div class="content text-center">
                        <div class="title">
                            <h1>CAMDO<strong>NHANH</strong></h1>
                        </div>
                        <h3>Đăng Nhập</h3>
                        <form @submit.prevent="loginHandle">
                          <input id="username" type="text" placeholder="username" v-model="username"/>
                          <input id="password" type="password" placeholder="password" v-model="password"/>
                        
                          <br/>
                          <br/>
                          <button type="submit" :disabled="authenticating" class="button">
                              Login
                          </button>
                        </form>
                        <br/>
                        <div class="copy-right">
                            <p><i>Copyright © 2018-2019 ICADO Co.Ltd <br/> All rights reserved.</i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "login",
  props : ["nextUrl"],
  computed: {
    ...mapGetters({
      authenticating:'auth/authenticating',
      authenticationErrorCode:'auth/authenticationErrorCode',
      authenticationError:'auth/authenticationError'
    })
  },
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
      ...mapActions({
        login: 'auth/login'
      }),
      loginHandle: function() {
        this.login({username: this.username, password: this.password})
      }
  },
  watch: {
    authenticationErrorCode() {
      //Login Successfully
      if (this.authenticationErrorCode == 200) {
        this.dialog = true
        if(this.$route.params.nextUrl != null){
          this.$router.push(this.$route.params.nextUrl)
        }
        else{
          this.$router.push('/')
        }
      } else if (this.authenticationErrorCode != 0) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: "Error: "+this.authenticationErrorCode,
          text: this.authenticationError
        });
      }
    }
  }
};
</script>

<style scoped>

input {
  font-size: 20px;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid black;
}

.button { 
  background: #0099CC;
  border-radius: 6px;
  border: none;
  color: white;
  padding: 9px 22px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin-top: 4px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
}

.button:hover {
  background-color: #008CBA;
  color: white;
 }

@media only screen and (max-width: 1386px) {
  #left-container {
    display: contents;
  }
  #right-container {
    max-width: 100%;
    flex: 0 0 100%;
  }
}

#right-container {
  padding-left: 0;
  padding-right: 0
}

.full-height {
  height: 100%;
}

.left-panel {
  background-color: #F10027;
  position: relative;
}

.icon-rabbit {
  position: absolute;
  top: 35%;
  left: 18%;
}

.background-img img {
  filter: grayscale(100%) blur(2px);
  width: 100%;
  height: 100%;
}

.right-panel {
  position: relative;
}

.signin-form {
  position: absolute;
  background-color: white;
  width: 410px;
  height: 370px;
  border-radius: 28px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  color: #DD1E26;
}

/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 40px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}

/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #f32e06;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png") 5px 10px no-repeat;
  color: #fff;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #ca0707;
}

.content {
  padding: 35px;
}

.content h3 {
  color: #43425D;
}

.copy-right {
  color: #43425D;
}

</style>

