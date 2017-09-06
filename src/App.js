import React, { Component } from 'react';
import './App.css';


class Article extends React.Component {
  render() {
    return (
      <div className="Article">
        <h1>{this.props.doc.heading}</h1>
			{this.props.doc.mainImage && <ArticleImage mainImage={this.props.doc.mainImage}/>}
      </div>
    );
  }
}

class ArticleImage extends React.Component {
  render() {
    return (
      <div className="ArticleImage">
		<img src={this.props.mainImage.reference} alt={this.props.mainImage.captionText}/>
      </div>
    );
  }
}


class App extends Component {
	constructor(props) {
		super(props);
		this.state = { loadJSON : true, news : []};
		this.refreshArticles = this.refreshArticles.bind(this);
	}

	componentDidMount() {
		fetch('https://content.thewest.com.au/publication')
		.then(response => response.json())
		.then(json => this.setState({ loadJSON: false, news: json }));
		this.timer = setInterval(()=> this.refreshArticles(), 6000);
	}
	
	refreshArticles() {
		fetch('https://content.thewest.com.au/publication')
		.then(response => response.json())
		.then(json => {
			if(typeof this.state.news.documents !=='undefined'){
				if(this.state.news.documents[0].id===json.documents[0].id){
					console.dir('No update available')
				}else{
					console.dir('Update found!')
					this.setState({ loadJSON: false, news: json })
				}
			}
		});
	}
	
	viewDocuments(doc, key) {
		return <Article doc={doc} key={key}/>;
	}
	
	render() {
		return (
		<div className="App">
			<div className="App-header">
				<h1>News Crawler</h1>
				<h3>This app auto updates a simple news feed once every few seconds.</h3>
			</div>

			{
				this.state.loadJSON
				? 'Loading news...'
				: this.state.news.documents.map((doc, id)=>this.viewDocuments(doc, id))
			}
		</div>
		);
	}
}

export default App;
