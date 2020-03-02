import Axios from "axios";
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
    for (let i = 0; i < HTMLItem.children.length; i++) {
      if (HTMLItem.children[i].className === "category-list") {
        closeAllOpenedItems(HTMLItem.children[i], true);
        break;
      }
    }
  }
}

function closeAllOpenedItems(childsArray, isChangeChilds) {
  if (childsArray != null) {
    let submenuItem = {};
    for (let i = 0; i < childsArray.length; i++) {
      if (
        childsArray[i].className === "submenu" ||
        childsArray[i].className === "submenu --open" ||
        childsArray[i].className === "category-list" ||
        childsArray[i].className === "category-list --open"
      ) {
        submenuItem = childsArray[i];
        break;
      }
    }
    if (
      submenuItem.className === "submenu --open" ||
      submenuItem.className === "category-list --open"
    ) {
      if (submenuItem.className === "submenu --open") {
        submenuItem.className = "submenu";
      } else {
        submenuItem.className = "category-list";
      }

      for (let i = 0; i < submenuItem.children.length; i++) {
        if (submenuItem.children[i].className === "sub-button") {
          let subbutton = submenuItem.children[i];
          closeAllOpenedItems(subbutton.children, false);
        }
      }
    } else {
      if (isChangeChilds === true) submenuItem.className += " --open";
    }
  }
}

/* -------------------------------------------------------------------- */


/* Requests */
export async function loadCategories() {
  let requestHref = host + "/api/Store/getcategories";
  let data = await Axios.get(requestHref);
  return data;
}

export function getData()
{  
  let hash = window.location.hash.slice(1);
  let search = window.location.search.slice(1);

  if(hash === "" || hash == null)
    hash = '1';

  hash = parseInt(hash);

  if(search == null)
    search = ''
  
  let data = {page: hash, categoryId: search};
  return data
}

export function getCategoryNameById(categoryId, categoryList)
{
  let categoryName = "";
  categoryList.forEach(item => {
    if(item.id.toString() === categoryId)
    {
      categoryName = item.name;
    }
  });
  return categoryName;
}
