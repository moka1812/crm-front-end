<template>
    <v-menu 
        :close-on-content-click="false"
        :nudge-width="200"
        nudge-left="200"
        offset-y
    >
        <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">{{currentBranch}} BRANCH
                <v-icon>arrow_drop_down</v-icon>
          </v-btn>
        </template>

        <v-card>
            <v-list>
                <v-list-tile-title><center style="font-size: 20px;">Choose branch</center></v-list-tile-title>
                <hr style="margin-bottom: 0px"/>
                <v-list two-line class="branchList">
                    <template v-for="(branch, index) in branches"
                    >
                        <v-list-tile
                            :key="index"
                            @click="changeBranchHandle(index)"
                        >
                        <v-list-tile-content :style="{'padding-left': '10px'}">
                            <v-list-tile-title>{{branch.name}} BRANCH</v-list-tile-title>
                            <v-list-tile-sub-title>{{branch.address}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        </v-list-tile>
                        <hr class="no-margin" v-if="index + 1 < branches.length" :key="`divider-${index}`"/>
                    </template>
                </v-list>
                <hr style="margin-top: 0px"/>
                <v-list-tile-title><center><font color="red">See all</font></center></v-list-tile-title>
            </v-list>

            
        </v-card>
    </v-menu>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "branch-menu",
    computed: {
        ...mapGetters({
            currentBranch: 'branch/currentBranch'
        }),
        branches() {
            return [
                {
                    name:'CMT8',
                    address: '1084 CMT8, Tan Binh District, Ho Chi Minh City'
                },
                {
                    name:'DTH',
                    address: '190 Dinh Tien Hoang, District 1, Ho Chi Minh City'
                },
                {
                    name:'Can Tho',
                    address: '138 Trần Cao Văn, Ninh Kiều, Can Tho'
                },
                {
                    name:'Lo Duc',
                    address: '90 Lo Duc, Hai Va Trung District, Hanoi'
                }
            ] 
        }
    },
    methods: {
        ...mapActions({
            changeBranch: 'branch/changeBranch'
        }),
        changeBranchHandle: function(index) {
            let branch = this.branches[index].name
            this.changeBranch({branch:branch})
        }
    }
}
</script>

<style scoped>
.branchList {
    background-color: #e5e5e5; 
    padding-top: 0px;
    padding-bottom: 0px;
    height: 250px;
    overflow-y: auto;
}

.no-margin {
    margin-top: 0px;
    margin-bottom: 0px
}
</style>
