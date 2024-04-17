import { Drawer, Input, Col, Select, Form, Row, Button, Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { successNotification, errorNotification } from "./Notification";
import { createAuction} from '../Client.js';
import UploadPicture from './UploadPicture.js';

import React from 'react';




const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function NewAuctionDrawerForm({ showDrawer, setShowDrawer ,fetchAuctions}) {
    const [base64, setBase64] = useState(null);
    const [form] = Form.useForm(); // 使用 Form 组件提供的 useForm 钩子

    //console.log("showDrawer", showDrawer);
    const onCLose = () => {
        
        setShowDrawer(false)
        form.resetFields();
        setBase64(null);
    };
    const [submitting, setSubmitting] = useState(false);
    


    const onFinish = auction => {

        setSubmitting(true);
        console.log(JSON.stringify(auction, null, 2))
        if (!base64) {
            setSubmitting(false);
            errorNotification("No picture uploaded", "Please upload a picture of the auction ");
            return;
        }
        createAuction(auction, base64)
            .then(() => {
                console.log("Create new auction success");
                onCLose();
                successNotification(
                    "New auction successfully added",
                    `${auction.title} was added to the system`
                )
                fetchAuctions();
            }).catch(err => {
                console.log(err)
                console.log(err.response);
                errorNotification("There was an issue",
                    `Failed to add ${auction.title} to the system`,
                    "bottomLeft"
                );
            }).finally(() => {
                setSubmitting(false);
            })

    };

    const onFinishFailed = errorInfo => {
        //alert(JSON.stringify(errorInfo, null, 2));
        setSubmitting(false);
    };

    return <Drawer
        title="Create new Auction"
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
        <Form 
        form={form} 
        layout="vertical"
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            requiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter auction title' }]}
                    >
                        <Input placeholder="Please enter auction title" />
                    </Form.Item>
                </Col>

            </Row>

            <Row gutter={16} >
               
                <Col span={16}>
                    <Form.Item
                        name="pictureUrl"
                        label="Picture"
                        rules={[
                            {
                                required: false,
                                message: 'please upload auction item picture',
                            },
                        ]}
                    >
                        <UploadPicture onPictureSelected={base64 => setBase64(base64)} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
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