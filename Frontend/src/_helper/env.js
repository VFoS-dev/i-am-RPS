const _env = import.meta.env

export function env(check, fallback) {
    if (!_env[check]) {
        console.warn(`⚠️ Environment variable "${check}" was not found, using fallback: "${fallback}"`)
        return fallback;
    }
    return _env[check]
}