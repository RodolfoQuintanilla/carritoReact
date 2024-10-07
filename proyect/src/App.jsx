import { useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/bd";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  /*  aqui se usa el text o cart y se transforma en item aqui se usa el text o cart y se transforma en item */
  function addTocart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      /* cart[itemExists].quantity += 1; */
      console.log("Ya existe");
      const updateCart = [...cart];
      updateCart[itemExists].quantity += 1;
      setCart(updateCart);
    } else {
      console.log("No existe agregandi");
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  return (
    <>
      <Header cart={cart} />

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
