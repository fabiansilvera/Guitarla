import { useEffect, useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {
  //State local puede guardar db directo 
  const [data, setData] = useState([])

  // Correcto si no genermos manejar detalles especificos del carrito sino generar nuevo registro
  //const [card, setCard] = useState([])
  const [cart, setCard] = useState([])

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
    if(itemExists !== -1) {
      item.quantity += 1  
      console.log("Ya existe en el carrito")
    } else {
      item.quantity = 1  
      setCard((prevCart) => [...prevCart, item])
    }
  }

  // useEffect para API no es el caso pero hay que practicar
  useEffect(() => {
    setData(db)
  }, [])

  return (
    <>
      <Header/>

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitarra) => (
              <Guitar
                key={guitarra.id}
                guitarra = {guitarra}
                setCard={setCard}
                addToCart={addToCart}
              />
            ))}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
