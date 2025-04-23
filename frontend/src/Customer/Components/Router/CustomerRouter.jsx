import React from "react"
import { Route, Routes } from "react-router-dom"
import HomePage from "../../../Pages/HomePage"
import CartPage from "../Cart/CartPage"
import AddressForm from "../AddressForm/AddressForm"
import OrderSummaryOrder from "../order/OrderSummary"
import Product from "../Product/Product"
import Footer from "../Footer/Footer"
import Navigation from "../Navigation/Navigation"
import ProductDetailPage from "../ProductDetailPage/ProductDetailPage"
import OrdersPage from "../order/OrderPage"
import OrderDetails from "../order/OrderDetails"
import OrderSummary from "../order/OrderSummary"
import AuthPage from "../Navigation/AuthPage"
import PaymentSuccess from "../paymentSuccess/PaymentSuccess"
import RateAndReview from "../RateReviews/RateAndReview"




function CustomRouters() {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/register' element={<AuthPage />}></Route>
                <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Product />}></Route>
                <Route path='/product/:productId' element={<ProductDetailPage />}></Route>
                <Route path='/Checkout' element={<AddressForm />}></Route>
                <Route path='/Cart' element={<CartPage />}></Route>
                <Route path='/orders' element={<OrdersPage />}></Route>
                <Route path='/Account/OrderDetails/:orderId' element={<OrderDetails />} />
                <Route path='/OrderSummary' element={<OrderSummary />}></Route>
                <Route path='/order-details/:productId/RateAndReview' element={<RateAndReview />}></Route>
                <Route path='/payment/:orderId' element={<PaymentSuccess />}></Route>
            </Routes>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default CustomRouters
