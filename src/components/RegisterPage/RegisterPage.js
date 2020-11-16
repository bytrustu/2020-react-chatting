import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>회원가입</h3>
      </div>
      <form>
        <label>이메일</label>
        <input
          name="email"
          type="email"
          // ref={register({ required: true, maxLength: 10 })}
        />
        {/*{errors.exampleRequired && <p>This field is required</p>}*/}
        <label>닉네임</label>
        <input
          name="name"
          // ref={register({ required: true, maxLength: 10 })}
        />
        {/*{errors.exampleRequired && <p>This field is required</p>}*/}
        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          // ref={register({ required: true, maxLength: 10 })}
        />
        {/*{errors.exampleRequired && <p>This field is required</p>}*/}
        <label>비밀번호 확인</label>
        <input
          name="password_confirm"
          type="password"
          // ref={register({ required: true, maxLength: 10 })}
        />
        {/*{errors.exampleRequired && <p>This field is required</p>}*/}
        <input type="submit" value="가입하기"/>
        <Link to="login" style={{ color: '#b2b2b2', textDecoration: 'none', fontSize: '13px' }}>이미 아이디가 있다면...</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
