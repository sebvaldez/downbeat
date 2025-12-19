package store

import (
	"context"
	"database/sql"
	"downbeat/internal/db/sqlc"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
)

// GeneralSettings represents user preferences
type GeneralSettings struct {
	DownloadLocation    string `json:"download_location"`
	AudioQuality        string `json:"audio_quality"`
	Theme               string `json:"theme"`
	ConcurrentDownloads int    `json:"concurrent_downloads"`
}

type SettingDefinition struct {
	Key          string
	DefaultValue string
	Description  string
}

// single source of truth for all settings
// these new settings will auto-seed.
var DefaultSettings = []SettingDefinition{
	{
		Key:          "download_location",
		DefaultValue: "",
		Description:  "Where downloaded files are saved",
	},
	{
		Key:          "audio_quality",
		DefaultValue: "high",
		Description:  "Default audio quality: low, medium, high",
	},
	{
		Key:          "theme",
		DefaultValue: "dark",
		Description:  "UI theme: light, dark, system",
	},
	{
		Key:          "concurrent_downloads",
		DefaultValue: "3",
		Description:  "Maximum simultaneous downloads (1-10)",
	},
}

// Store Implementations
type settingStore struct {
	db      *sql.DB
	queries *sqlc.Queries
}

func (s *settingStore) GetGeneralSettings() (*GeneralSettings, error) {
	dbSettings, err := s.queries.ListUserSettings(context.Background())
	if err != nil {
		return nil, fmt.Errorf("fetch settings: %w", err)
	}

	settingsMap := make(map[string]string)
	for _, setting := range dbSettings {
		settingsMap[setting.Key] = setting.Value
	}

	return &GeneralSettings{
		DownloadLocation:    getOrDefault(settingsMap, "download_location", s.getDefaultDownloadPath()),
		AudioQuality:        getOrDefault(settingsMap, "audio_quality", "high"),
		Theme:               getOrDefault(settingsMap, "theme", "dark"),
		ConcurrentDownloads: getIntOrDefault(settingsMap, "concurrent_downloads", 3),
	}, nil
}

func (s *settingStore) UpdateDownloadLocation(path string) error {
	if err := os.MkdirAll(path, 0755); err != nil {
		return fmt.Errorf("invalid path: %w", err)
	}
	return s.setSetting("download_location", path)
}

func (s *settingStore) SetSetting(key, value string) error {
	return s.setSetting(key, value)
}

func (s *settingStore) HasSettings() (bool, error) {
	settings, err := s.queries.ListUserSettings(context.Background())
	if err != nil {
		return false, err
	}
	return len(settings) > 0, nil
}

// Private helpers
func (s *settingStore) setSetting(key, value string) error {
	return s.queries.SetUserSetting(context.Background(), sqlc.SetUserSettingParams{
		Key:   key,
		Value: value,
	})
}

func (s *settingStore) getDefaultDownloadPath() string {
	home, _ := os.UserHomeDir()
	return filepath.Join(home, "Music", "Downbeat")
}

func getOrDefault(m map[string]string, key, def string) string {
	if val, ok := m[key]; ok && val != "" {
		return val
	}
	return def
}

func getIntOrDefault(m map[string]string, key string, def int) int {
	if val, ok := m[key]; ok {
		if i, err := strconv.Atoi(val); err == nil {
			return i
		}
	}
	return def
}
