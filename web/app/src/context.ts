import * as React from "react";
import { Broker } from "./broker";
import { DocumentStore } from "./document-store";

interface ContextType {
    broker: Broker
    documentStore: DocumentStore
}

export const MainContext = React.createContext<ContextType>({} as ContextType)
