import { NoTabComponent } from './../no-tab/no-tab.component';
import { WorkspaceConfig } from '../models/workspace-config.model';

export class WorkspaceDefaultConfig {
  private static defaults: WorkspaceConfig<any> = {
    title: 'Untitled ($$)',
    disableClose: false,
    maxWidth: '90vw',
    minWidth: '40vw',
    minimizeOnNavigation: false,
    width: '70vw',
    placeholderComponent: NoTabComponent
  };

  static get config(): WorkspaceConfig<any> {
    return { ...this.defaults };
  }

  public static setDefaults(config: WorkspaceConfig<any>): void {
    WorkspaceDefaultConfig.defaults = { ...WorkspaceDefaultConfig.defaults, ...config };
  }
}
