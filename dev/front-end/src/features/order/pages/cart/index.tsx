import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Typography, Button, Divider, Grid, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartState } from "../../states/cart-state";
import { CreateOrderItem } from "../../models/create-order-item";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { useSnackbar } from "notistack";
import PageTitle from "../../../../shared/components/page-title";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { OrderService } from "../../services/order-service";
import { CreateOrder } from "../../models/create-order";
import { useState } from "react";
import { useShoppingCart } from "../../hooks/use-shopping-cart";

const CartPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const cart = useShoppingCart();
    const setCart = useSetRecoilState(cartState);
    const { enqueueSnackbar } = useSnackbar();

    const removeOrderItemFromCart = (index: number) => {
        let cartList: CreateOrderItem[] = [...cart];

        const item = cartList[index];

        cartList.splice(index, 1);

        setCart(cartList);

        enqueueSnackbar(`${item.product?.name} removido com sucesso`, { variant: 'success', autoHideDuration: 3000 });
    }

    const getTotalValueCart = () => {
        return cart.reduce((total, item) => total + item.totalValue, 0)
    }

    const increaseQuantity = (index: number) => {
        const cartList: CreateOrderItem[] = JSON.parse(JSON.stringify(cart));

        cartList[index].quantity++;
        cartList[index].totalValue = cartList[index].unitaryValue * cartList[index].quantity;
        setCart(cartList);
    }

    const decreaseQuantity = (index: number) => {
        const cartList: CreateOrderItem[] = JSON.parse(JSON.stringify(cart));

        if (cartList[index].quantity > 1) {
            cartList[index].quantity -= 1;
            cartList[index].totalValue = cartList[index].unitaryValue * cartList[index].quantity;
            setCart(cartList);
        }
    }

    const confirmOrder = async () => {
        setIsLoading(true);

        const order: CreateOrder = {
            customerId: "08dc452b-ebc9-4410-8eba-1600de6d7668",
            sellerId: "08dc452b-ebc9-4410-8eba-1600de6d7668",
            items: cart,
            totalValue: cart.reduce((total, item) => total += item.totalValue, 0)
        };

        const orderCreated = await OrderService.instance.createAsync(order);

        setIsLoading(false);

        if (orderCreated) {
            setCart([]);
            enqueueSnackbar(`Pedido realizado com sucesso.`, { variant: 'success', autoHideDuration: 3000 });
        }
        else
            enqueueSnackbar(`Não foi possível realizar o pedido.`, { variant: 'error', autoHideDuration: 3000 });
    }

    return (
        <>
            <Box sx={{ display: "flex", gap: 3, justifyContent: "space-between", alignItems: "center" }}>
                <PageTitle title={"Carrinho de compras"} />

                {!!cart.length && (
                    <Button disabled={isLoading} type="button" variant="contained" onClick={confirmOrder} sx={{ gap: 1 }}>
                        <IoMdCheckmarkCircle />Finalizar Compra
                    </Button>
                )}
            </Box>


            {!cart.length && (
                <Box sx={{ py: 10, textAlign: "center" }}>
                    <Typography>
                        :( Seu carrinho ainda está vazio.
                    </Typography>

                    <Link to={"/"}>
                        <Typography component={"span"}>
                            Comprar produtos
                        </Typography>
                    </Link>
                </Box>
            )}

            {!!cart.length && (
                <Grid container>
                    <Grid item padding={2} xs={6} md={6} lg={6}>
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
                                                    <Box sx={{ marginTop: 1 }}>
                                                        <Typography component="span" variant="caption" gap={2}>
                                                            <Button onClick={() => decreaseQuantity(index)}><IoMdRemove /></Button>
                                                            {item.quantity}
                                                            <Button onClick={() => increaseQuantity(index)}><IoMdAdd /></Button>
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ marginTop: "-8px" }}>
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
                    </Grid>

                    {/* Resumo pedido */}
                    <Grid item padding={2} xs={6} md={6} lg={6}>
                        <Card sx={{ height: 400, maxHeight: 400, position: "fixed", width: 530, border: 1, bgcolor: 'background.paper', borderColor: "grey.500" }}>
                            <CardHeader title={"Pedido"} subheader={<Divider />} sx={{ backgroundColor: "background.paper" }} />

                            <CardContent>
                                <Box sx={{ overflowY: "auto", overflowX: "hidden", maxHeight: 250, height: 250, marginTop: "-10px" }}>
                                    {cart.map((item: CreateOrderItem) => (
                                        <>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="caption">{item.quantity}x {item.product?.name}</Typography>
                                                <Typography variant="caption">
                                                    + {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.totalValue)}
                                                </Typography>
                                            </Box>
                                            <Divider />
                                        </>
                                    ))}
                                </Box>
                            </CardContent>

                            <CardActions>
                                <Box sx={{ display: "flex", justifyContent: "space-between", paddingLeft: 1, width: "100%", alignItems: "center" }}>
                                    <Typography variant="h5">Total</Typography>
                                    <Typography
                                        component="span"
                                        variant="body1"
                                        color="green"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(getTotalValueCart())}
                                    </Typography>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default CartPage;
