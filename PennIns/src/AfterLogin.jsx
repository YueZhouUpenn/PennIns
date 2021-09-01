/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import { CreateAPost } from './CreateAPost';
import { TrendingPosts } from './ShowPosts';
import { Profile } from './Profile';
import 'swagger-ui-react/swagger-ui.css';
import { FollowerSug } from './FollowSug';

export class AfterLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trending: 'active',
      profile: 'inactive',
      create: 'inactive',
      followerSuggestion: 'inactive',
      swagger: 'inactive',
    };
  }

  openTrending = () =>{
    this.setState({
      trending: 'active',
      profile: 'inactive',
      create: 'inactive',
      followerSuggestion: 'inactive',
      swagger: 'inactive',
    });
  }

  openProfile = () => {
    this.setState({
      trending: 'inactive',
      profile: 'active',
      create: 'inactive',
      followerSuggestion: 'inactive',
      swagger: 'inactive',
    });
  }

  openCreate = () => {
    this.setState({
      trending: 'inactive',
      profile: 'inactive',
      create: 'active',
      followerSuggestion: 'inactive',
      swagger: 'inactive',
    });
  }

  openFollowerSuggestion = () => {
    this.setState({
      trending: 'inactive',
      profile: 'inactive',
      create: 'inactive',
      followerSuggestion: 'active',
      swagger: 'inactive',
    });
  }

  openSwagger = () => {
    this.setState({
      trending: 'inactive',
      profile: 'inactive',
      create: 'inactive',
      followerSuggestion: 'inactive',
      swagger: 'active',
    });
  }

  logout = () => {
    this.setState({
      trending: 'inactive',
      profile: 'inactive',
      create: 'inactive',
      followerSuggestion: 'inactive',
      swagger: 'inactive',
    });
  }

  navbar() {
    return (
      <nav className="nav nav5">
        <ul>
          <li>
            <a className = "navFont" href="#Trend">PennIns</a>
          </li>
          <li>
            <a className = "navFont" href="#Trend" onClick={this.openTrending}>Trending Posts</a>
          </li>
          <li>
            <a className = "navFont" href="#Suggestions" onClick={this.openFollowerSuggestion}>Follower Suggestions</a>
          </li>
          <li>
            <a className = "navFont" href="#Swagger" onClick={this.openSwagger}>Interactive API with Swagger UI</a>
          </li>
          <li>
            <a href="/"><i className="fa fa-user-circle" aria-hidden="true"></i></a>
            <ul>
              <li><a href="#profile" className = "navFont" onClick={this.openProfile}>Profile</a></li>
              <li><a href="#logout" className = "navFont" onClick={this.props.logoutHandler}>Log out</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }


  render() {
    if (this.state.profile === 'active') {
      return (
        <div>
          {this.navbar()}
          <Profile user_id={this.props.user_id} />
        </div>
      );
    } if (this.state.create === 'active') {
      return (
        <div>
          {this.navbar()}
          <CreateAPost user_id={this.props.user_id} />
        </div>
      );
    } if (this.state.followerSuggestion === 'active') {
      return (
        <div>
          {this.navbar()}
          <FollowerSug user_id={this.props.user_id} />
        </div>
      );
    } if (this.state.swagger === 'active') {
      return (
        <div>
          {this.navbar()}
          <SwaggerUI url="http://localhost:8081/swagger" />
        </div>
      );
    }
    return (
      <div>
        {this.navbar()}
        <TrendingPosts user_id={this.props.user_id} />
      </div>
    );
  }
}
