let label = document.getElementById('label')
let basket = JSON.parse(localStorage.getItem("data")) || [];
let shoppingCart = document.getElementById("shopping-cart");
function calculation(){
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map((a)=>a.item).reduce((a,b)=>a+b,0)
  }
  calculation();
  let generateCartItems = ()=>{
    if (basket.length !== 0) {
        return (
          shoppingCart.innerHTML = basket.map((a)=>{
            console.log(a)
             let {id,item} = a;
            let search = shopItemsData.find((b)=>b.id === id) || [];
            let {img,name,price} = search
            return`<div class="cart-item">
             <img width=100 src=${img} alt=""/>
             <div class="details">
             <div class="title-price-x">
             <h4 class
             ="title-price">
             <p>${name}</p>
             <p class="cart-item-price">$ ${price}</p>
             </h4>
             <i onclick="removeItems(${id})" class="fa-solid fa-xmark"></i>
             </div>
             <div class="cart-buttons">
             <div class="buttons">
            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>  
            <div id=${id} class="quantity">${item}</div> 
            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
        </div>
        <h3 class="price">$ ${item*search.price}</h3>
        </div>
             </div>
             </div>`;
          })
          .join(""));
     }else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
          <button class="HomeBtn">Back to home</button>
        </a>
        `;    
    }
  }
  generateCartItems();


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
  generateCartItems();
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
  generateCartItems();
    update(selectedItem.id);
    basket = basket.filter((a) => a.item !== 0);
    localStorage.setItem("data",JSON.stringify(basket));

 }
 function update(id){
  let search = basket.find((a)=>a.id===id)
   document.getElementById(id).innerHTML = search.item;
   calculation();
   totalAmount()
}
function removeItems(id){
 let selectedItem = id;
  basket = basket.filter((a)=>a.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation()
  localStorage.setItem("data",JSON.stringify(basket));
}
function totalAmount(){
  if (basket.length!==0) {
    let amount = basket.map((a)=>{
      let {item,id} = a;
      let search = shopItemsData.find((b)=>b.id === id) || [];
         return item * search.price
    }).reduce((a,b)=>
      a+b,0
    );
    label.innerHTML = `<h2>Total Bill: $ ${amount}</h2>
    <button class="checkout">Check out</button>
    <button onclick="clearCart()"class="removeAll">Clear Cart</button>
    
    `
  }
  else return;
};
 function clearCart(){
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data",JSON.stringify(basket));
 }

totalAmount()