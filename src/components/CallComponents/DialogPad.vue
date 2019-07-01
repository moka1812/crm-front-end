<template>
    <v-container class="dialog">
        <v-text-field 
            v-model="numbers"
            type="number"
            class="inputNumber"
            reverse 
            append-outer-icon="backspace"
            @click:append-outer="remove"
        />
        <v-layout v-for="(group, key) in groups" :key="key">
            <v-flex sm4 v-for="number in group" :key="number">
                <v-btn v-if="number!=null" outline fab color="indigo" @click="click(number)">
                    {{number}}
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex sm4></v-flex>
            <v-flex sm4>
                <v-btn fab icon color="green" @click="openDialog" :disabled="disable">
                    <v-icon color="#fff">call</v-icon>
                </v-btn>
            </v-flex>
            <v-flex sm4></v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "dialog-pad",
    data() {
        return {
            groups: [
                ['1','2','3'],
                ['4','5','6'],
                ['7','8','9'],
                [null,'0', null]
            ],
            numbers: '',
        }
    },
    computed: {
        ...mapGetters({
            calling: 'call/calling',
            ring: 'call/ring'
        }),
        disable() {
            if (this.calling || this.ring) {
                return true
            } return false
        }
    },
    methods: {
        ...mapActions({
            call: 'call/call'
        }),
        click(number) {
            this.numbers += number
        },
        remove() {
            if (this.numbers != null && this.numbers.length > 0) {
                this.numbers = this.numbers.substring(0, this.numbers.length - 1);
            }
        },
        openDialog() {
            this.call({phone: this.numbers})
        }
    }
}
</script>


<style scoped>
.dialog {
    padding-top: 0px;
}
</style>

<style>
/* Remove SPIN */
.inputNumber input[type='number'] {
    -moz-appearance:textfield;
}
.inputNumber input::-webkit-outer-spin-button,
.inputNumber input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>