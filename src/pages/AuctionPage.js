import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Flex, Button, FloatButton, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AuctionCard from '../components/AuctionCard';
import { useState, useEffect } from 'react';
import NewAuctionDrawerForm from '../components/NewAuctionDrawerForm';
import { PlusOutlined } from '@ant-design/icons';
import { getAllAuctions } from '../Client';
import { errorNotification } from '../components/Notification';
import { AuthStore } from '../store/AuthStore.js';
import { AuctionStore } from '../store/AuctionStore.js';
import { OverlayStore } from '../store/OverlayStore.js';
import { useAuth0 } from "@auth0/auth0-react";
import { createAuth0Client } from '@auth0/auth0-spa-js';

const auth0 = await createAuth0Client({
  domain: 'serverless-service-auction.us.auth0.com',
  clientId: 'XP5zHquR2J9cpyZaHChwQKLGwg748vdf'
});

const { Header, Content, Footer } = Layout;


const items = new Array(3).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));


const antIcon = < LoadingOutlined style={{ fontSize: 24, }} />;

const AuctionPage = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [auctions, setAuctions] = useState([]);
    const [accessToken, setAccessToken] = useState(null);
    const [idToken, setIdToken] = useState(null);
    const {  getAccessTokenSilently } = useAuth0();

    const getUserMetadata = async () => {
        const Auth0domain = process.env.REACT_APP_AUTH0_DOMAIN;
        
        try {
            
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: `https://${Auth0domain}/api/v2/`,
                    scope: "read:current_user",
                },
            });
            console.log("accessToken*********");
            console.log(accessToken);
            setAccessToken(accessToken);
        } catch (e) {
            console.log("error*********");
            console.log(e.message);
        }
    }



    const fetchAuctions = (accessToken) => getAllAuctions(accessToken )
        .then(response => response.json())
        .then(data => {
            const { auctions } = data;
            setAuctions(auctions);
        })
        .catch(err => {
            console.log(err.response);
            err.response.json().then(res => {
                console.log(res);
                errorNotification("There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`)
            })
        }).finally(() => setFetching(false));

    useEffect(() => {
        console.log("component is mounted");
        //getUserMetadata();
        const fetchIdToken = async () => {
            try {
              const claims = await auth0.getIdTokenClaims();
              const id_token = claims.__raw;
              console.log('ID Token from Access Token:', id_token);
              setIdToken(id_token);
            } catch (error) {
              console.error('Error fetching token:', error);
            }
          };
      
          fetchIdToken();
          //fetchAuctions(idToken);
        //fetchAuctions(accessToken);
    }, []);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const renderAuctions = () => {
        if (fetching) {
            return <Spin indicator={antIcon} />
        }
        //const { auctions } = auctionStore;
        if (!auctions.length) {
            return (
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <h4>No auctions available. Create one?</h4>
                </div>
            );
        }
        console.log(auctions.length);
        return auctions.map((auction) => {
            let bidState = 'CAN_BID';
            console.log("*UHYFTRDTDHRR*********");

            console.log(auction);

            // if (auction.seller === authStore.email) {
            //     bidState = 'OWN_AUCTION';
            // }

            // if (auction.highestBid.bidder === authStore.email) {
            //     bidState = 'HIGHEST_BIDDER';
            // }
            if (!auction) {
                console.log("empty*****");
                return null; // 或者返回一个适当的占位符
            }

            return (
                <div key={auction.id} >

                    <AuctionCard
                        auction={auction}
                        bidState={bidState}
                    //onBid={() => auctionStore.setBiddingOn(auction)}
                    />
                </div>
            );
        });
    };



    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>

                </Breadcrumb>

                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 580,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Flex wrap="wrap" gap="small">
                        {renderAuctions()}

                    </Flex>
                    {/* <Button
                        onClick={() => setShowDrawer(!showDrawer)}
                        type="primary" shape="round" size="small">
                        Add New Student
                    </Button> */}
                    <FloatButton
                        shape="circle"
                        type="primary"
                        style={{
                            right: 94,
                        }}
                        icon={<PlusOutlined />}
                        onClick={() => setShowDrawer(!showDrawer)}
                    />

                    <NewAuctionDrawerForm showDrawer={showDrawer}
                        setShowDrawer={setShowDrawer}
                    />

                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Monna Design ©{new Date().getFullYear()} Created by Menghua
            </Footer>
        </Layout>
    );
};

export default AuctionPage;
