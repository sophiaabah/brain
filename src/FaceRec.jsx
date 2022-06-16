import React from 'react';
import './FaceRec.css';

const FaceRec = ({imgUrl, box}) => {
	console.log(box)
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='picture' alt='detect' src={imgUrl} width='500px' height='auto' />
				<div className='boundary' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomCol, left: box.leftCol}}></div>
			</div>
		</div>
		);
}

export default FaceRec;