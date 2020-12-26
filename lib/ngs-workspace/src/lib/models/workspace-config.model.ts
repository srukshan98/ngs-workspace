import { ComponentType } from '@angular/cdk/portal';
export class WorkspaceConfig<D> {
  title?: string;
  minimizeOnNavigation?: boolean;
  data?: D | null;
  disableClose?: boolean;
  maxWidth?: number | string;
  minWidth?: number | string;
  width?: number | string;
  placeholderComponent?: ComponentType<any>;
}
