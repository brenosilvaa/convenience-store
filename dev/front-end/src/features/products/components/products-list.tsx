import { List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Product } from "../models/product";
import { ProductService } from "../services/product-service";

interface ProductsListProps {
    selectedProduct: Product | undefined;
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
}

const ProductsList = ({ selectedProduct, setSelectedProduct }: ProductsListProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    const selectProduct = (product: Product) => {
        setSelectedProduct(product);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            setProducts(await ProductService.instance.listAsync());
        }

        if (!selectedProduct)
            fetchProducts();
    }, [selectedProduct]);

    return (
        <>
            <List sx={{ width: 1, bgcolor: 'background.paper' }}>
                {products.map((product: Product) => (
                    <ListItemButton key={product.id} alignItems="flex-start" onClick={() => selectProduct(product)}>
                        <ListItemAvatar>
                            <Avatar alt={product.name} src={product.image} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={product.name}
                            secondary={
                                <>
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
                                </>
                            }
                        />
                    </ListItemButton>
                ))}
            </List>
        </>
    );
}

export default ProductsList;