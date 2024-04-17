import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Image, Button, Flex, Space, Statistic } from 'antd';

const { Countdown } = Statistic;


const AuctionCard = ({ auction, onBid, bidState }) => {
    //console.log("auction card ************"+bidState);

    //console.log(auction.id);
    //auction = { title: "auction item title", highestBid: { amount: 0 }, pictureUrl: "" };

    const amount = auction.highestBid.amount;
    //console.log("picture url************"+auction.pictureUrl);
    const pictureUrl = auction.pictureUrl ? auction.pictureUrl : 'placeholder.png';
    console.log(auction);
    const date = auction.endingAt;
    const deadline = new Date(date);
    const onFinish = () => {

    };



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
                    {/* <Col span={12}>
                        <Card title="STATUS" bordered={false}>
                            {auction.status}
                        </Card>
                    </Col> */}
                    <Col span={12}>
                        <Card title="TIME REMAINING" bordered={false} >
                            <Countdown value={deadline} onFinish={onFinish} style={{
                                //width: 450,
                                height: 22,
                            }} />
                        </Card>

                    </Col>

                </Row>

                {/* {(bidState === 'OWN_AUCTION' || bidState === 'HIGHEST_BIDDER') && (
                    <h2>
                        {bidState === 'OWN_AUCTION' ? 'This is your auction' : 'You are the highest bidder'}
                    </h2>
                )} */}

                <Flex vertical gap="small" style={{ width: '100%' }}>
                    {(bidState === 'OWN_AUCTION' || bidState === 'HIGHEST_BIDDER') && (
                        <Button
                            type="primary" block
                            disabled={true}
                            onClick={() => onBid()}
                        >
                            {bidState === 'OWN_AUCTION' ? 'This is your auction' : 'You are the highest bidder'}
                        </Button>
                    )}
                    {bidState === 'CAN_BID' && (
                        <Button type="primary" block onClick={() => onBid()}>
                        Bid Now!
                        </Button >
                    )}
                    
                </Flex>
            </Space>
        </Card>


    );
}
export default AuctionCard;