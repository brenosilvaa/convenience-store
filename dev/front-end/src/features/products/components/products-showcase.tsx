import { List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Box } from "@mui/material";
import { Product } from "../models/product";
import { useState, useEffect } from "react";
import { ProductService } from "../services/product-service";

const ProductsShowcase = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setProducts(await ProductService.instance.listAsync());
        }

        fetchProducts();
    }, [products]);

    return (
        <List sx={{ width: 1, bgcolor: 'background.paper' }}>
            {products.map((product: Product) => (
                <ListItemButton key={product.id} sx={{ margin: 5, border: "1px solid #ccc"}}>
                    <ListItemAvatar>
                        <Avatar alt={product.name} src={product.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={product.name}
                        secondary={
                            <>
                                <Box sx={{backgroundColor: "blue", direction: "flex", justifyContent: "space-between"}}>
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
                            </>
                        }
                        
                    />
                </ListItemButton>
            ))}
        </List>
    );

}

export default ProductsShowcase;