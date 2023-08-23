import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  view: 'grid' | 'list' = 'list';
  sortby: 'default' | 'htl' | 'lth' = 'default';
  products: Product[] = [];
  category='';
  searchValue="";
  inputCate?: string;
expression: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.category=this.expression;
      console.log(this.category);
      
      // if (this.searchValue){
      //   this.navigationService
      //     .getProducts(this.searchValue, 3)
      //     .subscribe((res: any) => {
      //       this.products = res;
      //       console.log(this.products);
      //     });
      // }
      
      
        if(this.searchValue=="")
        this.navigationService.GetAllProducts().subscribe(res=>{
          this.products = res;
        })
      

      
        
    });
  }
  search(searchValue: string) {
    // Access the search value here and perform the desired action
    console.log('Search value:', searchValue);
    this.searchValue = searchValue;
    // You can also call a service or perform other operations with the search value
    // e.g., this.myService.search(searchValue);

    this.navigationService
          .getProducts(this.searchValue, 4)
          .subscribe((res: any) => {
            console.log(res);
            this.products = res;
            console.log(this.products);
          });

    
  }

  

  sortByPrice(sortKey: string) {
    this.products.sort((a, b) => {
      if (sortKey === 'default') {
        return a.productId > b.productId ? 1 : -1;
      }
      return (
        (sortKey === 'htl' ? 1 : -1) *
        (this.utilityService.applyDiscount(a.price, a.offerRate) >
        this.utilityService.applyDiscount(b.price, b.offerRate)
          ? -1
          : 1)
      );
    });
  }
   handelinputCateButton() {
    console.log(this.inputCate)
  }
  
}



