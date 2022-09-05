import ProductForm from "components/product/ProductForm";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const history = useHistory();

  const onSubmit = (data) => {
    axios
      .put(`https://api.storerestapi.com/products/${id}`, data)
      .catch((error) => console.log(error));
    history.push("/all-products");
    const span = document.createElement("span");
    span.classList.add("result", "result-succ");
    span.textContent = "محصول با موفقیت ویرایش شد";
    document.querySelector(".navbar").appendChild(span);
  };
  return (
    <div className="card">
      <div className="card-header" data-testid="card-header">
        ویرایش محصول
      </div>
      <div className="card-body">
        <ProductForm onSubmit={onSubmit} mode="edit"></ProductForm>
      </div>
    </div>
  );
};

export default EditProduct;
