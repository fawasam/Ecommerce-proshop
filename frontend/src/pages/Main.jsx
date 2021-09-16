import React from 'react'
import {Link} from 'react-router-dom'
import Bg from './bg.jpg'


const Main = () => {
    return (
        <div>
            <img className='bg' src={Bg} alt="" />
            <div style={{ display:'flex', alignitem:'center' ,justifyContent:"center"}}>
            <h1 style={{fontSize:'50px'}} >WELCOME TO THE PROSHOP</h1> <br />
            </div>
            <h2 style={{ display:'flex', alignitem:'center' ,justifyContent:"center"}} ><Link to="/products">View items</Link></h2>
        </div>
    )
}

export default Main
