<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                v-model.lazy="datetime"
                append-icon="event"
                :label="label"
                :disabled="disable"
                :rules="rules"
                :hint="hint"
                :persistent-hint="true"
                @click:append="menu=true"
            >
            </v-text-field>
        </template>
        <v-window v-model="step">
            <v-window-item :value="1">
                <v-date-picker v-model="date" no-title @input="step++"></v-date-picker>
            </v-window-item>
            <v-window-item :value="2">
                <v-time-picker v-if="this.menu" v-model="time" format="24hr" no-title @click:minute="turnOff"></v-time-picker>
            </v-window-item>
        </v-window>
    </v-menu>
</template>

<script>
import moment from 'moment'
import { setTimeout } from 'timers';

export default {
    name: "date-time-picker",
    props: {
        value: String,
        label: String,
        disable: Boolean,
        rules: Array,
        hint: String,
    },
    data() {
        return {
            menu: false,
            step: 1,
            date: '',
            time: '',
        }
    },
    computed: {
        datetime: {
            get () {return this.value},
            set (value) {this.$emit('input', value)}
        },
    },
    methods: {
        turnOff() {
            this.datetime = moment(`${this.date} ${this.time}`, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm")
            this.step=1
            setTimeout(() => this.menu=false) 
        },
    },
    watch: {
        value() {
            console.log(this.value)
        }
    }
}
</script>