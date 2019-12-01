export class Product {
  id: number;
  name: string;
  type: string;
  description: string;
  quantity: number;

  constructor() {
    this.name = '';
    this.type = '';
    this.description = '';
    this.quantity = 0;
  }

}
