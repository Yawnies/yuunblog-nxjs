import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Yuun's Bloggie</title>
            </Head>
            <div className="wrapper">
                <Header />
                { children }
                <Footer />
            </div>
        </>
    );
}
 
export default Layout;