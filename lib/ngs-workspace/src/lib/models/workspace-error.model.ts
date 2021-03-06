import { WorkspaceTabRef } from './workspace-tab-ref.model';
import { WorkspaceErrorTypes, WorkspaceErrorTypesV2 } from './workspace-error.types';
export interface WorkspaceErrorModel {
  ref: WorkspaceTabRef<any>;
  error: WorkspaceErrorTypes,
  errorV2: WorkspaceErrorTypesV2,

  message?: string;
  content?: any;
}
