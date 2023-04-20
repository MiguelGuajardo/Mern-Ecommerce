import React from 'react'
import './Home.css'
import {Product} from './Product.js'

export const Home = () => {
    const product = {
        name:"Bike 1",
        images: [{url: "https://pedegoelectricbikes.com/wp-content/uploads/2022/08/Avenue-ST-Carribean-Blue-Mags.jpg"}],
        price: "$15000",
        _id: "asdasd"
    }
    return (
        <>
            <div className='banner'>
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELLOW</h1>

                <a href='#container'>
                    <button>
                        Scroll <span className="material-symbols-outlined">mouse</span>
                    </button>
                </a>
            </div>
            <h2 className='homeHeading'>Featured Products</h2>
            <div className='container' id='container'>
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </>
    )
}
