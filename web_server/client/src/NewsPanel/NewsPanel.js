import React from 'react';
import './NewsPanel.css';
import NewsCard from '../NewsCard/NewsCard';
import _ from 'lodash';
import Auth from '../Auth/Auth';


class NewsPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      news: null,
      page_Num:0,
      loadedAll:false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const scrollY = window.scrollY
        || window.pageYOffset
        || document.documentElement.scrollYTop;
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      this.loadMoreNews();
    }
  }

  componentDidMount(){
    this.loadMoreNews();
    this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
    window.addEventListener('scroll', () => this.handleScroll());
  }

  loadMoreNews() {
    if (this.state.loadedAll === true) {
      return;
    }

    let url = 'http://' + window.location.hostname + ':3000' +
        '/news/userId/' + Auth.getEmail() + '/pageNum/' + this.state.page_Num;

    let request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + Auth.getToken(),
      },
      });

    fetch(request)
      .then(
        res => {
                if (res.status === 200) {
                    return res.json();
                }

                // TODO: not authenticated; redirect to login page?
                if (res.status === 401) {
                    Auth.deAuthenticate();
                    this.context.router.history.replace('/login');
                    throw Error('user not authenticated')
                }
                if (res.status === 500) {
                    // TODO: server might send back some error info, but not take it here
                    throw Error('Fetching news: server error!');
                }
                throw Error('Fetching news: other error!')
            }
      )
      .then((news_list) => {
        if (!news_list ||  news_list.length === 0) {
          this.setState({loadedAll: true});
        }else {
          this.setState({
            news: this.state.news == null ?  news_list: this.state.news.concat(news_list),
            page_Num: this.state.page_Num + 1
          });
        }
      });
  }

  renderNews() {
    const news_list = this.state.news.map(news => {
      return (
        <a className = 'list-group-item'  >
          <NewsCard news = {news} />
        </a>
      );
    });

    return (
      <div className = 'container-fluid'>
        <div className = "list-group">
          {news_list}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.news) {
      return(
        <div>
          {this.renderNews()}
        </div>
      );
    } else {
      return(
        <div>
          Loading...
        </div>
      );
    }
  }
}

export default NewsPanel;
