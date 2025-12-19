package db

import (
	"database/sql"
	"embed"
	"fmt"
	"log"

	"github.com/pressly/goose/v3"
)

//go:embed migrations/*.sql
var embedMigrations embed.FS

// RunMigrations applies all pending database migrations
func RunMigrations(db *sql.DB) error {
	log.Println("Running database migrations...")

	goose.SetBaseFS(embedMigrations)

	if err := goose.SetDialect("sqlite3"); err != nil {
		return fmt.Errorf("set dialect: %w", err)
	}

	if err := goose.Up(db, "migrations"); err != nil {
		return fmt.Errorf("run migrations: %w", err)
	}

	log.Println("✓ Migrations completed successfully")
	return nil
}
