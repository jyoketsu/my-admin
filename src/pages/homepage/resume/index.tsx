/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps, Dispatch } from 'umi';
import {
  Card,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Avatar,
  Progress,
  List,
  Space,
  Select,
  Spin,
} from 'antd';
import { Resume as ResumeType } from '@/models/resume';
import { User as UserType } from '@/models/user';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Skill, Experience, Project } from '@/services/resume';
import { FieldData } from './interfaces';
import ProfileForm from './components/ProfileForm';
import SkillForm from './components/SkillForm';
import OtherSkillForm from './components/OtherSkillForm';
import ExpForm from './components/ExpForm';
import ProjectForm from './components/ProjectForm';

const { Meta } = Card;
const { Option } = Select;
const { confirm } = Modal;

interface Props extends ConnectProps {
  dispatch: Dispatch;
  resume: ResumeType | null;
  user: UserType | null;
  getting?: boolean;
}

const Resume: React.FC<Props> = ({ dispatch, resume, getting, user }) => {
  const [profileForm] = Form.useForm();
  const [skillForm] = Form.useForm();
  const [otherSkillForm] = Form.useForm();
  const [expForm] = Form.useForm();
  const [projectForm] = Form.useForm();

  const [skillformVisible, setskillformVisible] = useState(false);
  const [expformVisible, setexpformVisible] = useState(false);
  const [projectformVisible, setprojectformVisible] = useState(false);

  const [lang, setlang] = useState('zh-Hans');

  const [profileFields, setProfileFields] = useState([
    { name: ['name'], value: resume && resume.profile ? resume.profile.name : '' },
    { name: ['about'], value: resume && resume.profile ? resume.profile.about : '' },
    { name: ['education'], value: resume && resume.profile ? resume.profile.education : '' },
    { name: ['location'], value: resume && resume.profile ? resume.profile.location : '' },
    {
      name: ['birthYear'],
      value:
        resume && resume.profile && resume.profile.birthYear
          ? moment(resume.profile.birthYear)
          : '',
    },
    { name: ['position'], value: resume && resume.profile ? resume.profile.position : '' },
    { name: ['email'], value: resume && resume.profile ? resume.profile.email : '' },
    { name: ['phone'], value: resume && resume.profile ? resume.profile.phone : '' },
    { name: ['website'], value: resume && resume.profile ? resume.profile.website : '' },
    { name: ['githubName'], value: resume && resume.profile ? resume.profile.githubName : '' },
  ]);

  const [skillFields, setSkillFields] = useState([
    { name: ['_id'], value: '' },
    { name: ['name'], value: '' },
    { name: ['level'], value: 0 },
    { name: ['iconUri'], value: '' },
  ]);

  const [knowledgeFields, setKnowledgeFields] = useState([
    { name: ['knowledge'], value: resume ? resume.knowledge : '' },
  ]);

  const [expFields, setExpFields] = useState([
    { name: ['_id'], value: '' },
    { name: ['company'], value: '' },
    { name: ['position'], value: '' },
    { name: ['startTime'], value: '' },
    { name: ['endTime'], value: '' },
    { name: ['description'], value: '' },
  ]);

  const [projectFields, setProjectFields] = useState([
    { name: ['_id'], value: '' },
    { name: ['name'], value: '' },
    { name: ['platform'], value: '' },
    { name: ['timeperiod'], value: '' },
    { name: ['description'], value: '' },
    { name: ['url'], value: '' },
  ]);

  const [skills, setskills] = useState<Skill[]>([]);
  const [experience, setexperience] = useState<Experience[]>([]);
  const [projects, setprojects] = useState<Project[]>([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'resume/getResume',
        lang,
      });
    }
  }, [dispatch, lang]);

  useEffect(() => {
    setProfileFields([
      { name: ['name'], value: resume && resume.profile ? resume.profile.name : '' },
      { name: ['about'], value: resume && resume.profile ? resume.profile.about : '' },
      { name: ['education'], value: resume && resume.profile ? resume.profile.education : '' },
      { name: ['location'], value: resume && resume.profile ? resume.profile.location : '' },
      {
        name: ['birthYear'],
        value: resume && resume.profile ? moment(resume.profile.birthYear) : '',
      },
      { name: ['position'], value: resume && resume.profile ? resume.profile.position : '' },
      { name: ['email'], value: resume && resume.profile ? resume.profile.email : '' },
      { name: ['phone'], value: resume && resume.profile ? resume.profile.phone : '' },
      { name: ['website'], value: resume && resume.profile ? resume.profile.website : '' },
      { name: ['githubName'], value: resume && resume.profile ? resume.profile.githubName : '' },
    ]);
    setKnowledgeFields([{ name: ['knowledge'], value: resume ? resume.knowledge : '' }]);
    setskills(resume && resume.skills ? resume.skills : []);
    setexperience(resume && resume.experience ? resume.experience : []);
    setprojects(resume && resume.projects ? resume.projects : []);
  }, [resume]);

  const onSubmit = () => {
    const profile = {
      name: profileForm.getFieldValue('name'),
      about: profileForm.getFieldValue('about'),
      education: profileForm.getFieldValue('education'),
      location: profileForm.getFieldValue('location'),
      birthYear: profileForm.getFieldValue('birthYear'),
      position: profileForm.getFieldValue('position'),
      email: profileForm.getFieldValue('email'),
      phone: profileForm.getFieldValue('phone'),
      website: profileForm.getFieldValue('website'),
      githubName: profileForm.getFieldValue('githubName'),
    };
    const knowledge = otherSkillForm.getFieldValue('knowledge');
    if (dispatch) {
      if (resume && resume._id) {
        // 编辑
        dispatch({
          type: 'resume/updateResume',
          _id: resume._id,
          profile,
          skills,
          knowledge,
          experience,
          projects,
          lang,
          user: user ? user._id : '',
        });
      } else {
        // 新增
        dispatch({
          type: 'resume/addResume',
          profile,
          skills,
          knowledge,
          experience,
          projects,
          lang,
          user: user ? user._id : '',
        });
      }
    }
  };

  const addSkill = () => {
    skillForm
      .validateFields()
      .then(() => {
        const newSkills = JSON.parse(JSON.stringify(skills));
        const _id = skillForm.getFieldValue('_id');
        if (_id) {
          // 编辑
          const index = newSkills.findIndex((exp: Experience) => exp._id === _id);
          if (index !== -1) {
            newSkills[index] = {
              _id,
              name: skillForm.getFieldValue('name'),
              level: skillForm.getFieldValue('level'),
              iconUri: skillForm.getFieldValue('iconUri'),
            };
          }
        } else {
          // 新增
          newSkills.push({
            _id,
            name: skillForm.getFieldValue('name'),
            level: skillForm.getFieldValue('level'),
            iconUri: skillForm.getFieldValue('iconUri'),
          });
        }
        setskillformVisible(false);
        setskills(newSkills);
        skillForm.resetFields();
      })
      .catch(() => {
        // message.info(JSON.stringify(info));
      });
  };

  const addExp = () => {
    expForm
      .validateFields()
      .then(() => {
        const newExperience = JSON.parse(JSON.stringify(experience));
        if (expForm.getFieldValue('_id')) {
          // 编辑
          const index = newExperience.findIndex(
            (exp: Experience) => exp._id === expForm.getFieldValue('_id'),
          );
          if (index !== -1) {
            newExperience[index] = {
              _id: expForm.getFieldValue('_id'),
              company: expForm.getFieldValue('company'),
              position: expForm.getFieldValue('position'),
              startTime: expForm.getFieldValue('startTime'),
              endTime: expForm.getFieldValue('endTime'),
              description: expForm.getFieldValue('description'),
            };
          }
        } else {
          // 新增
          newExperience.push({
            _id: expForm.getFieldValue('_id'),
            company: expForm.getFieldValue('company'),
            position: expForm.getFieldValue('position'),
            startTime: expForm.getFieldValue('startTime'),
            endTime: expForm.getFieldValue('endTime'),
            description: expForm.getFieldValue('description'),
          });
        }
        setexpformVisible(false);
        setexperience(newExperience);
        expForm.resetFields();
      })
      .catch(() => {
        // message.info(JSON.stringify(info));
      });
  };

  const deleteSkillConfirm = (_id: string, name: string) => {
    confirm({
      title: `确定要删除【${name}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除技能-${name}`,
      onOk() {},
    });
  };

  const deleteExpConfirm = (_id: string, name: string) => {
    confirm({
      title: `确定要删除【${name}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除工作经验-${name}`,
      onOk() {},
    });
  };

  const deleteProjectConfirm = (_id: string, name: string) => {
    confirm({
      title: `确定要删除【${name}】吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `删除项目经验-${name}`,
      onOk() {},
    });
  };

  const addProject = () => {
    projectForm
      .validateFields()
      .then(() => {
        const newProjects = JSON.parse(JSON.stringify(projects));
        if (projectForm.getFieldValue('_id')) {
          // 编辑
          const index = newProjects.findIndex(
            (exp: Project) => exp._id === projectForm.getFieldValue('_id'),
          );
          if (index !== -1) {
            newProjects[index] = {
              _id: projectForm.getFieldValue('_id'),
              name: projectForm.getFieldValue('name'),
              platform: projectForm.getFieldValue('platform'),
              timeperiod: projectForm.getFieldValue('timeperiod'),
              description: projectForm.getFieldValue('description'),
              url: projectForm.getFieldValue('url'),
            };
          }
        } else {
          // 新增
          newProjects.push({
            _id: projectForm.getFieldValue('_id'),
            name: projectForm.getFieldValue('name'),
            platform: projectForm.getFieldValue('platform'),
            timeperiod: projectForm.getFieldValue('timeperiod'),
            description: projectForm.getFieldValue('description'),
            url: projectForm.getFieldValue('url'),
          });
        }
        setprojectformVisible(false);
        setprojects(newProjects);
        projectForm.resetFields();
      })
      .catch(() => {
        // message.info(JSON.stringify(info));
      });
  };

  return (
    <PageContainer
      extra={[
        <div key="loading" style={{ display: 'inline' }}>
          {getting ? <Spin /> : null}
        </div>,
        <Select key="lang" value={lang} style={{ width: 120 }} onChange={(value) => setlang(value)}>
          <Option value="zh-Hans">简体中文</Option>
          <Option value="zh-Hant">繁體中文</Option>
          <Option value="ja">日本語</Option>
          <Option value="en">English</Option>
        </Select>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="基本信息">
          <ProfileForm
            form={profileForm}
            fields={profileFields as FieldData[]}
            onChange={(newFields) => {
              setProfileFields(newFields);
            }}
          />
        </Card>
        <Card
          title="专业技能"
          extra={[
            <Button key="add" type="link" onClick={() => setskillformVisible(true)}>
              添加
            </Button>,
          ]}
        >
          <Row gutter={[16, 24]}>
            {skills.map((skill: any) => (
              <Col key={skill.name} className="gutter-row" xs={24} sm={12} md={6} xxl={4}>
                <Card
                  hoverable
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        setSkillFields([
                          { name: ['_id'], value: skill._id },
                          { name: ['name'], value: skill.name },
                          { name: ['level'], value: skill.level },
                          { name: ['iconUri'], value: skill.iconUri },
                        ]);
                        setskillformVisible(true);
                      }}
                    />,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => deleteSkillConfirm(skill._id, skill.name)}
                    />,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar size="large" style={{ backgroundColor: skill.iconUri }}>
                        {skill.name[0]}
                      </Avatar>
                    }
                    title={skill.name}
                  />
                  <Progress percent={skill.level} width={80} />
                </Card>
              </Col>
            ))}
            {!skills.length ? '暂无内容，请添加' : null}
          </Row>
        </Card>
        <Card title="其他技能描述">
          <OtherSkillForm
            form={otherSkillForm}
            fields={knowledgeFields as FieldData[]}
            onChange={(newFields) => {
              setKnowledgeFields(newFields);
            }}
          />
        </Card>
        <Card
          title="工作经验"
          extra={[
            <Button key="add" type="link" onClick={() => setexpformVisible(true)}>
              添加
            </Button>,
          ]}
        >
          <List
            itemLayout="vertical"
            dataSource={experience}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      setExpFields([
                        { name: ['_id'], value: item._id },
                        { name: ['company'], value: item.company },
                        { name: ['position'], value: item.position },
                        {
                          name: ['startTime'],
                          value: item.startTime ? moment(item.startTime) : '',
                        },
                        { name: ['endTime'], value: item.endTime ? moment(item.endTime) : '' },
                        { name: ['description'], value: item.description },
                      ]);
                      setexpformVisible(true);
                    }}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => deleteExpConfirm(item._id, item.company)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={item.company}
                  description={`${moment(item.startTime).format('YYYY-MM-DD')}-${
                    item.endTime ? moment(item.endTime).format('YYYY-MM-DD') : '至今'
                  }`}
                />
                <div>{`职务：${item.position}`}</div>
                <div>{`工作描述：${item.description}`}</div>
              </List.Item>
            )}
          />
        </Card>
        <Card
          title="项目经验"
          extra={[
            <Button key="add" type="link" onClick={() => setprojectformVisible(true)}>
              添加
            </Button>,
          ]}
        >
          <List
            itemLayout="vertical"
            dataSource={projects}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      setProjectFields([
                        { name: ['_id'], value: item._id },
                        { name: ['name'], value: item.name },
                        { name: ['platform'], value: item.platform },
                        {
                          name: ['timeperiod'],
                          value: item.timeperiod
                            ? [moment(item.timeperiod[0]), moment(item.timeperiod[1])]
                            : '',
                        },
                        { name: ['description'], value: item.description },
                        { name: ['url'], value: item.url },
                      ]);
                      setprojectformVisible(true);
                    }}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => deleteProjectConfirm(item._id, item.name)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`${moment(item.timeperiod[0]).format('YYYY-MM-DD')}-${moment(
                    item.timeperiod[1],
                  ).format('YYYY-MM-DD')}`}
                />
                <div>{`所用技能：${item.platform}`}</div>
                <div>{`项目地址：${item.url}`}</div>
                <div>{`项目描述：${item.description}`}</div>
              </List.Item>
            )}
          />
        </Card>
      </Space>
      <Button
        type="primary"
        style={{ position: 'fixed', bottom: '85px', right: '55px' }}
        onClick={onSubmit}
      >
        保存
      </Button>

      <Modal
        title="技能"
        visible={skillformVisible}
        onOk={addSkill}
        onCancel={() => {
          skillForm.resetFields();
          setskillformVisible(false);
        }}
        okText="提交"
      >
        <SkillForm
          form={skillForm}
          fields={skillFields as FieldData[]}
          onChange={(newFields) => {
            setSkillFields(newFields);
          }}
        />
      </Modal>
      <Modal
        title="工作经验"
        visible={expformVisible}
        onOk={addExp}
        onCancel={() => {
          expForm.resetFields();
          setexpformVisible(false);
        }}
        okText="提交"
      >
        <ExpForm
          form={expForm}
          fields={expFields as FieldData[]}
          onChange={(newFields) => {
            setExpFields(newFields);
          }}
        />
      </Modal>
      <Modal
        title="项目经验"
        visible={projectformVisible}
        onOk={addProject}
        onCancel={() => {
          setprojectformVisible(false);
        }}
        okText="提交"
      >
        <ProjectForm
          form={projectForm}
          fields={projectFields as FieldData[]}
          onChange={(newFields) => {
            projectForm.resetFields();
            setProfileFields(newFields);
          }}
        />
      </Modal>
    </PageContainer>
  );
};

export default connect(({ resume, user, loading }: ConnectState) => ({
  resume: resume.resume,
  user: user.user,
  getting: loading.effects['resume/getResume'],
}))(Resume);
