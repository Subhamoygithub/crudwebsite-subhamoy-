import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, productlist } from '../ReduxToolkit/Productslice';
import { image } from '../AxiosHelper/Axiosinsta';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Product = () => {
    const { list } = useSelector((state) => state?.Crud);

    const dispatch = useDispatch();
    const navi = useNavigate()


    const handleDelete = async (id) => {
        const deletehold = await dispatch(deleteProduct(id))

        console.log("delete", deletehold);
        if (deletehold?.payload?.status === 200) {
            navi("/product")
        }
        toast.error("user deleted ")
    }
    useEffect(() => {
        dispatch(productlist())
    }, [handleDelete, list])

    return (
        <>
            <Link to="/createproduct">
                <Button style={{ fontSize: "30px" }}>Add Product +</Button>
            </Link>

            <table class="table" style={{ height: "600px" }}>
                <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Title</th>
                        <th scope="col">Image</th>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>

                <tbody>
                    {list?.length !== 0 ? (
                        list?.map((listitem, li) => {
                            return (
                                <>
                                    <tr>

                                        <h2> <td style={{ height: "150px" }}>{listitem?.title}</td></h2>
                                        <td>
                                            <img
                                                height="230px" width="230px"

                                                alt="No Image"
                                                src={
                                                    listitem?.image ?
                                                        image(listitem.image)
                                                        : "error"
                                                }
                                            />
                                        </td>
                                        <h3> <td style={{ height: "150px" }}>{listitem?.description}</td></h3>
                                        <td>
                                            <Link to={`/update/${listitem._id}`} className="btn btn-primary">
                                                Update
                                            </Link>

                                        </td>
                                        <td>
                                            <Link to=''
                                                onClick={() => handleDelete(listitem._id)}
                                                class="btn btn-primary mr">Delete</Link>

                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    ) : (
                        <>
                            <p>No Data Found</p>
                        </>
                    )}


                </tbody>
            </table>

        </>
    )
}

export default Product
