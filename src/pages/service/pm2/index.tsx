import React, { useEffect } from 'react';
import { Card, List, Tag, Space, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch, ConnectProps } from 'umi';
import { ConnectState } from '@/models/connect';

interface Props extends ConnectProps {
  dispatch: Dispatch;
  pm2List: any[];
}
const PM2: React.FC<Props> = ({ dispatch, pm2List }) => {
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'system/getPm2List',
      });
    }
  }, []);

  function getPm2List() {
    if (dispatch) {
      dispatch({
        type: 'system/getPm2List',
      });
    }
  }

  function reload(name: string) {
    dispatch({
      type: 'system/reloadPm2',
      name,
    });
  }
  
  return (
    <PageContainer
      extra={[
        <Button key="refresh" onClick={getPm2List}>
          刷新
        </Button>,
      ]}
    >
      <Card>
        <List
          className="pm2List"
          itemLayout="horizontal"
          dataSource={pm2List}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="restart" onClick={() => reload(item.name)}>
                  重启
                </a>,
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={
                  <Space>
                    <Tag color={item.pm2_env.status === 'online' ? 'green' : 'red'}>
                      {item.pm2_env.status}
                    </Tag>
                    <span>{`CPU:${item.monit.cpu}%`}</span>
                    <span>{`内存:${(item.monit.memory / 1024 / 1024 / 8).toFixed(2)}mb`}</span>
                  </Space>
                }
              />
              <div>content</div>
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

export default connect(({ system }: ConnectState) => ({
  pm2List: system.pm2List,
}))(PM2);
