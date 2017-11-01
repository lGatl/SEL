import React, {Component} from 'react'
import {Segment} from 'semantic-ui-react'



export default class Titre extends Component {
	render(){
		return (
		<Segment className="segtitre" textAlign='center' basic>
			<h1 className='TitrePage'>{typeof (this.props.children) == 'object'?this.props.children.map((no,i) => <span key={i}>{no} <br/></span>):this.props.children}</h1>

					<hr/>
					<br/>
		</Segment>
    )
}
}

