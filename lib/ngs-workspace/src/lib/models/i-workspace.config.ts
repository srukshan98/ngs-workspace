import { ComponentType } from '@angular/cdk/portal';


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
  workspaceContainerClass?: string;
}
