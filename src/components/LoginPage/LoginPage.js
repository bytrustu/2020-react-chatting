import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';


const LoginPage = () => {

  const { register, errors, handleSubmit } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      setIsLoading(false);
      alert('로그인 성공 했습니다. 🥰');
    } catch (e) {
      setIsLoading(false);
      setErrorFromSubmit(e.message)
      alert('인증에 실패 했습니다.');
    }
  }

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>로그인</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input
          name="email"
          type="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>이메일이 잘못 되었습니다.</p>}
        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && <p>비밀번호는 필수 입력값 입니다.</p>}
        {errors.password && errors.password.type === 'minLength' && <p>비밀번호는 최소 4자리 길이를 입력해야 합니다.</p>}

        {errorFromSubmit && <p>에러가 발생했습니다.</p>}
        <input type="submit" value="로그인" disabled={isLoading}/>
        <Link to="register" style={{ color: '#b2b2b2', textDecoration: 'none', fontSize: '13px' }}>아직 아이디가 없다면...</Link>
      </form>
    </div>
  );
};

export default LoginPage;
