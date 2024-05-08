import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedOrderState } from "../states/selected-order-state";
import { Order } from "../models/order";

const useSelectedOrder = () => {
    return useRecoilValue(selectedOrderState);
};

const useSetSelectedOrder = () => {
    const setValue = useSetRecoilState(selectedOrderState);

    return (order: Order) => {
        setValue(order);
    }
}

export { useSelectedOrder, useSetSelectedOrder };
