import React from 'react';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group } from '@mantine/core';
import ReactDOM from 'react-dom'
// import Drop from '../../dropzone';

import emailjs from "emailjs-com";
import { useSelector } from 'react-redux';


import axios from 'axios'
// import { useSelectionState } from '@mantine/core/lib/components/TransferList/use-selection-state/use-selection-state';
import { useState } from 'react';

const schema = Yup.object().shape({
  name: Yup.string().min(2, 'Name should have at least 2 letters'),
  email: Yup.string().email('Invalid email'),
  age: Yup.number().min(18, 'You must be at least 18 to create an account'),
});







function Productform() {

  const show=useSelector(state=>state.ui.itemvisible);


const [Selectedfile,setstate]=useState(null);
   const imagething=(Event)=>{
console.log(Event.target.files[0]);
this.setState({
  Selectedfile:Event.target.files[0]   
}

)}

  //    const fileupload=(Event)=>
  //    {
  //    const  imageCover=new FormData();
  //    imageCover.append('image',Selectedfile.name);

  //    axios.post('')
  //  }





   const setoperation=(Event)=>{
     console.log(Event.values);

   }




  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      description:'',
      address:'',
      phone:"",
      category:""
    
    },
  });

  return (
    <Box sx={{ maxWidth: 840 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => {



        let sellerdata={
          name:values.name,
          address:values.address,
          email:values.email,
          phonenumber:values.phonenumber,
          description:values.description,
          category:values.category,
        
        }
        

        const getback=axios.post('http://localhost:3000/api/v1/tours/',sellerdata);  
        getback.then(value=>  {
          console.log(value.data.status);

           if(value.data.status==='success')
           console.log('fsfsfs');
          //  dispatch(uiActions.toggle());
            //  history.push('/product');
        

        })
  console.log("sfjbs");
        emailjs
        .send(
          "service_g3786ir",
          "template_u1rfdve",
          sellerdata,"2QMm44-e4ryaA1IZC"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      // values.target.reset(); 
      alert("message sent successful");
        
        
        
        
        
      })}>
      
        <TextInput
          required
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          required
          label="Name"
          placeholder="John Doe"
          mt="sm"
          {...form.getInputProps('name')}
        />
            <TextInput
          required
          label="Description"
          placeholder="about product"
          mt="sm"
          {...form.getInputProps('description')}
        />
   
          <TextInput
          required
          label="address"
          placeholder="shop address"
          mt="sm"
          {...form.getInputProps('address')}
        />
        <NumberInput
         required
          label="Phone nuumber"
          placeholder="Enter a phone number"
          mt="sm"
          {...form.getInputProps('phone')}
        /> 

       

          <TextInput
          required
          label="category"
          placeholder="category"
          mt="sm"
          {...form.getInputProps('category')}
        />



        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      {/* <div>Image cover </div> */}
{/* <Drop></Drop> */}

{/* <input type="file" onChange={imagething}></input>
<button  onClick={fileupload}>upload </button> */}

{/* <div>product images</div> */}
{/* <Drop></Drop>
<Drop></Drop>
<Drop></Drop> */}

    </Box>
  );
}

export default Productform