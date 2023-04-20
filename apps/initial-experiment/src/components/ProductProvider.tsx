import { PropsWithChildren, createContext, useContext, useState } from "react";
import { defaultProduct } from "../defaultProduct";
import { ProductInfo } from "./productTypes";

export default function ProductProvider({ children }: PropsWithChildren) {
  return (
    <ProductContext.Provider value={useState<ProductInfo>(defaultProduct)}>
      {children}
    </ProductContext.Provider>
  );
}

const ProductContext = createContext<
  [product: ProductInfo, setProduct: (value: ProductInfo) => void]
>(undefined!);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
