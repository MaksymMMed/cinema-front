import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
	const token = Cookies.get('token');

	if (token) {
		return <Outlet />;
	}
	return <Navigate to={'/signin'} />;
};
export default ProtectedRoute;
