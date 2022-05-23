import { useParams, useNavigate } from 'react-router-dom'
import React from "react";

const ProductDetails = () => {
    const navigate = useNavigate()
    const PRODUCT_ARRAY = [
        {
            id: 'p1', name: 'Book', description: 'this is for books'
        },
        {
            id: 'p2', name: 'Paper', description: 'this is for paper'
        },
        {
            id: 'p3', name: 'Pens', description: 'this is for pens'
        }
    ]

    const params = useParams()
    const product_data = PRODUCT_ARRAY.find((product) => product.id === params.productId)
    if (!product_data) {
        return <p>No Product Found</p>
    }
    const backButton = () => {
        navigate(-1)
    }
    return (
        <React.Fragment>
            <button onClick={backButton}>Back</button>
            <h1>Product Details</h1>
            <p>{product_data.name}</p>
            <p>{product_data.description}</p>
        </React.Fragment>
    )
}

export default ProductDetails