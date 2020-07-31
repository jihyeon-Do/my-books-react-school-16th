import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import withAuth from '../hocs/withAuth';
import styled, { css } from 'styled-components';

// 스타일을 먹인 컴포넌트를 쓴다는것
// - button
// - Button

const LoginHeader = styled.h1`
  text-align: center;
  font-size: 40px;
  margin: 0;
`;

const Wrapper = styled.div`
  width: 800px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 20px 30px 10px #dbdbdb;
`;

const LoginButton = styled.button`
  width: 100%;
  margin-top: 40px;
  height: 50px;
  border-radius: 30px;
  border: 0;
  font-size: 20px;
  :hover {
    cursor: pointer;
  }
  ${(props) => {
    return (
      props.primary &&
      css`
        background-color: #05137a;
        color: white;
      `
    );
  }};
`;

const BodyBackground = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  background: linear-gradient(130deg, #1a6db8, #7eaed9);
`;

const LoginBox = styled.div`
  float: left;
  width: 50%;
  height: 100%;
  padding: 50px 0;
  label {
    display: block;
  }

  label:last-of-type {
    margin-top: 15px;
  }

  form {
    padding: 30px 50px;

    input {
      display: block;
      width: 100%;
      height: 35px;
      border: 1px solid gray;
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 30px;
  margin: 0;
`;

class Signin extends React.Component {
  state = {
    email: '',
  };

  passwordRef = React.createRef(); // 한번 만들어지면 객체 인스턴스는 그대로
  render() {
    console.log(this.props);
    return (
      <Wrapper>
        <BodyBackground></BodyBackground>
        <LoginBox>
          <LoginHeader>Sign in</LoginHeader>
          <Title>Welcome Back</Title>
          <form>
            <fieldset>
              <label htmlFor="id">Email *</label>
              <input
                id="id"
                type="text"
                value={this.state.email}
                onChange={this.change}
              />
              <label htmlFor="password">password *</label>
              <input id="password" type="password" ref={this.passwordRef} />
              <LoginButton onClick={this.click} primary>
                Login
              </LoginButton>
            </fieldset>
          </form>
        </LoginBox>
      </Wrapper>
    );
  }

  click = async () => {
    console.log('login', this.state.email, this.passwordRef.current.value);

    // 이메일과 패스워드를 뽑아서 서버에 보낸다. POST

    // web api

    // 무언가를 생성할 때, POST
    // 무언가를 조회할 때, GET
    // 무언가를 수정할 때, PATCH
    // 무언가를 삭제할 때, DELETE
    // ex) book, auth, user

    // 서버에다가 내가 허가된 유저인지를 체크하고, 인증 토큰을 받아오는 행위

    // 유저 테이블
    // 유저아이디, 유저이메일, 유저패스워드, 유저생성일...

    // 세션 테이블
    // 세션아이디, 세션토큰, 세션생성일...

    // 인증 토큰 브라우저 어딘가에 저장해두고,

    // 다른 정보를 얻어올때, 나 인증한 유저야 라고 토큰을 함께 보냅니다.

    // https://api.marktube.tv/v1/me POST {email, password}
    // {token: ''}

    const email = this.state.email;
    const password = this.passwordRef.current.value;

    if (email === '' || password === '') return;

    try {
      const response = await axios.post('https://api.marktube.tv/v1/me', {
        email,
        password,
      });
      // 1. 토큰을 저장한다.
      const token = response.data.token;
      console.log(token);
      localStorage.setItem('token', token);
      // 2. 홈으로 이동시킨다.
      this.props.history.push('/');
    } catch (error) {
      const errorCode = error?.response?.data?.error || 'NOT_MATCH';
      if (errorCode === 'PASSWORD_NOT_MATCH') {
        message.error('패스워드가 안맞드라');
      } else if (errorCode === 'USER_NOT_EXIST') {
        message.error('없는 이메일이야');
      } else {
        message.error('나도 모르는 에러');
      }
    }
  };

  change = (e) => {
    this.setState({ email: e.target.value });
  };
}

export default withAuth(Signin, false);
