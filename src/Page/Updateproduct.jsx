import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getproduct, updateproduct,  } from '../ReduxToolkit/Productslice';
import { set } from 'react-hook-form';

const Updateproduct = () => {
    const { id } = useParams()
    const { getiddetails } = useSelector((state) => state?.Crud);
    const {loading} = useSelector((state)=>state?.Crud)
    console.log("idd", getiddetails);
    const [img, setimg] = useState("");
    const navi = useNavigate()
    const dispatch = useDispatch();
    const [user, setUser] = useState({

        title: "",
        description: ""
    });

    let name, value;
    const postUserData = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }
    useEffect(() => {
        dispatch(getproduct(id))
    }, [id])

    useEffect(() => {
        if (getiddetails && Object.keys(getiddetails).length>0) {
            setUser({
                title: getiddetails?.title,
                description: getiddetails?.description
            })
        }

    }, [getiddetails])
    const onSubmit = (e) => {
        e.preventDefault()
        let formdata = new FormData()
        formdata.append("title", user.title)
        formdata.append("description", user.description)
        formdata.append("image", img)
        formdata.append("id", id)
        dispatch( updateproduct(formdata))
   
    }

    if(loading === "success"){
        navi('/product')
      }
        
    

    return (
        <>
            <main id="main">
                <section id="breadcrumbs" class="breadcrumbs">
                    <div class="container mt-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <h2>Edit Product</h2>

                        </div>

                    </div>
                </section>
                <div className="container mt-2">
                    <div class="card" style={{ width: "900px" }}>
                        <div class="card-header">
                            Create Product
                        </div>
                        <div class="card-body">
                            <form onSubmit={onSubmit}>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Title</label>
                                    <input type="text" onChange={postUserData} value={user.title} class="form-control" name='title' />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Description</label>
                                    <input type="text" onChange={postUserData} value={user.description} class="form-control" name='description' />
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
                                    {img !== "" && img !== undefined && img !== null ?
                                        (<img
                                            height="40px"
                                            src={URL.createObjectURL(img)}
                                            alt=""
                                            className="upload-img"
                                        />
                                        ) : (
                                            <>
                                                {getiddetails?.image === "" ?
                                                    (<img
                                                        height="70px"
                                                        src={Image}
                                                        alt=""
                                                        className="upload-img"
                                                    />
                                                    ) : (
                                                        <img
                                                            height="60px"
                                                            src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${getiddetails?.image}`}
                                                            alt=""
                                                            className="upload-img"
                                                        />
                                                    )}
                                            </>
                                        )}
                                    {img === "" && (
                                        <p>Drag or drop content here</p>
                                    )}
                                </div>

                                <button type="submit" class="btn btn-success">Update</button>
                            </form>
                        </div>

                    </div>
                </div>

            </main>
        </>
    )
}

export default Updateproduct;
