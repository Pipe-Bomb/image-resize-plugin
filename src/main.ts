import type PipeBomb from "@pipe-bomb/plugin-sdk";
import { ResizeAttributeSource } from "./resize.attribute-source.js";

export default class Plugin implements PipeBomb.Plugin {
	enable(apiContext: PipeBomb.PluginApiContext): void {
		const logger = apiContext.getLogger();

		apiContext.registerLanguageDirectory("language");

		const attributeSource = new ResizeAttributeSource();
		apiContext.registerAttributeSource(attributeSource);
	}

	disable(): void {}
}
