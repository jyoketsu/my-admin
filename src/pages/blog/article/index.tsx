/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Card, Modal, Form, Input, Row, Col, Select, Article, Avatar, Pagination } from 'antd';
import { Article as ArticleType } from '@/models/article';
import moment from 'moment';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;
const { Option } = Select;
const { Meta } = Card;

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
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" xs={24} sm={12} md={6} xxl={4}>
          <Card
            key="addArticle"
            hoverable
            onClick={() => setModalVisible(true)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '195px',
            }}
          >
            <PlusOutlined />
            <span>添加标签</span>
          </Card>
        </Col>
        {articles.map((article) => (
          <Col key={article._id} className="gutter-row" xs={24} sm={12} md={6} xxl={4}>
            <Card hoverable>
              <Meta
                title={article.title}
                description={
                  <div>
                    <p>{`更新：${moment(article.updateTime).fromNow()}`}</p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={(page) => {
          setCurrent(page);
          (document.getElementById('root') as HTMLElement).scrollTop = 0;
        }}
      />
    </PageContainer>
  );
};

export default connect(({ article }: ConnectState) => ({
  articles: article.articles,
  total: article.total,
}))(ArticleComp);
