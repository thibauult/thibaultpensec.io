import { Helmet } from "react-helmet";
import { FC } from "react";

interface LayoutProps {
    title: string;
    description?: string;
}

const Layout: FC<LayoutProps> = ({title, description, children}) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={description}/>
            </Helmet>
            {children}
        </div>
    )
}

export default Layout