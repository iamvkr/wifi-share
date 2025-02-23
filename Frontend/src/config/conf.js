export const getOrigin = () => {
    if (import.meta.env.DEV) {
        // const ipv4 = "http://192.x.x.x"; /** dev mode: paste local ipv4 using ipconfig command from cmd */
        const ipv4 = ""; /** dev mode: paste local ipv4 using ipconfig command from cmd */
        return ipv4 + ":53314";  
    }
    return window.location.origin; /** production */
}