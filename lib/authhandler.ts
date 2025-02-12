let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (callback: () => void) => {
    logoutCallback = callback;
};

export const triggerLogout = async () => {
    if (logoutCallback) {
        logoutCallback();
    }
};