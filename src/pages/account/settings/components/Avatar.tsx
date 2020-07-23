import React from 'react';
import styles from './Avatar.less';

interface Props {
  uri: string | undefined;
}

const Avatar: React.FC<Props> = ({ uri }) => {
  return (
    <div className={styles.avatar}>
      <i style={{ backgroundImage: `url(${uri})` }} />
    </div>
  );
};

export default Avatar;
