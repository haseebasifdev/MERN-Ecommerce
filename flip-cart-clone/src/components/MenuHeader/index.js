import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../actions'
import './style.css'




const MenuHeader = () => {
  const category=useSelector(state=>state.category)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getAllCategory())
  },[])

  const renderCategories = (categories) => {
    let categoriess = []
    for (const category of categories) {
      // console.log('category',category);
      categoriess.push(
        <li key={category._id}>
          {category.parentId?<a href={category.slug}>{category.name}</a>:<span>{category.name}</span>}
          {/* {category.name} */}
          {category.children ? (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      )
    }
    return categoriess
  }



  return (
    <div className='menuHeader'>
      <ul>
        {category.categories?renderCategories(category.categories):null}
      </ul>
    </div>
  )
}

export default MenuHeader
