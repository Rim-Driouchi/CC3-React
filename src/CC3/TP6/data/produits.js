const categories=['Informatique','Maison','Sport','Livres','Mode'];
export const produits=Array.from({length:5000},
    (_,i)=>({id:i+1,nom:`Produit ${i+1}`,
        categorie:categories[i%categories.length],
        prix:10+((i*37)%4991),stock:i%4!==0}
    )
);