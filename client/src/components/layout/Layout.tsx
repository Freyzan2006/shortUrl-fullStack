import Footer from "./Footer";
import Header from "./Header";

interface IProps {
    children: React.ReactNode 
}

const Layout: React.FC<IProps> = ({ children }) => {
    return (
        <div>
            <Header />
            { children }
            <Footer />
        </div>
    )
}

export default Layout;