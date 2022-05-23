import Counter from "./Counter/Counter"
import { useSelector } from 'react-redux'

function App() {
    const login = useSelector((state) => state.loginState)
    return (
        <Counter userLoginState={login} />
    );
}

export default App;
