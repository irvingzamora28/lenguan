import Config from "../../utils/config";

function useUserProfileImageUrl(profileImagePath: string | undefined): string {
    const baseURL = Config.getBaseUrl();
    const defaultImageUrl = "https://picsum.photos/300/200";

    if (profileImagePath) {
        return `${baseURL}/storage/${profileImagePath}`;
    } else {
        return defaultImageUrl;
    }
}

export default useUserProfileImageUrl;
