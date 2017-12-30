/*C'est le bouton qu'on voit en premier ou lorsque on
 se deconnecte et qui nous permet de nous logguer avec github*/
import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getActiveUser, checkLogged } 	from '../../User/actions/user_actions';
import FormulaireConnexion from './FormulaireConnexion';




class IsLogged extends Component{

	componentWillMount(){
		this.props.getActiveUser();
	}

	render(){
		const A_AFFICHER = this.props.active_user ?
			this.props.children : <FormulaireConnexion />;
					
		return(	
			<div>{A_AFFICHER}</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: 	state.user.active_user
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getActiveUser
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( IsLogged );
