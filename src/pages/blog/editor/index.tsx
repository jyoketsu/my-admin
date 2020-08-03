import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { ConnectState } from '@/models/connect';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Article as ArticleType } from '@/models/article';
import ReactMarkdown from 'react-markdown';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styles from './index.less';
import CodeBlock from './components/CodeBlock';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

interface Props extends ConnectProps {
  dispatch: Dispatch;
  article: ArticleType;
}

const Editor: React.FC<Props> = ({ dispatch, article }: Props) => {
  const [input, setInput] = useState('');

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

  return (
    <PageContainer
      extra={[
        <Button key="save" type="primary">
          保存
        </Button>,
      ]}
    >
      <Card style={{ height: '100%' }} bodyStyle={{ height: '100%' }}>
        <div className={styles.editorWrapper}>
          <div className={styles.left}>
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
          <div className={styles.right}>
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

export default connect(({ article }: ConnectState) => ({
  article: article.article,
}))(Editor);
