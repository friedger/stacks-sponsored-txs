import { showConnect } from '@stacks/connect';

import { userSession } from '../user-session';
import { Box, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

function authenticate() {
  showConnect({
    appDetails: {
      name: 'Stacks React Starter',
      icon: window.location.origin + '/logo512.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut('/');
}

const ConnectWallet = () => {
  if (userSession.isUserSignedIn()) {
    return (
      <Box>
        <Button variant="ghost" className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </Button>
        <Text>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</Text>
        <Text>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</Text>
      </Box>
    );
  }

  return (
    <button className="Connect" onClick={authenticate}>
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
