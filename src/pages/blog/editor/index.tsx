/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Card, Button, Select, Tag, Space, message } from 'antd';
import { ConnectState } from '@/models/connect';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Article as ArticleType } from '@/models/article';
import { Category as CategoryType } from '@/models/category';
import { Tag as TagType } from '@/models/tag';
import ReactMarkdown from 'react-markdown';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styles from './index.less';
import CodeBlock from './components/CodeBlock';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const { Option } = Select;

interface Props extends ConnectProps {
  dispatch: Dispatch;
  location: any;
  article: ArticleType;
  categories: CategoryType[];
  tags: TagType[];
}

const Editor: React.FC<Props> = ({ dispatch, location, article, categories, tags }: Props) => {
  const [input, setInput] = useState(
    '# 请输入标题\n请输入正文\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
  );
  const [category, setCategory] = useState<any>(null);
  const [tag, setTag] = useState<any>(null);

  const articleId = location.query.id;

  // 获取分类和标签
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'tag/getTags',
      });
      dispatch({
        type: 'category/getCategories',
      });
    }
  }, [dispatch]);

  // 获取文章详情
  useEffect(() => {
    if (articleId) {
      dispatch({
        type: 'article/getArticleById',
        _id: articleId,
      });
    }
  }, [articleId]);

  // 设定文章状态
  useEffect(() => {
    if (article._id) {
      setInput(article.content);
      setCategory(article.category);
      setTag(article.tags);
    }
  }, [article._id, article.content, article.category, article.tags]);

  function handleCommit() {
    if (!input) {
      return message.warning('文章内容不能为空！');
    }
    if (!category) {
      return message.warning('请选择类别！');
    }
    if (!tag) {
      return message.warning('请选择标签！');
    }
    const imgReg = /<img.*?(?:>|\/>)/gi; // 匹配图片中的img标签
    const srcReg = /src=['"]?([^'"]*)['"]?/i; // 匹配图片中的src

    let innerHtml;
    let cover: any = '';
    let title: string = '';
    let snippet: string = '';
    let dom = document.getElementById('editor-preview');
    if (dom) {
      // 获取title，既一个dom
      const firstNode: any = dom.childNodes[0];
      title = firstNode ? firstNode.innerHTML : '';

      innerHtml = dom.innerHTML;
      // 筛选出所有的img
      const arr = innerHtml.match(imgReg);
      if (arr) {
        const srcMatch = arr[0].match(srcReg);
        if (srcMatch) {
          // 将第一个图片作为封面
          // eslint-disable-next-line prefer-destructuring
          cover = srcMatch[1];
        }
      }

      // 获取摘要
      innerHtml = dom.innerHTML;
      // 去除标签
      innerHtml = innerHtml.replace(/<\/?.+?>/g, '');
      innerHtml = innerHtml.replace(/&nbsp;/g, '');
      // 去除标题
      innerHtml = innerHtml.replace(title, '');
      // 截取字符串得到摘要
      snippet = innerHtml.substr(0, 200);
    }

    // 编辑
    if (article._id) {
      dispatch({
        type: 'article/updateArticle',
        _id: article._id,
        title,
        cover,
        snippet,
        content: input,
        category,
        tags: tag,
      });
    } else {
      // 新增
      dispatch({
        type: 'article/addArticle',
        title,
        cover,
        snippet,
        content: input,
        auth: '5ecb7b68e749d86cea7874fb',
        category,
        tags: tag,
        articleType: 1,
      });
    }
    dom = null;
    innerHtml = null;
    return false;
  }

  return (
    <PageContainer
      content={[
        <div key="category-tag" className={styles.categoryAndTag}>
          <Space>
            <Select
              placeholder="请选择类别"
              style={{ width: '120px' }}
              value={category || undefined}
              onChange={(value) => setCategory(value)}
            >
              {categories.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <Select
              mode="multiple"
              placeholder="请选择标签"
              style={{ minWidth: '120px' }}
              value={tag || undefined}
              onChange={(value) => setTag(value)}
            >
              {tags.map((item) => (
                <Option key={item._id} value={item._id}>
                  <Tag color={item.color}>{item.name}</Tag>
                </Option>
              ))}
            </Select>
          </Space>
        </div>,
      ]}
      extra={[
        <Button key="save" type="primary" onClick={handleCommit}>
          保存
        </Button>,
      ]}
    >
      <Card style={{ height: '100%' }} bodyStyle={{ height: '100%' }}>
        <div className={styles.editorContainer}>
          <div className={styles.editorWrapper}>
            <CodeMirror
              value={input}
              options={{
                mode: 'markdown',
                theme: 'material',
                lineNumbers: true,
                lineWrapping: true,
              }}
              onBeforeChange={(editor, data, value) => {
                setInput(value);
              }}
              // onChange={(editor, metadata, value) => {}}
            />
          </div>
          <div className={styles.editorPreview} id="editor-preview">
            <ReactMarkdown
              source={input}
              skipHtml={false}
              escapeHtml={false}
              renderers={{ code: CodeBlock }}
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default connect(({ article, category, tag }: ConnectState) => ({
  article: article.article,
  categories: category.categories,
  tags: tag.tags,
}))(Editor);
