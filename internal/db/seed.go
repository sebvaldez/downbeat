package db

import (
	"database/sql"
	"downbeat/internal/store"
	"fmt"
	"log"
)

func Seed(db *sql.DB) error {
	log.Println("Seeding database...")

	st := store.NewStore(db)

	// Check if already seeded
	hasSettings, err := st.Settings.HasSettings()
	if err != nil {
		return fmt.Errorf("check seed status: %w", err)
	}

	if hasSettings {
		log.Println("Database already seeded, skipping")
		return nil
	}

	if err := seedUserSettings(st.Settings); err != nil {
		return fmt.Errorf("seed settings: %w", err)
	}

	log.Println("Database seeded successfully")
	return nil
}

// seedUserSettings seeds the settings table
func seedUserSettings(settings store.SettingStore) error {
	for _, setting := range store.DefaultSettings {
		if err := settings.SetSetting(setting.Key, setting.DefaultValue); err != nil {
			return fmt.Errorf("insert setting %s: %w", setting.Key, err)
		}
	}
	log.Printf("Seeded %d user settings", len(store.DefaultSettings))
	return nil
}
