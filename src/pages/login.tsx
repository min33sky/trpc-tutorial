import dynamic from 'next/dynamic';

/**
 *? 랜더링을 할 때 hydration 문제로 인해 동적 임포트로 해결
 */
const LoginForm = dynamic(() => import('../components/LoginForm'), {
  ssr: false,
});

function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
