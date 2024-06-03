import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default-layout";
import HomePage from "./features/common/pages/home";
import AboutPage from "./features/common/pages/about";
import NotFoundPage from "./features/common/pages/not-found";
import SignUpPage from "./features/users/pages/sign-up";
import ProductsPage from "./features/products/pages/products";
import { SnackbarProvider } from "notistack";
import CartPage from "./features/order/pages/cart";
import OrderList from "./features/order/pages/list";
import OrderDetails from "./features/order/pages/details";
import LoginPage from "./features/users/pages/login";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <Routes>
                    <Route path="" element={<DefaultLayout />}>
                        <Route path="" element={<HomePage />} />
                        <Route path="sobre" element={<AboutPage />} />
                        <Route path="cadastro" element={<SignUpPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="produtos" element={<ProductsPage />} />
                        <Route path="carrinho" element={<CartPage />} />
                        <Route path="pedidos" element={<OrderList />} />
                        <Route path="pedidos/details/:id" element={<OrderDetails />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </SnackbarProvider>
        </BrowserRouter>
    );
}

export default AppRouter;