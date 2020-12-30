import { ComponentType } from '@angular/cdk/portal';
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
  placeholderComponent?: ComponentType<any>;
}
