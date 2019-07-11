import * as React from "react";
import { APIClient } from "./api-client";
import { Broker } from "./broker";
import { DocumentStore } from "./document-store";

interface ContextType {
    broker: Broker
    apiClient: APIClient
    documentStore: DocumentStore
}

export const MainContext = React.createContext<ContextType>({} as ContextType)
