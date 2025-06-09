import { useEffect, useState , useMemo} from "react"
import { db } from "../data/db"
import type {Guitar, CartItem, GuitarID } from "../types"

export const useCart = () => {

    const initialCart = () : CartItem[] => {
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

    function addToCart(item : Guitar) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updateCart = [...cart]
            updateCart[itemExists].quantity++
            setCard(updateCart)
        } else {
            const newItem: CartItem = {...item, quantity: 1}
            setCard([...cart, newItem])
        }
    }

    function removeFromCart(id : GuitarID) {
        setCard(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id : GuitarID) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })

        setCard(updatedCart)
    }

    function decrementQuantity(id : GuitarID) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > 1) {
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

    // State Derivado
    const isEmpty = useMemo( () => cart.length === 0 , [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decrementQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}