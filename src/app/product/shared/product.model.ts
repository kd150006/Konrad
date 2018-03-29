export class Product {
  constructor(
    public id: number,
    public status?: string,
    public quantity?: number,
    public number?: string,
    public name?: string,
    public barcode?: string,
    public netPrice?: number,
  ) {}
}
