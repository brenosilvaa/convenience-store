import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Typography, Button, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { CreateOrderItem } from "../../models/create-order-item";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { useSnackbar } from "notistack";
import PageTitle from "../../../../shared/components/page-title";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { OrderService } from "../../services/order-service";
import { useState } from "react";
import React from "react";
import { useDecreaseQuantity, useIncreaseQuantity, useRemoveFromCart, useResetCart, useShoppingCart } from "../../hooks/use-shopping-cart";

const CartPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const cart = useShoppingCart();
    const removeFromCart = useRemoveFromCart();
    const increaseQuantity = useIncreaseQuantity();
    const decreaseQuantity = useDecreaseQuantity();
    const resetCart = useResetCart();

    const { enqueueSnackbar } = useSnackbar();

    const [dialogOpened, setDialogOpened] = useState<{ text: string; } | null>(null);

    const openDialog = () => {
        setDialogOpened({ text: "" });
    };

    const closeDialog = async (confirm: boolean | undefined) => {
        if (confirm === true) confirmOrder();

        setDialogOpened(null);
    };

    const removeOrderItemFromCart = (index: number) => {
        const item = removeFromCart(index);
        enqueueSnackbar(`${item.product?.name} removido com sucesso`, { variant: 'success', autoHideDuration: 3000 });
    }

    const confirmOrder = async () => {
        setIsLoading(true);

        const orderCreated = await OrderService.instance.createAsync(cart!);

        setIsLoading(false);

        if (orderCreated) {
            resetCart();
            enqueueSnackbar(`Pedido realizado com sucesso.`, { variant: 'success', autoHideDuration: 3000 });
        }
        else
            enqueueSnackbar(`Não foi possível realizar o pedido.`, { variant: 'error', autoHideDuration: 3000 });
    }

    return (
        <>
            <Box sx={{ display: "flex", gap: 3, justifyContent: "space-between", alignItems: "center" }}>
                <PageTitle title={"Carrinho de compras"} />

                {!!cart && (
                    <Button disabled={isLoading} type="button" variant="contained" onClick={openDialog} sx={{ gap: 1 }}>
                        <IoMdCheckmarkCircle />Finalizar Compra
                    </Button>
                )}

                {/*  */}
                <Dialog
                    open={!!dialogOpened}
                    onClose={() => closeDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Finalizar
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deseja realmente finalizar seu pedido?
                            <strong>{dialogOpened?.text}</strong>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => closeDialog(true)} autoFocus sx={{ mr: 1 }}>
                            SIM
                        </Button>
                        <Button onClick={() => closeDialog(false)} color="error">
                            NÃO
                        </Button>
                    </DialogActions>
                </Dialog>
                {/*  */}

                {/* {!!cart.length && (
                    <Button disabled={isLoading} type="button" variant="contained" onClick={confirmOrder} sx={{ gap: 1 }}>
                        <IoMdCheckmarkCircle />Finalizar Compra
                    </Button>
                )} */}
            </Box>


            {!cart && (
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

            {!!cart && (
                <Grid container>
                    <Grid item padding={2} xs={6} md={6} lg={6}>
                        <List sx={{ width: 1, bgcolor: 'background.paper' }}>
                            {cart.items.map((item: CreateOrderItem, index: number) => (
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
                            <CardHeader
                                title={
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography variant="h5">Resumo</Typography>
                                    </Box>
                                }
                                subheader={<Divider sx={{ marginTop: 1 }} />}
                                sx={{ backgroundColor: "background.paper" }}
                            />

                            <CardContent>
                                <Box sx={{ overflowY: "auto", overflowX: "hidden", maxHeight: 250, height: 250, marginTop: "-10px" }}>
                                    {cart.items.map((item: CreateOrderItem) => (
                                        <React.Fragment key={item.productId}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="caption">{item.quantity}x {item.product?.name}</Typography>
                                                <Typography variant="caption">
                                                    + {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.totalValue)}
                                                </Typography>
                                            </Box>
                                            <Divider />
                                        </React.Fragment>
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
                                        {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cart.totalValue)}
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
