import styles from "./styles.module.css";
import ImageUploader from "../Images/index"
import { Link } from "react-router-dom";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Image Uploader</h1>
				<div>
					<Link to="/views" style={{ textDecoration: 'none' }} >
						View Images
					</Link>
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</div>
			</nav>
			<div>
				<ImageUploader />
			</div>
		</div>
	);
};

export default Main;
