import Application from "@components/Application";
import { createRoot, Root } from "react-dom/client";

const rootElement: HTMLElement | null = document.getElementById("root");

if (!rootElement) {
    throw new Error("Cannot acquire #root element, Aborting...");
}

const reactRoot: Root = createRoot(rootElement);

reactRoot.render(<Application />);
