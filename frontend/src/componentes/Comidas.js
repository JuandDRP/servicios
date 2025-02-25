import React from "react";
import "../hojas-de-estilo/Comidas.css";
import { data } from './../DataComidas';

export const Comidas = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal
}) => {

	const onAddProduct = (product) => {
		if (allProducts.find(item => item.id === product.id)) {
			const updatedProducts = allProducts.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setAllProducts(updatedProducts);
		} else {
			setAllProducts([...allProducts, { ...product, quantity: 1 }]);
		}

		setTotal(total + product.price);
		setCountProducts(countProducts + 1);
	};

	return (
		<div className='container-items'>
			{data.map(product => (
				<div className='item' key={product.id}>
					<figure>
						<img src={product.img} alt={product.nameProduct} />
					</figure>
					<div className='info-product'>
						<h2>{product.nameProduct}</h2>
						<p className='price'>${product.price}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
	);
};