import React from 'react';

const Nav = ({onRouteChange}) => {
	return (
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p onClick={() => onRouteChange('signIn')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
		</nav>
		);
}

export default Nav;