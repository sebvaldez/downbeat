-- name: CreateOrUpdateSetting :exec
INSERT INTO settings (key, value, updated_at)
VALUES (?, ?, CURRENT_TIMESTAMP)
ON CONFLICT (key)
DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = CURRENT_TIMESTAMP;

-- name: GetAllSettings :many
SELECT id, key, value, created_at, updated_at
FROM settings
ORDER BY key;

-- name: GetSettingByKey :one
SELECT id, key, value, created_at, updated_at
FROM settings
WHERE key = ?;

-- name: DeleteSetting :exec
DELETE FROM settings
WHERE key = ?;

-- name: BulkUpsertSettings :exec
INSERT INTO settings (key, value, updated_at)
VALUES (?, ?, CURRENT_TIMESTAMP)
ON CONFLICT (key)
DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = CURRENT_TIMESTAMP;
