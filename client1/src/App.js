import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import { AuthenticationImage } from './components/login/login';
import Register from './components/login/register';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';
import TourCard from './components/card/card';


















function App() {


  const show=useSelector(state=>state.ui.itemvisible);




  const [marketdata,setdata]=useState([]);
  //  let inittialstate=[];
// const data=axios.get('https://127.0.0.1:3000/api/tours/')
 
// console.log(data);
useEffect(()=>{
const data = async ()=>{
  const d = await axios.get ('http://localhost:3000/api/v1/tours/');
  // console.log(d.data.data.tours);

  setdata(d.data.data.tours);
  // console.log('d')
  console.log(marketdata);
return d;
};
data();
},[]) 











  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          {/* <Route path='/products' component={Products} /> */}
          <Route path='/sign-up' component={AuthenticationImage} />
          <Route path='/register' component={Register} />
          
           
    <Route path="/products">
   
   <div >
     {/* hcjhcjcjcjmcmvmj */}
   {marketdata.map((product,int)=>(
     <TourCard description={product.description} name={product.name} key={int}  email={product.email} category={product.category} phone={product.phonenumber} address={product.address} ></TourCard>
))}
</div>

   </Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
