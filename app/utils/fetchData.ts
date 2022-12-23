export default function fetchData(url: string, options: any = {}){
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
