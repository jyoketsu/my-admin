/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Card, Modal, Form, Input, Row, Col } from 'antd';
import { Category } from '@/models/category';
import moment from 'moment';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

interface Props extends ConnectProps {
  dispatch: Dispatch;
  categories: Category[];
}

interface FieldData {
  name: string[];
  value: any;
}

const CategoryComp: React.FC<Props> = ({ dispatch, categories }) => {
  const [form] = Form.useForm();

  // 获取数据
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'category/getCategories',
      });
    }
  }, [dispatch]);

  const [modalVisible, setModalVisible] = useState(false);

  const [fields, setFields] = useState<FieldData[]>([
    { name: ['_id'], value: undefined },
    { name: ['name'], value: undefined },
  ]);

  // 提交（创建/修改）
  const handleCommit = () => {
    form
      .validateFields()
      .then((values) => {
        const _id = form.getFieldValue('_id');
        if (_id) {
          // 编辑
          dispatch({
            type: 'category/updateCategory',
            _id,
            name: values.name,
          });
        } else {
          // 新增
          dispatch({
            type: 'category/addCategory',
            name: values.name,
          });
        }
        setModalVisible(false);
        form.resetFields();
      })
      .catch(() => {
        // message.info(JSON.stringify(info));
      });
  };

  // 删除
  function deleteConfirm(category: Category) {
    confirm({
      title: `确定要删除【${category.name}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除【${category.name}】`,
      onOk() {
        dispatch({
          type: 'category/deleteCategory',
          _id: category._id,
        });
      },
    });
  }

  return (
    <PageContainer>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" xs={24} sm={12} md={6} xxl={4}>
          <Card
            key="addCategory"
            hoverable
            onClick={() => setModalVisible(true)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '227px',
            }}
          >
            <PlusOutlined />
            <span>添加类别</span>
          </Card>
        </Col>
        {categories.map((category) => (
          <Col key={category._id} className="gutter-row" xs={24} sm={12} md={6} xxl={4}>
            <Card
              title={category.name}
              hoverable
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setFields([
                      { name: ['_id'], value: category._id },
                      { name: ['name'], value: category.name },
                    ]);
                    setModalVisible(true);
                  }}
                />,
                <DeleteOutlined key="delete" onClick={() => deleteConfirm(category)} />,
              ]}
            >
              <p>{`文章数：${category.count}`}</p>
              <p>{`更新：${moment(category.updateTime).fromNow()}`}</p>
            </Card>
          </Col>
        ))}
      </Row>
      {/* 表单 */}
      <Modal
        title={`${fields[0].value ? '编辑' : '新增'}类别`}
        visible={modalVisible}
        onOk={handleCommit}
        onCancel={() => {
          setFields([
            { name: ['_id'], value: undefined },
            { name: ['name'], value: undefined },
          ]);
          setModalVisible(false);
        }}
        okText="提交"
      >
        <Form form={form} layout="vertical" name="form_in_modal" fields={fields}>
          <Form.Item
            name="name"
            label="类别名"
            rules={[
              {
                required: true,
                message: '请输入类别名称！',
              },
            ]}
          >
            <Input placeholder="请输入类别名" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default connect(({ category }: ConnectState) => ({
  categories: category.categories,
}))(CategoryComp);
