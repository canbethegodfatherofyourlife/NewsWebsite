import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    TitleCase = (phrase) => {
        return phrase
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };
    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `NewsMonkey - ${this.TitleCase(this.props.category)}`;
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3bd7a0be8434a30b5f1a98a80f61455&page=1&pageSize=${this.props.pageSize}`
        {this.setState({loading:true})}
        let data = await fetch(url)
        let parsedData = await data.json()
        {this.setState({loading:false})}
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
        
    }

    handlePreviousClick = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3bd7a0be8434a30b5f1a98a80f61455&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        {this.setState({loading:true})}
        let data = await fetch(url)
        let parsedData = await data.json()
        {this.setState({loading:false})}
        this.setState({
            articles:parsedData.articles,
            page: this.state.page-1 
        })

    }

    handleNextClick = async() =>{
        if (this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        }else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b3bd7a0be8434a30b5f1a98a80f61455&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        {this.setState({loading:true})}
        let data = await fetch(url)
        let parsedData = await data.json()
        {this.setState({loading:false})}
        this.setState({
            articles:parsedData.articles,
            page: this.state.page+1
        })
    }
    }

    
  render() {
    return (
        <>
            <div className="container  my-3">
            <h1 className="text-center my-3">NewsMonkey - Top {this.TitleCase(this.props.category)} Headlines</h1>
            {this.state.loading && <Spinner />}
                <div className="row my-3">
                    
                    {!this.state.loading && this.state.articles.map((ele)=>{
                        return <div className="col-md-4 my-3" key={ele.url}>
                        <NewsItem  title={ele.title?ele.title:""} description={ele.description?ele.description:""} imgUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/> 
                        </div>
                    })}
                    <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
                    
                </div>
                
                
            </div>
            
            
        </>
    )
  }
}

export default News