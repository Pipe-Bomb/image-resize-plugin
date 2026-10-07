import {
	AlbumInformationHelper,
	AlbumMetadata,
	ArtistInformationHelper,
	ArtistMetadata,
	AttributeSource,
	AttributeSourceApiContext,
	BufferAttributeFormatterInfo,
	BufferAttributeFormatterResult,
	TrackAttributionHelper,
	TrackMetadata,
} from "@pipe-bomb/plugin-sdk";
import { sanitizeDimension } from "./util.js";
import sharp from "sharp";
import { PassThrough } from "stream";

export class ResizeAttributeSource implements AttributeSource {
	readonly id = "resize";

	async resize({
		extension,
		getStream,
		params,
	}: BufferAttributeFormatterInfo): Promise<BufferAttributeFormatterResult | null> {
		const widthStr = params.width;
		const heightStr = params.height;

		if (widthStr || heightStr) {
			const width = sanitizeDimension(widthStr);
			const height = sanitizeDimension(heightStr);

			if (width || height) {
				const passthrough = new PassThrough();

				getStream()
					.pipe(sharp())
					.resize({
						width: width ?? undefined,
						height: height ?? undefined,
						fit: "cover",
						withoutEnlargement: true,
					})
					.webp({
						quality: 80,
						effort: 3,
					})
					.pipe(passthrough);

				return {
					stream: passthrough,
					contentType: "image/webp",
					extension: "webp",
				};
			}
		}

		return {
			stream: getStream(),
			extension,
		};
	}

	enable(api: AttributeSourceApiContext): void {
		api.registerTrackAttributes([
			{
				key: "front",
				type: "buffer",
				supportsMultiple: false,
				formatter: (info) => this.resize(info),
			},
			{
				key: "back",
				type: "buffer",
				supportsMultiple: false,
				formatter: (info) => this.resize(info),
			},
		]);

		api.registerAlbumAttributes([
			{
				key: "front",
				type: "buffer",
				supportsMultiple: false,
				formatter: (info) => this.resize(info),
			},
			{
				key: "back",
				type: "buffer",
				supportsMultiple: false,
				formatter: (info) => this.resize(info),
			},
		]);

		api.registerArtistAttributes([
			{
				key: "thumb",
				type: "buffer",
				supportsMultiple: false,
				formatter: (info) => this.resize(info),
			},
			{
				key: "background",
				type: "buffer",
				supportsMultiple: false,
				formatter: (info) => this.resize(info),
			},
			{
				key: "logo",
				type: "buffer",
				supportsMultiple: false,
				formatter: (info) => this.resize(info),
			},
		]);

		api.registerPlaylistAttributes([
			{
				key: "thumb",
				type: "buffer",
				supportsMultiple: false,
				formatter: (info) => this.resize(info),
			},
			{
				key: "title",
				type: "string",
				supportsMultiple: false,
				formatter: (title) => title.toUpperCase(),
			},
		]);
	}

	getName(): string {
		return "Image Resizer";
	}

	async getTrackAttributeValues(
		_helper: TrackAttributionHelper,
	): Promise<TrackMetadata> {
		return {
			artists: null,
			attributes: null,
		};
	}

	async getArtistAttributeValues(
		_helper: ArtistInformationHelper,
	): Promise<ArtistMetadata> {
		return {
			attributes: null,
		};
	}

	async getAlbumAttributeValues(
		_helper: AlbumInformationHelper,
	): Promise<AlbumMetadata> {
		return {
			artists: null,
			attributes: null,
		};
	}
}
