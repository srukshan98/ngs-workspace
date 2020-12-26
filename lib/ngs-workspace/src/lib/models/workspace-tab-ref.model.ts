import { Observable } from 'rxjs';

// @Injectable()

export abstract class WorkspaceTabRef<T, R> {
  referenceId: number;
  abstract onTabVisit(): Observable<T>;
  abstract onTabLeave(): Observable<void>;
  abstract onClose(): Observable<R | undefined>;
  abstract onOpen(): Observable<void>;
  abstract minimize(): void;
  abstract close(data?: R): void;
}
