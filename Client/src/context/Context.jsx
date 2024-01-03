import { useContext, useReducer, createContext, useEffect } from "react";
import CartReducer from "./Reducers/CartReducer";
import ProductReducer from "./Reducers/ProductReducer";
import axios from "axios";
import UserReducer from "./Reducers/UserReducer";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const cartContext = createContext();

const ContextProvider = ({ children }) => {

    // Now it's time to show some products on our products page
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            }));
    }, [])

    const cartItems = JSON.parse(localStorage.getItem('cart'));

    const [state, dispatch] = useReducer(CartReducer, {
        products: [],
        order_details: {},
        cart: cartItems ? cartItems : [] // if cartItems found then push cartItems in cart else [] array
    })

    localStorage.setItem('cart', JSON.stringify(state.cart));

    const [productState, productDispatch] = useReducer(ProductReducer, {
        byStock: false,
        sort: "",
        byFastDelivery: false,
        byRating: 0,
        searchQuery: ""
    })

    const userData = Cookies.get("token")

    const [userState, userDispatch] = useReducer(UserReducer, {
        user: userData ? userData : null,
        details: {}
    })

    // localStorage.setItem('userInfo', JSON.stringify(userState.user));


    return (
        <cartContext.Provider value={{ state, dispatch, productState, productDispatch, userState, userDispatch }}>
            {children}
        </cartContext.Provider>
    )
}

export default ContextProvider

export const useCart = () => {
    return useContext(cartContext);
}