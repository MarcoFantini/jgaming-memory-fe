import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import * as UserSelectors from '../../core/store/user/user.selectors';
import {AppState} from '../../app-state';
import {Role} from '../enums/role.enum';
import {User} from '../store/user/model/user.model';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  @Input() appHasRole: Role[];

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        select(UserSelectors.getUser),
        map((user: User) => {
          return !this.appHasRole.length || this.appHasRole.includes(user.role);
        }),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(isLogged => {
        if (isLogged) {
          this.view.createEmbeddedView(this.template);
        } else if (!isLogged) {
          this.view.clear();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

}
