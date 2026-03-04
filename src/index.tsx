import store from "./store";
import Application from "@components/Application";
import { createRoot, Root } from "react-dom/client";
import { Provider } from "react-redux";

const rootElement: HTMLElement | null = document.getElementById("root");

if (!rootElement) {
    throw new Error("Cannot acquire #root element, Aborting...");
}

const reactRoot: Root = createRoot(rootElement);

reactRoot.render(
    <Provider store={store}>
        <Application />
    </Provider>,
);
