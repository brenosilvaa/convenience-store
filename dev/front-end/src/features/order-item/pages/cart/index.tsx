import React from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Typography, Button, Divider } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartState } from "../../states/cart-state";
import { CreateOrderItem } from "../../models/create-order-item";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { enqueueSnackbar, useSnackbar } from "notistack";

const CartPage = () => {
    const cart = useRecoilValue(cartState);
    const setCart = useSetRecoilState(cartState);
    const { enqueueSnackbar } = useSnackbar();

    const removeOrderItemFromCart = (index: number) => {
        let cartList: CreateOrderItem[] = [...cart];

        const item = cartList[index];

        cartList.splice(index, 1);

        setCart(cartList);

        enqueueSnackbar(`${item.product?.name} removido com sucesso`, { variant: 'success', autoHideDuration: 3000 });
    }

    const increaseQuantity = (index: number) => {
        let cartList: CreateOrderItem[] = [...cart];
        cartList[index].quantity += 1;
        setCart(cartList);
    }

    const decreaseQuantity = (index: number) => {
        let cartList: CreateOrderItem[] = [...cart];
        if (cartList[index].quantity > 1) {
            cartList[index].quantity -= 1;
            setCart(cartList);
        }
    }

    return (
        <List sx={{ width: 1, bgcolor: 'background.paper' }}>
            {cart.map((item: CreateOrderItem, index: number) => (
                <ListItem key={item.productId} sx={{ marginBottom: 5, border: "1px solid #ccc" }}>
                    <ListItemAvatar>
                        <Avatar alt={item.product?.name} src={item.product?.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <>
                                {item.product?.name}
                                <Box sx={{
                                    marginTop: "-5px",
                                    cursor: "pointer"
                                }}>
                                    <Typography onClick={() => removeOrderItemFromCart(index)} component={"span"} variant="caption" color={"red"}>
                                        <IoMdRemove style={{ marginRight: 2 }} />Remover
                                    </Typography>
                                </Box>
                                <Divider sx={{ marginBottom: "-2px" }} />
                            </>
                        }
                        secondary={
                            <Box>
                                <Box sx={{ direction: "flex", justifyContent: "space-between" }}>
                                    <Typography component={"span"} variant="caption" sx={{
                                        textAlign: "justify",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "3",
                                        WebkitBoxOrient: "vertical",
                                        lineHeight: "1.2rem"
                                    }}>
                                        {` - ${item.product?.description}`}
                                    </Typography>
                                    <Box sx={{marginTop: 1}}>
                                        <Typography component="span" variant="caption">
                                            Quantidade - {item.quantity}
                                            <Button onClick={() => increaseQuantity(index)}><IoMdAdd /></Button>
                                            <Button onClick={() => decreaseQuantity(index)}><IoMdRemove /></Button>
                                        </Typography>
                                    </Box>
                                    <Box sx={{marginTop: "-8px"}}>
                                        <Typography component="span" variant="caption">
                                            Valor unitário: {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.unitaryValue ?? 0)}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        component="span"
                                        variant="body1"
                                        color="green"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format((item.product?.value ?? 0) * item.quantity)}
                                    </Typography>
                                </Box>
                            </Box>
                        }
                        secondaryTypographyProps={{ component: "div" }}
                    />
                </ListItem>
            ))
            }
        </List>
    );
}

export default CartPage;
