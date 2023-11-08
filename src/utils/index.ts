import { encodeTelegramUrlParameters, isTelegramUrl } from '@tonconnect/sdk';

import {
    ConnectRequest,
    SessionCrypto
} from '@tonconnect/protocol';


export function addQueryParameter(url: string, key: string, value: string): string {
    const parsed = new URL(url);
    parsed.searchParams.append(key, value);
    return parsed.toString();
}



export function getWindow(): Window | undefined {
    if (typeof window !== 'undefined') {
        return window;
    }

    return undefined;
}

export function isInTWA(): boolean {
    return true;
    // return !!(getWindow() as { TelegramWebviewProxy: unknown } | undefined)?.TelegramWebviewProxy;
}

export type ReturnStrategy = 'back' | 'none' | `${string}://${string}`;

export function addReturnStrategy(
    url: string,
    strategy:
        | ReturnStrategy
        | { returnStrategy: ReturnStrategy; twaReturnUrl: `${string}://${string}` | undefined }
): string {
    let returnStrategy;
    if (typeof strategy === 'string') {
        returnStrategy = strategy;
    } else {
        // console.log(isInTWA(), 'isInTWA()')
        returnStrategy = isInTWA() ? strategy.twaReturnUrl || strategy.returnStrategy : 'none';
    }
    const newUrl = addQueryParameter(url, 'ret', returnStrategy);

    // console.log(isTelegramUrl(url), 'isTelegramUrl(url)')
    if (!isTelegramUrl(url)) {
        return newUrl;
    }

    const lastParam = newUrl.slice(newUrl.lastIndexOf('&') + 1);
    const resUrl = newUrl.slice(0, newUrl.lastIndexOf('&')) + '-' + encodeTelegramUrlParameters(lastParam);

    // console.log(resUrl, 'resUrl')
    return resUrl;
}


export function redirectToTelegram(
    universalLink: string,
    options: {
        returnStrategy: ReturnStrategy;
        twaReturnUrl: `${string}://${string}` | undefined;
    }
): string {
    const url = new URL(universalLink);
    url.searchParams.append('startattach', 'tonconnect');

    return (addReturnStrategy(url.toString(), options));
}


const PROTOCOL_VERSION = 2;
function generateRegularUniversalLink(universalLink: string, message: ConnectRequest): string {
    const url = new URL(universalLink);
    url.searchParams.append('v', PROTOCOL_VERSION.toString());
    url.searchParams.append('id', new SessionCrypto().sessionId);
    url.searchParams.append('r', JSON.stringify(message));
    return url.toString();
}

export const generateTGUniversalLink = (universalLink: string, message: ConnectRequest): string => {
    const urlToWrap = generateRegularUniversalLink('about:blank', message);
    const linkParams = urlToWrap.split('?')[1]!;

    const startattach = 'tonconnect-' + encodeTelegramUrlParameters(linkParams);
    const url = new URL(universalLink);
    url.searchParams.append('startattach', startattach);
    return url.toString();
}