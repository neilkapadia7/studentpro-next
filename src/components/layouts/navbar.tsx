"use client"
import React, { Fragment, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useRouter } from 'next/navigation';
import {useRouter, usePathname} from 'next/navigation'; 
import Link from 'next/link'
import Icon from '../../../public/next.svg';
// import "../../meyers-institute/css/design.css";
import "../../app/meyers-institute/css/design.css";
import "../../app/styles/navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/actions/reduxActions/auth';
import { RootState } from '@/store/store';

// interface NavbarProps {
//     auth: {isAuthenticated: boolean};
//     logout: Function;
// }

  

// export default function Navbar ({ auth: { isAuthenticated }, logout }: NavbarProps)  {
export default function Navbar ({children}: Readonly<{children: React.ReactNode}>)  {
    const [isNabarActive, setIsNabarActive] = useState(false);
	const [isMeyers, setIsMeyers] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	// const location = useLocation();
    const router = useRouter();
    const pathname = usePathname();
	const dispatch = useDispatch();
	const auth = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if(pathname == "/meyers-institute") {
			setIsMeyers(true);
		}

		if(pathname == "/login") {
			setIsLogin(true);
		} else {
			if(isLogin) setIsLogin(false);
		}
	}, [pathname]);


	const toggleClass = () => {
		setIsNabarActive(!isNabarActive);
		const element = document.getElementById('ul');
		if (element) {
			element.classList.add('active-menu');
		}
	};
	const Logout = () => {
		localStorage.removeItem("token");
		dispatch(logout());
	    router.push("/login");
		// logout();
	};

	// const authLinks = (
	// 	<Fragment>
	// 		<li>
	// 			<Link href='/home'>Home</Link>
	// 		</li>
	// 		<li>
	// 			<Link href='/about'>About</Link>
	// 		</li>
	// 		<li>
	// 			<Link href='/cart'>Cart</Link>
	// 		</li>
	// 		<li>
	// 			<a onClick={Logout}>Logout</a>
	// 		</li>
	// 	</Fragment>
	// );

	const links = (
		<Fragment>
			<input className="menu-btn" type="checkbox" id="menu-btn"/>
			<label className="menu-icon" onClick={() => toggleClass()}><span className="navicon"></span></label>
			<ul className={`menu ${isNabarActive && 'active-menu'}`}>
				{!auth.loggedIn ? 
					<>
						<li>
							<a href='/'>Home</a>
						</li>
						<li>
							<a href='/'>About</a>
						</li>
						<li>
							<a href='/'>Contact</a>
						</li>
						<li>
							<Link href='/login'>Login / SignUp</Link>
						</li>
					</>
				: auth.isAdminUser ?
					<>
						<li>
							<Link href='/'>Dashboard</Link>
						</li>
						<li>
							<Link href='/users'>Users</Link>
						</li>
						<li>
							<Link href='/institutes'>Institutes</Link>
						</li>
						<li>
							<Link href='/live-class'>All Students</Link>
						</li>
						<li>
							<Link href='/live-class'>Live Classes</Link>
						</li>
						<li>
							<Link onClick={Logout} href='/login'>Logout</Link>
						</li>
					</>
				:
					<>
						<li>
							<Link href='/home'>Home</Link>
						</li>
						<li>
							<Link href='/'>About</Link>
						</li>
						<li>
							<Link href='/'>Contact</Link>
						</li>
						<li>
							<Link onClick={Logout} href='/login'>Logout</Link>
						</li>
					</>
				}
			</ul>
			
		</Fragment>
	);

	return (
		<Fragment>
			{!isLogin && 
				<header>
					<div className='logo'>
						{isMeyers ? <img src={Icon} /> : "TestPRO" }
					</div>
					{links}
				</header>	
			}
			
			<div className={isLogin ? "" : "pt-32 px-32"}>
				{children}
			</div>
		</Fragment>
	);
}