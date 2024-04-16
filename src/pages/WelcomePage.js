import '../App.css';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import LoginButton from '../components/LoginButton';

const { Header, Content, Footer } = Layout;


const WelcomePage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
      return (
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
    
              style={{ flex: 1, minWidth: 0 }}
            />
          </Header>
          <Content style={{ padding: '0 48px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
    
            </Breadcrumb>
            <div
              style={{
                position: 'relative',
                background: colorBgContainer,
                minHeight: 480,
                borderRadius: borderRadiusLG,
              }}
            >
              <img
                src="asset/welcome.jpg"
                alt="welcome"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: borderRadiusLG,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '30%', // 调整垂直位置，例如底部离底边的距离
                  left: '50%', // 居中
                  transform: 'translateX(-50%)', // 水平居中
                  color: 'white', // 文字颜色
                  textAlign: 'center', // 文字居中
                  fontSize: '24px', // 设置字体大小
                  fontStyle: 'italic', // 设置斜体
                  fontWeight: 'bold', // 设置加粗
                }}
              >
                Please login to use the auction service
              </div>
              {/* 将登录按钮放置在图片容器内，靠下一点的位置 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '22%', // 控制按钮的垂直位置
                  left: '50%', // 居中
                  transform: 'translateX(-50%)', // 水平居中
                }}
              >
                <LoginButton />
              </div>
    
            </div>
    
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Auction Service ©{new Date().getFullYear()} Created by Monna
          </Footer>
        </Layout>
      );
    }

export default WelcomePage;
