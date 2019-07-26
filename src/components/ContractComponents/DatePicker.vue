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
                v-model.lazy="dateFormatted"
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
        <v-date-picker v-model="date" no-title @input="turnOff"></v-date-picker>
    </v-menu>
</template>

<script>
import moment from 'moment'
import { setTimeout } from 'timers';

export default {
    name: "date-picker",
    props: {
        value: String,
        label: String,
        disable: {
            type: Boolean,
            default: false,
        },
        rules: {
            type: Array,
            default: function () {
                return [
                    value => {
                        if (value !== null) {
                            const isValid = moment(value, "DD/MM/YYYY", true).isValid()
                            if (isValid) return true
                            return "Dữ liệu không hợp lệ"
                        }
                        return "Dữ liệu không hợp lệ"
                    }
                ] 
            },
        },
        hint: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            menu: false,
            date: '',
        }
    },
    computed: {
        dateFormatted: {
            get () {return this.value},
            set (value) {this.$emit('input', value)}
        },
    },
    methods: {
        parseDate(date) {
            if (!date) return null
            return moment(this.date, "DD/MM/YYYY").format("YYYY-MM-DD")
        },
        turnOff() {
            this.dateFormatted = moment(this.date, "YYYY-MM-DD").format("DD/MM/YYYY")
            //Bug from Vuetify, when turn off V-Menu then V-Dialog turn off too
            setTimeout(() => this.menu=false) 
        },
    },
}
</script>