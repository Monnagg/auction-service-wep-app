import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Image, Button, Flex, Space } from 'antd';

const { Meta } = Card;
const url = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';
const name = "auction item name";
//const amount = 100;
const status = "OPEN";


const AuctionCard = ({ auction, onBid, bidState }) => {
    //console.log("auction card ************"+bidState);

    //console.log(auction.id);
    //auction = { title: "auction item title", highestBid: { amount: 0 }, pictureUrl: "" };

    const amount = auction.highestBid.amount;
    //console.log("picture url************"+auction.pictureUrl);
    const pictureUrl = auction.pictureUrl ? auction.pictureUrl : 'placeholder.png';


    return (
        <Card
            title={auction.title}
            style={{
                width: 450,
                //height: 420,
            }}
            cover={
                <img
                    alt="Auction item image"
                    src={pictureUrl}
                    style={{ width: '450px', height: '300px' }}
                />
            }

        >
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title={`HIGHEST BID`} bordered={false}>
                            {amount === 0 ? 'No bids' : `$${amount}`}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="STATUS" bordered={false}>
                            {auction.status}
                        </Card>
                    </Col>

                </Row>

                {(bidState === 'OWN_AUCTION' || bidState === 'HIGHEST_BIDDER') && (
                    <h2>
                        {bidState === 'OWN_AUCTION' ? 'This is your auction' : 'You are the highest bidder'}
                    </h2>
                )}

                <Flex vertical gap="small" style={{ width: '100%' }}>
                    <Button type="primary" block onClick={() => onBid()}>
                        Bid Now!
                    </Button >
                </Flex>
            </Space>
        </Card>


    );
}
export default AuctionCard;