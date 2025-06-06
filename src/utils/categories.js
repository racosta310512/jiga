// src/utils/categories.js
import {
  ShoppingBag,
  Shirt,
  Smartphone,
  Sofa,
  PawPrint,
  ToyBrick,
  Grid3X3
} from 'lucide-react';

export const categories = [
  { name: 'Todas', label: 'Todas', icon: Grid3X3 },
  { name: 'ropa', label: 'Ropa', icon: Shirt },
  { name: 'electronica', label: 'Electrónica', icon: Smartphone },
  { name: 'hogar', label: 'Hogar', icon: Sofa },
  { name: 'mascotas', label: 'Mascotas', icon: PawPrint },
  { name: 'juguetes', label: 'Juguetes', icon: ToyBrick },
  { name: 'otros', label: 'Otros', icon: ShoppingBag },
];
