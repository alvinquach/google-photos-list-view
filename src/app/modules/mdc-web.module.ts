import { NgModule } from '@angular/core';
import { MdcButtonModule, MdcIconModule } from '@angular-mdc/web';

const MdcWebModules = [
    MdcButtonModule,
    MdcIconModule
];

@NgModule({
    imports: MdcWebModules,
    exports: MdcWebModules
})
export class MdcWebModule { }
