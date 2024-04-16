import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useSelectedOrder } from "../../hooks/selected-order-hook";
import { useEffect } from "react";
import { OrderItem } from "../../models/order-item";

const OrderDetails = () => {
    const selectedOrder = useSelectedOrder();

    return (
        <>
            <Box sx={{ backgroundColor: "background.paper", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Typography variant="h5">PEDIDO - {selectedOrder?.id}</Typography>
                    <Typography variant="caption">Total {selectedOrder?.items.length} itens</Typography>
                </Box>
                <Typography
                    variant="h5"
                >
                    {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(selectedOrder?.totalValue)}
                </Typography>
            </Box>
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <List sx={{ width: 1, bgcolor: 'background.paper', height: "40dvh" }}>
                        {selectedOrder?.items.map((orderItem: OrderItem) => (
                            <ListItem key={orderItem.id} sx={{ marginBottom: 1, border: "1px solid #ccc" }}>
                                <ListItemAvatar>
                                    <Avatar alt={orderItem.product?.name} src={orderItem.product?.image} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <>
                                            {orderItem.quantity}x {orderItem.product?.name}
                                            <Divider sx={{ marginBottom: "-2px" }} />
                                        </>
                                    }
                                    secondary={
                                        <Box>
                                            <Box sx={{ direction: "flex", justifyContent: "space-between" }}>
                                                <Box sx={{marginTop: 2}}>
                                                    <Typography variant="caption">
                                                        Vendedor: {selectedOrder?.seller?.name}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    <Box>
                                                        <Typography component="span">
                                                            Unidade: {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(orderItem.product?.value ?? 0)}
                                                        </Typography>
                                                    </Box>
                                                    <Typography
                                                        component="span"
                                                        variant="body1"
                                                        color="green"
                                                        sx={{ fontWeight: "bold" }}
                                                    >
                                                        {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format((orderItem.product?.value ?? 0) * orderItem.quantity)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    }
                                    secondaryTypographyProps={{ component: "div" }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </>
    )
}

export default OrderDetails;