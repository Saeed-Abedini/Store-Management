// TODO: copy codes from the ProductForm component here...
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
        .get(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          setValue("title", res.data.title);
          setValue("price", res.data.price);
          setValue("category", res.data.category);
          setValue("description", res.data.description);
          // setValue("availability", res.data.availability);
        })
        .catch((err) => console.log(err));
    }
  }, []);

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
              min: { value: 100, message: "مقدار قیمت باید حداقل 100 باشد" },
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
            <option value="smartphones">گوشی هوشمند</option>
            <option value="laptops">لپ‌تاپ</option>
            <option value="fragrances">عطر</option>
            <option value="skincare">مراقبت از پوست</option>
            <option value="groceries">مواد غذایی</option>
            <option value="home-decoration">دکوراسیون منزل</option>
          </select>
        </div>
        {/* <div className="form-group col-md-6">
          <label htmlFor="availability-input" className="form-label">
            موجودی
          </label>
          <input
            type="number"
            className={`form-control${
              errors.availability ? " is-invalid" : ""
            }`}
            data-testid="availability-input"
            placeholder="1000"
            {...register("availability", {
              required: { value: true, message: "وارد کردن موجودی اجباری است" },
              min: { value: 1, message: "مقدار موجودی باید حداقل 1 باشد" },
            })}
          />
          {errors.availability && (
            <div className="invalid-feedback">
              {errors.availability.message}
            </div>
          )}
        </div> */}
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
