/**
 * This class performs various HTTP requests
 */
export class HttpService {
    /**
     * Performs a HTTP GET request
     * @param {string} requestURL
     * @returns {Promise<any>}
     */
    public static Get(requestURL): Promise<any> {
        const request = new XMLHttpRequest();

        return new Promise((resolve, reject) => {
            request.onreadystatechange = () => {
                if (request.readyState == XMLHttpRequest.DONE) {
                    if (request.status == 200) {
                        resolve(request.responseText);
                    } else {
                        reject(request);
                    }
                }
            };

            request.open('GET', requestURL, true);
            request.send();
        });
    }
}
