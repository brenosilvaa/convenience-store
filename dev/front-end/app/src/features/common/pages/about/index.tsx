import { useEffect } from "react";
import PageTitle from "../../../../shared/components/page-title";
import withUser from "../../../../shared/hocs/withUser";

const AboutPage = (props: any) => {
    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <>
            <PageTitle title={"Sobre"} />
            <p>{props.user?.email}</p>
        </>
    )
}

export default withUser(AboutPage);