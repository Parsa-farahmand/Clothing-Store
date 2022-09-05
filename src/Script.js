let shop = document.getElementById('shop');
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((a)=>{
        let {id,name,desc,price,img,} = a;
        let search = basket.find((a)=>a.id === id) || [];
        return `<div id=product-id-${id} class="item">
        <img src=${img} width="220">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
      <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>  
            <div id=${id} class="quantity">
            ${search.item === undefined ? 0:search.item}
            </div> 
            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
        </div>
       </div>
      </div>
     </div>`;
    }).join(""))
}
generateShop();

function increment(id){
    let selectedItem = id;
    let search = basket.find((a)=>a.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
        id:selectedItem.id,
        item:1,
    })
  }else{
     search.item+=1;
  }
   update(selectedItem.id);
   localStorage.setItem("data",JSON.stringify(basket));
}
function decrement(id){
    let selectedItem = id;
    let search = basket.find((a)=>a.id === selectedItem.id);
  if (search === undefined) return;
  else if(search.item === 0) return; 
  else{
     search.item-=1
  }
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
    basket = basket.filter((a) => a.item !== 0);

    
 }
function update(id){
    let search = basket.find((a)=>a.id===id)
     document.getElementById(id).innerHTML = search.item;
     calculation()
}
 function calculation(){
  let cart = document.getElementById('cartAmount')
  cart.innerHTML = basket.map((a)=>a.item).reduce((a,b)=>a+b,0)
}
calculation();