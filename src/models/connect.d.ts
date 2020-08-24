import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import { LinkModelState } from './link';
import { CategoryModelState } from './category';
import { TagModelState } from './tag';
import { ArticleModelState } from './article';
import { SystemModelState } from './system';
import { ResumeModelState } from './resume';

export { GlobalModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    login?: boolean;
    user?: boolean;
    link?: boolean;
    category?: boolean;
    tag?: boolean;
    article?: boolean;
    system?: boolean;
    resume?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  login: StateType;
  user: UserModelState;
  link: LinkModelState;
  category: CategoryModelState;
  tag: TagModelState;
  article: ArticleModelState;
  system: SystemModelState;
  resume: ResumeModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
