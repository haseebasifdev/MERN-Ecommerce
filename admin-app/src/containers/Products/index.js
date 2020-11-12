import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, Row, Col, FormGroup, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import ModelWrapper from '../../components/UI/Model';
import { generatePublicURL } from '../../urlConfig';
import './style.css'
/**
 * @auther
 * @function Products
 */

export default function Products() {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getAllCategory())
    // }, [])
    const cat = useSelector(state => state.category)
    const initialState = ''
    const [productDetails, setproductDetails] = useState(null)
    const [productDetailModel, setproductDetailModel] = useState(false)
    const [name, setname] = useState(initialState)
    const [productPicture, setproductPicture] = useState([])
    const [price, setprice] = useState(initialState)
    const [description, setdescription] = useState(initialState)
    const [quantity, setquantity] = useState(initialState)
    // const [category, setcategory] = useState(initialState)
    const [CategoryId, setCategoryId] = useState(initialState)
    const [show, setShow] = useState(false);
    const product = useSelector(state => state.products)
    const handleClose = () => {
        const form = new FormData();
        form.append('name', name)
        form.append('price', price);
        form.append('description', description)
        form.append('quantity', quantity)
        form.append('category', CategoryId)
        for (let pic of productPicture) {
            form.append('productPicture', pic)
        }
        dispatch(addProduct(form))
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const createcategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createcategoryList(category.children, options)
            }
        }
        return options
    }
    const handleProductPictures = (e) => {
        setproductPicture([
            ...productPicture,
            e.target.files[0]
        ])
    }
    const renderProductModel = () => {
        return (
            <ModelWrapper
                show={show}
                handleClose={handleClose}
                modelTitle={'Add New Product'}
            >
                <Input
                    label='Name'
                    type='text'
                    value={name}
                    placeholder={'Product name'}
                    onChange={(e) => setname(e.target.value)}
                />
                <Input
                    label='Quantity'
                    type='text'
                    value={quantity}
                    placeholder={'Quantity'}
                    onChange={(e) => setquantity(e.target.value)}
                />
                <Input
                    label='Price'
                    type='text'
                    value={price}
                    placeholder={'Price'}
                    onChange={(e) => setprice(e.target.value)}
                />
                <Input
                    label='Description'
                    type='text'
                    value={description}
                    placeholder={'Description'}
                    onChange={(e) => setdescription(e.target.value)}
                />
                <label>Category</label>
                {productPicture.map(pic => <div>{pic.name}</div>)}
                <select className='form-control'
                    value={CategoryId}
                    onChange={e => setCategoryId(e.target.value)}
                >
                    <option>Select Category</option>
                    {createcategoryList(cat.categories)
                        .map(option => <option key={option.key} value={option.value}>{option.name}</option>)
                    }
                </select>
                <input
                    type='file'
                    onChange={handleProductPictures}
                />

            </ModelWrapper>
        )

    }
    const renderProductsShow = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product ?
                            product.products.map((pro, index) =>
                                <tr className='productTR' onClick={() => showProductDetailModel(pro)} key={pro._id}>
                                    <td>{index}</td>
                                    <td>{pro.name}</td>
                                    <td>{pro.price}</td>
                                    <td>{pro.quantity}</td>
                                    <td>{pro.category? pro.category.name:'--'}</td>
                                </tr>
                            )
                            : null
                    }


                </tbody>
            </Table>
        )
    }
    const handleproductDetailModelClode = () => {
        setproductDetailModel(false)
    }
    const showProductDetailModel = (pro) => {
        setproductDetailModel(true)
        setproductDetails(pro)
        console.log(pro);
    }
    const renderProductDetailModel = () => {
        if (!productDetails) {
            return null
        }
        return (
            <ModelWrapper
                show={productDetailModel}
                handleClose={handleproductDetailModelClode}
                modelTitle={'Product Detail'}
                size={'lg'}
            >
                <Row>
                    <Col md={6}>
                        <label className='key'>Name</label>
                        <p className='value'>{productDetails.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className='key'>Price</label>
                        <p className='value'>{productDetails.price}</p>
                    </Col>
                    <Col md={6}>
                        <label className='key'>Quantity</label>
                        <p className='value'>{productDetails.quantity}</p>
                    </Col>
                    <Col md={6}>
                        <label className='key'>Category</label>
                        <p className='value'>{productDetails.category? productDetails.category.name:'--'}</p>
                    </Col>
                    <Col md={12}>
                        <label className='key'>Price</label>
                        <p className='value'>{productDetails.description}</p>
                    </Col>
                    <Col md={12}  >
                        <label className='key'>Pictures</label>
                        <div style={{ display: 'flex' }}>
                            {
                                productDetails.productPictures.map(image =>
                                    <div className='productImageContainer mx-2'  >
                                        <img src={generatePublicURL(image.img)} />
                                    </div>
                                )
                            }
                        </div>

                    </Col>

                </Row>
            </ModelWrapper>
        )
    }
    return (

        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className=" d-flex justify-content-between">
                            <h3>Products</h3>
                            <button className=" btn btn-outline-primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>

                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderProductsShow()}
                    </Col>
                </Row>
            </Container>
            {renderProductModel()}
            {renderProductDetailModel()}

        </Layout>
    )
}



