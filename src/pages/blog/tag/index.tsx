/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Card, Modal, Form, Input, Row, Col, Select, Tag, Avatar } from 'antd';
import { Tag as TagType } from '@/models/tag';
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
  tags: TagType[];
}

interface FieldData {
  name: string[];
  value: any;
}

const TagComp: React.FC<Props> = ({ dispatch, tags }) => {
  const [form] = Form.useForm();

  // 获取数据
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'tag/getTags',
      });
    }
  }, [dispatch]);

  const [modalVisible, setModalVisible] = useState(false);

  const [fields, setFields] = useState<FieldData[]>([
    { name: ['_id'], value: undefined },
    { name: ['name'], value: undefined },
    { name: ['color'], value: undefined },
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
            type: 'tag/updateTag',
            _id,
            name: values.name,
            color: values.color,
          });
        } else {
          // 新增
          dispatch({
            type: 'tag/addTag',
            name: values.name,
            color: values.color,
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
  function deleteConfirm(tag: TagType) {
    confirm({
      title: `确定要删除【${tag.name}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除【${tag.name}】`,
      onOk() {
        dispatch({
          type: 'tag/deleteTag',
          _id: tag._id,
        });
      },
    });
  }

  return (
    <PageContainer>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" xs={24} sm={12} md={6} xxl={4}>
          <Card
            key="addTag"
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
        {tags.map((tag) => (
          <Col key={tag._id} className="gutter-row" xs={24} sm={12} md={6} xxl={4}>
            <Card
              hoverable
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setFields([
                      { name: ['_id'], value: tag._id },
                      { name: ['name'], value: tag.name },
                      { name: ['color'], value: tag.color },
                    ]);
                    setModalVisible(true);
                  }}
                />,
                <DeleteOutlined key="delete" onClick={() => deleteConfirm(tag)} />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar size="large" style={{ backgroundColor: tag.color }}>
                    {tag.name[0]}
                  </Avatar>
                }
                title={tag.name}
                description={
                  <div>
                    <p>{`文章数：${tag.count}`}</p>
                    <p>{`更新：${moment(tag.updateTime).fromNow()}`}</p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      {/* 表单 */}
      <Modal
        title={`${fields[0].value ? '编辑' : '新增'}标签`}
        visible={modalVisible}
        onOk={handleCommit}
        onCancel={() => {
          setFields([
            { name: ['_id'], value: undefined },
            { name: ['name'], value: undefined },
            { name: ['color'], value: undefined },
          ]);
          setModalVisible(false);
        }}
        okText="提交"
      >
        <Form form={form} layout="vertical" name="form_in_modal" fields={fields}>
          <Form.Item
            name="name"
            label="标签名"
            rules={[
              {
                required: true,
                message: '请输入标签名称！',
              },
            ]}
          >
            <Input placeholder="请输入标签名" />
          </Form.Item>
          <Form.Item
            name="color"
            label="标签颜色"
            rules={[
              {
                required: true,
                message: '请选择标签颜色！',
              },
            ]}
          >
            <Select style={{ width: 120 }}>
              <Option value="#E87A90">
                <Tag color="#E87A90">薄紅</Tag>
              </Option>
              <Option value="#EB7A77">
                <Tag color="#EB7A77">甚三紅</Tag>
              </Option>
              <Option value="#CB4042">
                <Tag color="#CB4042">赤紅</Tag>
              </Option>
              <Option value="#FFB11B">
                <Tag color="#FFB11B">山吹</Tag>
              </Option>
              <Option value="#A5A051">
                <Tag color="#A5A051">鶸茶</Tag>
              </Option>
              <Option value="#90B44B">
                <Tag color="#90B44B">鶸萌黄</Tag>
              </Option>
              <Option value="#6D2E5B">
                <Tag color="#6D2E5B">蒲葡</Tag>
              </Option>
              <Option value="#FC9F4D">
                <Tag color="#FC9F4D">萱草</Tag>
              </Option>
              <Option value="#BC9F77">
                <Tag color="#BC9F77">白茶</Tag>
              </Option>
              <Option value="#2EA9DF">
                <Tag color="#2EA9DF">露草</Tag>
              </Option>
              <Option value="#70649A">
                <Tag color="#70649A">二藍</Tag>
              </Option>
              <Option value="#1B813E">
                <Tag color="#1B813E">常磐</Tag>
              </Option>
              <Option value="#3A3226">
                <Tag color="#3A3226">檳榔子染</Tag>
              </Option>
              <Option value="#9E7A7A">
                <Tag color="#9E7A7A">梅鼠</Tag>
              </Option>
              <Option value="#62592C">
                <Tag color="#62592C">海松茶</Tag>
              </Option>
              <Option value="#B5CAA0">
                <Tag color="#B5CAA0">裏柳</Tag>
              </Option>
              <Option value="#F8C3CD">
                <Tag color="#F8C3CD">退紅</Tag>
              </Option>
              <Option value="#A8497A">
                <Tag color="#A8497A">梅紫</Tag>
              </Option>
              <Option value="#0D5661">
                <Tag color="#0D5661">藍</Tag>
              </Option>
              <Option value="#69B0AC">
                <Tag color="#69B0AC">青磁</Tag>
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default connect(({ tag }: ConnectState) => ({
  tags: tag.tags,
}))(TagComp);
