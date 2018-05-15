# TOP News: Real Time News Scraping and Recommendation System

* Implemented a data pipeline which monitors, scrapes and dedupes latest news (MongoDB, Redis, RabbitMQ);
* Designed data monitors for obtaining latest news from famous websites and recommend to web server.
* Successfully fetch useful data from original news websites by building news scrapers.
* Build dedupers which filter same news by using NLP (TF-IDF) to analyze similarities of articles scraped from news websites.
* Use Tensorflow for machine learning which can shows news according to users interests.
Build a single-page web.
 
***

# Week 1 React FrontEnd Build Up

## De-Couple into Components

![App Structure](/app_structure.png)

* Base : Whole React App (Navbar + App)
* App : Image(title) + NewsPanel
* NewsPanel : Concludes many NewsCard such as News Lists (While user scorlling, backend send new NewsCard continously)
* NewsCard : Single News adding into NewsPanel with News image, News title, News contents, News description, News Tage and Links to News.

## Install & Init Environment
### Create React App - likes Angular cli (recommened by Facebook)
[Create React App](https://reactjs.org/blog/2016/07/22/create-apps-with-no-configuration.html)
* Deal with webpack and give a whole framework

- Install CRA (Global) : Local Developing Tool
```
sudo npm install -g create-react-app
```
- Create a new React App
```
create-react-app top-news
```
- Test Connection
```
cd top-news
npm start
```

## App
- public : images
- src : Each Component has its own folder
```
App / App.js
```
### App.js
- There is only one div tag in render function
- import React , './App.css', CSS file and logo
- Use "className" instead of "class" : Since in ES6, we use class for define a App class
- 

```js
import React from 'react';
import './App.css';
import logo from './logo.png';

class App extends React.Component {
  render() {
    return(
      <div>
        <img className = 'logo' src = {logo} alt = 'logo'/>
        <div className = 'container'>
             {/* TODO */}
        </div>
      </div>
    ); 
  }
}

export default App;
```
* Why use "default App"?
* If not, while you want to import App from other file, you need to type : 
```js
import { App } from './App.js';
```
* But if you have default, you could get rid of {}

- CSS setup
```css
.App {
  text-align: center;
}

.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
  width: 20%;
}
```
### Materialize CSS Design
- install in Client sie
```
npm install materialize-css --save
```
- Import 
```js
import 'materialize-css/dist/css/materialize.min.css';
```
### index.js in Client Side
- Build a index.js for starting the client side
```
touch src/index.js
```
- index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```


- Where is root?
* public -> index.html
```html
<div id="root"></div>
```

## NewsPanel
### Save all NewsCard and connect with BackEnd
- Create NewsPanel folder and NewsPanel.js
```
mkdir src/NewsPanel
code src/NewsPanel/NewsPanel.js
```
```js
import React from 'react';
import './NewsPanel.css';
```

- Since we Need to save the News content, we need an internal variable (need constructor)

```js
class NewsPanel extends React.Component {
  constructor() {
    super();
    this.state = { news: null };
  }
```

- state = {news: null} -> lists of JSON
- Render conditions : there is a news and then create a NewsCard or show the loading message
```js
render() {
    if (this.state.news) {
      return (
        <div>
          {this.renderNews()}
        </div>
      );
    } else {
      return (
        <div>
          Loading ...
        </div>
      );
```
- local function, renderNews() : Render out the News and dynamactiy deal with the NewCards.
* Clickable - Use A tag in HTML
* Key - in React, if you would like to use a list, need to give a 'key' since the Virtual DOM need to know which items were changed in lists and just change that item insteads of renewing all items.
* "list-group-item" needs to be put into "list-group" and show the {news_list} in list group

- Get All News from state news -> Make all news in list -> Make all news become a NewsCard -> Put NewsCards into list-group

```js
renderNews() {
    const news_list = this.state.news.map(news => {
      return (
        <a className = 'list-group-item' key = {news.digest} href = '#'>
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

```

- local function, loadMoreNews() : Get News from backend - init load. (Now we gave a mock data)

```js
loadMoreNews() {
  this.setState({
    news : [
      {....data
      }]
  });
}
```
- After render() was ran, it will execute componentDidMount() -> Load News in state
```js
  componentDidMount () {
    this.loadMoreNews();
  }
```

- Import NewsCard
```js
import NewsCard from '../NewsCard/NewsCard';
```
- Export NewPanel
```js
export default NewsPanel;
```
### Add NewsPanel CSS
- By default for future using
```
touch src/NewsPanel/NewsPanel.css
```

### Import NewsPanel into App.js
- App.js
```js
import NewsPanel from '../NewsPanel/NewsPanel';

<div className = 'container'>
    <NewsPanel />
</div>
```

## NewsCard - Show UI
- Create NewsCard Component Folder
```
mkdir src/NewsCard
touch src/NewsCard/NewsCard.js
src/NewsCard/NewsCard.css
```
- class NewsCard (For HTML contents)
```js
class NewsCard extends React.Component {
  render() {
    return(
  HTML....
```

### HTML Structure
* news-container
* row
* col s4 fill
* image
* col s8
* news-intro-col
* news-intro-panel
* news-description
* news-chip

- onClick -> redirectToUrl()
```js
  redirectToUrl(url, event) {
    event.preventDefault();
    window.open(url, '_blank');
  }
```
- Get the data from props.news from NewsPanel.js
```js
  <h4>
     {this.props.news.title}
  </h4>
```

- NewsCard could get the data from NewsPanel since it was passed from :
```js
  <a className = 'list-group-item' key = {news.digest} href = '#'>
    <NewsCard news = {news} />
  </a>  
```

- Dont get chips if there is no source (this.props.news.source != null &&)
```js
 {this.props.news.source != null && <div className='chip light-blue news-chip'>{this.props.news.source}</div>}
 ```

- CSS file
```css
.news-intro-col {
  display: inline-flex;
  color: black;
  height: 100%;
}

CSS....
```
## Refactor
- Create a web_server file and move top-news which was renamed "client" into it
```
mkdir web_server
mv top-news/ ./web_server/client
```
## Continuous loading News (Server-Side REST API - NodeJS & Client-Side - React) 

- Deploy to AWS, there is no different likes server and client.

- Create React App provide "Development Server" for developing, but we wont use this to serve Users

- Development: Node Server + Development Server
- Publishment: Node Server + build (built by React App)

### Express application generator - NodeJS Server
[Express Application Generator](https://expressjs.com/en/starter/generator.html)
- Install Globally
```
sudo npm install express-generator -g
```

- Create a Server in web_server
```
express server  //   Usage: express [options] [dir]
```
- Install dependencies
```
cd server
npm install
npm start
```

## Configue App.js (defualtly installed lots of requirements)

- Delete :
* bodyParser: POST Request
* cookieParser: Authentication
* logger: Login
* users: Login

- Change views engine
* Put the default folder to /client/build
```js
app.set('views', path.join(__dirname, '../client/build'));
```

- Express Static : Find the image
```js
app.use(express.static(path.join(__dirname, '../client/build/static')));
```

- Client: Build a build folder for server to use
```
npm run build
```






