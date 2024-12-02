import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Electronics',
    subcategory: '',
    price: '',
    priceCategory: '$0-50',
    location: '',
    photos: [],
    isPremium: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photos: e.target.files });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, isPremium: !formData.isPremium });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);  // Changed from 'title' to 'name'
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('category', formData.category);
    formDataToSubmit.append('subcategory', formData.subcategory);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('priceCategory', formData.priceCategory);
    formDataToSubmit.append('location', formData.location);
    

    

    // Append multiple files to FormData
    for (let i = 0; i < formData.photos.length; i++) {
      formDataToSubmit.append('photos', formData.photos[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading product:', error.response.data.message);
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Electronics',
      subcategory: '',
      price: '',
      priceCategory: '$0-50',
      location: '',
      photos: [],
      isPremium: false,
    });
  };

  return (
    <div className="container py-5">
      <div className="col-md-6 mx-auto bg-white p-4 border rounded">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter a catchy name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Provide more detailed information"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Item Category</label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Electronics</option>
              <option>Clothes</option>
              <option>Furniture</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="subcategory" className="form-label">Subcategory</label>
            <input
              type="text"
              className="form-control"
              id="subcategory"
              name="subcategory"
              placeholder="e.g. Smartphones, Laptops"
              value={formData.subcategory}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder="e.g. 499.99"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="priceCategory" className="form-label">Price Category</label>
            <select
              className="form-select"
              id="priceCategory"
              name="priceCategory"
              value={formData.priceCategory}
              onChange={handleChange}
            >
              <option>$0-50</option>
              <option>$51-200</option>
              <option>$200+</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              placeholder="City or postal code"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="upload_photos" className="form-label">Upload Photos</label>
            <input
              className="form-control"
              id="upload_photos"
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="premium"
                  checked={formData.isPremium}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="premium">
                  Show as premium
                </label>
              </div>
            </div>
            <div>
              <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
