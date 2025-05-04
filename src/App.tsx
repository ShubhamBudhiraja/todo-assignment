import "./styles/main.scss";
import Layout from "./components/molecules/Layout";
import BoardHome from "./components/organisms/BoardHome";

const App = () => {
    return (
        <Layout>
            <BoardHome />
        </Layout>
    );
};

export default App;
