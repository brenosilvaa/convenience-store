import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartState } from "../states/cart-state";
import { CreateOrderItem } from "../models/create-order-item";
import { Product } from "../../products/models/product";
import { CreateOrder } from "../models/create-order";

const useShoppingCart = () => {
    return useRecoilValue(cartState);
};

const getTotalValueCart = (cart: CreateOrder) => {
    return cart.items.reduce((total, item) => total + item.totalValue, 0)
}

const useAddToCart = () => {
    let cart = useShoppingCart();
    const setCart = useSetRecoilState(cartState);

    return (product: Product): boolean => {
        try {
            if (cart === undefined)
                cart = {
                    customerId: "08dc34a4-c04e-42c8-8e0e-2061918a4a11",
                    sellerId: "08dc34a4-c04e-42c8-8e0e-2061918a4a11",
                    items: [],
                    totalValue: 0
                }

            const item = cart?.items.find(x => x.productId === product.id);

            if (!item)
                setCart(addProductToCart(cart, product));
            else
                setCart(incrementQuantityToProductInsideCart(cart, product, item));

            return true;
        } catch (error) {
            return false;
        }
    }
}

const addProductToCart = (cart: CreateOrder, product: Product) => {
    cart.items = [...cart.items, {
        productId: product.id,
        quantity: 1,
        unitaryValue: product.value,
        totalValue: product.value,
        product: product
    }];
    cart.totalValue = getTotalValueCart(cart);

    return cart;
}

const incrementQuantityToProductInsideCart = (cart: CreateOrder, product: Product, item: CreateOrderItem) => {
    cart.items = [
        ...cart.items.filter(x => x.productId !== product.id),
        {
            productId: product.id,
            quantity: item.quantity + 1,
            unitaryValue: product.value,
            totalValue: (item.quantity + 1) * product.value,
            product: product
        }
    ];
    cart.totalValue = getTotalValueCart(cart);

    return cart;
}

export { useShoppingCart, useAddToCart };