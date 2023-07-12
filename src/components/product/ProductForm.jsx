import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const ProductForm = ({ onSubmit, mode, result }) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    title: "",
    price: "",
    category: "",
    description: "",
    // availability: "",
  });

  useEffect(() => {
    if (mode === "edit") {
      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
          setValue("title", res.data.title);
          setValue("price", res.data.price);
          setValue("category", res.data.category);
          setValue("description", res.data.description);
          // setValue("availability", res.data.availability);
        })
        .catch((err) => console.log(err));
    }
  }, [id, mode, setValue]);

  if (result) {
    setValue("title", "");
    setValue("price", "");
    setValue("category", "");
    setValue("description", "");
    // setValue("availability", "");
    const span = document.createElement("span");
    span.classList.add("result", "result-succ");
    span.textContent = "محصول با موفقیت اضافه شد";
    document.querySelector(".navbar").appendChild(span);
  }
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="name-input" className="form-label">
            نام محصول
          </label>
          <input
            type="text"
            className={`form-control${errors.title ? " is-invalid" : ""}`}
            placeholder="گوشی آیفون"
            {...register("title", {
              required: {
                value: true,
                message: "وارد کردن نام محصول اجباری است",
              },
            })}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="price-input" className="form-label">
            قیمت
          </label>
          <input
            type="number"
            className={`form-control${errors.price ? " is-invalid" : ""}`}
            placeholder="1000"
            {...register("price", {
              required: { value: true, message: "وارد کردن قیمت اجباری است" },
              min: { value: 10, message: "مقدار قیمت باید حداقل 10 باشد" },
            })}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price.message}</div>
          )}
        </div>
      </div>

      <div className="row mt-4">
        <div className="form-group col-md-6">
          <label htmlFor="category-select" className="form-label">
            دسته‌بندی
          </label>
          <select className="form-select" {...register("category")}>
            <option value="men's clothing">men's clothing</option>
            <option value="women's clothing">women's clothing</option>
            <option value="jewelery">jewelery</option>
            <option value="electronics">electronics</option>
          </select>
        </div>
      </div>
      <div className="row mt-4">
        <div className="form-group col-md-12">
          <label htmlFor="description-textarea" className="form-label">
            توضیحات
          </label>
          <textarea
            className={`form-control${errors.description ? " is-invalid" : ""}`}
            rows="3"
            {...register("description")}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-4 float-start">
        {mode === "edit" ? "ویرایش محصول" : "افزودن محصول"}
      </button>
    </form>
  );
};

export default ProductForm;
