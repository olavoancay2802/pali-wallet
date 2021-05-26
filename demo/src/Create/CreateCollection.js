import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dropzone-uploader/dist/styles.css';
import FormCollection from "./Form/FormCollection"
import Header from "../components/Header";

const CreateCollection = () => {
  const handleCreateCollection = async (event, state) => {
    event.preventDefault();

    console.log('window', window, await window.ConnectionsController.getWalletState())

    await window.ConnectionsController.handleCreateCollection(state);

    // console.log('handle create collection', collectionName, description, sysAddress, symbol, property1, property2, property3, attribute1, attribute2, attribute3)

    console.log('[createCollection - page]: state create collection', state)
  }

  return (
    <div className="app">   
      <Header />

      <div className="form"> 
        <FormCollection formCallback={handleCreateCollection} />
      </div>
    </div>
  );
}
  
export default CreateCollection;