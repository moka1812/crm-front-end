<template>
  <v-card fluid class="content-contract-tabs">
    <tabs
      :tabs="tabs"
      :currentTab="currentTab"
      :wrapper-class="'default-tabs'"
      :tab-class="'default-tabs__item'"
      :tab-active-class="'default-tabs__item_active'"
      :line-class="'default-tabs__active-line'"
      @onClick="handleTabsClick"
    />
    <div>
      <div v-if="currentTab === 'Summary'">Summary Tab</div>
      <div v-if="currentTab === 'RepaymentsShedule'">Repayments Shedule Tab</div>
      <div v-if="currentTab === 'Transaction'">Transaction Tab</div>
      <div v-if="currentTab === 'Documents'">Documents Tab</div>
      <div v-if="currentTab === 'CollateralInfo'">CollateralInfo Tab</div>
      <div v-if="currentTab === 'Notes'">Notes Tab</div>
    </div>
  </v-card>
</template>

<script>
import Tabs from "vue-tabs-with-active-line";

const TABS = [
  {
    title: "SUMMARY",
    value: "Summary"
  },
  {
    title: "REPAYMENT SCHEDULE",
    value: "RepaymentsShedule"
  },
  {
    title: "TRANSACTION",
    value: "Transaction"
  },
  {
    title: "DOCUMENTS",
    value: "Documents"
  },
  {
    title: "COLLATERAL INFO",
    value: "CollateralInfo"
  },
  {
    title: "NOTES",
    value: "Notes"
  }
];

export default {
  name: "contract-tabs",
  components: {
    Tabs
  },
  data: () => ({
    tabs: TABS,
    currentTab: "Summary"
  }),
  methods: {
    handleTabsClick(newTab) {
      this.currentTab = newTab;
    }
  }
};
</script>
<style lang="scss">
.default-tabs {
  position: relative;
  margin: 0 auto;
  background-color: #D9DADB;
  justify-content: center;
  text-align: center;
  padding-top: 10px;
  padding-bottom : 5px;
  &__item {
    display: inline-block;
    margin: 0 3px;
    padding: 0.8rem;
    max-width: 12rem;
    height: 100% !important;
    padding-bottom: 8px;
    text-align: center;
    align-items: center;
    vertical-align: middle;
    font-size: 1rem;
    letter-spacing: 0.8px;
    color: #4D4F5C;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.25s;
    &_active {
      color: #DD2028;
    }
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__item:focus {
    outline: none !important;
  } 
  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #DD2028;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
.content-contract-tabs {
  padding: 0px;
  height: 100% !important;
}
</style>