import { useEffect, useState } from "react";
import Chart from "components/dashboard/Chart";
import DashboardWidget from "components/dashboard/DashboardWidget";
import EmployeesChart from "components/dashboard/EmployeesChart";
import React from "react";
import { getAllProductsAPI } from "services/api";

const Dashboard = () => {
  const [productNum, setProductNum] = useState([]);
  // const [orders, setOrders] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await getAllProductsAPI();
      setProductNum(response.data);
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const response = await getAllCartsAPI();
    //   setOrders(response.data.products);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const successLength = () => {
    const successOrder = productNum.filter((item) => {
      return item.rating > 4.5;
    });
    return successOrder.length;

    // const successOrder = orders.filter((item) => {
    //   return item.status === 1;
    // });
    // return successOrder.length;
  };
  let total = 0;
  productNum.map((item) => {
    return (total += +item.price);
  });
  // const successOrder = orders.filter((item) => {
  //   return item.status === 1;
  // });
  // successOrder.map((item) => {
  //   return (total += item.price);
  // });

  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="تعداد محصولات"
            icon="tshirt"
            value={productNum.length}
            color="bg-primary"
            testId="products-count"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="درآمد کل"
            icon="coins"
            value={`${Math.floor(total)} تومان`}
            color="bg-warning"
            testId="total-incomes"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="تعداد سفارشات موفق"
            icon="shopping-cart"
            value={successLength()}
            color="bg-danger"
            testId="successful-orders-count"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <EmployeesChart />
        </div>
        <div className="col-md-6">
          <Chart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
