import Auth from '../Auth/Auth';
import React from 'react';
import './NewsCard.css';
import 'materialize-css/dist/css/materialize.min.css';
import { chipsColor, chipsName, classTitle, classColor } from '../newsSetting';
import defaultPic from './default.jpg';

class NewsCard extends React.Component {
	redirectToUrl(url, event) {
		//event.preventDefault();
		this.sendClickLog();
		window.open(url, '_blank');
	}

	sendClickLog() {
		const url =
			'https://' +
			window.location.hostname +
			'/news/userId/' +
			Auth.getEmail() +
			'/newsId/' +
			this.props.news.digest;
		console.log(url);
		let request = new Request(encodeURI(url), {
			method: 'POST',
			headers: {
				Authorization: 'bearer ' + Auth.getToken()
			}
		});

		fetch(request);
	}

	defaultImg(e) {
		e.target.src = defaultPic;
	}

	render() {
		return (
			<div className="col s12 m6 l4">
				<div className="card medium">
					<div className="card-image fill">
						{this.props.news.urlToImage && (
							<img
								className="img200"
								src={this.props.news.urlToImage}
								onError={this.defaultImg}
							/>
						)}
						{!this.props.news.urlToImage && (
							<img className="img200 default" src={defaultPic} />
						)}
						<span className="card-title">
							<div
								className="title"
								onClick={() => this.redirectToUrl(this.props.news.url)}
							>
								{this.props.news.title}
							</div>
						</span>
					</div>
					<div className="card-content">
						<p>{this.props.news.description}</p>
					</div>
					<div className="card-action">
						{this.props.news.source != null && (
							<div className={'source labels'}>{this.props.news.source}</div>
						)}
						{this.props.news.time != null && (
							<div className="amber darken-1 labels">Today</div>
						)}
						{this.props.news.class != null && (
							<div
								className="news-class-banner"
								style={{
									background: classColor[this.props.news.class]
								}}
							>
								{classTitle[this.props.news.class]}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default NewsCard;
