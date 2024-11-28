import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, Form, Button, List, Typography, Avatar } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Text } = Typography;

const Chat = (props) => {
    const { isChatModalOpen, setIsChatModalOpen } = props; // Thêm userID từ props
    const [form] = Form.useForm();
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const user = useSelector((state) => state.user.user);
    const userID = user?.id;
    // const userID = 2;
    const userAdminID = 3;
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Xóa tin nhắn cũ trước khi fetch tin nhắn mới
                setMessages([]);

                // Fetch dữ liệu tin nhắn từ user mới
                const userResponse = await axios.get(`http://localhost:9000/api/users/${userID}`);
                const adminResponse = await axios.get(`http://localhost:9000/api/userchats/${userAdminID}/${userID}`);

                const userMessages = userResponse.data.data.userChats.map((chat) => ({
                    type: 'user',
                    text: chat.name1,
                    avatar: user.image,
                    name: userResponse.data.data.userName,
                    time: new Date(chat.createdAt),
                }));

                const adminMessages = adminResponse.data.data.map((chat) => ({
                    type: 'admin',
                    text: chat.name1,
                    avatar: 'https://media.licdn.com/dms/image/D560BAQE96KctT7x-iw/company-logo_200_200/0/1666170056423?e=2147483647&v=beta&t=VWwOyGELKPqLpkj7dbxaCDtWbhWKvp3akvhvMdHivy4',
                    name: 'ADMIN',
                    time: new Date(chat.createdAt),
                }));

                // Kết hợp tất cả các tin nhắn và sắp xếp theo thời gian
                const allMessages = [...userMessages, ...adminMessages].sort((a, b) => a.time - b.time);

                setMessages(allMessages);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        // Set up an interval to fetch messages periodically
        const intervalId = setInterval(fetchMessages, 30000);

        // Clean up the interval on component unmount
        fetchMessages();
        return () => clearInterval(intervalId);
    }, [userID]); // Cập nhật khi userID thay đổi

    // Tự động cuộn xuống khi có tin nhắn mới
    // useEffect(() => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);
    useEffect(() => {
        const isAtBottom =
            messagesEndRef.current?.scrollHeight ===
            messagesEndRef.current?.scrollTop + messagesEndRef.current?.clientHeight;

        // Nếu người dùng đang ở dưới cùng, không cuộn tự động
        if (isAtBottom) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleCloseChatModal = () => {
        setIsChatModalOpen(false);
    };

    const handleSendMessage = async (values) => {
        try {
            const newMessage = {
                name1: values.message,
                name2: '',
                number1: 1,
                number2: 1,
                userChatID: userID, // Sử dụng userID hiện tại
                adminChatID: 3,
            };

            await axios.post('http://localhost:9000/api/userChats', newMessage);
            toast.success('Message sent!');
            form.resetFields();

            // Fetch messages again to refresh the view
            const userResponse = await axios.get(`http://localhost:9000/api/users/${userID}`);
            const adminResponse = await axios.get(`http://localhost:9000/api/userchats/3/${userID}`);

            const userMessages = userResponse.data.data.userChats.map((chat) => ({
                type: 'user',
                text: chat.name1,
                avatar: 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-84.jpg',
                name: userResponse.data.data.userName,
                time: new Date(chat.createdAt),
            }));

            const adminMessages = adminResponse.data.data.map((chat) => ({
                type: 'admin',
                text: chat.name1,
                avatar: 'https://media.licdn.com/dms/image/D560BAQE96KctT7x-iw/company-logo_200_200/0/1666170056423?e=2147483647&v=beta&t=VWwOyGELKPqLpkj7dbxaCDtWbhWKvp3akvhvMdHivy4',
                name: 'ADMIN',
                time: new Date(chat.createdAt),
            }));

            // Sắp xếp lại tất cả các tin nhắn theo thời gian
            const allMessages = [...userMessages, ...adminMessages].sort((a, b) => a.time - b.time);

            setMessages(allMessages);
        } catch (error) {
            console.error('Failed to send message:', error);
            toast.error('Failed to send message');
        }
    };

    return (
        <Modal
            title="Chat with Admin"
            open={isChatModalOpen}
            onCancel={handleCloseChatModal}
            maskClosable={true}
            footer={null}
            width={600}
            style={{ top: 100, right: 90, position: 'fixed' }}
        >
            <div className="max-h-[400px] overflow-y-auto mb-4">
                <List
                    dataSource={messages}
                    renderItem={(message) => (
                        <List.Item
                            style={{
                                padding: '8px 0',
                                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <div
                                className={`flex items-start space-x-3 ${
                                    message.type === 'user' ? 'flex-row-reverse' : ''
                                }`}
                            >
                                <Avatar src={message.avatar} size={40} />
                                <div
                                    className={`bg-white p-3 rounded-lg shadow-md ${
                                        message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                                    }`}
                                >
                                    <div className="flex items-center mb-1">
                                        <Text strong className="mr-2">
                                            {message.name}
                                        </Text>
                                        <Text type="secondary" className="text-xs">
                                            {message.time.toLocaleTimeString()}
                                        </Text>
                                    </div>
                                    <Text>{message.text}</Text>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
                <div ref={messagesEndRef} />
            </div>
            <Form form={form} layout="inline" onFinish={handleSendMessage} className="flex-shrink-0">
                <Form.Item
                    name="message"
                    rules={[{ required: true, message: 'Please enter a message!' }]}
                    className="flex-grow"
                >
                    <Input className="w-[450px]" placeholder="Type your message..." />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Chat;
