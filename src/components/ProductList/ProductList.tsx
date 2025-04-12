import style from "./ProductList.module.css";
import { useEffect, useRef, useState } from "react";
import { fetchProducts } from "../../const/apis";
import logo from "../../assets/piso.png";
import Product from "../Product/Product";
import basket from "../../assets/basket.png"
import ModalBasket from "../ModalBasket/ModalBasket"

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchProducts().then(res => {
            setProducts(res);
            setFilteredProducts(res);
        });
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    useEffect(() => {
        if (input.length >= 3) {
            const results = products.filter(product =>
                product.title.toLowerCase().includes(input.toLocaleLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts(products);
        }
    }, [input, products]);

    const countIncrement = () => {
        setCount(count + 1);
    };

    return (
        <div className={style.allBox}>
            <img src={logo} alt="" />
            <h1>Amazon Products</h1>
            <div className={style.stickyHeader}>
                <div className={style.zambyux}>
                    <label htmlFor="search-prod">Search Product</label>
                    <input
                        ref={inputRef}
                        type="text"
                        id="search-prod"
                        value={input}
                        onChange={handleChange}
                    />
                </div>
                <div className={style.basket}>
                    <img src={basket} alt="Basket" />
                    <span className={style.productCount}>{count}</span>
                </div>
            </div>

            <div className={style.productList}>
                {filteredProducts.map(product => (
                    <Product key={product.id} {...product} countIncrement={countIncrement} />
                ))}
            </div>

            <button onClick={() => inputRef.current?.focus()}>Focus Search</button>
        </div>
    );
}

export default ProductList;
