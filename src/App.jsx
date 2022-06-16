import React from 'react';
import Nav from './Nav';
import Logo from './Logo';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import FaceRec from './FaceRec';
import ImgLinkForm from './ImgLinkForm';
import Rank from './Rank';
import './App.css';

//i imported the api package from the back end so that my api key isnt easily accesible 




const intialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signIn',
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
};

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signIn',
			user: {
				id: '',
      	name: '',
      	email: '',
      	entries: 0,
      	joined: ''
			}
		}	
	}
	

	loadUser = (data) => {
			this.setState({ user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}})
		}


	loadProfile = (data) => {
		this.setState({ user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
	}


	componentDidMount(){
		fetch('http://localhost:3000')
			.then(response => response.json())
			.then(console.log)
	}

	calculate = (d) => {
		const Face = d.outputs[0].data.regions[0].region_info.bounding_box;
		const picture = document.getElementById('picture');
		const width = Number(picture.width);
		const height = Number(picture.height);

		return {
			leftCol: Face.left_col * width,
			topRow: Face.top_row * height,
			rightCol: width - (Face.right_col * width),
			bottomCol: height - (Face.bottom_row * height)
		}
	}

	createBox = (arg) => {
		if (this.state.route === 'signOut') {
			this.setState(intialState)
		} else {
				this.setState({box: arg})
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
			}

	onSubmit = (event) => {
		this.setState({imageUrl: this.state.input});
			fetch('http://localhost:3000/imageurl',{
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					input: this.state.input
				})
			})
			.then(response => response.json())
			.then(response => {
				if (response) {
					fetch('http://localhost:3000/rank', {
						method: 'put',
						headers: {'Content-Type':'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
								})
							})
								.then(response => response.json())
								.then(count => {
									this.setState(Object.assign(this.state.user, {entries: count}))
								})

			}
				this.createBox(this.calculate(response))
		})
			.catch(err => console.log(err));
	}

	onRouteChange = (arg) => {
		this.setState({route: arg});
	}

	render(){
		return (
			// eugene's password is pearl
			// const { route, imageUrl, box } = this.state; for destructuring
			<div className='App'>
				{ this.state.route === 'home'
					? <div>
							<Nav onRouteChange={this.onRouteChange}/>
							<Logo />
							<Rank name={this.state.user.name} entries={this.state.user.entries} />
							<ImgLinkForm 
								inputChange={this.onInputChange} 
								submit={this.onSubmit}
							/>
							<FaceRec imgUrl={this.state.imageUrl} box={this.state.box}/>
						</div> 
						: (
								this.state.route === 'signIn'
								? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
								: <Register loadProfile={this.loadProfile} onRouteChange={this.onRouteChange}/>
							) 
					
		
				}
			</div>
		)
	}
}

export default App;