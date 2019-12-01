import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablePaginationComponent } from './angular-material/components/table-pagination/table-pagination';
import { ConfirmDialogComponent } from './angular-material/components/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './angular-material/angular-material.module';
import { reducer } from './redux/reducers/product-type.reducer';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { InfoDialogComponent } from './angular-material/components/info-dialog/info-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductListComponent,
    TablePaginationComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({
      productTypes: reducer
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  entryComponents: [
    ConfirmDialogComponent,
    InfoDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
