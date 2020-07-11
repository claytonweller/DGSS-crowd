const LOCAL_DEV = process.env.REACT_APP_LOCAL_DEV;
const LOCAL_WS = 'ws://127.0.0.1:8080';
const LAMBDA_SOCKET = process.env.REACT_APP_LAMBDA_SOCKET || LOCAL_WS;
export const WS_URL = LOCAL_DEV ? LOCAL_WS : LAMBDA_SOCKET;
export const DEBUG_MODE = process.env.DEBUG_MODE;
