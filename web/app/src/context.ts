import * as React from "react";
import { APIClient } from "./api-client";
import { Broker } from "./broker";
import { DocumentStore } from "./document-store";

export interface MainContextType {
    broker: Broker
    apiClient: APIClient
    documentStore: DocumentStore
}

export const MainContext = React.createContext<MainContextType>({} as MainContextType)
