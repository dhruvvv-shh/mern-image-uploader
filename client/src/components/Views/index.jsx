import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import ViewImages from "./ViewImages";

const ViewImage = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Image Uploader</h1>
				<div>
					<Link to="/" style={{ textDecoration: 'none' }} >
						Add Images
					</Link>
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</div>
			</nav>
			<div>
				<ViewImages />
			</div>
		</div>
	);
};

export default ViewImage;
