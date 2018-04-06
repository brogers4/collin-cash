import { NgModule } from '@angular/core';
import { OrUnknownPipe } from './or-unknown/or-unknown';
import { OrDefaultPipe } from './or-default/or-default';
@NgModule({
	declarations: [OrUnknownPipe,
    OrDefaultPipe],
	imports: [],
	exports: [OrUnknownPipe,
    OrDefaultPipe]
})
export class PipesModule {}
