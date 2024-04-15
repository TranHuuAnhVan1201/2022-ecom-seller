import { Button, Modal, Tabs } from 'antd'
import React, { useState } from 'react'
const { TabPane } = Tabs

export const TabContent = ({ data, handleSelectedContent }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const operations = (
        <>
            <Button onClick={showModal}>Hướng dẫn</Button>
            <Modal
                title="Hướng dẫn chia sẻ nội dung bán hàng"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                Bước 1: Chọn nội dung chia sẻ (mặc định Nội dung 1).
                <br />
                Bước 2: Chọn hình ảnh chia sẻ (mặc định không chọn).
                <br />
                Bước 3: Chọn nút Chia sẻ mẫu bán hàng.
                <br />
                Bước 4: Dán nội dung đã sao chép vào ô Bạn đang nghĩ gì của Facebook.
                <br />
                Bước 5: Thực hiện như đăng status Facebook.
            </Modal>
        </>
    )
    return (
        <Tabs defaultActiveKey="1" onChange={handleSelectedContent} tabBarExtraContent={operations}>
            <TabPane tab="Nội dung 1" key="1">
                <div className="content-share">
                    <pre>{data.content1 || 'Newee chưa cập nhập Nội dung 1'}</pre>
                </div>
            </TabPane>
            <TabPane tab="Nội dung 2" key="2">
                <div className="content-share">
                    <pre>{data.content2 || 'Newee chưa cập nhập Nội dung 2'}</pre>
                </div>
            </TabPane>
            <TabPane tab="Nội dung 3" key="3">
                <div className="content-share">
                    <pre>{data.content3 || 'Newee chưa cập nhập Nội dung 3'}</pre>
                </div>
            </TabPane>
        </Tabs>
    )
}
