import React from 'react';

const ImgLinkForm = (props) => {
	return (
		<div>
			<p className='f3'>
				{'This Brain can detect faces in pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-4' style={{ width:700,}}>
					<input className='f4 pa2 w-70 center' type='text' onChange={props.inputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={props.submit}>Detect</button>
				</div>
			</div>
		</div>
		);
}

export default ImgLinkForm;