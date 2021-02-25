import { ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';

// @Injectable()

export abstract class WorkspaceTabRef<T, R = any> {
  referenceId: number;
  componentRef: ComponentRef<T>;
  displayTitle: string;
  abstract onTabVisit(): Observable<T>;
  abstract onTabLeave(): Observable<void>;
  abstract onClose(): Observable<R | undefined>;
  abstract onOpen(): Observable<void>;
  abstract minimize(): void;
  abstract close(data?: R): void;
}
