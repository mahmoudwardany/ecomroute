import React, { useContext, useEffect } from "react";
import { CartContext } from "../../share/CartContext";
import { Table } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getAllCart, cart, removeItem, upDateItem } = useContext(CartContext);

  async function getcart() {
    await getAllCart();
  }
  useEffect(() => {
    if(cart !== null){
        getcart();
    }
  
  }, [getcart]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      {cart !== undefined && cart !== null ? (
        <Table striped bordered hover className="mt-3 align-middle text-center">
          <thead>
            <tr>
              <th>Image</th>
              <th> Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart?.data?.products?.map((el) => (
              <tr key={el?._id} className="">
                <td>
                  <img
                    src={el?.product?.imageCover}
                    alt=""
                    className="w-100"
                    height={100}
                  />{" "}
                </td>
                <td>{el?.product?.title}</td>
                <td className="  overflow-hidden">
                  <button
                    disabled={el.count === 1}
                    className="btn btn-danger btn-sm rounded col-sm-3 col-md-3"
                    onClick={() => upDateItem(el.product._id, (el.count -= 1))}
                  >
                    -
                  </button>
                  <span className="mx-3 col-sm-12 col-md-3 mx-auto text-sm-center ">
                    {el?.count}
                  </span>
                  <button
                    className="btn btn-success btn-sm rounded col-sm-3 col-md-3 "
                    onClick={() => upDateItem(el.product._id, (el.count += 1))}
                  >
                    +
                  </button>
                </td>
                <td>{el?.count < 1 ? 0 : el.price}</td>
                <td>
                  <DeleteIcon
                    className="text-danger"
                    onClick={() => removeItem(el.product._id)}
                  />
                </td>
              </tr>
            ))}
            <tr className="table-danger">
              <td colSpan={4}>Total</td>

              <td>
                {cart.data.totalCartPrice < 0 ? "" : cart.data.totalCartPrice}{" "}
                EGP
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <h1 className="text-center">"No Products Here"</h1>
      )}
      <Link className="btn btn-success " to={`/checkout/` + cart.data._id}>
        Check Out
      </Link>
      <Link className="btn btn-info mx-3" to={`/ecomroute`}>
        Shopping
      </Link>
    </div>
  );
}
