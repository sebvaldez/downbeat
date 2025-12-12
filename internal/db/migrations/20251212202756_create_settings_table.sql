-- +goose Up
-- +goose StatementBegin
CREATE TABLE settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster key lookups
CREATE INDEX idx_settings_key ON settings(key);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS idx_settings_key;
DROP TABLE IF EXISTS settings;
-- +goose StatementEnd
