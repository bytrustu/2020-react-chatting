import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import md5 from 'md5';
import firebase from '../../firebase';


const RegisterPage = () => {

  const { register, watch, errors, handleSubmit } = useForm();
  const password = useRef();
  password.current = watch('password');

  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setIsLoading(true);
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await createdUser.user
        .updateProfile({
          displayName: data.name,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
        })

      await firebase.database().ref('users').child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      });
      setIsLoading(false);
      alert(`${createdUser.user.displayName}님, 회원가입이 완료 되었습니다. 🥰`);
    } catch (e) {
      setIsLoading(false);
      setErrorFromSubmit(e.message);
      setTimeout(() => {
        setErrorFromSubmit('');
      },3000);
    }
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>회원가입</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input
          name="email"
          type="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>이메일이 잘못 되었습니다.</p>}
        <label>이름</label>
        <input
          name="name"
          ref={register({ required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === 'required' && <p>이름은 필수 입력값 입니다.</p>}
        {errors.name && errors.name.type === 'maxLength' && <p>이름 입력 길이를 초과 했습니다.</p>}
        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && <p>비밀번호는 필수 입력값 입니다.</p>}
        {errors.password && errors.password.type === 'minLength' && <p>비밀번호는 최소 4자리 길이를 입력해야 합니다.</p>}
        <label>비밀번호 확인</label>
        <input
          name="password_confirm"
          type="password"
          ref={register({
            required: true,
            validate: value => value === password.current,
          })}
        />
        {errors.password_confirm && errors.password_confirm.type === 'required' && <p>비밀번호는 필수 입력값 입니다.</p>}
        {errors.password_confirm && errors.password_confirm.type === 'validate' && <p>비밀번호가 동일하지 않습니다.</p>}

        {errorFromSubmit && <p>에러가 발생했습니다.</p>}
        <input type="submit" value="가입하기" disabled={isLoading}/>
        <Link to="login" style={{ color: '#b2b2b2', textDecoration: 'none', fontSize: '13px' }}>이미 아이디가 있다면...</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
