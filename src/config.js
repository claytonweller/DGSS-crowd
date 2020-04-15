const LOCAL_DEV = process.env.LOCAL_DEV
const LOCAL_WS = 'ws://127.0.0.1:8080'
export const WS_URL = LOCAL_DEV ? LOCAL_WS : (process.env.POSTGRES_URL || LOCAL_WS)
