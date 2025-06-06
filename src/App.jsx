import { useEffect, useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  } 

  //State local puede guardar db directo 
  const [data] = useState(db)

  // Correcto si no genermos manejar detalles especificos del carrito sino generar nuevo registro
  const [cart, setCard] = useState(initialCart)

  const MAX_ITEMS = 10

    // useEffect para API no es el caso pero hay que practicar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0) {
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCard(updateCart)
    } else {
      item.quantity = 1  
      setCard([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCard(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })

    setCard(updatedCart)
  }

  function decrementQuantity(id) {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })

    setCard(updatedCart)
  }

  function clearCart() {
    setCard([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decrementQuantity={decrementQuantity}
        clearCart={clearCart}
      />

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
