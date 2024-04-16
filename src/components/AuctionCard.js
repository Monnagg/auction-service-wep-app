import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Image, Button, Flex, Space } from 'antd';

const { Meta } = Card;
const url = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';
const name = "auction item name";
//const amount = 100;
const status = "OPEN";

//auction
const AuctionCard = ({ auction,onBid, bidState }) => {
    console.log("auction card ************");

    console.log(auction);
    //auction = { title: "auction item title", highestBid: { amount: 0 }, pictureUrl: "" };

    const amount = auction.highestBid.amount;
    const pictureUrl = auction.pictureUrl ? auction.pictureUrl : 'placeholder.png';


return (
    <Card
        title={auction.title}
        style={{
            width: 420,
            //height: 420,
        }}
        cover={
            <img
                alt="auction item image"
                src={pictureUrl}
            />
        }

    >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row gutter={16}>
                <Col span={12}>
                <Card title={`Amount: $${amount}`} bordered={false}>
                {amount === 0 ? 'No bids' : `$${amount}`}
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Status" bordered={false}>
                        {auction.status}
                    </Card>
                </Col>

            </Row>
           

            <Flex vertical gap="small" style={{ width: '100%' }}>
                <Button type="primary" block>
                    Bid Now!
                </Button>
            </Flex>
        </Space>
    </Card>


);}
export default AuctionCard;