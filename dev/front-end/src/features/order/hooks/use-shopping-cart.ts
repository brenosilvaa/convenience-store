import { useRecoilValue } from "recoil";
import { cartState } from "../states/cart-state";

const useShoppingCart = () => {
    return useRecoilValue(cartState);
};

export { useShoppingCart };