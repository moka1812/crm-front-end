import vue from '../main'
import JsSIP from 'jssip'
import store from '../store/store'

const ws_uri = process.env.VUE_APP_WS_URI
const ws_user = process.env.VUE_APP_WS_USER

//JsSIP.debug.enable('JsSIP:*');

const VOIPService = {
    socket: new JsSIP.WebSocketInterface(ws_uri),
    telephone: null,
    configuration: null,
    
    setTelephone({user, password}) {

        this.configuration = {
            sockets  : [ this.socket ],
            uri      : ws_user.replace("user", user),
            password : password,
        }
        this.telephone =  new JsSIP.UA(this.configuration);
        this.telephone.on('registered', function(e){ 
            vue.$notify({
                group: 'foo',
                type: 'success',
                title: "Call Connection",
                text: "Successful"
              });
        });
        this.telephone.on('registrationFailed', function(e){ 
            vue.$notify({
                group: 'foo',
                type: 'error',
                title: "Call Connection",
                text: "Failed"
              });
        });

        this.telephone.on('newRTCSession', function(data) { 
            const session = data.session;
            const request = data.request;
            
            if (request.constructor.name == "IncomingRequest") {
                //Show Notification if web don't have any call
                if (!store.getters['call/ring'] && !store.getters['call/calling']) {
                    store.dispatch('call/incomingRequest',{session})
                }
            }
            
        });

        this.telephone.start()
    },

    getTelephone() {
        return this.telephone
    },

    disconnect() {
        this.telephone.stop()
    }
}

export default VOIPService