import vue from '../main'
import JsSIP from 'jssip'

const ws_uri = 'wss://voipicado.tk:7443'
const socket = new JsSIP.WebSocketInterface(ws_uri);

JsSIP.debug.enable('JsSIP:*');

const VOIPService = {
    socket: socket,
    telephone: null,
    configuration: null,
    
    setTelephone({user, password}) {

        this.configuration = {
            sockets  : [ this.socket ],
            uri      : `sip:${user}@webrtc.icado.com`,
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
                type: 'success',
                title: "Call Connection",
                text: "Failed"
              });
        });

        this.telephone.start()
    },

    getTelephone() {
        return this.telephone
    }
}

export default VOIPService