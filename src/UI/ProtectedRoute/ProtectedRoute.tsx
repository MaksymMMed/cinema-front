import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
	const token = Cookies.get('token');

	// if (!userInfo && userToken) {
	// 	return <div>Loading...</div>;
	// }

	if (token) {
		return <Outlet />;
	}
	return <Navigate to={'/signin'} />;
};
export default ProtectedRoute;
