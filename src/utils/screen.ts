interface FsDocument extends Document {
	mozFullScreenElement?: Element;
	msFullscreenElement?: Element;
	webkitFullscreenElement?: Element;
	msExitFullscreen?: () => void;
	mozCancelFullScreen?: () => void;
	webkitExitFullscreen?: () => void;
}

const IsFullScreen = (): boolean => {
	const fsDoc = <FsDocument> document;
	return !!(fsDoc.fullscreenElement || fsDoc.mozFullScreenElement || fsDoc.webkitFullscreenElement || fsDoc.msFullscreenElement);
};

interface FsDocumentElement extends HTMLElement {
	msRequestFullscreen?: () => void;
	mozRequestFullScreen?: () => void;
	webkitRequestFullscreen?: () => void;
}

const ToggleFullScreen = (): void => {
	const fsDoc = <FsDocument> document;

	if (!IsFullScreen()) {
		const fsDocElem = <FsDocumentElement> document.documentElement;

		if (fsDocElem.requestFullscreen)
			fsDocElem.requestFullscreen();
		else if (fsDocElem.msRequestFullscreen)
			fsDocElem.msRequestFullscreen();
		else if (fsDocElem.mozRequestFullScreen)
			fsDocElem.mozRequestFullScreen();
		else if (fsDocElem.webkitRequestFullscreen)
			fsDocElem.webkitRequestFullscreen();
	}
	else if (fsDoc.exitFullscreen)
		fsDoc.exitFullscreen();
	else if (fsDoc.msExitFullscreen)
		fsDoc.msExitFullscreen();
	else if (fsDoc.mozCancelFullScreen)
		fsDoc.mozCancelFullScreen();
	else if (fsDoc.webkitExitFullscreen)
		fsDoc.webkitExitFullscreen();
};

const SetFullScreen = (full: boolean): void => {
	if (full !== IsFullScreen())
		ToggleFullScreen();
};

Object.seal(ToggleFullScreen);
Object.seal(SetFullScreen);
export {
	ToggleFullScreen,
	SetFullScreen,
};
