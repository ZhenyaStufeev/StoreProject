import Axios from "axios";
import { setAuthorizationToken } from "../utils/setAuthorizationToken.jsx";
import { CHANGE_LANG } from "store/types";
const host = window.location.origin;

/*Робота з категориями*/

export function openSubMenu(e) {
  e.stopPropagation();
  e.preventDefault();
  let childsHTML = e.currentTarget.children;
  let childsArray = Array.prototype.slice.call(childsHTML);
  closeAllOpenedItems(childsArray, true);
}

export function resetMobileMenu() {
  let HTMLItem = document.getElementById("mobile-button");
  if (HTMLItem != null) {
    let childs = HTMLItem.children;
    let childsArray = Array.prototype.slice.call(childs);
    for (let i = 0; i < childsArray.length; i++) {
      if (childsArray[i].className.includes("--open")) {
        closeAllOpenedItems(childsArray, true);
        break;
      }
    }
  }
}

export function closeSidebar() {
  let close = document.getElementById("bodyClick-mobile");
  if (close != null) {
    close.onclick();
  }
}

function closeAllOpenedItems(childsArray, isChangeChilds) {
  if (childsArray != null) {
    let submenuItem = {};
    for (let i = 0; i < childsArray.length; i++) {
      if (
        childsArray[i].className.includes("submenu") ||
        childsArray[i].className.includes("category-list")
      ) {
        submenuItem = childsArray[i];
        break;
      }
    }

    if (submenuItem.className.includes("--open")) {
      submenuItem.className = submenuItem.className.replace(" --open", "");

      for (let i = 0; i < submenuItem.children.length; i++) {
        if (submenuItem.children[i].className === "sub-button") {
          let subbutton = submenuItem.children[i];
          closeAllOpenedItems(subbutton.children, false);
        }
      }
    } else {
      if (isChangeChilds === true) submenuItem.className += " --open";
    }
    console.log(submenuItem.className);
  }
}

/* -------------------------------------------------------------------- */

/* Requests */
export async function loadCategories() {
  let requestHref = host + "/api/Store/getcategories";
  let data = await Axios.get(requestHref);
  return data;
}

export function getData() {
  let hash = window.location.hash.slice(1);
  let search = window.location.search.slice(1);

  if (hash === "" || hash == null) hash = "1";

  hash = parseInt(hash);

  if (search == null) search = "";

  let data = { page: hash, categoryId: search };
  return data;
}

export function getCategoryNameById(categoryId, categoryList) {
  let categoryName = "";
  categoryList.forEach(item => {
    if (item.id.toString() === categoryId) {
      categoryName = item.name;
    }
  });
  return categoryName;
}

export async function login(data) {
  let requestHref = host + "/api/Account/login";
  return await Axios.post(requestHref, data).then(res => {
    const token = res.data.data[0].token;
    localStorage.setItem("jwtToken", token);
    setAuthorizationToken(token);
  });
}

export async function register(data) {
  let requestHref = host + "/api/Account/register";
  return await Axios.post(requestHref, data).then(res => {
    return res.data;
  });
}
export function Change_Lang(data) {
  return dispatch => {
    dispatch({
      type: CHANGE_LANG,
      data
    });
  };
}

export function Translate(data) {//data {lang: <lang>, words: <words>}
    let mass = data.words;
    if (data.lang == null)
      if (localStorage.lang != null) data.lang = localStorage.lang;
      else data.lang = "US";

    return import(`../resources/${data.lang}.json`).then(res => {
      let message = res["default"];
      return mass.map(mes => {
        let temp = message[mes];
        if (temp == null) {
          return mes;
        }
        // let obj = {};
        // obj[mes] = temp;
        //return obj;
        return temp;
      });
    });
}
