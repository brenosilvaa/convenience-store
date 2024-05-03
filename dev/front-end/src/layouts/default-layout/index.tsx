import { Badge, Box, Button, Container, Stack, Typography, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link, Outlet } from "react-router-dom";
import { IoIosCart } from "react-icons/io";
import { useShoppingCart } from "../../features/order/hooks/use-shopping-cart";
import { UserService } from "../../features/users/services/user-service";
import { LoggedUser } from "../../features/users/models/logged-user";
import { PixKeyType } from "../../features/users/enums/pix-key-type";

const BannerPrincipal = styled("img")({
    width: "100%",
    borderRadius: "1.2rem",
    height: 240,
    objectFit: "cover"
});

const Mask = styled("div")({
    position: "absolute",
    width: "100%",
    height: "calc(100% - 4px)",
    backgroundColor: "rgba(0, 0, 0, .5)",
    borderRadius: "1.2rem",
    top: 0,
    left: 0
});


const DefaultLayout = () => {
    const cart = useShoppingCart();
    const cartIsEmpty = !cart;

    const { enqueueSnackbar } = useSnackbar();

    const showBuildProductsSnackBar = () => {
        enqueueSnackbar('Adicione alguns itens ao seu carrinho!', { variant: 'info', autoHideDuration: 3000, });
    }

    const login = async () => {
        const result = await UserService.instance.loginAsync({
            email: "leo4@teste.com",
            password: "Conv@123"
        });

        localStorage.setItem("conv_user", JSON.stringify(result));

        enqueueSnackbar('Bem-vindo!', { variant: 'success', autoHideDuration: 3000, });
    }

    const turnToSeller = async () => {
        const userStorage = localStorage.getItem("conv_user");
        const user: LoggedUser | null = !!userStorage ? JSON.parse(userStorage) : null;

        if (!user)
            enqueueSnackbar("Usuário não está logado");
        else {
            await UserService.instance.turnToSellerAsync(user.id, {
                type: PixKeyType.Cpf,
                key: "00000000000"
            });
        }
    }

    return (
        <>
            <Container component={"header"} sx={{ my: 2, p: "0 !important", position: "relative" }}>
                <BannerPrincipal src="/images/banner.jpg" alt="Banner principal" />

                <Mask />

                <Box sx={{ position: "absolute", width: "calc(100% - 48px)", p: 3, bottom: 0, left: 0, color: "white" }}>
                    <Typography component="h1" variant="h4">
                        Loja de Conveniência
                        <Button variant="contained" onClick={() => login()}>login</Button>
                        <Button variant="contained" color="error" onClick={() => turnToSeller()}>vender</Button>
                    </Typography>

                    <Stack direction={"row"} gap={1} alignItems={"center"} sx={{ width: 1 }}>
                        <Link to={"/"} style={{ textDecorationColor: "white" }}>
                            <Typography component={"span"} sx={{ color: "white" }}>
                                Home
                            </Typography>
                        </Link>
                        •
                        <Link to={"/sobre"} style={{ textDecorationColor: "white" }}>
                            <Typography component={"span"} sx={{ color: "white" }}>
                                Sobre
                            </Typography>
                        </Link>
                        •
                        <Link to={"/produtos"} style={{ textDecorationColor: "white" }}>
                            <Typography component={"span"} sx={{ color: "white" }}>
                                Produtos
                            </Typography>
                        </Link>

                        <Link onClick={cartIsEmpty ? showBuildProductsSnackBar : () => { }} to={cartIsEmpty ? "/" : "/carrinho"} style={{ textDecorationColor: "white", marginLeft: "auto" }}>
                            <Badge showZero={true} badgeContent={cartIsEmpty ? 0 : cart.items.length} color="primary">
                                <IoIosCart size="25" color="white" />
                            </Badge>
                        </Link>
                        •
                        <Link to={"/cadastro"} style={{ textDecorationColor: "white" }}>
                            <Typography component={"span"} sx={{ color: "white" }}>
                                Cadastre-se
                            </Typography>
                        </Link>
                    </Stack>
                </Box>
            </Container>

            <Container component={"main"}>
                <Outlet />
            </Container>
        </>
    );
}

export default DefaultLayout;