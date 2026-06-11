export interface Product { 
  id: string;
  name: string; 
  price?: string; 
} 
 
export const products: Product[] = [ 
  { 
    id: 'sauce-labs-backpack',
    name: 'Sauce Labs Backpack', 
    price: '$29.99' 
  }, 
  { 
    id: 'sauce-labs-bike-light',
    name: 'Sauce Labs Bike Light', 
    price: '$9.99' 
  } 
]; 