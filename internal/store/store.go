package store

import (
	"database/sql"
	"downbeat/internal/db/sqlc"
)

type Store struct {
	db *sql.DB

	Settings SettingStore
	// future stores:
	// Integrations IntegrationStore
	// Credentials CredentialsStore
	// Downloads DownloadStore
}

func NewStore(db *sql.DB) *Store {
	queries := sqlc.New(db)

	return &Store{
		db:       db,
		Settings: &settingStore{db: db, queries: queries},
	}
}

// Interfaces
type SettingStore interface {
	GetGeneralSettings() (*GeneralSettings, error)
	UpdateDownloadLocation(path string) error

	// todo
	//UpdateAudioQuality(quality string) error
	//UpdateTheme(theme string) error
	//UpdateConcurrentDownloads(count int) error

	// Used by seeding
	SetSetting(key, value string) error
	HasSettings() (bool, error)
}
