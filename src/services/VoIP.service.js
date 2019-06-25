import JsSIP from "jssip"
import {VOIPUserService} from './storage.service'

const ws_uri = 'wss://voipicado.tk:7443'
const socket = new JsSIP.WebSocketInterface(ws_uri);
const username = VOIPUserService.getUsername()
const password = VOIPUserService.getPassword()

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
        this.telephone.start()
    },

    getTelephone() {
        return this.telephone
    }
}

VOIPService.setTelephone({user: username, password: password})

export default VOIPService