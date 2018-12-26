import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { RelativeTimesPipe } from './relative-times/relative-times';
@NgModule({
	declarations: [SearchPipe,
    RelativeTimesPipe],
	imports: [],
	exports: [SearchPipe,
    RelativeTimesPipe]
})
export class PipesModule {}
