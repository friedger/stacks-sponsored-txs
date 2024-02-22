import './App.css';
import ConnectWallet from './components/ConnectWallet';
import ContractDeploy from './components/ContractDeploy';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <>
      <ChakraProvider>
        {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
        <ConnectWallet />

        {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
        <ContractDeploy />
      </ChakraProvider>
    </>
  );
}

export default App;
