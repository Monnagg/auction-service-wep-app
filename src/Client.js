import 'unfetch/polyfill';


// 定义 endpoint 的 domain
const DOMAIN = process.env.REACT_APP_AUCTIONS_ENDPOINT;


const checkStatus = response =>{
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllAuctions = (accessToken) =>
    fetch(`${DOMAIN}/auctions?status=OPEN`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
    .then(checkStatus);

export const addNewAuction = auction =>{};
    // fetch("api/v1/auctions",{
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     method:'POST',
    //     body: JSON.stringify(auction)
    // }).then(checkStatus);