<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "incoming-box",
    render() {
        return null
    },
    computed: {
        ...mapGetters({
            customerNumberPhone: 'call/customerNumberPhone',
            ring: 'call/ring',
            requestType: 'call/requestType',
        }),
    },
    methods: {
        ...mapActions({
            imcomingAccept: 'call/imcomingAccept',
            terminate: 'call/terminate'
        })
    },
    watch: {
        ring() {
            if (this.ring==true && this.requestType=="incoming") {
                this.$snotify.confirm(
                    `
                    Lê Bảo Châu
                    (${this.customerNumberPhone})
                    `, 
                    'Cuộc gọi đến', {
                        showProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        buttons: [
                            {
                                text: 'Chấp nhận', 
                                action: (toast) => {
                                    this.imcomingAccept()
                                    this.$snotify.remove(toast.id)
                                }
                            },
                            {
                                text: 'Từ chối', 
                                action: (toast) => {
                                    this.terminate()
                                    this.$snotify.remove(toast.id)
                                }
                            },
                        ]
                    }
                );
            }
        }
    }
}
</script>