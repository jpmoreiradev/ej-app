import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/dashboard');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>Bem-vindo!</h1>
      <button
        onClick={handleRedirect}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Ir para Dashboard
      </button>
    </div>
  );
}
