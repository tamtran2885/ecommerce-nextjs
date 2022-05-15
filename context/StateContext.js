import React, {createContext, useContext, useState, useEffect} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);

    let foundProduct, index;

    const onAdd = (product, qty) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * qty);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + qty);
        if (checkProductInCart) {       
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    qty: cartProduct.qty + qty
                }
            })
            setCartItems(updatedCartItems);
        } else {
            product.qty = qty;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${quantity} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const totalCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(totalCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        let newCartItems;
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const totalCartItems = cartItems.filter((item) => item._id !== id);

        if (value === "inc") {
            newCartItems = [ ...totalCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ];
            setCartItems(newCartItems);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === "dec") {
            if (foundProduct.quantity > 1) {
                newCartItems = [ ...totalCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ];
                setCartItems(newCartItems);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => {
            if(prevQuantity - 1 < 1) return 1;
            return prevQuantity -1;
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                quantity,
                increaseQuantity,
                decreaseQuantity,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);