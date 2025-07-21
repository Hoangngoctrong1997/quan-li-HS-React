import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function ListProduct() {
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const loadProduct = () => {
    axios.get('http://localhost:9999/products')
      .then(response => {
        const productList = response.data;
        setProducts(productList);
        setCategories([...new Set(productList.map(product => product.category))]);
      })
      .catch(error => {
        console.error(error);
      });
  };
let filterProduct =(a)=>{
    if(selectedCategory){
    return a.filter(item => item.category === selectedCategory)    
    }else{
        return a
    }
} 
  useEffect(() => {
    loadProduct();
  }, []);
let handleShow = (id)=>{
    if(id !== currentProduct){
        setCurrentProduct(id);
}else {
        setCurrentProduct(null)}
}
let handleEdit =(item)=>{
    setIsEdit(true);
    setSelectedProduct(item);
}
let handleOnchange =(e)=>{
    let { name, value } = e.target;
    let updated = { ...selectedProduct };
    updated[name] = value;
    setSelectedProduct(updated);
}
let Save = ()=>{
    axios.put("http://localhost:9999/products/" + selectedProduct.id, selectedProduct).then(x => {loadProduct()
    })
    setSelectedProduct({})
}
let deleteProduct = (id) => {
    axios.delete(`http://localhost:9999/products/${id}`)
        .then(() => {
        loadProduct();
        })
        .catch(error => {
        console.error('Error deleting product:', error);
        });
}
  return (
    <>
      <h3>Lọc theo danh mục</h3>
      <label htmlFor="category">Chọn danh mục:</label>
      <select
        id="category"
        name="category"
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        {categories.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      <hr/>
        {isEdit && (
            <div>
                 <input type="text" name="title" value={selectedProduct.title} onChange={handleOnchange} />
                 <input type="text" name="category" value={selectedProduct.category} onChange={handleOnchange} />
                 <input type="number" name="price" value={selectedProduct.price}  onChange={handleOnchange}/>
                 <button onClick={Save}>Save</button>
            </div>
        )}
      {filterProduct(products).map(item => (
          <><p key={item.id}>{item.title}</p>
            <button onClick={()=>{handleShow(item.id)}}>Show reviews</button>
            <button onClick={()=>{handleEdit(item)}}>Edit</button>
              <button onClick={()=>{deleteProduct(item.id)}}>Delete</button>
              <button onClick={()=>{handleEdit(item)}}>Add Reviews</button>
            {currentProduct === item.id && item.reviews.map(review =>(
                <div key={review.id}>
                    <p>reviewerName: {review.reviewerName}</p>
                    <p>comment: {review.comment}</p>
                    <p>date: {review.date}</p>
                    <p>rating: {review.rating}</p>
                </div>
            ))}
          </>
        ))}
    </>
  );
}
export default ListProduct;
