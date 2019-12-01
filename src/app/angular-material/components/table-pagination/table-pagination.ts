import { Product } from '../../../model/product';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table-pagination',
  styleUrls: ['table-pagination.css'],
  templateUrl: 'table-pagination.html',
})

export class TablePaginationComponent implements OnInit, OnDestroy  {

  displayedColumns: string[] = ['name', 'type', 'description', 'quantity', 'acciones'];
  dataSource: any;
  private personas: Product[];
  private ids: number[] = [];
  private personasChangeObs: Subscription;

  @ViewChild(MatPaginator, {static: false})
  paginator: MatPaginator;

  constructor(
    private router: Router,
    private personaService: ProductService,
    ) {
    }

  ngOnInit() {
    this.personasChangeObs = this.personaService.personasChangeObs.subscribe( (personas: Product[]) => {
        if ( this.ids.length === 0 ) {
          personas.forEach( t => {
            this.ids.push(t.id);
          });
        }
        this.personas = personas;
        this.dataSource = new MatTableDataSource<Product>(this.personas);
        this.dataSource.paginator = this.paginator;
    });
  }


  ngOnDestroy() {
    this.personasChangeObs.unsubscribe();
  }

  buscar() {
    this.personaService.getProducts().subscribe(todos => {
      console.log(JSON.stringify(todos));
    });
  }

  aumentar(id: number) {
    this.router.navigateByUrl(`/edit/${id}/aumentar`);
  }

  disminuir(id: number, quantity: number) {
    if (quantity > 0){
      this.router.navigateByUrl(`/edit/${id}/disminuir`);
    }
  }




}


