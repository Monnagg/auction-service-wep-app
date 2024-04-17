import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Flex, Button, FloatButton, Spin, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AuctionCard from '../components/AuctionCard';
import { useState, useEffect } from 'react';
import NewAuctionDrawerForm from '../components/NewAuctionDrawerForm';
import { PlusOutlined } from '@ant-design/icons';
import { getAllAuctions, updateBidAmount, addNewAuction } from '../Client';
import { errorNotification, successNotification } from '../components/Notification';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/LogoutButton';


const { Header, Content, Footer } = Layout;




const antIcon = < LoadingOutlined style={{ fontSize: 24, }} />;

const AuctionPage = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [auctions, setAuctions] = useState([]);
    const { user } = useAuth0();
    //console.log("user*********"+user.email);

    const fetchAuctions = () => getAllAuctions()
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

    const bidAuction = (auction) => {
        // 调用 updateBidAmount 函数更新拍卖品的出价金额，返回一个 Promise
        updateBidAmount(auction)
            .then(() => {
                successNotification("Bid Success", `${auction.title} was bid on successfully!`);
                fetchAuctions();
            })
            .catch(err => {
                console.log("bid error");
                console.log(err);
                errorNotification("There was an issue", "Please try again!");
            });
    };

    useEffect(() => {
        console.log("component is mounted");
        console.log("fetching*********");
        fetchAuctions();
    }, []);

    const renderAuctions = () => {
        if (fetching) {
            return  <Spin size="large" />
        }
        if (!auctions.length) {
            return (
              <div style={{ textAlign: 'center', width: '100%' }}>
                <h4>No auctions available. Create one?</h4>
              </div>
            );
          }
        // console.log(auctions.length);
        // console.log("user info");
        //     console.log(user);

        return auctions.map((auction) => {
            let bidState = 'CAN_BID';
            if (auction.seller === user.email) {
                bidState = 'OWN_AUCTION';
            }
     
            if (auction.highestBid.bidder === user.email) {
                bidState = 'HIGHEST_BIDDER';
            }
            //console.log("auction.seller*********"+auction.seller+" user.email*********"+user.email);

            //console.log("bidState*********"+bidState);
            if (!auction) {
                console.log("empty*****");
                return null; // 或者返回一个适当的占位符
            }

            return (
                <div key={auction.id} >

                    <AuctionCard
                        auction={auction}
                        bidState={bidState}
                        onBid={() => bidAuction(auction)}
                    />
                </div>
            );
        });
    };


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <LogoutButton />

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
                    <Flex wrap="wrap" gap="large">

                        {renderAuctions()}
                    
              
                    </Flex>
            
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
                        fetchAuctions={fetchAuctions}
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
