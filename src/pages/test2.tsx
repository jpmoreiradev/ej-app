import { useRouter } from 'next/router';

export default function Welcome() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <button type="button" onClick={handleLogin}>
      Entrar
    </button>
  );
}
