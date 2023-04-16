import axios from 'axios';

export async function getCsrfToken(): Promise<string> {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
        return metaTag.getAttribute('content') || '';
    }
    throw new Error('CSRF token not found');
}

export async function refreshCsrfToken(): Promise<void> {
    try {
        axios.get("/sanctum/csrf-cookie", {withCredentials: true}).then((response) => { // Extract the CSRF token from the cookie
            const csrfCookie = document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN="));
            const csrfToken = csrfCookie ? csrfCookie.split("=")[1] : '';
            console.log(`After the request ${csrfToken}`);

			const metaTag = document.querySelector('meta[name="csrf-token"]');
			if (metaTag) {
				metaTag.setAttribute('content', csrfToken);
			} else {
				const newMetaTag = document.createElement('meta');
				newMetaTag.setAttribute('name', 'csrf-token');
				newMetaTag.setAttribute('content', csrfToken);
				document.head.appendChild(newMetaTag);
			}
			console.log('CSRF token refreshed', csrfToken);
        });
    } catch (error) {
        console.error(error);
    }
    setTimeout(refreshCsrfToken, 120 * 60 * 1000); // Refresh token every 120 minutes
}
