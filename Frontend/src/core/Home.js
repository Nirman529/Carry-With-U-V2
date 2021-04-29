import React, { useState, useEffect} from 'react'
import "../styles.css"
import Base from './Base';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';

export default function Home() {

        const [products, setProducts] = useState([])
        // const [error, setError] = useState(false);

        const preload = () => {
            getAllProducts().then(data => {
                if(data && data.error) {
                    console.log(data.error);
                } else {
                    setProducts(data);
                }
            })
        }
    
        useEffect(() => {
            preload();
        }, [])
    
        return (
        <Base title="Home Page" description="Welcome to Carry With U">
            <div className="r-cards text-center">                
                {/* <h1 className="text-white">All Products</h1> */}

                {products.map((product, index) => {
                    return (
                        <div key={index} className="mb-4">
                            <Card product={product} />
                            
                        </div> 
                    );
                })}
            </div>
        </Base>
    );
}
