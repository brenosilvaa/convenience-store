import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { cartState } from "../../states/cart-state";
import { CreateOrderItem } from "../../models/create-order-item";

const CartPage = () => {
    const cart = useRecoilValue(cartState);

    return (
        <List sx={{ width: 1, bgcolor: 'background.paper' }}>
            {cart.map((item: CreateOrderItem) => (
                <ListItem key={item.productId} sx={{ marginBottom: 5, border: "1px solid #ccc" }}>
                    <ListItemAvatar>
                        <Avatar alt={item.product?.name} src={item.product?.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.product?.name}
                        secondary={
                            <Box>
                                <Box sx={{ direction: "flex", justifyContent: "space-between" }}>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.product?.value ?? 0)}
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
                                        {` - ${item.product?.description}`}
                                    </Typography>
                                    <Typography>
                                        {item.quantity} * {item.unitaryValue} = {item.totalValue}
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