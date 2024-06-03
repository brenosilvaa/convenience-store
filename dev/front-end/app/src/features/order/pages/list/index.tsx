import { Grid, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSetSelectedOrder } from "../../hooks/selected-order-hook";
import { Order } from "../../models/order";
import { OrderService } from "../../services/order-service";
import { useNavigate } from "react-router-dom";

const OrderList = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const setSelectedOrder = useSetSelectedOrder();
    const navigate = useNavigate();

    const selectOrder = (order: Order) => {
        setSelectedOrder(order);
        navigate(`/pedidos/details/${order.id}`)
    }

    useEffect(() => {
        const fetchOrders = async () => {
            setOrders(await OrderService.instance.listAsync());

            setIsLoading(false);
        }

        if (!!isLoading)
            fetchOrders();

    }, [isLoading]);

    return (
        <>
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <List sx={{ width: 1, bgcolor: 'background.paper' }}>
                        {orders.map((order: Order) => (
                            <ListItemButton key={order.id} alignItems="flex-start" onClick={() => selectOrder(order)}>
                                <ListItemText
                                    primary={`PEDIDO - ${order.id}`}
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="error"
                                            >
                                                {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.totalValue * -1)}
                                            </Typography>
                                            <Typography component={"span"} sx={{
                                                textAlign: "justify",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                WebkitLineClamp: "3",
                                                WebkitBoxOrient: "vertical",
                                                lineHeight: "1.2rem"
                                            }}>
                                                {` - ${order.date}`}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </>
    );
}

export default OrderList;