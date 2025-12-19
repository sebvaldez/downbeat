-- name: GetUserSetting :one
SELECT
    id, key, value, created_at, updated_at
FROM
    settings
WHERE
    key = ?
LIMIT 1;

-- name: ListUserSettings :many
SELECT
    id, key, value, created_at, updated_at
FROM
    settings
ORDER BY key;

-- name: SetUserSetting :exec
INSERT INTO settings (key, value, created_at, updated_at)
VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT(key) DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = CURRENT_TIMESTAMP;

-- name: DeleteUserSetting :exec
DELETE FROM settings
WHERE key = ?;
