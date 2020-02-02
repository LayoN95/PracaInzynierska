import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Wykresy = () => import(/* webpackChunkName: "dashboard" */"@/pages/Wykresy.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Wizualizacja = () => import(/* webpackChunkName: "common" */"@/pages/Wizualizacja.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
/*const Typography = () => import(/* /* webpackChunkName: "common" */ /*"@/pages/Typography.vue");*/
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/wykresy",
    children: [
      {
        path: "wykresy",
        name: "wykresy",
        component: Wykresy
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "wizualizacja",
        name: "wizualizacja",
        component: Wizualizacja
      },
      {
        path: "icons",
        name: "zestawienie",
        component: Icons
      },
      {
        path: "maps",
        name: "sterowanie",
        component: Maps
      },
      /*{
        path: "typography",
        name: "typography",
        component: Typography
      },*/
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
