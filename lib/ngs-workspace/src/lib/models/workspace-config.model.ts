import { ComponentType } from '@angular/cdk/portal';
import { StyleType } from '../config/style.type';
import { IWorkspaceTabConfig } from './i-workspace-tab-config';
import { IWorkspaceConfig } from './i-workspace.config';
export class WorkspaceConfig<D> implements IWorkspaceConfig, IWorkspaceTabConfig<D> {
  title?: string;
  minimizeOnNavigation?: boolean;
  data?: D | null;
  disableClose?: boolean;
  maxWidth?: number | string;
  minWidth?: number | string;
  width?: number | string;
  maxTabCount?: number;
  placeholderComponent?: ComponentType<any>;
  direction: 'RTL' | 'LTR';
  showSideBtn: boolean;
  classes?: StyleType;
}
