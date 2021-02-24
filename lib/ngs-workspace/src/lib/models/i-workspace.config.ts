import { ComponentType } from '@angular/cdk/portal';
import { StyleType } from '../config/style.type';
import { WorkspaceAnimationTimingType } from './workspace-animation-timing.type';


export class IWorkspaceConfig {
  title?: string;
  minimizeOnNavigation?: boolean;
  disableClose?: boolean;
  maxWidth?: number | string;
  minWidth?: number | string;
  width?: number | string;
  maxTabCount?: number;
  placeholderComponent?: ComponentType<any>;
  direction?: 'RTL' | 'LTR';
  showSideBtn?: boolean;
  classes?: StyleType;
  handleTabClose?: boolean;
  tabChangeAnimation?: boolean;
  animationDuration?: number;
  animationTiming?: WorkspaceAnimationTimingType;
}
