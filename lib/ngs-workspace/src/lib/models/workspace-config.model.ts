import { ComponentType } from '@angular/cdk/portal';
import { IWorkspaceConfig } from './i-workspace.config';
export class WorkspaceConfig<D> implements IWorkspaceConfig {
  title?: string;
  minimizeOnNavigation?: boolean;
  data?: D | null;
  disableClose?: boolean;
  maxWidth?: number | string;
  minWidth?: number | string;
  width?: number | string;
  placeholderComponent?: ComponentType<any>;
}
