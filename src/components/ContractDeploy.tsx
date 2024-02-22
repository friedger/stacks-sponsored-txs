import { useConnect } from '@stacks/connect-react';
import { AnchorMode, PostConditionMode } from '@stacks/transactions';

import { userSession } from '../user-session';
import { useState } from 'react';
import { Textarea } from '@chakra-ui/textarea';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';

const ContractDeploy = () => {
  const { doContractDeploy } = useConnect();
  const [contractName, setContractName] = useState('p1');
  const [codeBody, setCodeBody] = useState(
    "(stx-transfer? u1 tx-sender 'SP000000000000000000002Q6VF78)"
  );
  function deploy() {
    doContractDeploy({
      codeBody,
      contractName,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
      onFinish: data => {
        console.log('onFinish:', data);
        window
          .open(
            `https://explorer.hiro.so/txid/${data.stacksTransaction.txid}?chain=testnet`,
            '_blank'
          )
          ?.focus();
      },
      onCancel: () => {
        console.log('onCancel:', 'Transaction was canceled');
      },
    });
  }

  if (!userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <Box>
      <p>Deploy Contract without Post Conditions</p>
      <FormControl>
        <FormLabel>Contract name</FormLabel>
        <Input
          value={contractName}
          onChange={e => {
            setContractName(e.currentTarget.value);
          }}
        />
        <FormHelperText>How the contract will be called.</FormHelperText>
      </FormControl>

      <br />
      <Textarea
        value={codeBody}
        onChange={e => {
          setCodeBody(e.currentTarget.value);
        }}
      />
      <br />
      <Button className="Vote" onClick={() => deploy()}>
        Deploy
      </Button>
    </Box>
  );
};

export default ContractDeploy;
