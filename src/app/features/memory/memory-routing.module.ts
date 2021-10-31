import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemoryComponent} from './components/memory.component';

const MEMORY_ROUTER: Routes = [
  {
    path: '',
    component: MemoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(MEMORY_ROUTER)],
  exports: [RouterModule]
})
export class MemoryRoutingModule { }
