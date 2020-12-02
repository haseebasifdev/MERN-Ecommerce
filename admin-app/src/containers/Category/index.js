import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCatgory, getAllCategory, UpdateCatgories } from '../../actions/category.action';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import ModelWrapper from '../../components/UI/Model';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosArrowDown, IoIosCheckbox, IoIosCheckboxOutline, IoIosArrowForward } from 'react-icons/io'
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
    const [checked, setchecked] = useState([])
    const [expanded, setexpanded] = useState([])
    const [checkedArray, setcheckedArray] = useState([])
    const [expandedArray, setexpandedArray] = useState([])
    const [updateCategoryModel, setupdateCategoryModel] = useState(false)
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
            categoriess.push({
                value: category._id,
                label: category.name,
                children: category.children && category.children.length > 0 && renderCategories(category.children),
                // children: [
                //     { value: 'phobos', label: 'Phobos' },
                //     { value: 'deimos', label: 'Deimos' },
                // ],
            })
            // categoriess.push(
            //     <li key={category._id}>
            //         {category.name}
            //         {category.children ? (<ul>{renderCategories(category.children)}</ul>) : null}
            //     </li>
            // )
        }
        return categoriess
    }



    const createcategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId })
            if (category.children) {
                createcategoryList(category.children, options)
            }
        }
        return options
    }
    const handleCategoryimage = (e) => {
        setcategoryImage(e.target.files[0])

    }
    const updatecategory = () => {
        setupdateCategoryModel(true);
        const categories = createcategoryList(category.categories);
        const checkedArraythis = [];
        const expandedArraythis = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            checkedArraythis.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            expandedArraythis.push(category)
        })
        setcheckedArray(checkedArraythis)
        setexpandedArray(expandedArraythis)
        // console.log(categories);
        console.log(checkedArraythis, expandedArraythis)
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type = 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setcheckedArray(updatedCheckedArray);
        }
        if (type = 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setexpandedArray(updatedExpandedArray);
        }
    }
    const updateCategoriesForm = () => {
        setupdateCategoryModel(false)
        var formData = new FormData();

        expandedArray.length>0 && expandedArray.forEach((item, index) => {
        
            formData.append('_id', item.value)
            formData.append('name', item.name)
            formData.append('parentId', item.parentId ? item.parentId : "")
            formData.append('type', item.type)
        });
        checkedArray.length>0 && checkedArray.forEach((item, index) => {
          
            formData.append('_id', item.value)
            formData.append('name', item.name)
            formData.append('parentId', item.parentId ? item.parentId : "")
            formData.append('type', item.type)
        });
        dispatch(UpdateCatgories(formData))
        .then(result=>{
            if(result){
                dispatch(getAllCategory())
            }
        })

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
                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setchecked(checked)}
                                onExpand={expanded => setexpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />,
                                    expandAll: <span className="rct-icon rct-icon-expand-all" />,
                                    collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                                    parentClose: <span className="rct-icon rct-icon-parent-close" />,
                                    parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                                    leaf: <span className="rct-icon rct-icon-leaf" />,
                                }}
                            />
                            {/* {renderCategories(category.categories)} */}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <button className=" btn btn-danger mr-2">Delete</button>
                        <button className="btn btn-warning" onClick={updatecategory}>Edit</button>
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


            {/* Model Edit category */}

            <ModelWrapper
                show={updateCategoryModel}
                handleClose={() => updateCategoriesForm()}
                modalTitle={'Update Categories'}
                size="lg"
            >
                <Row>
                    <Col>
                        <h4>Expended
                    </h4>
                    </Col>
                </Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    type='text'
                                    value={item.name}
                                    placeholder={'Category name'}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                /></Col>
                            <Col> <select className='form-control'
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                            >
                                <option>Select Category</option>
                                {createcategoryList(category.categories)
                                    .map(option => <option key={option.key} value={option.value}>{option.name}</option>)
                                }
                            </select>
                            </Col>
                            <Col>
                                <select className='form-control'>
                                    <option>Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>


                    )
                }
                <h4>Checked</h4>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    type='text'
                                    value={item.name}
                                    placeholder={'Category name'}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                /></Col>
                            <Col> <select className='form-control'
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                            >
                                <option>Select Category</option>
                                {createcategoryList(category.categories)
                                    .map(option => <option key={option.key} value={option.value}>{option.name}</option>)
                                }
                            </select>
                            </Col>
                            <Col>
                                <select className='form-control'>
                                    <option>Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>


                    )
                }

                {/* <input
                    className="form-control"
                    type="file"
                    name="categoryImage"
                    onChange={handleCategoryimage}
                /> */}

            </ModelWrapper>


        </Layout>
    )
}
