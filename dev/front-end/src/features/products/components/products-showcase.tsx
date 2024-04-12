import { List, ListItemAvatar, Avatar, ListItemText, Typography, Box, ListItem, Button } from "@mui/material";
import { Product } from "../models/product";
import { useState, useEffect } from "react";
import { ProductService } from "../services/product-service";
import { IoMdCart } from "react-icons/io";
import { CreateOrderItem } from "../../order/models/create-order-item";
import { useSetRecoilState } from "recoil";
import { cartState } from "../../order/states/cart-state";
import { useSnackbar } from "notistack";
import React from "react";
import { useShoppingCart } from "../../order/hooks/use-shopping-cart";

const ProductsShowcase = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);

    const cart = useShoppingCart();
    const setCart = useSetRecoilState(cartState);

    const { enqueueSnackbar } = useSnackbar();

    const addToCart = (product: Product) => {
        const item = cart.find(x => x.productId === product.id);

        if (!item)
            setCart(addProductToCart(product));
        else
            setCart(incrementQuantityToProductInsideCart(product, item));

        enqueueSnackbar(`${product?.name} adicionado ao carrinho`, { variant: 'info', autoHideDuration: 3000 });
    }

    const addProductToCart = (product: Product) => {
        return [...cart, {
            productId: product.id,
            quantity: 1,
            unitaryValue: product.value,
            totalValue: product.value,
            product: product
        }];
    }

    const incrementQuantityToProductInsideCart = (product: Product, item: CreateOrderItem) => {
        return [
            ...cart.filter(x => x.productId !== product.id),
            {
                productId: product.id,
                quantity: item.quantity + 1,
                unitaryValue: product.value,
                totalValue: (item.quantity + 1) * product.value,
                product: product
            }
        ];
    }


    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(false);
            setProducts(await ProductService.instance.listAsync());
        }

        if (isLoading)
            fetchProducts();
    }, [products, cart]);

    return (
        <List sx={{ width: 1, bgcolor: 'background.paper' }}>
            {products.map((product: Product) => (
                <ListItem key={product.id} sx={{ marginBottom: 5, border: "1px solid #ccc" }}>
                    <ListItemAvatar>
                        <Avatar alt={product.name} src={product.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={product.name}
                        secondary={
                            <Box>
                                <Box sx={{ direction: "flex", justifyContent: "space-between" }}>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.value)}
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
                                        {` - ${product.description}`}
                                    </Typography>
                                </Box>

                                <Button type="button" variant="contained" onClick={() => addToCart(product)} sx={{ gap: 1, mt: 1 }}>
                                    <IoMdCart />Add ao carrinho
                                </Button>


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

export default ProductsShowcase;