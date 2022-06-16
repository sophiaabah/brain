import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'; 

const Logo = () => {
	return (
		<div className= 'ma4 mt0'>
			<Tilt className='Tilt'>
		      <div style={{ max: 15, height: 150, width:150, backgroundColor: '' }}>
		        <img  alt='logo' src={brain} style={{ height: 150, width:150,}}/>
		      </div>
    		</Tilt>
		</div>
	);
}

export default Logo;