import React from 'react';
import ReactDOM from 'react-dom';
import { APIClient, GetDocumentsEvent } from './api-client';
import { Broker } from './broker';
import { App } from './components/app';
import { MainContext } from './context';
import { DocumentStore } from './document-store';
import './index.scss';
import * as serviceWorker from './serviceWorker';

async function main() {
    const broker = new Broker()
    const apiClient = new APIClient()

    const documentStore = new DocumentStore(broker, apiClient)

    const documents = await apiClient.getDocuments()
    broker.publish(GetDocumentsEvent, documents)

    const context = {
        broker,
        apiClient,
        documentStore,
    }

    ReactDOM.render(
        <MainContext.Provider value={context}>
            <App />
        </MainContext.Provider>,
        document.getElementById("root")
    )
}

main()

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
