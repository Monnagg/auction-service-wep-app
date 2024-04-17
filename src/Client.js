import 'unfetch/polyfill';


// 定义 endpoint 的 domain
const DOMAIN = process.env.REACT_APP_AUCTIONS_ENDPOINT;
const id_token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBnX3poZHFRU3JNQjJPTGdLM3hVdiJ9.eyJuaWNrbmFtZSI6Im1vbm5hNTIxIiwibmFtZSI6Ik1lbmdodWEgSmlhbmciLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvZjRlNmZmNGNkOTk0OWM2YzI5MzAxOGM4N2Q4MTU1NzU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZtby5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyNC0wNC0xN1QxNzowNDoxNi4wODZaIiwiZW1haWwiOiJqaWFuZ21lbmdodWExOTkyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9zZXJ2ZXJsZXNzLXNlcnZpY2UtYXVjdGlvbi51cy5hdXRoMC5jb20vIiwiYXVkIjoiWFA1ekhxdVIySjljcHlaYUhDaHdRS0xHd2c3NDh2ZGYiLCJpYXQiOjE3MTMzNzM0NTYsImV4cCI6MTcxMzQwOTQ1Niwic3ViIjoiYXV0aDB8NjYwMWM4Y2U5YmRmOWNlYTM2Zjc0ZTJiIn0.Kd05WkFMBPmpmVZ4--nt_mZoDZ7e8Wuqp2bMR6G1KXk1Sj1g4oOSYCkimdsk9YI-0i5M7xeq4itnpZ3wMFGoXLCqZkvLnwNmXFwlwryDKn7XR0yUJTsBY459b_pAfaa2y25Xz7phA-ix4QwIq365-leTKeGSi1h1pMfZEmDMkQA45HTZLEUDi2n_FhH8D9aFZ7w3mzW2Vemlv0-aKaCr_QwPmLxcNUhDBLLsXS7ol2HeSZUoXGZrR0b6-uczG7ksl_3Csv7QaxFjklPbDY_ugWYc3Cji8MBfSqY_ZZv5rjABtuDywXwMhbjxpOBJ-YnD11Vkn6dlcApfK41EVtsLZQ";

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



