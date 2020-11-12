import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCatgory } from '../../actions/category.action';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import ModelWrapper from '../../components/UI/Model';

/**
 * @auther
 * @function Category
 */

export default function Category() {
    const [categoryName, setcategoryName] = useState('')
    const [parentCategoryId, setparentCategoryId] = useState('')
    const [categoryImage, setcategoryImage] = useState('')
    const category = useSelector(state => state.category)
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getAllCategory());
    // }, [])
    const [show, setShow] = useState(false);
    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        console.log(categoryName, parentCategoryId, categoryImage);
        dispatch(addCatgory(form));
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let categoriess = []
        for (const category of categories) {
            // console.log('category',category);
            categoriess.push(
                <li key={category._id}>
                    {category.name}
                    {category.children ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )
        }
        return categoriess
    }



    const createcategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children) {
                createcategoryList(category.children, options)
            }
        }
        return options
    }
    const handleCategoryimage = (e) => {
        setcategoryImage(e.target.files[0])

    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className=" d-flex justify-content-between">
                            <h3>Category</h3>
                            <button className=" btn btn-outline-primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}

                        </ul>
                    </Col>
                </Row>
            </Container>
            <ModelWrapper
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}

            >
                <Input
                    type='text'
                    value={categoryName}
                    placeholder={'Category name'}
                    onChange={(e) => setcategoryName(e.target.value)}
                />
                <select className='form-control'
                    value={parentCategoryId}
                    onChange={e => setparentCategoryId(e.target.value)}
                >
                    <option>Select Category</option>
                    {createcategoryList(category.categories)
                        .map(option => <option key={option.key} value={option.value}>{option.name}</option>)
                    }
                </select>
                <input
                    className="form-control"
                    type="file"
                    name="categoryImage"
                    onChange={handleCategoryimage}
                />

            </ModelWrapper>

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal> */}
        </Layout>
    )
}
