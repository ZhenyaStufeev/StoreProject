import ProductsList from "shop/views/ProductsList"
import SelectedProduct from "shop/views/SelectedProduct"
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
  }
];

export default dashboardRoutes;