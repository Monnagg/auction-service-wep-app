import { Drawer, Input, Col, Select, Form, Row, Button, Spin } from 'antd';
import { addNewAuction } from "../Client.js";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { successNotification, errorNotification } from "./Notification";
import UploadPicture from './UploadPicture.js';

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const auction = { title: "auction item title", url: "" };

function NewAuctionDrawerForm({ showDrawer, setShowDrawer, fetchStudents }) {
    console.log("showDrawer", showDrawer);
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);


    const onFinish = auction => {
        setSubmitting(true)
        console.log(JSON.stringify(auction, null, 2))
        addNewAuction(auction)
            .then(() => {
                console.log("auction item added")
                onCLose();
                successNotification(
                    "Auction item successfully added",
                    `${auction.title} was added to the system`
                )
                //fetchStudents();
            }).catch(
            //         err => {
            //     console.log(err)
            //     err.response.json().then(res => {
            //         console.log(res);
            //         errorNotification("There was an issue",
            //             `${res.message} [${res.status}] [${res.error}]`,
            //              "bottomLeft"
            //         )
            //     })
            // }
        ).finally(() => {
            setSubmitting(false);
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new Auction Item"
        width={720}
        onClose={onCLose}
        open={showDrawer}
        styles={{
            body: {
                paddingBottom: 80,
            },
        }}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            requiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="Title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter auction item title' }]}
                    >
                        <Input placeholder="Please enter auction item title" />
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={16}>
                <Col span={18}>
                    <Form.Item
                        name="Picture"
                        label="Picture"
                        rules={[
                            {
                                required: true,
                                message: 'please upload auction item picture',
                            },
                        ]}
                    >
                        <UploadPicture/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create Auction Item
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default NewAuctionDrawerForm;