let accessToken: string | null = null;
let refreshToken: string | null = null;

export const InitTokens = (access: string, refresh: string) => {
    accessToken = access;
    refreshToken = refresh;
};

export const setAccessToken = (access: string) => {
    accessToken = access
}

export const getAccessToken = () => accessToken;
export const getRefreshToken = () => refreshToken;

export const clearTokens = () => {
    accessToken = null;
    refreshToken = null;
};
