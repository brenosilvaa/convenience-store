import { List, ListItemAvatar, Avatar, ListItemText, Typography, Box, ListItem, Button } from "@mui/material";
import { Product } from "../models/product";
import { useState, useEffect } from "react";
import { ProductService } from "../services/product-service";
import { IoMdCart } from "react-icons/io";
import { useSnackbar } from "notistack";
import { useAddToCart, useShoppingCart } from "../../order/hooks/use-shopping-cart";

const ProductsShowcase = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);

    const cart = useShoppingCart();
    const addToCart = useAddToCart();
    const { enqueueSnackbar } = useSnackbar();

    const addProductToCart = (product: Product) => {
        const isSuccess = addToCart(product);

        if (isSuccess)
            enqueueSnackbar(`${product?.name} adicionado ao carrinho`, { variant: 'info', autoHideDuration: 3000 });
        else
            enqueueSnackbar(`Não foi possível adicionar o produto ${product?.name} ao carrinho`, { variant: 'error', autoHideDuration: 3000 });
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

                                <Button type="button" variant="contained" onClick={() => addProductToCart(product)} sx={{ gap: 1, mt: 1 }}>
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