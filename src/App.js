//import logo from './logo.svg';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import { inject, observer } from 'mobx-react';
import WelcomePage from './pages/WelcomePage';
import AuctionPage from './pages/AuctionPage';
import { useState } from 'react';





function App() {
  // const [accessToken, setAccessToken] = useState(null);

  // const {  getAccessTokenSilently } = useAuth0();

//   const getUserMetadata = async () => {
//     const Auth0domain = process.env.REACT_APP_AUTH0_DOMAIN;
    
//     try {
        
//         const accessToken = await getAccessTokenSilently({
//             authorizationParams: {
//                 audience: `https://${Auth0domain}/api/v2/`,
//                 scope: "read:current_user",
//             },
//         });
//         console.log("accessToken*********");
//         console.log(accessToken);
//         setAccessToken(accessToken);
//     } catch (e) {
//         console.log("error*********");
//         console.log(e.message);
//     }
// }

const { user, isAuthenticated, isLoading } = useAuth0();
console.log("isAuthenticated " + isAuthenticated);
  if (!isAuthenticated) {
    return (
      <WelcomePage />
    );
  }
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (<AuctionPage />);
 

  // return (

  //     <div>
  //       <h1>Profile</h1>
  //       <img src={user.picture} alt={user.name} />
  //       <h2>{user.name}</h2>
  //       <p>{user.email}</p>
  //     </div>
    
  // );

}

export default App;
