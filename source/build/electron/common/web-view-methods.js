'use strict'

// Public-facing API methods.
exports.syncMethods = new Set([
  'getURL',
  'loadURL',
  'getTitle',
  'isLoading',
  'isLoadingMainFrame',
  'isWaitingForResponse',
  'stop',
  'reload',
  'reloadIgnoringCache',
  'canGoBack',
  'canGoForward',
  'canGoToOffset',
  'clearHistory',
  'goBack',
  'goForward',
  'goToIndex',
  'goToOffset',
  'isCrashed',
  'setUserAgent',
  'getUserAgent',
  'openDevTools',
  'closeDevTools',
  'isDevToolsOpened',
  'isDevToolsFocused',
  'inspectElement',
  'setAudioMuted',
  'isAudioMuted',
  'isCurrentlyAudible',
  'undo',
  'redo',
  'cut',
  'copy',
  'paste',
  'pasteAndMatchStyle',
  'delete',
  'selectAll',
  'unselect',
  'replace',
  'replaceMisspelling',
  'findInPage',
  'stopFindInPage',
  'downloadURL',
  'inspectServiceWorker',
  'showDefinitionForSelection',
  'setZoomFactor',
  'setZoomLevel',
  'sendImeEvent'
])

exports.asyncCallbackMethods = new Set([
  'insertCSS',
  'insertText',
  'send',
  'sendInputEvent',
  'setLayoutZoomLevelLimits',
  'setVisualZoomLevelLimits',
  'getZoomFactor',
  'getZoomLevel',
  'print',
  'printToPDF'
])

exports.asyncPromiseMethods = new Set([
  'capturePage',
  'executeJavaScript'
])
