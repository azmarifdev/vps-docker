'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { trackAddToCart as trackMetaPixelAddToCart } from '@/lib/meta-pixel';
import { trackAddToCart, trackRemoveFromCart } from '@/lib/gtm';
import { trackAddToCart as trackServerAddToCart } from '@/lib/server-tracking';

interface CartItem {
    id: string;
    name: string;
    price: number;
    discount?: number;
    quantity: number;
    image: string;
    attribute?: {
        title: string;
        value: string;
    }[];
    is_free_shipping?: boolean;
}

interface CartContextType {
    cartItems: CartItem[];
    // eslint-disable-next-line no-unused-vars
    addToCart: (product: any, quantity: number) => void;
    // eslint-disable-next-line no-unused-vars
    updateQuantity: (id: string, quantity: number) => void;
    // eslint-disable-next-line no-unused-vars
    removeItem: (id: string) => void;
    itemCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add or update item in cart
    const addToCart = (product: any, quantity: number) => {
        // Track the add to cart event with Meta Pixel
        trackMetaPixelAddToCart(product, quantity);

        // Track the add to cart event with GTM
        trackAddToCart(product, quantity);

        // Track server-side using Facebook Conversion API
        trackServerAddToCart(product, quantity);

        // Check if the cart already contains this product
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex((item) => item.id === product.id);

            // If the item exists, update the quantity
            if (existingItemIndex >= 0) {
                const updatedItems = [...prev];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                // If the item doesn't exist, add it to the cart
                return [
                    ...prev,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: quantity,
                        discount: product.discount,
                        image: product.image || '',
                        attribute: product.attribute || [],
                        is_free_shipping: product.is_free_shipping || false,
                    },
                ];
            }
        });

        // Update localStorage after updating the cartItems
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            const existingItemIndex = cart.findIndex((item: CartItem) => item.id === product.id);

            // If item exists, update quantity, else add a new item
            if (existingItemIndex >= 0) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    discount: product.discount,
                    image: product.image || '',
                    attribute: product.attribute || [],
                    is_free_shipping: product.is_free_shipping || false,
                });
            }

            // Save the updated cart in localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    };

    // Update quantity of an item
    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;

        setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));

        // Update localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            const itemIndex = cart.findIndex((item: CartItem) => item.id === id);
            if (itemIndex >= 0) {
                cart[itemIndex].quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    };

    // Remove an item from cart
    const removeItem = (id: string) => {
        // Find the item to track removal in GTM before it's removed
        const itemToRemove = cartItems.find((item) => item.id === id);
        if (itemToRemove) {
            trackRemoveFromCart(itemToRemove, itemToRemove.quantity);
        }

        setCartItems((prev) => prev.filter((item) => item.id !== id));

        // Update localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            const updatedCart = cart.filter((item: CartItem) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    // Calculate totals with memoization to prevent unnecessary recalculations
    const { itemCount, cartTotal } = useMemo(() => {
        const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return { itemCount: count, cartTotal: total };
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeItem,
                itemCount,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
            }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
