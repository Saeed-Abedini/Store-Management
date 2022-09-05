import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductsAPI, removeProductAPI } from "services/api";
import { RemoveModal } from "../components/productlist/RemoveModal";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [editProducts, setEditProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isShow, setIsShow] = useState(false);
  const [productId, setProductId] = useState("");

  const findProduct = () => {
    return products.find((item) => {
      return item.id === productId;
    });
  };

  useEffect(
    () =>
      getAllProductsAPI().then((res) => {
        setEditProducts(res.data.products);
        setProducts(res.data.products);
      }),
    [isShow]
  );
  const allProductHandler = () => {
    setSelectedCategory();
    document.querySelector("#category").defaultValue = "category";
    setEditProducts([...products]);
  };

  const expensiveHandler = () => {
    setSelectedCategory("expensive");
    setEditProducts([...products].sort((a, b) => b.price - a.price));
  };

  const cheapHandler = () => {
    setSelectedCategory("cheap");
    setEditProducts([...products].sort((a, b) => a.price - b.price));
  };

  const categorySelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getFilteredList = () => {
    if (!selectedCategory) {
      return editProducts;
    } else if (
      selectedCategory === "cheap" ||
      selectedCategory === "expensive"
    ) {
      return editProducts;
    }
    return editProducts.filter((item) => item.category === selectedCategory);
  };

  let filteredList = useMemo(getFilteredList, [selectedCategory, editProducts]);

  return (
    <>
      <div className="card">
        <div className="container">
          <div className="card-body">
            <div className="filter">
              <div className="filter-Options">
                <span>مرتب سازی بر اساس: </span>

                <div
                  tabIndex={1}
                  className="filter-option-list"
                  onClick={allProductHandler}
                >
                  تمام محصولات
                </div>
                <div
                  tabIndex={2}
                  className="filter-option-list"
                  onClick={cheapHandler}
                  checked
                >
                  ارزان‌ترین
                </div>
                <div
                  tabIndex={3}
                  className="filter-option-list"
                  onClick={expensiveHandler}
                >
                  گران‌ترین
                </div>
              </div>

              <div className="category-filter">
                <select
                  className="form-select"
                  name="category"
                  id="category"
                  onChange={categorySelect}
                  defaultValue={"category"}
                >
                  <option value="category" disabled>
                    دسته بندی
                  </option>
                  <option value="smartphones">گوشی هوشمند</option>
                  <option value="laptops">لپ‌تاپ</option>
                  <option value="fragrances">عطر</option>
                  <option value="skincare">مراقبت از پوست</option>
                  <option value="groceries">مواد غذایی</option>
                  <option value="home-decoration">دکوراسیون منزل</option>
                </select>
              </div>
            </div>

            {filteredList.length === 0 && <p>محصولی یافت نشد!</p>}
            {filteredList.length > 0 && (
              <table className="table table-sm table-striped align-middle">
                <thead>
                  <tr>
                    <th scope="col">تصویر</th>
                    <th scope="col">نام محصول</th>
                    <th scope="col">قیمت</th>
                    <th scope="col">دسته‌بندی</th>
                    {/* <th scope="col">موجودی</th> */}
                    <th scope="col">توضیحات</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={product.thumbnail}
                          alt={product.thumbnail}
                          width={"70px"}
                          height={"60px"}
                        />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.description}</td>
                      {/* <td>{product.availability}</td> */}
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              setProductId(product.id);
                              setIsShow(true);
                            }}
                          >
                            حذف
                          </button>

                          <Link
                            className="btn btn-sm btn-outline-info"
                            to={`products/edit/${product.id}`}
                          >
                            ویرایش
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {isShow && (
        <RemoveModal
          product={findProduct()}
          onClose={() => {
            setIsShow(false);
          }}
          onConfirm={() => {
            removeProductAPI(productId).then((res) => {
              if (res.status === 200) {
                const span = document.createElement("span");
                span.classList.add("result", "result-del");
                span.textContent = "محصول با موفقیت حذف شد";
                document.querySelector(".navbar").appendChild(span);
              }
              setIsShow(false);
            });
          }}
        />
      )}
    </>
  );
};

export default ProductsList;
