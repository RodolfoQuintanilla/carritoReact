import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/bd";

function App() {

  const initialCart =()=>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart):[]
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /*  aqui se usa el text o cart y se transforma en item aqui se usa el text o cart y se transforma en item */
  function addTocart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      /* cart[itemExists].quantity += 1; */

      const updateCart = [...cart];
      updateCart[itemExists].quantity += 1;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    /* filtra las guitar diferente al id q te estoy pasando */
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    /* codigo actualiza el elemento */
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      /* fuera del if para retornar elementos */
      return item;
    });
    setCart(updateCart);
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((text) => (
            <Guitar
              key={text.id}
              text={text}
              setCart={setCart}
              cart={cart}
              addTocart={addTocart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
