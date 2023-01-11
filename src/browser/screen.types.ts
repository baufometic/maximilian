export interface FsDocument extends Document {
	mozFullScreenElement?: Element;
	msFullscreenElement?: Element;
	webkitFullscreenElement?: Element;
	msExitFullscreen?: () => void;
	mozCancelFullScreen?: () => void;
	webkitExitFullscreen?: () => void;
}
