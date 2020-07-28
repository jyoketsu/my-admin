/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Card, List, Avatar, Button, Modal, Form, Input, Dropdown, Menu, message } from 'antd';
import { Link } from '@/models/link';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface Props extends ConnectProps {
  dispatch: Dispatch;
  links: Link[];
}

interface FieldData {
  name: string[];
  value: any;
}

const LinkComp: React.FC<Props> = ({ dispatch, links }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'link/getLinks',
      });
    }
  }, [dispatch]);

  const [modalVisible, setModalVisible] = useState(false);

  const [fields, setFields] = useState<FieldData[]>([
    { name: ['_id'], value: undefined },
    { name: ['name'], value: undefined },
    { name: ['icon'], value: undefined },
    { name: ['uri'], value: undefined },
  ]);

  const handleCommit = () => {
    form
      .validateFields()
      .then((values) => {
        const id = form.getFieldValue('_id');
        if (id) {
          // 编辑
          dispatch({
            type: 'link/updateLink',
            id,
            name: values.name,
            icon: values.icon,
            uri: values.uri,
          });
        } else {
          // 新增
          dispatch({
            type: 'link/addLink',
            name: values.name,
            icon: values.icon,
            uri: values.uri,
          });
        }
        setModalVisible(false);
        form.resetFields();
      })
      .catch(() => {
        // message.info(JSON.stringify(info));
      });
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: 'link/deleteLink',
      id,
    });
  };

  function handleSort(id: string, up: boolean) {
    const currentIndex = links.findIndex((link) => link._id === id);
    if (currentIndex === 0 && up) {
      message.info('已经是第一行了！');
    } else if (currentIndex + 1 === links.length && !up) {
      message.info('已经是最后一行了！');
    } else {
      const current = links[currentIndex];
      const targetIndex = up ? currentIndex - 1 : currentIndex + 1;
      const target = links[targetIndex];
      dispatch({
        type: 'link/changeOrder',
        currentIndex,
        currentId: current._id,
        currentOrder: current.order,
        targetIndex,
        targetId: target._id,
        targetOrder: target.order,
      });
    }
  }

  return (
    <PageContainer>
      <Card>
        <Button type="dashed" block onClick={() => setModalVisible(true)}>
          添加链接
        </Button>
        <br />
        <br />
        <List
          itemLayout="horizontal"
          dataSource={links}
          renderItem={(link) => (
            <List.Item
              actions={[
                <a
                  key="list-loadmore-edit"
                  onClick={() => {
                    setFields([
                      { name: ['_id'], value: link._id },
                      { name: ['name'], value: link.name },
                      { name: ['icon'], value: link.icon },
                      { name: ['uri'], value: link.uri },
                    ]);
                    setModalVisible(true);
                  }}
                >
                  编辑
                </a>,

                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <a
                          key="list-loadmore-delete"
                          onClick={() =>
                            Modal.confirm({
                              title: '提示',
                              icon: <ExclamationCircleOutlined />,
                              content: `确定要删除【${link.name}】吗？`,
                              okText: '确认',
                              cancelText: '取消',
                              onOk() {
                                handleDelete(link._id);
                              },
                            })
                          }
                        >
                          删除
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a key="list-up" onClick={() => handleSort(link._id, true)}>
                          上移一行
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a key="list-down" onClick={() => handleSort(link._id, false)}>
                          下移一行
                        </a>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <a onClick={(e) => e.preventDefault()}>更多</a>
                </Dropdown>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={link.icon} />}
                title={link.name}
                description={link.uri}
              />
            </List.Item>
          )}
        />
        <Modal
          title={`${fields[0].value ? '编辑' : '新增'}链接`}
          visible={modalVisible}
          onOk={handleCommit}
          onCancel={() => setModalVisible(false)}
          okText="提交"
        >
          <Form form={form} layout="vertical" name="form_in_modal" fields={fields}>
            <Form.Item
              name="name"
              label="链接名"
              rules={[
                {
                  required: true,
                  message: '请输入链接名称！',
                },
              ]}
            >
              <Input placeholder="请输入链接名" />
            </Form.Item>
            <Form.Item
              name="icon"
              label="链接图标"
              rules={[
                {
                  required: true,
                  message: '请输入链接图标！',
                },
                { pattern: new RegExp('[a-zA-z]+://[^s]*'), message: '请输入正确的地址！' },
              ]}
            >
              <Input placeholder="请输入链接图标" />
            </Form.Item>
            <Form.Item
              name="uri"
              label="链接地址"
              rules={[
                {
                  required: true,
                  message: '请输入链接地址！',
                },
                { pattern: new RegExp('[a-zA-z]+://[^s]*'), message: '请输入正确的地址！' },
              ]}
            >
              <Input placeholder="请输入链接地址" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </PageContainer>
  );
};

export default connect(({ link }: ConnectState) => ({
  links: link.links,
}))(LinkComp);
