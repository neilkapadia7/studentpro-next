'use client'
import React, { Fragment, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useRouter } from 'next/navigation';
import {useRouter, usePathname} from 'next/navigation'; 
import Link from 'next/link'
import Icon from '../../../public/next.svg';
// import "../../meyers-institute/css/design.css";
import "../../app/meyers-institute/css/design.css";

interface NavbarProps {
    auth: {isAuthenticated: boolean};
    logout: Function;
}

  

export default function Navbar ({ auth: { isAuthenticated }, logout }: NavbarProps)  {
    const [isNabarActive, setIsNabarActive] = useState(false);
	const [isMeyers, setIsMeyers] = useState(false);
	// const location = useLocation();
    const router = useRouter();
    const pathname = usePathname();

	useEffect(() => {
		if(pathname == "/meyers-institute") {
			setIsMeyers(true);
		}
	}, [router]);


	const toggleClass = () => {
		setIsNabarActive(!isNabarActive);
		const element = document.getElementById('ul');
		if (element) {
			element.classList.add('active-menu');
		}
	};
	const Logout = () => {
		logout();
	};

	const authLinks = (
		<Fragment>
			<li>
				<Link href='/home'>Home</Link>
			</li>
			<li>
				<Link href='/about'>About</Link>
			</li>
			<li>
				<Link href='/cart'>Cart</Link>
			</li>
			<li>
				<a onClick={Logout}>Logout</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<input className="menu-btn" type="checkbox" id="menu-btn"/>
			<label className="menu-icon" onClick={() => toggleClass()}><span className="navicon"></span></label>
			<ul className={`menu ${isNabarActive && 'active-menu'}`}>
				<li>
					<a href='/#guest-home-sec1'>Home</a>
				</li>
				<li>
					<a href='/#guest-home-sec2'>About</a>
				</li>
				<li>
					<a href='/#guest-home-sec4'>Contact</a>
				</li>
			</ul>
			{/* <li>
				<Link href='/login'>Login</Link>
			</li> */}
		</Fragment>
	);

	return (
		<Fragment>
			<header>
				<div className='logo'>
					{isMeyers ? <img src={Icon} /> : "Company Name" }
				</div>
				{/* <nav> */}
					{guestLinks}
					{/* <ul>{isAuthenticated ? authLinks : guestLinks}</ul> */}
				{/* </nav> */}
			</header>
		</Fragment>
	);
}