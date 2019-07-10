import * as React from "react";
import * as ReactDOM from "react-dom";
import { APIClient, APIClientEvent } from "./api-client";
import { Broker } from "./broker";
import { App } from "./components/app";
import { MainContext } from "./context";
import { DocumentStore } from "./document-store";
import "./main.scss";

async function main() {
    const broker = new Broker()
    const apiClient = new APIClient()

    const documentStore = new DocumentStore(broker)

    const documents = await apiClient.getDocuments()
    broker.publish(APIClientEvent.GetDocuments, documents)

    const context = {
        broker,
        documentStore,
    }

    ReactDOM.render(
        <MainContext.Provider value={context}>
            <App />
        </MainContext.Provider>,
        document.getElementById("app")
    )
}

main()
