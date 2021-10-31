import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemoryRoutingModule} from './memory-routing.module';
import {CoreModule} from '../../core/core.module';
import {MemoryComponent} from './components/memory.component';
import {TranslateModule} from '@ngx-translate/core';
import {MemoryGameComponent} from './components/memory-game/memory-game.component';
import {MemoryInstanceComponent} from './components/memory-instance/memory-instance.component';
import {MmssPipe} from '../../core/pipe/mmss.pipe';
import {MemorySettingsComponent} from './components/memory-settings/memory-settings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap';

@NgModule({
    declarations: [
        MmssPipe,
        MemoryComponent,
        MemoryGameComponent,
        MemoryInstanceComponent,
        MemorySettingsComponent,
        MemoryInstanceComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        FormsModule,
        MemoryRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        TooltipModule
    ]
})
export class MemoryModule {
}
