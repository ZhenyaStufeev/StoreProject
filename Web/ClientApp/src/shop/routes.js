import ProductsList from "shop/views/ProductsList"
import SelectedProduct from "shop/views/SelectedProduct"
import ShopingCart from "shop/views/ShopingCart"
const dashboardRoutes = [
  {
    path: "/products*",
    name: "Каталог товаров",
    icon: "pe-7s-bookmarks",
    component: ProductsList,
    layout: ""
  },
  {
    path: "/sproduct*",
    name: "Продукт",
    icon: "pe-7s-bookmarks",
    component: SelectedProduct,
    layout: ""
  },
  window.localStorage.getItem("Email") != null ? {
    path: "/shopingcart*",
    name: "Корзина",
    icon: "pe-7s-bookmarks",
    component: ShopingCart,
    layout: ""
  } : ""
];

export default dashboardRoutes;