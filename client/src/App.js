import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import ViewImage from "./components/Views";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			{!user && <Route path="/views" exact element={<Navigate replace to="/login" />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/views" exact element={<ViewImage/>} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			
		</Routes>
	);
}

export default App;
