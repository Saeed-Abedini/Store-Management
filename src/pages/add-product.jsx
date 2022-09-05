import ProductForm from "../components/product/ProductForm";
import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [result, setResult] = useState(false);
  const onSubmit = (data) => {
    axios
      .post("https://dummyjson.com/products/", data)
      .then((response) => {
        // console.log(response)
        setResult(true);
      })
      .catch((err) => {
        console.log(err);
        setResult(false);
      });
  };

  return (
    <div className="card">
      <div className="card-header">افزودن محصول</div>
      <div className="card-body">
        <ProductForm onSubmit={onSubmit} mode={"add"} result={result} />
      </div>
    </div>
  );
};

export default AddProduct;
