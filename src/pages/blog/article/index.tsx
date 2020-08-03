/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Card, Modal, List, Space, Button } from 'antd';
import { Article as ArticleType } from '@/models/article';
import moment from 'moment';
import {
  EyeOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

interface Props extends ConnectProps {
  dispatch: Dispatch;
  articles: ArticleType[];
  total: number;
}

const ArticleComp: React.FC<Props> = ({ dispatch, articles, total }) => {
  const pageSize = 20;
  const [current, setCurrent] = useState(1);

  // 获取数据
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'article/getArticles',
        current,
        pageSize,
      });
    }
  }, [dispatch, current]);

  // 删除
  function deleteConfirm(article: ArticleType) {
    confirm({
      title: `确定要删除【${article.title}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除【${article.title}】`,
      onOk() {
        dispatch({
          type: 'article/deleteArticle',
          _id: article._id,
        });
      },
    });
  }

  return (
    <PageContainer>
      <Card extra={<Button type="primary">新建文章</Button>}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              setCurrent(page);
              (document.getElementById('root') as HTMLElement).scrollTop = 0;
            },
            total,
            pageSize,
          }}
          dataSource={articles}
          footer={<div>{`总条数：${total}`}</div>}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={EditOutlined} text="编辑" key="list-vertical-edit" />,
                <IconText
                  icon={DeleteOutlined}
                  text="删除"
                  key="list-vertical-delete"
                  onClick={() => deleteConfirm(item)}
                />,
              ]}
              extra={item.cover ? <Cover coverUri={item.cover} /> : null}
            >
              <List.Item.Meta
                title={item.title}
                description={
                  <div>
                    <IconText
                      icon={EyeOutlined}
                      text={`${item.viewCount}`}
                      key="list-vertical-count"
                    />
                    <span style={{ marginLeft: '18px' }}>
                      {moment(item.updateTime).format('YYYY-MM-DD')}
                    </span>
                  </div>
                }
              />
              {item.snippet}
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

interface IconTextProps {
  icon: React.FunctionComponent;
  text: string;
  onClick?: Function;
}
const IconText = ({ icon, text, onClick }: IconTextProps) => {
  function handleClick() {
    if (onClick) {
      onClick();
    }
  }
  return (
    <span onClick={handleClick}>
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    </span>
  );
};

interface CoverProps {
  coverUri: string;
}

const Cover = ({ coverUri }: CoverProps) => (
  <div
    style={{
      width: '272px',
      height: '100%',
      backgroundImage: `url(${coverUri})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
);

export default connect(({ article }: ConnectState) => ({
  articles: article.articles,
  total: article.total,
}))(ArticleComp);
