import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import { BrandProducthunt } from 'tabler-icons-react';


import { useSelector } from 'react-redux';




import React from 'react';


















import './card.css'

const TourCard=(props)=> {

  const show=useSelector(state=>state.ui.itemisvisible);

  const theme = useMantineTheme();



  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[6]
    : theme.colors.dark[7];

  return (
  
    <div style={{ width: 500,height:300, margin: 'auto' ,color:'red'}}>
      <Card shadow="sm" p="lg">
        {/* <Card.Section>
          {console.log(props.imageCover)};
          
          <Image src={require(`./../images/${props.imageCover}`)} height={160} alt="Bengaluru" />
        </Card.Section> */}

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text className='name' weight={500}>{props.name}</Text>
        
        </Group>

        <Text  className='day' size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        <span>category</span>:{props.category}
        </Text>


        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {/* price:Rs {props.price} */}
        </Text>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        <span className='des'>description</span>:{props.description}
        </Text>

        {show && <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        <span className='des'>phonenumber</span>:{props.phonenumber}
        </Text>}

       {show && <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        <span className='des'>address</span>:{props.address}
        </Text>}

        {show && <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        <span className='des'>email</span>:{props.email}
        </Text>}




        {/* <button id="rzp-button1">Pay</button> */}
      </Card>
    </div>
  );
}



export default TourCard;

{/* <TourCard description={product.description} name={product.name} key={int} price={product.price} days={product.days} email={product.email}  ></TourCard> */}