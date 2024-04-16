import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { cartState } from "../states/cart-state";
import { CreateOrderItem } from "../models/create-order-item";
import { Product } from "../../products/models/product";
import { CreateOrder } from "../models/create-order";

const useShoppingCart = () => {
    return useRecoilValue(cartState);
};

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

const useRemoveFromCart = () => {
    const cart = useShoppingCart();
    const setCart = useSetRecoilState(cartState);

    return (index: number): CreateOrderItem => {
        const unlinkedCart: CreateOrder = getCartUnlinked(cart!);

        let cartList: CreateOrderItem[] = [...cart!.items];

        const item = cartList[index];

        cartList.splice(index, 1);
        unlinkedCart!.items = cartList;

        setCart(unlinkedCart);

        return item;
    }
}

const useResetCart = () => {
    const resetCart = useResetRecoilState(cartState);

    return () => {
        resetCart();
    }
}

const useIncreaseQuantity = () => {
    const cart = useShoppingCart();
    const setCart = useSetRecoilState(cartState);

    return (index: number) => {
        const unlinkedCart: CreateOrder = getCartUnlinked(cart!);

        unlinkedCart.items[index].quantity++;
        unlinkedCart.items[index].totalValue = unlinkedCart.items[index].unitaryValue * unlinkedCart.items[index].quantity;

        unlinkedCart!.items = unlinkedCart.items;
        setCart(unlinkedCart);
    }
}

const useDecreaseQuantity = () => {
    const cart = useShoppingCart();
    const setCart = useSetRecoilState(cartState);

    return (index: number) => {
        const unlinkedCart: CreateOrder = getCartUnlinked(cart!);

        if (unlinkedCart.items[index].quantity > 1) {
            unlinkedCart.items[index].quantity -= 1;
            unlinkedCart.items[index].totalValue = unlinkedCart.items[index].unitaryValue * unlinkedCart.items[index].quantity;

            unlinkedCart!.items = unlinkedCart.items;
            setCart(unlinkedCart);
        }
    }
}

const getTotalValueCart = (cart: CreateOrder) => {
    return cart.items.reduce((total, item) => total + item.totalValue, 0)
}

const addProductToCart = (cart: CreateOrder, product: Product) => {
    const unlinkedCart: CreateOrder = getCartUnlinked(cart);

    unlinkedCart.items = [...unlinkedCart.items, {
        productId: product.id,
        quantity: 1,
        unitaryValue: product.value,
        totalValue: product.value,
        product: product
    }];
    unlinkedCart.totalValue = getTotalValueCart(unlinkedCart);

    return unlinkedCart;
}

const incrementQuantityToProductInsideCart = (cart: CreateOrder, product: Product, item: CreateOrderItem) => {
    const unlinkedCart: CreateOrder = getCartUnlinked(cart);

    unlinkedCart.items = [
        ...unlinkedCart.items.filter(x => x.productId !== product.id),
        {
            productId: product.id,
            quantity: item.quantity + 1,
            unitaryValue: product.value,
            totalValue: (item.quantity + 1) * product.value,
            product: product
        }
    ];
    unlinkedCart.totalValue = getTotalValueCart(unlinkedCart);

    return unlinkedCart;
}

const getCartUnlinked = (cart: CreateOrder) => JSON.parse(JSON.stringify(cart));

export { useShoppingCart, useAddToCart, useRemoveFromCart, useIncreaseQuantity, useDecreaseQuantity, useResetCart };