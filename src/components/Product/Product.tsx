import style from "./Product.module.css"

function Product({id,title,category,image,price,countIncrement}) {
    return (
        <div className={style.productBox} key={id}>
           <img src={image} alt="" />
           <h2>{title}</h2>
           <p>{category}</p>
           <p>{price}</p>
           <button onClick={countIncrement}>Buy</button>
           
        </div>
    )
}

export default Product;  