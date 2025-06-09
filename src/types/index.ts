export type Guitar = {
    id: number
    name: string,
    image: string,
    description: string,
    price: number
}

// Herencia de Guitarra
export type CartItem = Guitar & {
    quantity: number
}

// Lookup type
export type GuitarID = Guitar['id']

// // Pick toma types
// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> {
//     quantity: number
// }

// Omit omite types
// export type CartItem = Omit<Guitar, 'id' | 'name' | 'price'> {
//     quantity: number
// }

// interface Guitar {
//     id: number
//     name: string,
//     image: string,
//     description: string,
//     price: number
// }