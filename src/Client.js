import 'unfetch/polyfill';


// 定义 endpoint 的 domain
const DOMAIN = process.env.REACT_APP_AUCTIONS_ENDPOINT;
const id_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBnX3poZHFRU3JNQjJPTGdLM3hVdiJ9.eyJuaWNrbmFtZSI6Im1vbm5hNTIxIiwibmFtZSI6Im1vbm5hNTIxQG15Lnlvcmt1IiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2Y0ZTZmZjRjZDk5NDljNmMyOTMwMThjODdkODE1NTc1P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbW8ucG5nIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMTdUMTI6Mjg6NDYuOTQ1WiIsImVtYWlsIjoibW9ubmE1MjFAbXkueW9ya3UiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vc2VydmVybGVzcy1zZXJ2aWNlLWF1Y3Rpb24udXMuYXV0aDAuY29tLyIsImF1ZCI6IlhQNXpIcXVSMko5Y3B5WmFIQ2h3UUtMR3dnNzQ4dmRmIiwiaWF0IjoxNzEzMzU2OTI2LCJleHAiOjE3MTMzOTI5MjYsInN1YiI6ImF1dGgwfDY2MDFjOGNlOWJkZjljZWEzNmY3NGUyYiJ9.duW1Tc8DnRRqXDPacLbR95b2QtTl1AeZ02Of8MsRXk9ma5t4gdJpH9hZZWi2tSafV_-LJaDBGimG4GnFSCyVRkW2RNmGD8uH0DfbVj_g7X8KlUY4KjSusjfcKpFFAtBKzcWhA4aQgHsafy0kq4Etbf5AR5PyMau-ilD3h0nJQDELXesbd-XOWq6rlbqshGIBAllXLFyyTScvN6nEPnFTuKJaEFLDg0MeZdTxqWRcKKZXFnQe_ewB21sRt9txz4Wolg0_UIQZMYi-YfmXUpozl_ztz98nY-ORf8seqo4fL3MpMnkhyiCOf7dbJcd_xrVQJpo-jeXc7Zf_HEOo8lqPTA";

const checkStatus = response => {
  // 打印整个响应对象
  console.log('Response:', response);

  // 检查响应的状态码
  console.log('Status:', response.status);

  if (response.ok) {
    return response;
  }
  // convert non-2xx HTTP responses into errors:
  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
}

export const getAllAuctions = () =>
  fetch(`${DOMAIN}/auctions?status=OPEN`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${id_token}`,
    }
  })
    .then(checkStatus);

export const updateBidAmount = (auction) => {
  const updatedAmount = auction.highestBid.amount + 10;
  const requestBody = JSON.stringify({ amount: updatedAmount });
  console.log("requestBody*********" + requestBody);
  console.log("auction.id*********" + auction.id);


  return fetch(`${DOMAIN}/auction/${auction.id}/bid`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${id_token}`,
    },
    body: requestBody,

  }).then(checkStatus);

};



export const createAuction = async (newAuction, picture) => {
  let auctionId;
  const requestBody = JSON.stringify({ title: newAuction.title });

  const createAuctionResponse = await fetch(`${DOMAIN}/auction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${id_token}`,
    },
    body: requestBody,

  }).then(checkStatus)
    .then(response => response.json())
    .then(data => {
      const { auction } = data;
      auctionId = auction.id;
      console.log("new auction item created");

      console.log(auction);
    })

  if (auctionId === undefined) { throw new Error("Auction ID is undefined"); }

  //console.log("Auction ID:", auctionId);
  //console.log("Picture:", picture);

  // Upload the picture
  return fetch(`${DOMAIN}/auction/${auctionId}/picture`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'text/plain', // Set Content-Type to text/plain
      'Authorization': `Bearer ${id_token}`,
    },
    body: picture, // Send base64 picture directly as request body
  }).then(checkStatus);
};

// export const addNewAuction = (auction) => {
//   const requestBody = JSON.stringify({ title: auction.title });
//   // console.log("requestBody*********" + requestBody);
//   // console.log("auction.id*********" + auction.id);

//   try {
//     return fetch(`${DOMAIN}/auction`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${id_token}`,
//       },
//       body: requestBody,

//     }).then(checkStatus);
//   }
//   catch (error) {
//     alert('Could not create new auction item! Check console for more details.');
//     console.error(error);
//   }
// };

// export const uploadPicture = (auctionId, picture) => {
//   //const requestBody = JSON.stringify({ title: auctionTitle });
//   //console.log("auction.id*********" + auction.id);

//   try {
//     return fetch(`${DOMAIN}/auction/${auctionId}/picture`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'text/plain', // 设置Content-Type为text/plain
//         'Authorization': `Bearer ${id_token}`,
//       },
//       body: picture, // 将base64图片作为请求体直接发送
//     }).then(checkStatus);
//   } catch (error) {
//     alert('Could not create new auction item! Check console for more details.');
//     console.error(error);
//   }
// };



