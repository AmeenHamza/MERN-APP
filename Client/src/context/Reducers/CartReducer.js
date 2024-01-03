const CartReducer = (state, action) => {
    switch (action.type) {

        case 'GET_PRODUCTS':
            return { ...state, products: action.payload }

        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, { ...action.payload.prod, qty: 1, size: action.payload.size }] }

        case 'GET_ORDER_DETAILS':
            return { ...state, order_details: { ...action.payload } }

        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter((prod) => prod.id !== action.payload) }

        case 'EMPTY_CART':
            return { ...state, cart: [] }

        case 'CHANGE_QTY':
            return { ...state, cart: state.cart.filter((prod) => prod.id === action.payload.id ? prod.qty = action.payload.qty : prod.qty) }

        case 'CHANGE_SIZE':
            return { ...state, cart: state.cart.filter((prod) => prod.id === action.payload.id ? prod.size = action.payload.size : prod.size) }

        default:
            return state;
    }
}

export default CartReducer;