import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
export const Navbar = () => {

    const [sidebar,setSidebar] = useState(false)

    const showSidebar = ()=>{
        setSidebar(!sidebar)
    }

    return (
        <>
            <div className='navbar'>
                <Link to="#" className='menu-bars'>
                    <span className="material-symbols-outlined" onClick={showSidebar}>menu</span>
                </Link>
            </div>
            {(sidebar) ? 
            (
                <nav className='nav-menu'>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <span className="material-symbols-outlined" >close</span>
                        </Link>
                    </li>
                    {SidebarData.map((item,i)=>{
                        return(
                            <li key={i} className={item.className}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            ) : ""
            }
        </>
    )
}
