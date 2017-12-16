import React, { Component }	from "react";
import { bindActionCreators }	from "redux";
import { connect } from "react-redux";

import { ACTIONS } from "../../actions/actions";

import { Segment, Grid } from "semantic-ui-react";




class Actualites extends Component {

	componentWillMount(){
		this.props.articleGet();
	}
	articleRm( id ){
		this.props.articleRm({ _id: id });
	}

	render() {
		const ARTICLES = this.props.articles && this.props.articles.length > 0 ? 
			this.props.articles.map(( art, i )=> <Segment key = { i }> 
				<Grid>
					<Grid.Column width = {14}>
						{ art.titre } <br/> <br/> { art.description }
					</Grid.Column>
					<Grid.Column width = {2} onClick = { this.articleRm.bind( this, art._id ) }>
						Supprimer
					</Grid.Column>
				</Grid> 
			</Segment>) : "";

		return (
			<div>
				{ ARTICLES }
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			articles: state.article.articles
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		articleGet: 			ACTIONS.Article.get,
		articleRm: 				ACTIONS.Article.rm
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Actualites );
