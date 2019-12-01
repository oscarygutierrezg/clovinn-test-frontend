import { Product } from '../../model/product';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductType } from '../../model/product-type';
import { AppState } from '../../redux/state/app.state';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmDialogComponent } from 'src/app/angular-material/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InfoDialogComponent } from 'src/app/angular-material/components/info-dialog/info-dialog.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  product: Product;
  productForm: FormGroup;
  nameCtrl: FormControl;
  descriptionCtrl: FormControl;
  quantityCtrl: FormControl;
  quantity: number;
  typeCtrl: FormControl;
  productTypes: Observable < ProductType[] > ;
  idProduct: string;
  accion: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog,
    private store: Store < AppState > ) {
    this.productTypes = this.store.select('productTypes');
  }


  ngOnInit(): void {

    this.idProduct = this.route.snapshot.paramMap.get('id');
    this.accion = this.route.snapshot.paramMap.get('accion');
    this.quantity = undefined;
    if (this.idProduct) {
      this.productService.getProduct(this.idProduct).subscribe(product => {
        if (product.quantity <= 0 && this.accion === 'disminuir') {
          this.showModal('ERROR', 'El stock actual no permite disminuir el inventario');
          this.router.navigateByUrl('/');
        }
        this.product = product;
        this.setFormControl();
      });
    } else {
      this.product = new Product();
      this.setFormControl();
    }
  }

  setFormControl() {
    this.nameCtrl = new FormControl(this.product.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),

      this.descriptionCtrl = new FormControl(this.product.description, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),

      this.typeCtrl = new FormControl(this.product.type, [
        Validators.required
      ]),
      this.quantityCtrl = new FormControl(this.quantity, [Validators.required, Validators.min(1), Validators.max(9999999)]);

    this.productForm = new FormGroup({
      productName: this.nameCtrl,
      productType: this.typeCtrl,
      productDescription: this.descriptionCtrl,
      productQuantity: this.quantityCtrl
    }, );
  }

  get productType() {
    return this.productForm.get('productType');
  }

  get productName() {
    return this.productForm.get('productName');
  }

  get productDescription() {
    return this.productForm.get('productDescription');
  }

  get productQuantity() {
    return this.productForm.get('productQuantity');
  }


  guardar() {
    if (this.idProduct) {
      if (this.accion === 'disminuir' && ((this.product.quantity - this.quantity) < 0 )) {
      this.showModal('ERROR', `El stock actual ${this.product.quantity} no permite disminuir el inventario en ${this.quantity}`);
      return;
    }
      this.onConfirmUpdate();
    } else {
      this.product.id = undefined;
      this.product.quantity = this.quantity;
      this.productService.addProduct(this.product)
        .subscribe(product => {
          console.log(JSON.stringify(product));
          this.productService.getProducts();
          this.router.navigateByUrl('/');
        });
    }
  }

  onConfirmUpdate() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Atención',
        body: `¿Está seguro de  ${this.accion} en  ${this.quantity} el producto  ${this.product.name}?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.accion === 'aumentar') {
          this.product.quantity += this.quantity;
        } else if (this.accion === 'disminuir') {
          this.product.quantity -= this.quantity;
        }
        this.productService.updateProduct(this.product)
          .subscribe(product => {
            console.log(JSON.stringify(product));
            this.productService.getProducts();
            this.router.navigateByUrl('/');
          });
      }
    });
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  showModal(title: string, body: string) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title,
        body,
      }
    });
}

}
