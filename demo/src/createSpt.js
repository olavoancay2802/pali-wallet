import React, { Component, useEffect, useState, useCallback } from "react";
import logo from "./assets/images/logosys.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dropzone-uploader/dist/styles.css'
import FormCreateSPT from './FormCreateSPT'

const CreateSPT = () => {
  const [preview, setPreview] = useState("");
  const [isInstalled, setIsInstalled] = useState(false);
  const [canConnect, setCanConnect] = useState(true);
  const [balance, setBalance] = useState(0);
  const [controller, setController] = useState();
  const [connectedAccount, setConnectedAccount] = useState({});
  const [connectedAccountAddress, setConnectedAccountAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0.00001);
  const [toAddress, setToAddress] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const callback = async (event) => {
      if (event.detail.SyscoinInstalled) {
        setIsInstalled(true);

        if (event.detail.ConnectionsController) {
          setController(window.ConnectionsController);

          return;
        }

        return;
      }

      setIsInstalled(false);

      window.removeEventListener('SyscoinStatus', callback);
    }

    window.addEventListener('SyscoinStatus', callback);
  }, []);

  const handleTypeChanged = useCallback((checked) => {
    setChecked(checked)
  }, []);

  const setup = async () => {
    const state = await controller.getWalletState();

    if (state.accounts.length > 0) {
      controller.getConnectedAccount()
        .then((data) => {
          if (data) {
            setConnectedAccount(data);
            setConnectedAccountAddress(data.address.main);
            setBalance(data.balance);
          } else {
            setConnectedAccount({});
            setConnectedAccountAddress('');
            setBalance(0);
          }

          return;
        });
    }
  };

  useEffect(() => {
    if (controller) {

    }
  })
  useEffect(() => {
    if (controller) {
      setup();

      controller.onWalletUpdate(setup);
    }
  }, [
    controller,
  ]);

  const handleAssetSelected = (event) => {
    if (connectedAccount) {
      const selectedAsset = connectedAccount.assets.filter((asset) => asset.assetGuid == event.target.value);

      if (selectedAsset[0]) {
        setSelectedAsset(selectedAsset[0]);

        return;
      }

      setSelectedAsset(null);
    }
  };

  const handleMessageExtension = async () => {
    await controller.connectWallet();
    await setup();
  }

  const handleGetWalletState = async () => {
    return await controller.getWalletState();
  }

  const clearData = (inputs) => {
    for (let input of inputs) {
      input.value = '';
    }

    setToAddress('');
    setAmount(0);
    setFee(0.00001);
  }


  const handleSendToken = async (evt) => {
    const inputs = document.querySelectorAll('input');
    alert(`Submitting Precision: ${evt} `)
    // if (token !== null) {
    //   await controller.handleCreateToken(precision,
    //     symbol,
    //     maxsupply,
    //     fee,
    //     description,
    //     receiver,
    //     rbf);

    //   clearData(inputs);

    //   return;
    // }
    // clearData(inputs);

    return;
  }

  const getUploadParams = () => ({
    url: 'https://api.nft.storage/upload',
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJiNUM1NzJkYmFlNDQ1MkFDOGFiZWZlMjk3ZTljREIyRmEzRjRlNzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxOTcxMjM0MTgzNCwibmFtZSI6InN5cyJ9.KmVoWH8Sa0FNsPyWrPYEr1zCAdFw8bJwVnmzPsp_fg4"
    }
  });

  //"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5ASDASDAXCZg0NTY5MDEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxODU5NzczODM5NCwibmFtZSI6ImtleTEifQ.uNeFoDDU_M8uzTNTVQ3uYnxejjVNldno5nFuxzoOWMk"

  const handleChangeStatus = ({ meta, file, xhr }, status) => {
    if (xhr?.response) {
      const { value: { cid } } = JSON.parse(xhr.response);

      setPreview(`https://ipfs.io/ipfs/${cid}/${file.name}`);

      console.log(`CID:${cid}`);
      console.log('meta: ', meta);
      console.log('file', file);
      console.log(`other information: `, JSON.parse(xhr.response));

      document.getElementById('out').innerHTML += `${JSON.stringify(`CID:${cid}`)}\n`;
    };
  };


  return (
    <div className="app">
      {controller ? (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light  static-top">
            <div className="container">
              <a className="navbar-brand" href="https://syscoin.org/">
                <img src={logo} alt="logo" className="header__logo"></img>
              </a>
              <a className="button" href="/">Home</a>

              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <button
                    className="button"
                    onClick={canConnect ? handleMessageExtension : undefined}
                    disabled={!isInstalled}>
                    {connectedAccountAddress === '' ? 'Connect to Syscoin Wallet' : connectedAccountAddress}
                  </button>
                </ul>
              </div>
            </div>
          </nav>
          {!isInstalled && (<h1 className="app__title">You need to install Syscoin Wallet.</h1>)}


          <div className="form">
            <FormCreateSPT
              formCallback={handleSendToken}
            />
          </div>
        </div>
      ) : (
        <div>
          <p>...</p>
        </div>
      )}
    </div>
  );
}
export default CreateSPT;



