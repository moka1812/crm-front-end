import JsSIP from "jssip"


const socket = new JsSIP.WebSocketInterface('wss://171.244.49.162');

const VOIPService = {
    socket: socket,
    telephone: null,
    configuration: null,

    setTelephone({user, password}) {
        this.configuration = {
            sockets  : [ this.socket ],
            uri      : `sip:${user}`,
            password : password
        }
        this.telephone =  new JsSIP.UA(this.configuration);
        this.telephone.start()
    },

    getTelephone() {
        return this.telephone
    }
}

export default VOIPService