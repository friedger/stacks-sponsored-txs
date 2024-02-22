import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ConnectWallet from './components/ConnectWallet';
import ContractDeploy from './components/ContractDeploy';

function App() {
  return (
    <>
      {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
      <ConnectWallet />

      {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
      <ContractDeploy />
    </>
  );
}

export default App;
