import Products from "shop/views/Products"

const dashboardRoutes = [
  {
    path: "/products*",
    name: "Каталог товаров",
    icon: "pe-7s-bookmarks",
    component: Products,
    layout: ""
  }
];

export default dashboardRoutes;