<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/wykresy" :name="$t('sidebar.wykresy')" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link to="/zestawienie" :name="$t('sidebar.zestawienie')" icon="tim-icons icon-atom"/>
        <sidebar-link to="/sterowanie" :name="$t('sidebar.sterowanie')" icon="tim-icons icon-pin"/>
        <sidebar-link to="/wizualizacja" :name="$t('sidebar.wizualizacja')" icon="tim-icons icon-bell-55"/>
        <sidebar-link to="/kamera" :name="$t('sidebar.kamera')" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/historia" :name="$t('sidebar.historia')" icon="tim-icons icon-puzzle-10"/>
       <!-- <sidebar-link to="/typography" :name="$t('sidebar.typography')" icon="tim-icons icon-align-center"/> -->
       <!-- <sidebar-link to="/dashboard?enableRTL=true" :name="$t('sidebar.rtlSupport')" icon="tim-icons icon-world"/> -->
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar> 

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
