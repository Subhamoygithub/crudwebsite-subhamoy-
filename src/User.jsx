// import React, { useEffect, useState } from 'react'
// import axios from "axios"
// import "./User.css"

// const User = () => {
//     const [user,Setuser] = useState ([])

// //    const url = "https://jsonplaceholder.typicode.com/posts"

//    const apires = ()=>{
//      axios.get("https://jsonplaceholder.typicode.com/posts")
//         .then((appres) =>{
//             const mtres = appres.data;
//             Setuser(mtres)
//         }) 
       
    

//       console.log("gggg",user);
          
        
//    }
//    useEffect(()=>{
//     apires()
// },[]
//    )
        

//   return (
//     <>
//      <div className='card'>
//       {
//         user.map((item,i)=>{
//             return(
//                 <>
               
//                     <div className='card2'>
//                     <h2>{item.body.slice(0,20)}</h2>
//                     <h3>{item.title}</h3>

//                     </div>

                
//                 </>
//             )
//         })
       
//       }
//        </div>
     
//     </>
//   )
// }

// export default User;
