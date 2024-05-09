import PageTitle from "../../../../shared/components/page-title";
import withUser from "../../../../shared/hocs/withUser";
import ProductsShowcase from "../../../products/components/products-showcase";

const HomePage = ({ user }: any) => {
    return (
        <>
            <PageTitle title={"Home"} />
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <ProductsShowcase />
        </>
    )
}

export default withUser(HomePage);