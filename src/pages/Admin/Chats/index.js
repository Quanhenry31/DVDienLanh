import React, { useState, useRef, useEffect } from 'react';
import { Layout, Input, Button, List, Typography, Avatar } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

const { Content, Sider } = Layout;
const { Text, Title } = Typography;

const Chats = () => {
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [selectedUser, setSelectedUser] = useState(null); // Người dùng được chọn
  const [messages, setMessages] = useState([]); // Tin nhắn
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const userAdminID = 3; // Admin ID mặc định

  // Fetch danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/userchats/listUserChats'); // API để lấy danh sách người dùng
        setUsers(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch tin nhắn khi `selectedUser` thay đổi
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:9000/api/users/${selectedUser.userChatID}`);
        const adminResponse = await axios.get(
          `http://localhost:9000/api/userchats/${userAdminID}/${selectedUser.userChatID}`,
        );

        const userMessages = userResponse.data.data.userChats.map((chat) => ({
          type: 'user',
          text: chat.name1,
          avatar: selectedUser.User?.image || '/default-avatar.png',
          name: selectedUser.User?.userName,
          time: new Date(chat.createdAt),
        }));

        const adminMessages = adminResponse.data.data.map((chat) => ({
          type: 'admin',
          text: chat.name1,
          avatar:
            'https://media.licdn.com/dms/image/D560BAQE96KctT7x-iw/company-logo_200_200/0/1666170056423?e=2147483647&v=beta&t=VWwOyGELKPqLpkj7dbxaCDtWbhWKvp3akvhvMdHivy4',
          name: 'ADMIN',
          time: new Date(chat.createdAt),
        }));

        setMessages([...userMessages, ...adminMessages].sort((a, b) => a.time - b.time));
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    // Set up an interval to fetch messages periodically
    const intervalId = setInterval(fetchMessages, 30000); // Fetch every 5 seconds

    // Clean up the interval on component unmount
    fetchMessages();
    return () => clearInterval(intervalId);
  }, [selectedUser]);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const newMsg = {
        name1: newMessage,
        name2: '',
        number1: 1,
        number2: 1,
        userChatID: userAdminID,
        adminChatID: selectedUser.userChatID,
      };
      await axios.post('http://localhost:9000/api/userChats', newMsg);

      toast.success('Message sent!');
      setNewMessage('');
      setMessages((prev) => [
        ...prev,
        {
          type: 'admin',
          text: newMessage,
          avatar:
            'https://media.licdn.com/dms/image/D560BAQE96KctT7x-iw/company-logo_200_200/0/1666170056423?e=2147483647&v=beta&t=VWwOyGELKPqLpkj7dbxaCDtWbhWKvp3akvhvMdHivy4',
          name: 'ADMIN',
          time: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      {/* Sider */}
      <Sider width={300} style={{ background: '#fff', borderRight: '1px solid #f0f0f0', overflowY: 'auto' }}>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => (
            <List.Item
              onClick={() => setSelectedUser(user)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedUser?.id === user.id ? '#e6f7ff' : '#fff',
                padding: '10px 20px',
                transition: 'background-color 0.3s ease',
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={user?.User?.image} size={48} />}
                description={
                  <b
                    style={{
                      textOverflow: 'ellipsis',
                      fontSize: '16px',
                      color: selectedUser?.id === user.id ? '#1890ff' : '#000',
                    }}
                  >
                    {user?.name1}
                  </b>
                }
                title={<span style={{ color: '#888' }}>{user?.User?.userName}</span>}
              />
              <div style={{ fontSize: '12px', color: '#888' }}>{new Date(user.createdAt).toLocaleTimeString()}</div>
            </List.Item>
          )}
        />
      </Sider>

      {/* Chat Box */}
      <Content style={{ padding: '20px', overflow: 'hidden', backgroundColor: '#fff', borderRadius: '8px' }}>
        {selectedUser ? (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Title level={4} style={{ marginBottom: '20px' }}>
              Chat với {selectedUser.User?.userName}
            </Title>
            <div
              style={{
                flex: 1,
                border: '1px solid #f0f0f0',
                padding: '10px',
                overflowY: 'scroll',
                borderRadius: '8px',
              }}
            >
              <List
                dataSource={messages}
                renderItem={(msg, index) => (
                  <List.Item key={index} style={{ justifyContent: msg.type === 'admin' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <Avatar src={msg.avatar} />
                      <div
                        style={{
                          padding: '10px',
                          background: msg.type === 'admin' ? '#f0f0f0' : '#1890ff',
                          color: msg.type === 'admin' ? '#000' : '#fff',
                          borderRadius: '8px',
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
              <div ref={messagesEndRef} />
            </div>
            <div style={{ marginTop: '10px' }}>
              <Input.TextArea
                rows={2}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onPressEnter={sendMessage} // Gọi hàm sendMessage khi nhấn Enter
              />

              <Button
                type="primary"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={sendMessage} // Vẫn có thể gửi bằng nút "Gửi"
              >
                Gửi
              </Button>
            </div>
          </div>
        ) : (
          <Title level={4} style={{ textAlign: 'center', color: '#888' }}>
            Vui lòng chọn người dùng để bắt đầu chat
          </Title>
        )}
      </Content>
    </Layout>
  );
};

export default Chats;
