import axios from 'axios'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
import { HttpsProxyAgent } from 'https-proxy-agent';
import { readJson } from './utils';


function signAndEncodeSignature(privateKeyBase58: any, timestamp: any) {
    const privateKey = bs58.decode(privateKeyBase58)
    const keypair = nacl.sign.keyPair.fromSecretKey(privateKey)
    const message = new TextEncoder().encode(`Sign in to pump.fun: ${timestamp}`)
    // const message = `Sign in to pump.fun: ${timestamp}`
    const signature = nacl.sign.detached(message, keypair.secretKey)

    if (!nacl.sign.detached.verify(message, signature, keypair.publicKey)) {
        throw new Error('Signature verification failed')
    }

    return {
        timestamp,
        signature: bs58.encode(signature),
        publicKey: bs58.encode(keypair.publicKey)
    }
}

// Function to perform login
async function performLogin(wallet: any) {
    try {
        const timestamp = Date.now().toString()
        const { signature } = signAndEncodeSignature(
            bs58.encode(wallet.secretKey),
            timestamp
        )

        const payload = {
            address: wallet.publicKey.toString(),
            signature: signature,
            timestamp: timestamp
        }

        const response = await axios.post(
            'https://frontend-api.pump.fun/auth/login',
            payload,
            {
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Origin: 'https://pump.fun',
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                    'sec-ch-ua':
                        '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"'
                }
            }
        )

        if (response.headers['set-cookie']) {
            const authCookie = response.headers['set-cookie'].find((cookie: any) =>
                cookie.startsWith('auth_token=')
            )
            return authCookie ? authCookie.split('=')[1].split(';')[0] : null
        }
        console.log("Perform Login: ", response.status);
        return null
    } catch (error: any) {
        console.error('Login error:', error.message)
        throw error
    }
}

// Function to get token
async function getToken(walletPublicKey: any, authToken: any) {
    try {
        const response = await axios.get(
            `https://frontend-api.pump.fun/token/generateTokenForThread?user=${walletPublicKey}`,
            {
                headers: {
                    accept: 'application/json',
                    Cookie: `auth_token=${authToken}`,
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                }
            }
        )
        return response.data.token
    } catch (error: any) {
        console.error('Token error:', error.message)
        throw error
    }
}

async function postCommentWithProxy(token: any, mint: any, text: any) {
    const proxyList = readJson("proxy_list.json");
    const usedProxies = new Set();
    const userAgents = [
        // Chrome on Windows
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        // Chrome on macOS
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        // Firefox on Windows
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
        // Firefox on macOS
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0',
        // Safari on macOS
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
        // Edge on Windows
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64',
        // Samsung Browser on Android
        'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/13.2 Chrome/91.0.4472.124 Mobile Safari/537.36',
        // Chrome on Android
        'Mozilla/5.0 (Linux; Android 10; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Mobile Safari/537.36',
        // Safari on iPhone
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile/15E148 Safari/604.1',
        // Safari on iPad
        'Mozilla/5.0 (iPad; CPU OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile/15E148 Safari/604.1',
    ];

    while (usedProxies.size < proxyList.length) {
        const randIdx = Math.floor(Math.random() * proxyList.length);
        if (usedProxies.has(randIdx)) continue;

        usedProxies.add(randIdx);
        const proxy = proxyList[randIdx];

        //  @ts-ignore
        const proxyUrl = `${proxy.protocols}://${proxy.ip}:${proxy.port}`;
        console.log(`Using Proxy: ${proxyUrl}`);
        const agent = new HttpsProxyAgent(proxyUrl);
        const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

        try {
            const response = await axios.post(
                'https://client-proxy-server.pump.fun/comment',
                { text, mint },
                {
                    headers: {
                        accept: '*/*',
                        'content-type': 'application/json',
                        origin: 'https://pump.fun',
                        referer: 'https://pump.fun/',
                        'x-aws-proxy-token': token,
                        'User-Agent': randomUserAgent,
                    },
                    httpAgent: agent,
                    timeout: 10000,
                    validateStatus: (status) =>
                        status === 200 || status === 201 || status === 429,
                }
            );

            return response.status === 200 || response.status === 201;
        } catch (error) {
            //  @ts-ignore
            console.error(`Proxy ${proxyUrl} failed. Error: ${error.message}`);

            console.log(error);
        }
    }

    throw new Error("All proxies failed");
}



export {
    performLogin,
    getToken,
    postCommentWithProxy,
}