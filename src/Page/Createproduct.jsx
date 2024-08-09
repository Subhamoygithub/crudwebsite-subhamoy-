import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productCre } from '../ReduxToolkit/Productslice';
import { useNavigate } from 'react-router-dom';

const Createproduct = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>state?.Crud)
    const [img, setimg] = useState("");
    const navi = useNavigate()
    const [user, setUser] = useState({
       
        title:"",
        description: "",
    });
    // console.log("cre",user);

    let name ,value;
    const postUserData = (e) =>{
        name = e.target.name;
        value = e.target.value;
        
        setUser({...user,[name]:value})
    }
    const  SubmitInfo = async (e)=>{
        e.preventDefault();
        let formData = new FormData ();
        formData.append("title",user.title);
        formData.append("description",user.description);
        formData.append("image",img);
        const reshold = dispatch(productCre(formData));
       console.log(reshold,"sss");
      };
   
      
    if(loading === "success"){
      navi('/product')
    }
      


  return (
    <>
     <main id="main">
        <section id="breadcrumbs" class="breadcrumbs">
          <div class="container mt-4">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Create Product</h2>
             
            </div>

          </div>
        </section>
        <div className="container mt-2">
          <div class="card" style={{width:"900px"}}>
            <div class="card-header">
              Create Product
            </div>
            <div class="card-body">
              <form>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Title</label>
                  <input type="text" onChange={postUserData} value={user.title} class="form-control" name='title'/>
                </div>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Description</label>
                  <input type="text" onChange={postUserData} value={user.description} class="form-control" name='description'/>
                </div>
                
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setimg(e.target.files[0])}
                    name="img"
                    accept="image/*"
                    class="form-control"
                  />
                  {img !== "" && img !== undefined && img !== null ? (
                    <img
                      style={{ height: "180px" }}
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="upload-img"
                    />
                  ) : (
                    <>{img === "" && <p>Drag or drop content here</p>}</>
                  )}
                </div>

                <button  onClick={SubmitInfo} type="submit" class="btn btn-success">Create</button>
              </form>
            </div>
           
          </div>
        </div>

      </main>

      
    </>
  )
}

export default Createproduct;
