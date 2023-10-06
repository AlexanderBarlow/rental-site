import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        const token = this.getToken();
        if (!token) {
            // Handle the case where there is no token available
            return null;
        }

        try {
            return decode(token);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    loggedIn() {
        const token = this.getToken();

        return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);

            if (decoded.exp < Date.now() / 1000) {
                // Token has expired
                this.logout();
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error decoding token:', error);
            this.logout(); // Handle the error by logging the user out
            return true;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        console.log('Token Stored',idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        console.log('Token Removed');
        window.location.reload();
    }

    getUserId() {
        const token = this.getToken();
        if (!token) {
            // Handle the case where there is no token available
            return null;
        }

        try {
            const decoded = decode(token);
            return decoded // Assuming 'sub' field contains the user's ID
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
}

export default new AuthService();
