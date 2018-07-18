import './SearchPanel.css';
import Auth from '../Auth/Auth';
import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import _ from 'lodash';


class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {news:null, pageNum:0, loadedAll:false, loading:false};
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({news:null, pageNum:0, loadedAll:false});
    this.loadMoreNews();
  }

  componentDidMount() {
    this.loadMoreNews();
    this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let scrollY = window.scrollY || window.pageYOffset
        || document.documentElement.scrollTop;
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50) && !this.state.loading) {
      console.log('Loading more news...');
      this.loadMoreNews();
    }
  }

  loadMoreNews() {
    this.setState({loading:true});
    if (this.state.loadedAll === true) {
      console.log('no more news!');
      this.setState({loading:false});
      return;
    }

    console.log('Search: '+this.props.keyword);
    fetch('/news/search', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken(),
      },

      body: JSON.stringify({
          userId:Auth.getEmail(),
          keyword:this.props.keyword,
          pageNum:this.state.pageNum
      })
    }).then((res) => res.json())
      .then((news) => {
        if (!news || news.length === 0) {
          this.setState({loadedAll: true});
        }

        console.log('Received news....');
        console.log(news);
        this.setState({
          news: this.state.news ? this.state.news.concat(news) : news,
          pageNum: this.state.pageNum + 1,
          loading: false
        });
      });
  }

  renderNews() {
    const news_list = this.state.news.map(function(news) {
      return (
          <NewsCard news={news} />
      );
    });

    return (
        <div className='row'>
            {news_list}
        </div>
    );
  }

  render() {

    console.log('Search:' + this.props.keyword);

    if (this.state.news) {
      return (
        <div>
          {this.renderNews()}
        </div>
      );
    } else {
      return (
        <div>
              <div className="row">
              <div className="progress col s12 m6 l4 offset-m3 offset-l4">
                <div className="indeterminate"></div>
              </div>
              </div>
        </div>
      )
    }
  }
}

export default SearchPanel;
