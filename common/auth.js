const TokenKey = "app_token_key";
const OpenIdKey = "app_open_id_key";
const NetworkKey = "app_network_key";

export function setNetwork(val) {
	return uni.setStorageSync(NetworkKey, val);
}

export function getNetwork() {
	return uni.getStorageSync(NetworkKey);
}

export function getOpenId() {
	return uni.getStorageSync(OpenIdKey);
}

export function setOpenId(val) {
	return uni.setStorageSync(OpenIdKey, val);
}

export function removeOpenId(val) {
	return uni.removeStorageSync(OpenIdKey, val);
}

export function getToken() {
	return uni.getStorageSync(TokenKey);
}

export function setToken(token) {
	return uni.setStorageSync(TokenKey, token);
}

export function removeToken() {
	return uni.removeStorageSync(TokenKey);
}
