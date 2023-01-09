/**
 * @param url : string
 * @param options : Object
 * @returns : Promise
 * ### Docs:
 * - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
 * - [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
 * ##
 */
export default function fetchApi(url: string, options: any = {}){
  return new Promise((resolve: any, reject: any) => {
    const ops = { responseType: 'json', ...options };
    const { responseType, ...restOptions } = ops;

    return fetch(url, restOptions)
      .then((response: any) => {
        if (!response) { // !response.ok
          reject('Network response was not OK');
        }
        return response[responseType](); // json | text | blob | arraybuffer | formData
      })
      .then(resolve)
      .catch(reject);
  });
}
