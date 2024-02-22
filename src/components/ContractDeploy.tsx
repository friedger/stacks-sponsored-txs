import { useConnect } from '@stacks/connect-react';
import { AnchorMode, PostConditionMode } from '@stacks/transactions';

import { userSession } from '../user-session';

const ContractDeploy = () => {
  const { doContractDeploy } = useConnect();

  function deploy() {
    doContractDeploy({
      codeBody: "(stx-transfer? u1000000 tx-sender 'ST1CXK7PNT0ZKW2SJ6PPYNRZW27P4622F5936D8GQ)",
      contractName: 'p3',
      sponsored: true,
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
    <div>
      <p>Deploy Sponsored Contract</p>
      <button className="Vote" onClick={() => deploy()}>
        Deploy
      </button>
    </div>
  );
};

export default ContractDeploy;
