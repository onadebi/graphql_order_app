# Steps to install
>1. Clone repo
>2. run: *yarn install* to download packages
>3. run *yarn start* to run locally and *yarn dev* to run development mode

 # Public url at: 
 > [GraphQL Users Orders testapp ](https://ordertestapp.herokuapp.com/)


# Sample Scripts
> # Mutations sample

```
mutation {
  userRegistration(registration:{
        email:"j.doe@gmail.com",
        password:"jdoeP@55word"
        phone:"+2348080674352"
        confirmPassword:"jdoeP@55word"
        name: "John Doe"
    }){
        success
        message
    }


  userLogin(login:{
    email:"onaefe@gmail.com",
    password:"j.doeP@55w0ed"
  }){
    success
    message
  }
  

  
 updateOrder(orderId:"9HH6LgDHv0BHa9kQAXE1",input:{
   title:"Doc. Strange multiverse of madness",
   bookingDate: 1656666666
   address:{
     city:"Eart83",
     country: "USA",
     street: "unverse street",
     zip:"2542524"
   }
 }){
   success
   message
 }
  
 deleteOrder(orderId: "yAEOxypnULLVj72Jn6RQ")
  
addOrder(input:{
  title:"Ticket booking",
  bookingDate:1656515246
  address:{
    city:"NY"
    country:"USA",
	street: "2nd Ave"
    zip:"1023242"
  },
  customer:{
    email:"m.Smite@gmail.com",
    name:"Micheal smith",
    phone: "08057253526"
  }    
}){
  title
  uid
  customer{
    name
    email
  }
  address{
    city
    country
    zip
  }
}
  
  addOrder(input:{
    title:"Multiverse center space",
    customerId: "245245-2462-46v-245245-245"
  }){
    bookingDate
    uid
    title
  }
  
 customers{
   name,
   email,
   password
   createdAt
   address{
     city
     country
   }
 }
}
```

> # Query samples
> 
```
{
  getUsers(paging:{page:0,pageSize: 10}){
    email
    name
    phone
    uid
  }
  ###===
 getOrders(paging:{page:0,pageSize: 10}){
    uid
    title
    bookingDate,
    customer{
      name
      email
      phone
    }
    address{
      city
      country
      street
      zip
    }
  }
  ###===
 customerOrdersByEmail(email:"onadebi@gmail.com"){
   title,
 customer
   {
     email
     name
   }
   address{
     city
     country
   
   }
 }
 
 ###===

getOrderById(orderId: "9HH6LgDHv0BHa9kQAXE1"){
    address{
      city
      country
      street
      zip
    }
    bookingDate
    customer{
      name
      email
      phone      
    }
    title
    uid    
  }
  
 ###===  
}
```