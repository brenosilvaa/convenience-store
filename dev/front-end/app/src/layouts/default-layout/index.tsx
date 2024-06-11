import { Badge, Box, Button, Container, Stack, Typography, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import { IoIosCart } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import { useShoppingCart } from "../../features/order/hooks/use-shopping-cart";
import { PixKeyType } from "../../features/users/enums/pix-key-type";
import { useLoggedInUser } from "../../features/users/hooks/use-logged-in-user";
import { useSetLoggedInUser } from "../../features/users/hooks/use-logged-in-user";
import { LoggedUser } from "../../features/users/models/logged-user";
import { UserService } from "../../features/users/services/user-service";
import { User } from "../../features/users/models/user";

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
    const userLogged = useLoggedInUser();
    const setUserLogged = useSetLoggedInUser();

    const cart = useShoppingCart();
    const cartIsEmpty = !cart;

    const { enqueueSnackbar } = useSnackbar();

    const showBuildProductsSnackBar = () => {
        enqueueSnackbar('Adicione alguns itens ao seu carrinho!', { variant: 'info', autoHideDuration: 3000, });
    }

    const logout = async () => {
        localStorage.removeItem("conv_user");

        setUserLogged(null);
        enqueueSnackbar('Deslogado com sucesso', { variant: 'success', autoHideDuration: 3000, });
    }

    const turnToSeller = async () => {
        const userStorage = localStorage.getItem("conv_user");
        const user: LoggedUser | null = !!userStorage ? JSON.parse(userStorage) : null;

        if (!user)
            enqueueSnackbar("Usuário não está logado");
        else {
            const result = await UserService.instance.turnToSellerAsync(user.id, {
                type: PixKeyType.Cpf,
                key: "00000000000"
            });

            if (!!result) {
                const seller = { ...userLogged };
                seller.isSeller = true;
                setUserLogged(seller as User);
            }
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
                        {!!userLogged && !userLogged.isSeller && (
                            <Button variant="contained" color="error" onClick={() => turnToSeller()}>vender</Button>
                        )}
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
                        •
                        <Link to={"/pedidos"} style={{ textDecorationColor: "white" }}>
                            <Typography component={"span"} sx={{ color: "white" }}>
                                Pedidos
                            </Typography>
                        </Link>

                        <Link onClick={cartIsEmpty ? showBuildProductsSnackBar : () => { }} to={cartIsEmpty ? "/" : "/carrinho"} style={{ textDecorationColor: "white", marginLeft: "auto" }}>
                            <Badge showZero={true} badgeContent={cartIsEmpty ? 0 : cart.items.length} color="primary">
                                <IoIosCart size="25" color="white" />
                            </Badge>
                        </Link>
                        {!userLogged && (
                            <>
                                •
                                <Link to={"/cadastro"} style={{ textDecorationColor: "transparent" }}>
                                    <Typography component={"span"} sx={{ color: "white" }}>
                                        Cadastre-se
                                    </Typography>
                                </Link>
                                •
                                <Link to={"/login"} style={{ textDecorationColor: "transparent" }}>
                                    <Typography component={"span"} sx={{ color: "white", textDecorationColor: "white", cursor: "pointer" }}>
                                        Login
                                    </Typography>
                                </Link>
                            </>
                        )}
                        {!!userLogged && (
                            <>
                                •
                                <Typography component={"span"} sx={{ color: "white" }}>
                                    {userLogged.name}
                                </Typography>
                                -
                                <Typography onClick={logout} component={"span"} sx={{ color: "white", textDecorationColor: "white", cursor: "pointer" }}>
                                    Sair
                                </Typography>
                            </>
                        )}
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