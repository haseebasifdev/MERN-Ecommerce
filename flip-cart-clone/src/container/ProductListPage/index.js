import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductBySlug } from '../../actions/product.action'
import { Card, Button, Image, Row, Col } from 'react-bootstrap';
import Layout from '../Layout'
import { generatePublicURL } from '../../urlConfig';

const ProductListPage = (props) => {
    const product = useSelector(state => state.product)
    const dispatch = useDispatch()
    const [priceRange, setpriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under25k: 25000,
        under30k: 30000
    })
    useEffect(() => {
        const { match } = props
        dispatch(getProductBySlug(match.params.slug))
    }, [])
    return (
        <div >
            <Layout >
                {
                    Object.keys(product.ProductByPrice).map((key, index) => {
                        if (product.ProductByPrice[key].length > 0) {
                            return (

                                <div className=' container-fluid mt-2'>


                                    <Card >
                                        <Card.Header className=' bg-white'>
                                            <div className=' justify-content-between d-flex'>
                                                <div className='my-auto' >{props.match.params.slug} <span>Rs. {priceRange[key]}</span> </div>
                                                <div><Button variant="primary">view All</Button></div>
                                            </div>
                                        </Card.Header>
                                        <Card.Body><Row>
                                            {
                                                product.ProductByPrice[key].map(product =>

                                                    <Col md={2}>
                                                        {/* <Card.Title>Special title treatment</Card.Title> */}
                                                        <Card.Text className='text-center'>
                                                            <Image src={generatePublicURL(product.productPictures[0].img)} width='100px' />
                                                            <div className=' text-center mt-3'>
                                                                <div>
                                                                    Samsung Glaxy Prime
                                                            </div>
                                                                <div>
                                                                    <span className=' badge badge-info px-2 py-1 '>4.3</span>
                                                                </div>
                                                                <div>
                                                                    <span className=' font-weight-bolder'>{product.price}</span>
                                                                </div>
                                                            </div>
                                                        </Card.Text>

                                                    </Col>

                                                )
                                            }
                                        </Row>
                                        </Card.Body>
                                    </Card>


                                </div>
                            )
                        }
                    })
                }

            </Layout>
        </div>
    )
}

export default ProductListPage
