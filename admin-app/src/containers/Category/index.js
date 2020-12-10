import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCatgory, getAllCategory, deleCategories, UpdateCatgories } from '../../actions/category.action';
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import ModelWrapper from '../../components/UI/Model';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosArrowDown, IoIosCheckbox, IoIosCheckboxOutline, IoIosArrowForward } from 'react-icons/io'
import DeleteModel from './components/DeleteModel';
import AddCategoryModel from './components/AddCategoryModel'
import UpdateModel from './components/UpdateModel';
import './style.css'
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
    const [deleteModel, setdeleteModel] = useState(false)
    // useEffect(() => {
    //     dispatch(getAllCategory());
    // }, [])
    const [show, setShow] = useState(false);
    const AddNewCategory = () => {
        const form = new FormData();
        if (categoryName) {
            form.append('name', categoryName);
            form.append('parentId', parentCategoryId);
            form.append('categoryImage', categoryImage);
            console.log(categoryName, parentCategoryId, categoryImage);
            dispatch(addCatgory(form));
        }
        setShow(false)
    };
    const ShowAddModel = () => setShow(true);

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
    const setCategoryform = () => {
        updatecategory();
        setupdateCategoryModel(true);
    }
    const updatecategory = () => {
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
        console.log('updated Funcytion call', checkedArray, expandedArray)
    }
    const ShowDeleteModel = () => {
        updatecategory();
        setdeleteModel(true);
    }
    const DeleteCategories = () => {
        setdeleteModel(false);
        const formData = new FormData();
        checkedArray.length > 0 && checkedArray.forEach((item, index) => {
            formData.append('_id', item.value)
        });
        console.log('Delete Funcytion call', checkedArray, expandedArray)
        if (checkedArray.length > 0) {
            console.log('Delete Funcytion call', checkedArray, expandedArray)
            dispatch(deleCategories(checkedArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                    }
                })
            setcheckedArray([]);
            setexpandedArray([]);
        }
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

        expandedArray.length > 0 && expandedArray.forEach((item, index) => {

            formData.append('_id', item.value)
            formData.append('name', item.name)
            formData.append('parentId', item.parentId ? item.parentId : "")
            formData.append('type', item.type)
        });
        checkedArray.length > 0 && checkedArray.forEach((item, index) => {

            formData.append('_id', item.value)
            formData.append('name', item.name)
            formData.append('parentId', item.parentId ? item.parentId : "")
            formData.append('type', item.type)
        });
        dispatch(UpdateCatgories(formData))
            .then(result => {
                if (result) {
                    dispatch(getAllCategory())
                    setcheckedArray([])
                    setexpandedArray([]);
                }
            })

    }
    const colseDeleteModel = () => {
        setdeleteModel(false);
        console.log('updated Funcytion call', checkedArray, expandedArray)
        setcheckedArray([])
        setexpandedArray([])
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className=" d-flex justify-content-between">
                            <h3>Category</h3>
                            <button className=" btn btn-outline-primary" onClick={ShowAddModel}>Add</button>
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
                        <button className=" btn btn-danger mr-2" onClick={ShowDeleteModel}>Delete</button>
                        <button className="btn btn-warning" onClick={setCategoryform}>Edit</button>
                    </Col>
                </Row>
            </Container>
            <DeleteModel
                deleteModel={deleteModel}
                colseDeleteModel={colseDeleteModel}
                deleteCategories={DeleteCategories}
            />

            <AddCategoryModel
                show={show}
                AddNewCategory={AddNewCategory}
                setcategoryName={setcategoryName}
                setparentCategoryId={setparentCategoryId}
                createcategoryList={createcategoryList}
                handleCategoryimage={handleCategoryimage}
                categoryName={categoryName}
                parentCategoryId={parentCategoryId}
                categoryList={createcategoryList(category.categories)}
            />


            <UpdateModel
                categoryList={createcategoryList(category.categories)}
                handleCategoryInput={handleCategoryInput}
                expandedArray={expandedArray}
                updateCategoriesForm={() => updateCategoriesForm()}
                updateCategoryModel={updateCategoryModel}
                checkedArray={checkedArray}
            />
        </Layout>
    )
}
