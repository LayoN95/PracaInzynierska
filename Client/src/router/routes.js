import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Wykresy = () => import(/* webpackChunkName: "dashboard" */"@/pages/Wykresy.vue");
const Kamera = () => import(/* webpackChunkName: "common" */ "@/pages/Kamera.vue");
const Wizualizacja = () => import(/* webpackChunkName: "common" */"@/pages/Wizualizacja.vue");
const Zestawienie = () => import(/* webpackChunkName: "common" */ "@/pages/Zestawienie.vue");
const Sterowanie = () => import(/* webpackChunkName: "common" */ "@/pages/Sterowanie.vue");
/*const Typography = () => import(/* /* webpackChunkName: "common" */ /*"@/pages/Typography.vue");*/
const Historia = () => import(/* webpackChunkName: "common" */ "@/pages/Historia.vue");

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
        path: "kamera",
        name: "kamera",
        component: Kamera
      },
      {
        path: "wizualizacja",
        name: "wizualizacja",
        component: Wizualizacja
      },
      {
        path: "zestawienie",
        name: "zestawienie",
        component: Zestawienie
      },
      {
        path: "sterowanie",
        name: "sterowanie",
        component: Sterowanie
      },
      /*{
        path: "typography",
        name: "typography",
        component: Typography
      },*/
      {
        path: "historia",
        name: "historia",
        component: Historia
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
